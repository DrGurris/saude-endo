import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import styles from './LegalPage.module.css'

const TermsOfService: React.FC = () => {
  return (
    <div className={styles.container}>
      <Link to="/" className={styles.backLink}>
        <ArrowLeft size={16} /> Volver al inicio
      </Link>

      <header className={styles.header}>
        <h1>Terminos y Condiciones de Uso</h1>
        <p className={styles.lastUpdated}>Ultima actualizacion: 10 de marzo de 2026</p>
      </header>

      <div className={styles.disclaimer}>
        <p>
          <strong>Aviso importante:</strong> Saude Clinica de la Mujer es una plataforma educativa.
          La informacion proporcionada no sustituye el diagnostico, consejo o tratamiento medico profesional.
          Siempre consulta a tu medico antes de tomar decisiones sobre tu salud.
        </p>
      </div>

      <section className={styles.section}>
        <h2>1. Aceptacion de los terminos</h2>
        <p>
          Al acceder y utilizar la plataforma web de Saude Clinica de la Mujer (en adelante, &quot;la Plataforma&quot;),
          aceptas estos terminos y condiciones en su totalidad. Si no estas de acuerdo con alguna parte de estos terminos,
          no debes utilizar la Plataforma.
        </p>
      </section>

      <section className={styles.section}>
        <h2>2. Descripcion del servicio</h2>
        <p>
          La Plataforma ofrece recursos educativos sobre endometriosis, incluyendo:
        </p>
        <ul>
          <li>Articulos basados en evidencia cientifica sobre manejo de la endometriosis</li>
          <li>Un cuestionario de pre-evaluacion del fenotipo de dolor</li>
          <li>Herramientas de seguimiento personal (diario de sintomas, progreso de lectura)</li>
          <li>Foro comunitario para compartir experiencias entre usuarias</li>
          <li>Sistema de gamificacion para fomentar habitos saludables</li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2>3. Disclaimer medico</h2>
        <p>
          La informacion contenida en la Plataforma tiene fines exclusivamente educativos e informativos.
          No debe interpretarse como consejo medico, diagnostico o recomendacion de tratamiento.
        </p>
        <p>
          El cuestionario de evaluacion produce un resultado orientativo (fenotipo pre-evaluado) que <strong>no constituye
          un diagnostico medico</strong>. Este resultado debe ser confirmado por un profesional de salud calificado.
        </p>
        <p>
          Si experimentas dolor severo, sangrado abundante u otros sintomas de emergencia, busca atencion medica inmediata.
        </p>
      </section>

      <section className={styles.section}>
        <h2>4. Registro y cuenta de usuario</h2>
        <p>
          Para acceder a funciones personalizadas, debes crear una cuenta proporcionando informacion veraz y actualizada.
          Eres responsable de:
        </p>
        <ul>
          <li>Mantener la confidencialidad de tus credenciales de acceso</li>
          <li>Toda actividad que ocurra bajo tu cuenta</li>
          <li>Notificar cualquier uso no autorizado de tu cuenta</li>
        </ul>
        <p>
          Nos reservamos el derecho de suspender o eliminar cuentas que violen estos terminos.
        </p>
      </section>

      <section className={styles.section}>
        <h2>5. Contenido generado por usuarios (Foro)</h2>
        <p>
          Al participar en el foro comunitario, aceptas las siguientes reglas:
        </p>
        <ul>
          <li>No compartir informacion que pueda identificar a terceros sin su consentimiento</li>
          <li>No publicar contenido que promueva tratamientos no respaldados por evidencia cientifica como curas definitivas</li>
          <li>No realizar acoso, discriminacion o ataques personales hacia otras usuarias</li>
          <li>No compartir contenido comercial, spam o enlaces no solicitados</li>
          <li>No publicar contenido que infrinja derechos de propiedad intelectual de terceros</li>
          <li>Respetar la privacidad y el anonimato de otras participantes</li>
        </ul>
        <p>
          El equipo de moderacion puede eliminar publicaciones que violen estas reglas y suspender a usuarias reincidentes.
          Las publicaciones del foro representan opiniones personales y no son consejo medico.
        </p>
      </section>

      <section className={styles.section}>
        <h2>6. Propiedad intelectual</h2>
        <p>
          Todo el contenido de la Plataforma (articulos, imagenes, diseno, codigo fuente, logotipos) es propiedad
          de Saude Clinica de la Mujer o se utiliza con licencia. Queda prohibida su reproduccion, distribucion o
          modificacion sin autorizacion escrita previa.
        </p>
        <p>
          Los articulos citan fuentes cientificas publicadas. Las citas se incluyen con fines educativos bajo
          el principio de uso justo.
        </p>
      </section>

      <section className={styles.section}>
        <h2>7. Limitacion de responsabilidad</h2>
        <p>
          La Plataforma se proporciona &quot;tal cual&quot; sin garantias de ningun tipo. No nos responsabilizamos por:
        </p>
        <ul>
          <li>Decisiones de salud tomadas basandose unicamente en la informacion de la Plataforma</li>
          <li>Interrupciones temporales del servicio o perdida de datos almacenados localmente</li>
          <li>Contenido publicado por otras usuarias en el foro comunitario</li>
          <li>Resultados del cuestionario de evaluacion, que son orientativos y no diagnosticos</li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2>8. Almacenamiento de datos</h2>
        <p>
          Actualmente, la Plataforma almacena datos de usuario de forma local en tu navegador (localStorage).
          Esto significa que tus datos permanecen en tu dispositivo y no se transmiten a servidores externos.
          Para mas detalles, consulta nuestra <Link to="/privacy">Politica de Privacidad</Link>.
        </p>
      </section>

      <section className={styles.section}>
        <h2>9. Modificaciones a los terminos</h2>
        <p>
          Nos reservamos el derecho de modificar estos terminos en cualquier momento. Los cambios entraran en vigor
          al ser publicados en la Plataforma. El uso continuado despues de los cambios implica la aceptacion
          de los terminos actualizados.
        </p>
      </section>

      <section className={styles.section}>
        <h2>10. Ley aplicable</h2>
        <p>
          Estos terminos se rigen por las leyes aplicables en la jurisdiccion donde opera Saude Clinica de la Mujer.
          Cualquier disputa sera resuelta en los tribunales competentes de dicha jurisdiccion.
        </p>
      </section>

      <div className={styles.contactBox}>
        <h2>Contacto</h2>
        <p>Si tienes preguntas sobre estos terminos, contactanos:</p>
        <p>Email: <a href="mailto:legal@saudeclinica.com">legal@saudeclinica.com</a></p>
      </div>
    </div>
  )
}

export default TermsOfService
