import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function TermsPage() {
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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Términos de Uso</h1>
          <p className="text-xl text-gray-600">Última actualización: {new Date().toLocaleDateString("es-ES")}</p>
        </div>

        <div className="space-y-8">
          {/* Información de la Empresa */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span>🏢</span>
                Información de la Empresa
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-900">Responsable del Servicio:</h4>
                <p className="text-gray-700">
                  <strong>Digital Tsunami SL</strong>
                  <br />
                  CIF: B-12345678
                  <br />
                  Domicilio: Calle Ejemplo 123, 28001 Madrid, España
                  <br />
                  Email: legal@digitaltsunamis.com
                  <br />
                  Teléfono: +34 900 000 000
                </p>
              </div>
              <p className="text-gray-600">
                Digital Tsunami SL opera la plataforma TravelDeals Pro, una comunidad premium especializada en ofertas
                de viaje y errores de tarifa.
              </p>
            </CardContent>
          </Card>

          {/* Aceptación de Términos */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span>✅</span>
                Aceptación de Términos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                Al acceder y utilizar TravelDeals Pro, usted acepta estar sujeto a estos términos de uso. Si no está de
                acuerdo con alguna parte de estos términos, no debe utilizar nuestro servicio.
              </p>
            </CardContent>
          </Card>

          {/* Descripción del Servicio */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span>🌍</span>
                Descripción del Servicio
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">TravelDeals Pro es una plataforma de suscripción que proporciona:</p>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Acceso a ofertas exclusivas de vuelos y hoteles</li>
                <li>Notificaciones de errores de tarifa verificados</li>
                <li>Comunidad premium en Telegram</li>
                <li>Alertas personalizadas por destino</li>
                <li>Análisis con inteligencia artificial</li>
              </ul>
            </CardContent>
          </Card>

          {/* Planes de Suscripción */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span>💳</span>
                Planes de Suscripción
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-900">Plan Premium - €1,99/mes</h4>
                <ul className="list-disc list-inside mt-2 text-gray-700">
                  <li>Acceso a todas las ofertas verificadas</li>
                  <li>Comunidad Telegram exclusiva</li>
                  <li>Alertas básicas por email</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Plan Premium Plus - €2,49/mes</h4>
                <ul className="list-disc list-inside mt-2 text-gray-700">
                  <li>Todo lo incluido en Premium</li>
                  <li>Alertas personalizadas avanzadas</li>
                  <li>Análisis IA de tendencias</li>
                  <li>Soporte prioritario</li>
                </ul>
              </div>
              <p className="text-sm text-gray-600">
                Los precios incluyen IVA. La facturación es mensual y se renueva automáticamente.
              </p>
            </CardContent>
          </Card>

          {/* Política de Reembolso */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span>💰</span>
                Política de Reembolso
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">
                Ofrecemos una <strong>garantía de devolución de 30 días</strong> para nuevos suscriptores:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Reembolso completo si cancela dentro de los primeros 30 días</li>
                <li>Proceso de reembolso en 5-10 días hábiles</li>
                <li>Sin preguntas ni penalizaciones</li>
                <li>Contacte a soporte@digitaltsunamis.com para solicitar reembolso</li>
              </ul>
            </CardContent>
          </Card>

          {/* Uso Aceptable */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span>⚖️</span>
                Uso Aceptable
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">Al usar nuestro servicio, usted se compromete a:</p>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>No compartir su acceso con terceros</li>
                <li>No revender o redistribuir nuestro contenido</li>
                <li>Mantener un comportamiento respetuoso en la comunidad</li>
                <li>No usar bots o automatización para acceder al servicio</li>
                <li>Cumplir con las normas de la comunidad Telegram</li>
              </ul>
              <p className="text-sm text-gray-600 mt-4">
                El incumplimiento puede resultar en la suspensión inmediata de la cuenta sin reembolso.
              </p>
            </CardContent>
          </Card>

          {/* Ofertas y Disponibilidad */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span>🎯</span>
                Ofertas y Disponibilidad
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">
                <strong>Importante:</strong> Digital Tsunami SL actúa como intermediario informativo:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Las ofertas son proporcionadas por terceros (aerolíneas, agencias)</li>
                <li>Los precios pueden cambiar sin previo aviso</li>
                <li>La disponibilidad está sujeta a las condiciones del proveedor</li>
                <li>No garantizamos la disponibilidad de ninguna oferta específica</li>
                <li>Verificamos las ofertas, pero no controlamos su duración</li>
              </ul>
            </CardContent>
          </Card>

          {/* Limitación de Responsabilidad */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span>⚠️</span>
                Limitación de Responsabilidad
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">Digital Tsunami SL no se hace responsable de:</p>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Cambios en precios o disponibilidad de ofertas</li>
                <li>Problemas con reservas realizadas con terceros</li>
                <li>Interrupciones temporales del servicio</li>
                <li>Decisiones de viaje basadas en nuestra información</li>
                <li>Pérdidas indirectas o consecuenciales</li>
              </ul>
              <p className="text-sm text-gray-600 mt-4">
                Nuestra responsabilidad máxima se limita al importe de la suscripción mensual.
              </p>
            </CardContent>
          </Card>

          {/* Propiedad Intelectual */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span>©️</span>
                Propiedad Intelectual
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                Todo el contenido de TravelDeals Pro, incluyendo textos, gráficos, logos, análisis IA y software, es
                propiedad de Digital Tsunami SL y está protegido por las leyes de propiedad intelectual españolas e
                internacionales.
              </p>
            </CardContent>
          </Card>

          {/* Modificaciones */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span>🔄</span>
                Modificaciones de los Términos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                Digital Tsunami SL se reserva el derecho de modificar estos términos en cualquier momento. Los cambios
                serán notificados por email y/o en la plataforma con al menos 30 días de antelación. El uso continuado
                del servicio constituye aceptación de los nuevos términos.
              </p>
            </CardContent>
          </Card>

          {/* Ley Aplicable */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span>⚖️</span>
                Ley Aplicable y Jurisdicción
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                Estos términos se rigen por la legislación española. Para cualquier disputa, las partes se someten a la
                jurisdicción de los tribunales de Madrid, España, renunciando expresamente a cualquier otro fuero que
                pudiera corresponderles.
              </p>
            </CardContent>
          </Card>

          {/* Contacto */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span>📧</span>
                Contacto
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">Para cualquier consulta sobre estos términos, contacte con nosotros:</p>
              <div className="mt-4 space-y-2">
                <p>
                  <strong>Email:</strong> legal@digitaltsunamis.com
                </p>
                <p>
                  <strong>Soporte:</strong> soporte@digitaltsunamis.com
                </p>
                <p>
                  <strong>Teléfono:</strong> +34 900 000 000
                </p>
                <p>
                  <strong>Horario:</strong> Lunes a Viernes, 9:00 - 18:00 CET
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
