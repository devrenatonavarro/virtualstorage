"use client"

import * as React from "react"
import Link from "next/link"
import { Eye, EyeOff, ShoppingBag, Mail, Lock, ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

export default function LoginPage() {
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [showPassword, setShowPassword] = React.useState(false)
  const [rememberMe, setRememberMe] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)
  const [errors, setErrors] = React.useState<{ email?: string; password?: string }>({})

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {}

    if (!email) {
      newErrors.email = "El email es requerido"
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "El email no es válido"
    }

    if (!password) {
      newErrors.password = "La contraseña es requerida"
    } else if (password.length < 6) {
      newErrors.password = "La contraseña debe tener al menos 6 caracteres"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)

    // Simular llamada a API
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))
      console.log("Login attempt:", { email, password, rememberMe })
      // Aquí iría la lógica real de autenticación
    } catch (error) {
      console.error("Login error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 flex flex-col justify-between">
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <Link
              href="/"
              className="inline-flex items-center space-x-2 text-primary hover:text-primary/80 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="text-sm">Volver al inicio</span>
            </Link>
            <div className="flex items-center justify-center space-x-2">
              <ShoppingBag className="h-8 w-8 text-primary" />
              <span className="font-bold text-2xl">StyleCatalog</span>
            </div>
            <p className="text-muted-foreground">Accede a tu cuenta</p>
          </div>

          {/* Login Card */}
          <Card className="shadow-xl border-0">
            <CardHeader className="space-y-1 text-center">
              <CardTitle className="text-2xl font-bold">Iniciar Sesión</CardTitle>
              <CardDescription>Ingresa tus credenciales para acceder a tu panel de administración</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Login Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="tu@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={`pl-10 ${errors.email ? "border-red-500" : ""}`}
                    />
                  </div>
                  {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Contraseña</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={`pl-10 pr-10 ${errors.password ? "border-red-500" : ""}`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="remember"
                      checked={rememberMe}
                      onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                    />
                    <Label htmlFor="remember" className="text-sm font-normal">
                      Recordarme
                    </Label>
                  </div>
                  <Link
                    href="/forgot-password"
                    className="text-sm text-primary hover:text-primary/80 transition-colors"
                  >
                    ¿Olvidaste tu contraseña?
                  </Link>
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent" />
                      Iniciando sesión...
                    </>
                  ) : (
                    "Iniciar Sesión"
                  )}
                </Button>
              </form>

              {/* Register Link */}
              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  ¿No tienes una cuenta?{" "}
                  <Link href="/register" className="text-primary hover:text-primary/80 font-medium transition-colors">
                    Regístrate aquí
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 text-center text-xs text-muted-foreground">
        <p>
          Al iniciar sesión, aceptas nuestros{" "}
          <Link href="/terms" className="text-primary hover:text-primary/80 transition-colors">
            Términos de Servicio
          </Link>{" "}
          y{" "}
          <Link href="/privacy" className="text-primary hover:text-primary/80 transition-colors">
            Política de Privacidad
          </Link>
        </p>
      </div>
    </div>
  )
}
