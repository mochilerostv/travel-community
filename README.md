# TravelDeals Pro

Una plataforma de comunidad premium para ofertas de viajes con detección por IA.

## 🚀 Características

- 🤖 **Detección de ofertas con IA**: Encuentra errores de tarifa y chollos 24/7
- ✈️ **Ofertas de vuelos y hoteles**: Equipo humano valida cada oferta
- 💳 **Suscripciones con Stripe**: Premium (€1,99/mes) y Premium Plus (€2,49/mes)
- 🏨 **Comunidad premium**: Acceso exclusivo a grupo de viajeros
- 📱 **Responsive design**: Disponible en todas las plataformas

## 🛠️ Tecnologías

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Stripe, OpenAI
- **Base de datos**: PostgreSQL (Neon)
- **Pagos**: Stripe Checkout y Webhooks
- **Despliegue**: Vercel

## 📦 Instalación

1. **Clonar el repositorio**
\`\`\`bash
git clone <tu-repo>
cd traveldeals-pro
\`\`\`

2. **Instalar dependencias**
\`\`\`bash
npm install
\`\`\`

3. **Configurar variables de entorno**
\`\`\`bash
cp .env.example .env.local
\`\`\`

4. **Ejecutar en desarrollo**
\`\`\`bash
npm run dev
\`\`\`

## 🔧 Configuración

### Stripe

1. **Crear Productos**
   - Ve a [Stripe Dashboard](https://dashboard.stripe.com)
   - Crea productos para Premium (€1,99/mes) y Premium Plus (€2,49/mes)
   - Copia los Price IDs a `.env.local`

2. **Configurar Webhooks**
   - Endpoint: `https://tu-dominio.com/api/webhooks/stripe`
   - Eventos: `customer.subscription.created`, `customer.subscription.updated`, `customer.subscription.deleted`

### OpenAI

1. **Obtener API key**
   - Ve a [OpenAI](https://openai.com/)
   - Obtén tu API key
   - Añádela a `.env.local`

## 🌐 Despliegue

Despliega fácilmente en Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/tu-usuario/traveldeals-pro)

1. **Conectar repositorio**
\`\`\`bash
vercel --prod
\`\`\`

2. **Configurar variables de entorno en Vercel**
   - Ve a tu proyecto en Vercel Dashboard
   - Settings → Environment Variables
   - Añade todas las variables de `.env.example`

3. **Configurar dominio personalizado** (opcional)

## 📁 Estructura del Proyecto

\`\`\`
traveldeals-pro/
├── app/                    # Next.js App Router
│   ├── api/               # API Routes
│   ├── dashboard/         # Dashboard de usuario
│   ├── pricing/           # Página de precios
│   └── register/          # Registro de usuarios
├── components/            # Componentes React
│   └── ui/               # Componentes de UI (shadcn)
├── lib/                  # Utilidades y configuración
├── scripts/              # Scripts de base de datos
└── wordpress-plugin/     # Plugin de WordPress (opcional)
\`\`\`

## 🔑 Variables de Entorno

| Variable | Descripción | Requerida |
|----------|-------------|-----------|
| `NEXT_PUBLIC_BASE_URL` | URL base de la aplicación | ✅ |
| `STRIPE_SECRET_KEY` | Clave secreta de Stripe | ✅ |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Clave pública de Stripe | ✅ |
| `STRIPE_PREMIUM_PRICE_ID` | Price ID del plan Premium | ✅ |
| `STRIPE_PREMIUM_PLUS_PRICE_ID` | Price ID del plan Premium Plus | ✅ |
| `OPENAI_API_KEY` | Clave de OpenAI para IA | ✅ |
| `DATABASE_URL` | URL de PostgreSQL | ⚠️ |
| `AI_PROXY_TOKEN` | Token de seguridad | ✅ |

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## 🆘 Soporte

- 📧 Email: soporte@traveldeals.pro
- 💬 Telegram: @traveldeals_support
- 🌐 Web: https://traveldeals.pro

---

Hecho con ❤️ para la comunidad de viajeros
