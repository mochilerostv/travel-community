"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Plane, CreditCard, Shield, ArrowLeft } from "lucide-react"
import Link from "next/link"

import { loadStripe } from "@stripe/stripe-js"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

export default function RegisterPage() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    preferredAirports: [],
    interests: [],
    paymentMethod: "card",
  })

  const airports = [
    { code: "MAD", name: "Madrid-Barajas", country: "España" },
    { code: "BCN", name: "Barcelona-El Prat", country: "España" },
    { code: "LHR", name: "Londres-Heathrow", country: "Reino Unido" },
    { code: "CDG", name: "París-Charles de Gaulle", country: "Francia" },
    { code: "FCO", name: "Roma-Fiumicino", country: "Italia" },
    { code: "AMS", name: "Ámsterdam-Schiphol", country: "Países Bajos" },
  ]

  const continents = ["Europa", "América del Norte", "América del Sur", "Asia", "África", "Oceanía"]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (step < 3) {
      setStep(step + 1)
    } else {
      try {
        // Create Stripe checkout session
        const response = await fetch("/api/create-checkout-session", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email,
            priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID,
            successUrl: `${window.location.origin}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
            cancelUrl: `${window.location.origin}/register`,
          }),
        })

        const { sessionId, url } = await response.json()

        if (url) {
          // Redirect to Stripe Checkout
          window.location.href = url
        } else {
          console.error("Error creating checkout session")
        }
      } catch (error) {
        console.error("Error processing payment:", error)
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="container mx-auto max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-4">
            <ArrowLeft className="h-4 w-4" />
            Volver al inicio
          </Link>
          <div className="flex items-center justify-center gap-2 mb-4">
            <Plane className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">TravelDeals Pro</h1>
          </div>
          <Badge className="bg-blue-100 text-blue-800">Paso {step} de 3</Badge>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Información Personal</span>
            <span className="text-sm text-gray-600">Preferencias</span>
            <span className="text-sm text-gray-600">Pago</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(step / 3) * 100}%` }}
            ></div>
          </div>
        </div>

        <Card className="shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">
              {step === 1 && "Crear tu Cuenta"}
              {step === 2 && "Personaliza tu Experiencia"}
              {step === 3 && "Finalizar Suscripción"}
            </CardTitle>
            <CardDescription>
              {step === 1 && "Ingresa tus datos básicos para comenzar"}
              {step === 2 && "Selecciona tus aeropuertos y destinos favoritos"}
              {step === 3 && "Completa tu suscripción por solo €1,99/mes"}
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Step 1: Personal Information */}
              {step === 1 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">Nombre</Label>
                      <Input
                        id="firstName"
                        type="text"
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Apellidos</Label>
                      <Input
                        id="lastName"
                        type="text"
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="password">Contraseña</Label>
                    <Input
                      id="password"
                      type="password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="confirmPassword">Confirmar Contraseña</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      required
                    />
                  </div>
                </div>
              )}

              {/* Step 2: Preferences */}
              {step === 2 && (
                <div className="space-y-6">
                  <div>
                    <Label className="text-base font-semibold">Aeropuertos de Salida Preferidos</Label>
                    <p className="text-sm text-gray-600 mb-3">
                      Selecciona hasta 3 aeropuertos desde donde sueles viajar
                    </p>
                    <div className="grid grid-cols-1 gap-2 max-h-48 overflow-y-auto">
                      {airports.map((airport) => (
                        <div key={airport.code} className="flex items-center space-x-2">
                          <Checkbox
                            id={airport.code}
                            checked={formData.preferredAirports.includes(airport.code)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setFormData({
                                  ...formData,
                                  preferredAirports: [...formData.preferredAirports, airport.code].slice(0, 3),
                                })
                              } else {
                                setFormData({
                                  ...formData,
                                  preferredAirports: formData.preferredAirports.filter((code) => code !== airport.code),
                                })
                              }
                            }}
                          />
                          <Label htmlFor={airport.code} className="text-sm">
                            <span className="font-medium">{airport.code}</span> - {airport.name}, {airport.country}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label className="text-base font-semibold">Continentes de Interés</Label>
                    <p className="text-sm text-gray-600 mb-3">¿A qué continentes te gusta viajar?</p>
                    <div className="grid grid-cols-2 gap-2">
                      {continents.map((continent) => (
                        <div key={continent} className="flex items-center space-x-2">
                          <Checkbox
                            id={continent}
                            checked={formData.interests.includes(continent)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setFormData({
                                  ...formData,
                                  interests: [...formData.interests, continent],
                                })
                              } else {
                                setFormData({
                                  ...formData,
                                  interests: formData.interests.filter((interest) => interest !== continent),
                                })
                              }
                            }}
                          />
                          <Label htmlFor={continent} className="text-sm">
                            {continent}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Payment */}
              {step === 3 && (
                <div className="space-y-6">
                  {/* Subscription Summary */}
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-blue-900 mb-2">Resumen de Suscripción</h3>
                    <div className="flex justify-between items-center">
                      <span className="text-blue-800">Membresía Premium (mensual)</span>
                      <span className="font-bold text-blue-900">€1,99</span>
                    </div>
                    <div className="text-sm text-blue-700 mt-2">
                      • Acceso a todas las ofertas premium • Alertas personalizadas • Comunidad exclusiva • Cancelación
                      en cualquier momento
                    </div>
                  </div>

                  {/* Payment Method */}
                  <div>
                    <Label className="text-base font-semibold">Método de Pago</Label>
                    <Select
                      value={formData.paymentMethod}
                      onValueChange={(value) => setFormData({ ...formData, paymentMethod: value })}
                    >
                      <SelectTrigger className="mt-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="card">
                          <div className="flex items-center gap-2">
                            <CreditCard className="h-4 w-4" />
                            Tarjeta de Crédito/Débito
                          </div>
                        </SelectItem>
                        <SelectItem value="paypal">PayPal</SelectItem>
                        <SelectItem value="apple">Apple Pay</SelectItem>
                        <SelectItem value="google">Google Pay</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Card Details */}
                  {formData.paymentMethod === "card" && (
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="cardNumber">Número de Tarjeta</Label>
                        <Input id="cardNumber" type="text" placeholder="1234 5678 9012 3456" required />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="expiry">Fecha de Vencimiento</Label>
                          <Input id="expiry" type="text" placeholder="MM/AA" required />
                        </div>
                        <div>
                          <Label htmlFor="cvv">CVV</Label>
                          <Input id="cvv" type="text" placeholder="123" required />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="cardName">Nombre en la Tarjeta</Label>
                        <Input id="cardName" type="text" placeholder="Como aparece en la tarjeta" required />
                      </div>
                    </div>
                  )}

                  {/* Security Notice */}
                  <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg">
                    <Shield className="h-5 w-5 text-green-600 mt-0.5" />
                    <div className="text-sm">
                      <p className="font-medium text-green-900">Pago 100% Seguro con Stripe</p>
                      <p className="text-green-700">Procesado por Stripe, líder mundial en pagos seguros</p>
                    </div>
                  </div>

                  {/* Terms */}
                  <div className="flex items-start space-x-2">
                    <Checkbox id="terms" required />
                    <Label htmlFor="terms" className="text-sm text-gray-600">
                      Acepto los{" "}
                      <Link href="#" className="text-blue-600 hover:underline">
                        términos y condiciones
                      </Link>{" "}
                      y la{" "}
                      <Link href="#" className="text-blue-600 hover:underline">
                        política de privacidad
                      </Link>
                    </Label>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-6">
                {step > 1 && (
                  <Button type="button" variant="outline" onClick={() => setStep(step - 1)}>
                    Anterior
                  </Button>
                )}
                <Button type="submit" className={`${step === 1 ? "w-full" : "ml-auto"}`}>
                  {step === 3 ? "Ir a Pago Seguro" : "Continuar"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Trust Indicators */}
        <div className="text-center mt-8 text-sm text-gray-600">
          <p>Garantía de devolución de 30 días • Cancela en cualquier momento • Soporte 24/7</p>
        </div>
      </div>
    </div>
  )
}
