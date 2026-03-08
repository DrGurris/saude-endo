import { test, expect, request } from '@playwright/test';

const API_BASE = 'http://localhost:8001';

test.describe('Symptoms localStorage to Backend Sync', () => {
  test.beforeEach(async ({ page }) => {
    // Clear localStorage and sessionStorage for each test
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.evaluate(() => {
      localStorage.clear();
      sessionStorage.clear();
    });
  });

  test('Symptoms in localStorage are synced to backend after login', async ({ page }) => {
    // Create a unique test user for this test
    const uniqueId = String(Date.now());
    const testEmail = `test_sync_${uniqueId}@test.com`;
    const testPassword = 'TestPass123!';
    
    // Register user
    const apiContext = await request.newContext();
    const registerResponse = await apiContext.post(`${API_BASE}/api/auth/register`, {
      data: {
        name: `TEST_Sync_${uniqueId}`,
        email: testEmail,
        password: testPassword,
        birth_date: '1990-01-01'
      }
    });
    
    expect(registerResponse.status()).toBe(200);

    // Set up symptoms in localStorage (simulating offline entries)
    // Note: mood must be 'good' | 'neutral' | 'bad' (matching backend schema)
    const today = new Date().toISOString().split('T')[0];
    const symptomData = {
      date: today,
      pain: 5,
      energy: 7,
      mood: 'neutral',  // Valid mood value
      notes: `TEST_sync_note_${uniqueId}`
    };

    await page.evaluate((data) => {
      localStorage.setItem(`saude_diario_${data.date}`, JSON.stringify(data));
    }, symptomData);

    // Verify symptom is in localStorage
    const storedSymptom = await page.evaluate((date: string) => {
      return localStorage.getItem(`saude_diario_${date}`);
    }, today);
    expect(storedSymptom).toBeTruthy();

    // Intercept the symptoms API to verify it's called
    let syncCalled = false;
    await page.route('**/api/symptoms', async route => {
      if (route.request().method() === 'POST') {
        syncCalled = true;
      }
      await route.continue();
    });

    // Now login
    await page.goto('/login', { waitUntil: 'domcontentloaded' });
    await page.getByTestId('login-email').fill(testEmail);
    await page.getByTestId('login-password').fill(testPassword);
    await page.getByTestId('login-submit').click();

    // Wait for redirect to portal
    await expect(page).toHaveURL(/\/portal/, { timeout: 15000 });

    // Give time for background sync to complete
    await page.waitForTimeout(3000);

    // Verify sync was called
    expect(syncCalled).toBe(true);

    // Get the token from the browser to verify API call
    const token = await page.evaluate(() => localStorage.getItem('saude_token'));
    expect(token).toBeTruthy();

    // Verify symptom exists in backend using the logged in user's token
    const symptomsResponse = await apiContext.get(`${API_BASE}/api/symptoms?days=7`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    expect(symptomsResponse.status()).toBe(200);
    const symptoms = await symptomsResponse.json();
    
    // Find our synced symptom
    const syncedSymptom = symptoms.symptoms.find(
      (s: { date: string; notes: string }) => s.date === today && s.notes.includes(`TEST_sync_note_${uniqueId}`)
    );
    expect(syncedSymptom).toBeTruthy();
    expect(syncedSymptom.pain).toBe(5);
    expect(syncedSymptom.energy).toBe(7);
    expect(syncedSymptom.mood).toBe('neutral');
  });

  test('Multiple symptoms in localStorage are all synced', async ({ page }) => {
    // Create a unique test user
    const uniqueId = String(Date.now());
    const testEmail = `test_multi_${uniqueId}@test.com`;
    const testPassword = 'TestPass123!';
    
    const apiContext = await request.newContext();
    const registerResponse = await apiContext.post(`${API_BASE}/api/auth/register`, {
      data: {
        name: `TEST_Multi_${uniqueId}`,
        email: testEmail,
        password: testPassword,
        birth_date: '1990-01-01'
      }
    });
    
    expect(registerResponse.status()).toBe(200);

    // Create multiple symptom entries in localStorage
    // Note: mood must be 'good' | 'neutral' | 'bad'
    const dates = [
      new Date(Date.now() - 86400000).toISOString().split('T')[0], // yesterday
      new Date(Date.now() - 172800000).toISOString().split('T')[0], // 2 days ago
    ];

    await page.evaluate((data: { dates: string[]; uniqueId: string }) => {
      data.dates.forEach((date, idx) => {
        localStorage.setItem(`saude_diario_${date}`, JSON.stringify({
          date,
          pain: 3 + idx,
          energy: 6 + idx,
          mood: 'neutral',  // Valid mood value
          notes: `TEST_multi_sync_${data.uniqueId}_${idx}`
        }));
      });
    }, { dates, uniqueId });

    // Count symptom POST calls
    let syncCount = 0;
    await page.route('**/api/symptoms', async route => {
      if (route.request().method() === 'POST') {
        syncCount++;
      }
      await route.continue();
    });

    // Login
    await page.goto('/login', { waitUntil: 'domcontentloaded' });
    await page.getByTestId('login-email').fill(testEmail);
    await page.getByTestId('login-password').fill(testPassword);
    await page.getByTestId('login-submit').click();

    // Wait for portal
    await expect(page).toHaveURL(/\/portal/, { timeout: 15000 });

    // Wait for sync to complete
    await page.waitForTimeout(3000);

    // Should have synced at least 2 symptoms
    expect(syncCount).toBeGreaterThanOrEqual(2);
  });

  test('Empty localStorage does not trigger sync calls', async ({ page }) => {
    // Create a unique test user
    const uniqueId = String(Date.now());
    const testEmail = `test_empty_${uniqueId}@test.com`;
    const testPassword = 'TestPass123!';
    
    const apiContext = await request.newContext();
    await apiContext.post(`${API_BASE}/api/auth/register`, {
      data: {
        name: `TEST_Empty_${uniqueId}`,
        email: testEmail,
        password: testPassword,
        birth_date: '1990-01-01'
      }
    });

    // Ensure localStorage has no symptom entries
    await page.evaluate(() => {
      // Clear only symptom entries
      for (let i = localStorage.length - 1; i >= 0; i--) {
        const key = localStorage.key(i);
        if (key && key.startsWith('saude_diario_')) {
          localStorage.removeItem(key);
        }
      }
    });

    let syncCalled = false;
    await page.route('**/api/symptoms', async route => {
      if (route.request().method() === 'POST') {
        syncCalled = true;
      }
      await route.continue();
    });

    // Login
    await page.goto('/login', { waitUntil: 'domcontentloaded' });
    await page.getByTestId('login-email').fill(testEmail);
    await page.getByTestId('login-password').fill(testPassword);
    await page.getByTestId('login-submit').click();

    // Wait for portal
    await expect(page).toHaveURL(/\/portal/, { timeout: 15000 });

    // Give time for any potential sync
    await page.waitForTimeout(2000);

    // No sync should have been triggered (no localStorage symptoms)
    expect(syncCalled).toBe(false);
  });
});
