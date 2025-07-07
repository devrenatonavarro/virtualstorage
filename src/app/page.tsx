"use client"

import * as React from "react"
import Image from "next/image"
import { Check, Star, ShoppingBag, Palette, Search, Smartphone, Users, Zap, ArrowRight, Play } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const features = [
  {
    icon: ShoppingBag,
    title: "Catálogo Completo",
    description: "Organiza y muestra todos tus productos de manera profesional con categorías intuitivas.",
  },
  {
    icon: Search,
    title: "Búsqueda Avanzada",
    description: "Tus clientes encontrarán exactamente lo que buscan con filtros inteligentes.",
  },
  {
    icon: Palette,
    title: "Diseño Personalizable",
    description: "Adapta los colores, fuentes y estilo para que coincida con tu marca.",
  },
  {
    icon: Smartphone,
    title: "100% Responsive",
    description: "Perfecto en cualquier dispositivo: móvil, tablet o desktop.",
  },
  {
    icon: Zap,
    title: "Carga Ultrarrápida",
    description: "Tecnología de última generación para una experiencia de usuario excepcional.",
  },
  {
    icon: Users,
    title: "Panel de Administración",
    description: "Gestiona productos, pedidos y clientes desde un panel intuitivo.",
  },
]

const testimonials = [
  {
    name: "María González",
    role: "Propietaria de Boutique Elegance",
    content:
      "Desde que implementamos este catálogo, nuestras ventas online aumentaron un 300%. La interfaz es increíble.",
    rating: 5,
    avatar: "/placeholder.svg?height=60&width=60",
  },
  {
    name: "Carlos Rodríguez",
    role: "Director de Moda Urbana",
    content:
      "El sistema de filtros es exactamente lo que necesitábamos. Nuestros clientes encuentran productos más rápido.",
    rating: 5,
    avatar: "/placeholder.svg?height=60&width=60",
  },
  {
    name: "Ana Martínez",
    role: "Fundadora de StyleCo",
    content: "La personalización es fantástica. Pudimos adaptar completamente el diseño a nuestra identidad de marca.",
    rating: 5,
    avatar: "/placeholder.svg?height=60&width=60",
  },
]

export default function LandingPage() {
  const [email, setEmail] = React.useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí iría la lógica para manejar el email
    console.log("Email submitted:", email)
    setEmail("")
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <ShoppingBag className="h-6 w-6 text-primary" />
            <span className="font-bold text-lg sm:text-xl">StyleCatalog</span>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <a href="#features" className="text-sm font-medium hover:text-primary transition-colors">
              Características
            </a>
            <a href="#testimonials" className="text-sm font-medium hover:text-primary transition-colors">
              Testimonios
            </a>
            <a href="#contact" className="text-sm font-medium hover:text-primary transition-colors">
              Contacto
            </a>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" className="hidden sm:flex">
              Iniciar Sesión
            </Button>
            <Button size="sm" className="text-xs sm:text-sm px-3 sm:px-4">
              Contactar
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-primary/5 via-background to-secondary/5 overflow-x-hidden">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge variant="secondary" className="w-fit">
                  🚀 Nuevo: IA para recomendaciones
                </Badge>
                <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                  El catálogo de ropa más <span className="text-primary">moderno</span> del mercado
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Transforma tu tienda de ropa con un catálogo digital que convierte visitantes en clientes. Diseño
                  profesional, filtros inteligentes y experiencia de compra excepcional.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="text-lg px-8"
                  onClick={() =>
                    window.open(
                      "https://wa.me/1234567890?text=Hola, me interesa el servicio de catálogo de ropa",
                      "_blank",
                    )
                  }
                >
                  Contactar por WhatsApp
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button variant="outline" size="lg" className="text-lg px-8 bg-transparent">
                  <Play className="mr-2 h-5 w-5" />
                  Ver Demo
                </Button>
              </div>

              <div className="flex items-center space-x-8 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span>14 días gratis</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span>Sin tarjeta de crédito</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span>Soporte 24/7</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative bg-white rounded-2xl shadow-2xl p-4 transform rotate-3 hover:rotate-0 transition-transform duration-300">
                <Image
                  src="/placeholder.svg?height=600&width=500"
                  alt="Catálogo de ropa demo"
                  width={500}
                  height={600}
                  className="rounded-lg w-full"
                />
                <div className="absolute -top-4 -right-4 bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-semibold">
                  ¡Nuevo!
                </div>
              </div>
              <div className="absolute -bottom-6 -left-6 bg-secondary text-secondary-foreground px-6 py-3 rounded-full text-sm font-medium shadow-lg">
                +300% ventas online
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <Badge variant="outline" className="w-fit mx-auto">
              Características
            </Badge>
            <h2 className="text-3xl lg:text-5xl font-bold">Todo lo que necesitas para vender más</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Herramientas profesionales diseñadas específicamente para tiendas de ropa modernas
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-background">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-4xl font-bold text-primary">10,000+</div>
              <div className="text-muted-foreground">Tiendas activas</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-primary">2M+</div>
              <div className="text-muted-foreground">Productos catalogados</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-primary">99.9%</div>
              <div className="text-muted-foreground">Tiempo de actividad</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-primary">24/7</div>
              <div className="text-muted-foreground">Soporte técnico</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="contact" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <Badge variant="outline" className="w-fit mx-auto">
              Testimonios
            </Badge>
            <h2 className="text-3xl lg:text-5xl font-bold">Lo que dicen nuestros clientes</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Miles de tiendas confían en nosotros para impulsar sus ventas online
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-lg bg-background">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-6 leading-relaxed">"{testimonial.content}"</p>
                  <div className="flex items-center space-x-3">
                    <Image
                      src={testimonial.avatar || "/placeholder.svg"}
                      alt={testimonial.name}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    <div>
                      <div className="font-semibold">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-3xl lg:text-5xl font-bold">¿Listo para transformar tu tienda?</h2>
            <p className="text-xl opacity-90 leading-relaxed">
              Únete a miles de tiendas que ya están vendiendo más con nuestro catálogo digital. Contáctanos por WhatsApp
              para una consulta personalizada gratuita.
            </p>

            <Button
              size="lg"
              variant="secondary"
              className="text-lg px-8"
              onClick={() =>
                window.open(
                  "https://wa.me/1234567890?text=Hola, quiero información sobre el catálogo de ropa digital",
                  "_blank",
                )
              }
            >
              Contactar por WhatsApp
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>

            <div className="flex items-center justify-center space-x-8 text-sm opacity-75">
              <div className="flex items-center space-x-2">
                <Check className="h-4 w-4" />
                <span>Consulta gratuita</span>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="h-4 w-4" />
                <span>Respuesta inmediata</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <ShoppingBag className="h-6 w-6 text-primary" />
                <span className="font-bold text-xl">StyleCatalog</span>
              </div>
              <p className="text-muted-foreground">La plataforma líder para catálogos de ropa digitales.</p>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold">Producto</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div>Características</div>
                <div>Contacto</div>
                <div>Integraciones</div>
                <div>API</div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold">Soporte</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div>Centro de Ayuda</div>
                <div>Documentación</div>
                <div>Contacto</div>
                <div>Estado del Sistema</div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold">Empresa</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div>Acerca de</div>
                <div>Blog</div>
                <div>Carreras</div>
                <div>Prensa</div>
              </div>
            </div>
          </div>

          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 StyleCatalog. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
