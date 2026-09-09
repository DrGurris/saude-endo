import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import styles from './LegalPage.module.css'

const PrivacyPolicy: React.FC = () => {
  return (
    <div className={styles.container}>
      <Link to="/" className={styles.backLink}>
        <ArrowLeft size={16} /> Volver al inicio
      </Link>

      <header className={styles.header}>
        <h1>Politica de Privacidad</h1>
        <p className={styles.lastUpdated}>Ultima actualizacion: 10 de marzo de 2026</p>
      </header>

      <div className={styles.disclaimer}>
        <p>
          <strong>Tu privacidad es nuestra prioridad.</strong> En Saude Clinica de la Mujer entendemos
          que la informacion de salud es extremadamente sensible. Esta politica explica como recopilamos,
          usamos y protegemos tus datos.
        </p>
      </div>

      <section className={styles.section}>
        <h2>1. Datos que recopilamos</h2>
        <p>La Plataforma puede recopilar los siguientes tipos de informacion:</p>

        <p><strong>Datos de cuenta:</strong></p>
        <ul>
          <li>Nombre completo</li>
          <li>Correo electronico</li>
          <li>Fecha de nacimiento</li>
          <li>Contrasena (almacenada de forma cifrada)</li>
        </ul>

        <p><strong>Datos de salud:</strong></p>
        <ul>
          <li>Respuestas al cuestionario de evaluacion de dolor</li>
          <li>Resultado del fenotipo pre-evaluado (nociceptivo, neuropatico, nociplastico, mixto)</li>
          <li>Objetivo de salud seleccionado</li>
          <li>Registros del diario de sintomas (dolor, energia, estado de animo)</li>
        </ul>

        <p><strong>Datos de uso:</strong></p>
        <ul>
          <li>Articulos leidos y progreso de lectura</li>
          <li>Articulos guardados en favoritos</li>
          <li>Publicaciones y respuestas en el foro comunitario</li>
          <li>Logros y puntos de gamificacion</li>
          <li>Preferencia de tema (claro/oscuro)</li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2>2. Como almacenamos tus datos</h2>
        <p>
          Actualmente, la Plataforma utiliza <strong>almacenamiento local del navegador</strong> (localStorage
          y sessionStorage) para guardar tus datos. Esto significa que:
        </p>
        <ul>
          <li>Tus datos permanecen en tu dispositivo y no se envian a servidores externos</li>
          <li>Los datos persisten entre sesiones pero son especificos de tu navegador y dispositivo</li>
          <li>Si limpias los datos del navegador, tu informacion se eliminara permanentemente</li>
          <li>Otros usuarios del mismo dispositivo podrian acceder a tus datos si usan el mismo navegador</li>
        </ul>
        <p>
          Cuando la Plataforma implemente un servidor backend, los datos se transmitirian de forma cifrada (HTTPS)
          y se almacenarian en bases de datos protegidas con cifrado en reposo.
        </p>
      </section>

      <section className={styles.section}>
        <h2>3. Como usamos tus datos</h2>
        <p>Utilizamos tu informacion exclusivamente para:</p>
        <ul>
          <li>Personalizar tu experiencia (recomendaciones de articulos segun tu fenotipo y objetivo)</li>
          <li>Mostrar tu progreso de lectura y habitos</li>
          <li>Calcular y mostrar tu fenotipo pre-evaluado</li>
          <li>Permitirte participar en el foro comunitario</li>
          <li>Gestionar tu cuenta y preferencias</li>
        </ul>
        <p>
          <strong>No utilizamos tus datos para publicidad, no creamos perfiles de marketing y no vendemos
          tu informacion a terceros.</strong>
        </p>
      </section>

      <section className={styles.section}>
        <h2>4. Comparticion de datos</h2>
        <p>
          No compartimos tus datos personales ni de salud con terceros, excepto en los siguientes casos:
        </p>
        <ul>
          <li>Cuando publicas contenido en el foro comunitario (tu nombre o &quot;Anonima&quot; sera visible)</li>
          <li>Si es requerido por ley o por orden judicial</li>
          <li>Para proteger los derechos, seguridad o propiedad de la Plataforma o sus usuarios</li>
        </ul>
        <p>
          El contenido que publiques como &quot;anonimo&quot; en el foro se mostrara sin tu nombre,
          pero internamente mantenemos un registro para fines de moderacion.
        </p>
      </section>

      <section className={styles.section}>
        <h2>5. Datos del foro comunitario</h2>
        <p>
          Las publicaciones y respuestas en el foro son visibles para todos los visitantes de la Plataforma.
          Antes de publicar, considera que:
        </p>
        <ul>
          <li>No compartas informacion personal identificable (direccion, telefono, documento de identidad)</li>
          <li>Las publicaciones pueden ser reportadas y moderadas</li>
          <li>Los moderadores y administradores pueden ver el autor de publicaciones anonimas</li>
          <li>Puedes solicitar la eliminacion de tus publicaciones contactandonos</li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2>6. Tus derechos</h2>
        <p>Como usuaria de la Plataforma, tienes derecho a:</p>
        <ul>
          <li><strong>Acceso:</strong> Solicitar una copia de todos los datos que tenemos sobre ti</li>
          <li><strong>Rectificacion:</strong> Corregir datos inexactos o incompletos</li>
          <li><strong>Eliminacion:</strong> Solicitar la eliminacion completa de tu cuenta y datos asociados</li>
          <li><strong>Portabilidad:</strong> Exportar tus datos en un formato estandar</li>
          <li><strong>Oposicion:</strong> Oponerte al procesamiento de tus datos en cualquier momento</li>
        </ul>
        <p>
          Dado que los datos se almacenan localmente en tu navegador, puedes ejercer estos derechos
          directamente limpiando los datos del sitio en la configuracion de tu navegador.
        </p>
      </section>

      <section className={styles.section}>
        <h2>7. Seguridad</h2>
        <p>Implementamos medidas de seguridad para proteger tu informacion:</p>
        <ul>
          <li>Contrasenas almacenadas con hash criptografico (SHA-256)</li>
          <li>Datos de sesion separados de datos persistentes</li>
          <li>Proteccion contra intentos de inicio de sesion repetidos (limite de intentos)</li>
          <li>Validacion de entrada en todos los formularios</li>
        </ul>
        <p>
          Ninguna transmision por Internet o metodo de almacenamiento es 100% seguro. Si bien nos esforzamos
          por proteger tus datos, no podemos garantizar seguridad absoluta.
        </p>
      </section>

      <section className={styles.section}>
        <h2>8. Menores de edad</h2>
        <p>
          La Plataforma esta dirigida a personas mayores de 16 anos. No recopilamos intencionalmente
          informacion de menores de esta edad. Si detectamos que una menor ha proporcionado datos personales,
          tomaremos medidas para eliminarlos.
        </p>
      </section>

      <section className={styles.section}>
        <h2>9. Cookies y tecnologias de seguimiento</h2>
        <p>
          La Plataforma actualmente <strong>no utiliza cookies de seguimiento ni servicios de analitica
          de terceros</strong>. Solo utilizamos almacenamiento local del navegador (localStorage) para
          la funcionalidad de la aplicacion, no para rastreo.
        </p>
      </section>

      <section className={styles.section}>
        <h2>10. Cambios a esta politica</h2>
        <p>
          Podemos actualizar esta politica periodicamente. Te notificaremos de cambios significativos
          mediante un aviso en la Plataforma. La fecha de la ultima actualizacion se muestra al inicio
          de este documento.
        </p>
      </section>

      <div className={styles.contactBox}>
        <h2>Contacto</h2>
        <p>Para ejercer tus derechos o resolver dudas sobre privacidad:</p>
        <p>Email: <a href="mailto:privacidad@saudeclinica.com">privacidad@saudeclinica.com</a></p>
        <p>
          Tambien puedes consultar nuestros <Link to="/terms">Terminos y Condiciones</Link> para
          informacion complementaria.
        </p>
      </div>
    </div>
  )
}

export default PrivacyPolicy
