import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { ThemeProvider } from './context/ThemeContext'
import { ToastProvider } from './components/Toast'
import { CommunityProvider } from './context/CommunityContext'
import Layout from './components/Layout'
import ProtectedRoute from './components/ProtectedRoute'
import RoleRoute from './components/RoleRoute'
import Home from './pages/Home'

// ─── Lazy-loaded routes ──────────────────────────────────────────────────

const Questionnaire = lazy(() => import('./pages/Questionnaire'))
const Register = lazy(() => import('./pages/Register'))
const Login = lazy(() => import('./pages/Login'))
const Results = lazy(() => import('./pages/Results'))
const Portal = lazy(() => import('./pages/Portal'))
const Library = lazy(() => import('./pages/Library'))
const Community = lazy(() => import('./pages/Community'))
const CommunityThread = lazy(() => import('./pages/CommunityThread'))

// Legal pages
const TermsOfService = lazy(() => import('./pages/TermsOfService'))
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'))

// Admin routes (heavier bundle, separate chunk)
const AdminLayout = lazy(() => import('./components/AdminLayout'))
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'))
const UserManagement = lazy(() => import('./pages/admin/UserManagement'))
const ArticleManagement = lazy(() => import('./pages/admin/ArticleManagement'))
const ArticleEditor = lazy(() => import('./pages/admin/ArticleEditor'))
const ContentModeration = lazy(() => import('./pages/admin/ContentModeration'))
const AnalyticsDashboard = lazy(() => import('./pages/admin/AnalyticsDashboard'))
const SystemSettings = lazy(() => import('./pages/admin/SystemSettings'))

// ─── Loading fallback ────────────────────────────────────────────────────

function PageLoader() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '40vh' }}>
      <div style={{
        width: 32, height: 32, border: '3px solid var(--color-border)',
        borderTopColor: 'var(--color-primary)', borderRadius: '50%',
        animation: 'spin 0.8s linear infinite',
      }} />
    </div>
  )
}

// ─── App ─────────────────────────────────────────────────────────────────

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <ToastProvider>
          <AuthProvider>
            <CommunityProvider>
              <Suspense fallback={<PageLoader />}>
                <Routes>
                  <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="questionnaire" element={<Questionnaire />} />
                    <Route path="register" element={<Register />} />
                    <Route path="login" element={<Login />} />
                    <Route path="library" element={<Library />} />
                    <Route path="community" element={<Community />} />
                    <Route path="community/:threadId" element={<CommunityThread />} />
                    <Route path="terms" element={<TermsOfService />} />
                    <Route path="privacy" element={<PrivacyPolicy />} />
                    <Route
                      path="results"
                      element={
                        <ProtectedRoute>
                          <Results />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="portal"
                      element={
                        <ProtectedRoute>
                          <Portal />
                        </ProtectedRoute>
                      }
                    />

                    {/* Admin Routes */}
                    <Route
                      path="admin"
                      element={
                        <RoleRoute requiredRole="admin">
                          <AdminLayout />
                        </RoleRoute>
                      }
                    >
                      <Route index element={<AdminDashboard />} />
                      <Route path="users" element={<UserManagement />} />
                      <Route path="articles" element={<ArticleManagement />} />
                      <Route path="articles/new" element={<ArticleEditor />} />
                      <Route path="articles/:id/edit" element={<ArticleEditor />} />
                      <Route path="content" element={<ContentModeration />} />
                      <Route path="analytics" element={<AnalyticsDashboard />} />
                      <Route path="settings" element={<SystemSettings />} />
                    </Route>

                    <Route path="*" element={<Navigate to="/" replace />} />
                  </Route>
                </Routes>
              </Suspense>
            </CommunityProvider>
          </AuthProvider>
        </ToastProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
