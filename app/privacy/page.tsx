import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl">✈️</span>
              <span className="text-xl font-bold text-gray-900">TravelDeals Pro</span>
            </Link>
            <nav className="flex space-x-6">
              <Link href="/" className="text-gray-600 hover:text-gray-900">
                Inicio
              </Link>
              <Link href="/pricing" className="text-gray-600 hover:text-gray-900">
                Precios
              </Link>
              <Link href="/register" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                Registrarse
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Política de Privacidad</h1>
          <p className="text-xl text-gray-600">Última actualización: {new Date().toLocaleDateString("es-ES")}</p>
        </div>

        <div className="space-y-8">
          {/* Responsable del Tratamiento */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span>🏢</span>
                Responsable del Tratamiento
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-900">Identidad del Responsable:</h4>
                <p className="text-gray-700">
                  <strong>Digital Tsunami SL</strong>
                  <br />
                  CIF: B-12345678
                  <br />
                  Domicilio: Calle Ejemplo 123, 28001 Madrid, España
                  <br />
                  Email: privacy@digitaltsunamis.com
                  <br />
                  DPO: dpo@digitaltsunamis.com
                </p>
              </div>
              <p className="text-gray-600">
                Digital Tsunami SL es el responsable del tratamiento de sus datos personales en relación con el uso de
                la plataforma TravelDeals Pro.
              </p>
            </CardContent>
          </Card>

          {/* Datos que Recopilamos */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span>📊</span>
                Datos que Recopilamos
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-900">Datos de Registro:</h4>
                <ul className="list-disc list-inside mt-2 text-gray-700">
                  <li>Nombre y apellidos</li>
                  <li>Dirección de correo electrónico</li>
                  <li>Contraseña (encriptada)</li>
                  <li>Fecha de registro</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900">Datos de Suscripción:</h4>
                <ul className="list-disc list-inside mt-2 text-gray-700">
                  <li>Información de facturación (procesada por Stripe)</li>
                  <li>Historial de pagos</li>
                  <li>Plan de suscripción activo</li>
                  <li>Estado de la suscripción</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900">Datos de Uso:</h4>
                <ul className="list-disc list-inside mt-2 text-gray-700">
                  <li>Preferencias de destinos</li>
                  <li>Ofertas visualizadas y guardadas</li>
                  <li>Interacciones con notificaciones</li>
                  <li>Logs de actividad en la plataforma</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900">Datos Técnicos:</h4>
                <ul className="list-disc list-inside mt-2 text-gray-700">
                  <li>Dirección IP</li>
                  <li>Tipo de navegador y dispositivo</li>
                  <li>Cookies y tecnologías similares</li>
                  <li>Datos de geolocalización aproximada</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Base Legal y Finalidades */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span>⚖️</span>
                Base Legal y Finalidades del Tratamiento
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-900">Ejecución del Contrato:</h4>
                <ul className="list-disc list-inside mt-2 text-gray-700">
                  <li>Gestión de la cuenta de usuario</li>
                  <li>Procesamiento de suscripciones</li>
                  <li>Envío de ofertas y notificaciones</li>
                  <li>Acceso a la comunidad Telegram</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900">Interés Legítimo:</h4>
                <ul className="list-disc list-inside mt-2 text-gray-700">
                  <li>Mejora del servicio y personalización</li>
                  <li>Análisis de uso y estadísticas</li>
                  <li>Prevención de fraude</li>
                  <li>Comunicaciones comerciales (con opt-out)</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900">Consentimiento:</h4>
                <ul className="list-disc list-inside mt-2 text-gray-700">
                  <li>Cookies no esenciales</li>
                  <li>Marketing directo por email</li>
                  <li>Análisis avanzado con IA</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Compartir Datos con Terceros */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span>🤝</span>
                Compartir Datos con Terceros
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">
                Compartimos sus datos únicamente con los siguientes terceros de confianza:
              </p>

              <div>
                <h4 className="font-semibold text-gray-900">Stripe (Procesamiento de Pagos):</h4>
                <p className="text-gray-700">
                  Para procesar suscripciones y pagos de forma segura.
                  <a
                    href="https://stripe.com/privacy"
                    target="_blank"
                    className="text-blue-600 hover:underline ml-1"
                    rel="noreferrer"
                  >
                    Ver política de Stripe
                  </a>
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900">Vercel (Hosting y Analytics):</h4>
                <p className="text-gray-700">
                  Para el alojamiento de la plataforma y análisis básicos.
                  <a
                    href="https://vercel.com/legal/privacy-policy"
                    target="_blank"
                    className="text-blue-600 hover:underline ml-1"
                    rel="noreferrer"
                  >
                    Ver política de Vercel
                  </a>
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900">OpenAI (Análisis IA):</h4>
                <p className="text-gray-700">
                  Para el análisis inteligente de ofertas (datos anonimizados).
                  <a
                    href="https://openai.com/privacy/"
                    target="_blank"
                    className="text-blue-600 hover:underline ml-1"
                    rel="noreferrer"
                  >
                    Ver política de OpenAI
                  </a>
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900">Telegram:</h4>
                <p className="text-gray-700">
                  Para la gestión de la comunidad premium (solo username).
                  <a
                    href="https://telegram.org/privacy"
                    target="_blank"
                    className="text-blue-600 hover:underline ml-1"
                    rel="noreferrer"
                  >
                    Ver política de Telegram
                  </a>
                </p>
              </div>

              <p className="text-sm text-gray-600 mt-4">
                <strong>Importante:</strong> Nunca vendemos ni alquilamos sus datos personales a terceros.
              </p>
            </CardContent>
          </Card>

          {/* Transferencias Internacionales */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span>🌍</span>
                Transferencias Internacionales
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">
                Algunos de nuestros proveedores pueden procesar datos fuera del Espacio Económico Europeo:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>
                  <strong>Estados Unidos:</strong> Stripe, Vercel, OpenAI (con cláusulas contractuales tipo)
                </li>
                <li>
                  <strong>Reino Unido:</strong> Algunos servicios de análisis (decisión de adecuación)
                </li>
              </ul>
              <p className="text-sm text-gray-600 mt-4">
                Todas las transferencias cumplen con las garantías adecuadas según el RGPD.
              </p>
            </CardContent>
          </Card>

          {/* Retención de Datos */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span>⏰</span>
                Retención de Datos
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-900">Datos de Cuenta:</h4>
                <p className="text-gray-700">
                  Conservamos sus datos mientras mantenga una cuenta activa y hasta 2 años después de la cancelación
                  para cumplir obligaciones legales.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900">Datos de Facturación:</h4>
                <p className="text-gray-700">Se conservan durante 6 años según la legislación fiscal española.</p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900">Datos de Marketing:</h4>
                <p className="text-gray-700">
                  Se eliminan inmediatamente cuando retira el consentimiento o cancela la suscripción.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900">Logs Técnicos:</h4>
                <p className="text-gray-700">Se conservan durante 12 meses para seguridad y resolución de problemas.</p>
              </div>
            </CardContent>
          </Card>

          {/* Derechos del Usuario */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span>👤</span>
                Sus Derechos (RGPD)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">Como usuario, tiene los siguientes derechos:</p>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-gray-900">🔍 Derecho de Acceso</h4>
                  <p className="text-sm text-gray-600">Conocer qué datos tenemos sobre usted</p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900">✏️ Derecho de Rectificación</h4>
                  <p className="text-sm text-gray-600">Corregir datos inexactos o incompletos</p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900">🗑️ Derecho de Supresión</h4>
                  <p className="text-sm text-gray-600">Solicitar la eliminación de sus datos</p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900">⏸️ Derecho de Limitación</h4>
                  <p className="text-sm text-gray-600">Restringir el procesamiento de datos</p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900">📦 Derecho de Portabilidad</h4>
                  <p className="text-sm text-gray-600">Recibir sus datos en formato estructurado</p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900">❌ Derecho de Oposición</h4>
                  <p className="text-sm text-gray-600">Oponerse al tratamiento por interés legítimo</p>
                </div>
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-900">¿Cómo ejercer sus derechos?</h4>
                <p className="text-blue-800 mt-2">
                  Envíe un email a <strong>privacy@digitaltsunamis.com</strong> con:
                </p>
                <ul className="list-disc list-inside mt-2 text-blue-700 text-sm">
                  <li>Copia de su DNI o documento de identidad</li>
                  <li>Descripción clara del derecho que desea ejercer</li>
                  <li>Dirección de email asociada a su cuenta</li>
                </ul>
                <p className="text-blue-700 text-sm mt-2">
                  <strong>Plazo de respuesta:</strong> Máximo 1 mes desde la recepción de la solicitud.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Seguridad */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span>🔒</span>
                Medidas de Seguridad
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">
                Implementamos medidas técnicas y organizativas apropiadas para proteger sus datos:
              </p>

              <div>
                <h4 className="font-semibold text-gray-900">Medidas Técnicas:</h4>
                <ul className="list-disc list-inside mt-2 text-gray-700">
                  <li>Cifrado SSL/TLS para todas las comunicaciones</li>
                  <li>Encriptación de contraseñas con bcrypt</li>
                  <li>Firewalls y sistemas de detección de intrusiones</li>
                  <li>Copias de seguridad automáticas y cifradas</li>
                  <li>Autenticación de dos factores disponible</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900">Medidas Organizativas:</h4>
                <ul className="list-disc list-inside mt-2 text-gray-700">
                  <li>Acceso limitado a datos personales (need-to-know)</li>
                  <li>Formación regular del personal en protección de datos</li>
                  <li>Auditorías de seguridad periódicas</li>
                  <li>Procedimientos de respuesta a incidentes</li>
                  <li>Contratos de confidencialidad con empleados</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Cookies */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span>🍪</span>
                Política de Cookies
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">Utilizamos cookies y tecnologías similares para mejorar su experiencia:</p>

              <div>
                <h4 className="font-semibold text-gray-900">Cookies Esenciales (Siempre Activas):</h4>
                <ul className="list-disc list-inside mt-2 text-gray-700">
                  <li>Autenticación y sesión de usuario</li>
                  <li>Preferencias de idioma y región</li>
                  <li>Carrito de compras y proceso de pago</li>
                  <li>Seguridad y prevención de fraude</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900">Cookies de Análisis (Con Consentimiento):</h4>
                <ul className="list-disc list-inside mt-2 text-gray-700">
                  <li>Google Analytics para estadísticas de uso</li>
                  <li>Vercel Analytics para rendimiento</li>
                  <li>Hotjar para análisis de comportamiento</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900">Cookies de Marketing (Con Consentimiento):</h4>
                <ul className="list-disc list-inside mt-2 text-gray-700">
                  <li>Seguimiento de conversiones</li>
                  <li>Personalización de anuncios</li>
                  <li>Remarketing en redes sociales</li>
                </ul>
              </div>

              <p className="text-sm text-gray-600 mt-4">
                Puede gestionar sus preferencias de cookies en cualquier momento desde la configuración de su navegador
                o contactando con nosotros.
              </p>
            </CardContent>
          </Card>

          {/* Menores de Edad */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span>👶</span>
                Menores de Edad
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                TravelDeals Pro está dirigido a usuarios mayores de 18 años. No recopilamos conscientemente datos
                personales de menores de 16 años sin el consentimiento parental verificable. Si tiene conocimiento de
                que un menor ha proporcionado datos personales, contacte inmediatamente con privacy@digitaltsunamis.com.
              </p>
            </CardContent>
          </Card>

          {/* Cambios en la Política */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span>🔄</span>
                Cambios en esta Política
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                Podemos actualizar esta política de privacidad ocasionalmente. Los cambios significativos serán
                notificados por email y/o mediante un aviso prominente en nuestra plataforma al menos 30 días antes de
                que entren en vigor. Le recomendamos revisar esta página periódicamente.
              </p>
            </CardContent>
          </Card>

          {/* Autoridad de Control */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span>🏛️</span>
                Autoridad de Control
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                Si considera que el tratamiento de sus datos personales infringe el RGPD, tiene derecho a presentar una
                reclamación ante la Agencia Española de Protección de Datos (AEPD):
              </p>
              <div className="mt-4 space-y-2">
                <p>
                  <strong>Web:</strong> www.aepd.es
                </p>
                <p>
                  <strong>Teléfono:</strong> 901 100 099
                </p>
                <p>
                  <strong>Dirección:</strong> C/ Jorge Juan, 6, 28001 Madrid
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Contacto */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span>📧</span>
                Contacto para Privacidad
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                Para cualquier consulta sobre esta política de privacidad o el tratamiento de sus datos personales:
              </p>
              <div className="mt-4 space-y-2">
                <p>
                  <strong>Email de Privacidad:</strong> privacy@digitaltsunamis.com
                </p>
                <p>
                  <strong>Delegado de Protección de Datos:</strong> dpo@digitaltsunamis.com
                </p>
                <p>
                  <strong>Dirección Postal:</strong> Digital Tsunami SL, Calle Ejemplo 123, 28001 Madrid
                </p>
                <p>
                  <strong>Teléfono:</strong> +34 900 000 000
                </p>
                <p>
                  <strong>Horario de Atención:</strong> Lunes a Viernes, 9:00 - 18:00 CET
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">✈️</span>
              <span className="text-lg font-semibold">TravelDeals Pro</span>
            </div>
            <div className="flex space-x-6 text-sm text-gray-600">
              <Link href="/privacy" className="hover:text-gray-900">
                Privacidad
              </Link>
              <Link href="/terms" className="hover:text-gray-900">
                Términos
              </Link>
              <Link href="/register" className="hover:text-gray-900">
                Registrarse
              </Link>
            </div>
          </div>
          <div className="mt-4 text-center text-sm text-gray-500">
            © 2024 Digital Tsunami SL. Todos los derechos reservados.
          </div>
        </footer>
      </div>
    </div>
  )
}
