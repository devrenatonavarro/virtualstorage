"use client"

import * as React from "react"
import Image from "next/image"
import { Search, Filter, Grid, List } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"

// Datos de productos de ejemplo
const products = [
  {
    id: 1,
    name: "Camiseta Básica Blanca",
    price: 29.99,
    originalPrice: 39.99,
    category: "camisetas",
    size: ["S", "M", "L", "XL"],
    color: "Blanco",
    image: "/placeholder.svg?height=300&width=300",
    sale: true,
  },
  {
    id: 2,
    name: "Jeans Slim Fit Azul",
    price: 79.99,
    category: "pantalones",
    size: ["28", "30", "32", "34", "36"],
    color: "Azul",
    image: "/placeholder.svg?height=300&width=300",
    sale: false,
  },
  {
    id: 3,
    name: "Sneakers Deportivos",
    price: 89.99,
    category: "zapatos",
    size: ["38", "39", "40", "41", "42", "43"],
    color: "Negro",
    image: "/placeholder.svg?height=300&width=300",
    sale: false,
  },
  {
    id: 4,
    name: "Sudadera con Capucha",
    price: 59.99,
    originalPrice: 79.99,
    category: "sudaderas",
    size: ["S", "M", "L", "XL", "XXL"],
    color: "Gris",
    image: "/placeholder.svg?height=300&width=300",
    sale: true,
  },
  {
    id: 5,
    name: "Vestido Casual Floral",
    price: 49.99,
    category: "vestidos",
    size: ["XS", "S", "M", "L"],
    color: "Multicolor",
    image: "/placeholder.svg?height=300&width=300",
    sale: false,
  },
  {
    id: 6,
    name: "Chaqueta de Cuero",
    price: 149.99,
    category: "chaquetas",
    size: ["S", "M", "L", "XL"],
    color: "Negro",
    image: "/placeholder.svg?height=300&width=300",
    sale: false,
  },
  {
    id: 7,
    name: "Falda Plisada",
    price: 39.99,
    category: "faldas",
    size: ["XS", "S", "M", "L"],
    color: "Rosa",
    image: "/placeholder.svg?height=300&width=300",
    sale: false,
  },
  {
    id: 8,
    name: "Polo Clásico",
    price: 34.99,
    originalPrice: 44.99,
    category: "camisetas",
    size: ["S", "M", "L", "XL"],
    color: "Azul Marino",
    image: "/placeholder.svg?height=300&width=300",
    sale: true,
  },
  {
    id: 9,
    name: "Botas de Cuero",
    price: 119.99,
    category: "zapatos",
    size: ["38", "39", "40", "41", "42"],
    color: "Marrón",
    image: "/placeholder.svg?height=300&width=300",
    sale: false,
  },
]

const categories = ["camisetas", "pantalones", "zapatos", "sudaderas", "vestidos", "chaquetas", "faldas"]
const colors = ["Blanco", "Negro", "Azul", "Gris", "Rosa", "Marrón", "Azul Marino", "Multicolor"]

export default function ClothingStore({ title }: { title: string }) {
  const [searchTerm, setSearchTerm] = React.useState("")
  const [selectedCategory, setSelectedCategory] = React.useState("all")
  const [selectedColors, setSelectedColors] = React.useState<string[]>([])
  const [priceRange, setPriceRange] = React.useState([0, 200])
  const [sortBy, setSortBy] = React.useState("name")
  const [viewMode, setViewMode] = React.useState<"grid" | "list">("grid")

  // Filtrar productos
  const filteredProducts = React.useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === "all" || product.category === selectedCategory
      const matchesColor = selectedColors.length === 0 || selectedColors.includes(product.color)
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1]

      return matchesSearch && matchesCategory && matchesColor && matchesPrice
    })
  }, [searchTerm, selectedCategory, selectedColors, priceRange])

  // Ordenar productos
  const sortedProducts = React.useMemo(() => {
    const sorted = [...filteredProducts]
    switch (sortBy) {
      case "price-low":
        return sorted.sort((a, b) => a.price - b.price)
      case "price-high":
        return sorted.sort((a, b) => b.price - a.price)
      case "name":
        return sorted.sort((a, b) => a.name.localeCompare(b.name))
      default:
        return sorted
    }
  }, [filteredProducts, sortBy])

  const handleColorChange = (color: string, checked: boolean) => {
    if (checked) {
      setSelectedColors([...selectedColors, color])
    } else {
      setSelectedColors(selectedColors.filter((c) => c !== color))
    }
  }

  const clearFilters = () => {
    setSelectedCategory("all")
    setSelectedColors([])
    setPriceRange([0, 200])
    setSearchTerm("")
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-center mb-6">Tienda de <span className="capitalize">{ title }</span></h1>

          {/* Barra de búsqueda */}
          <div className="max-w-md mx-auto mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Buscar productos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Controles superiores */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Filtros móviles */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="sm:hidden bg-transparent">
                    <Filter className="h-4 w-4 mr-2" />
                    Filtros
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80">
                  <SheetHeader>
                    <SheetTitle>Filtros</SheetTitle>
                    <SheetDescription>Filtra los productos según tus preferencias</SheetDescription>
                  </SheetHeader>
                  <div className="mt-6 space-y-6">
                    <FilterContent
                      selectedCategory={selectedCategory}
                      setSelectedCategory={setSelectedCategory}
                      selectedColors={selectedColors}
                      handleColorChange={handleColorChange}
                      priceRange={priceRange}
                      setPriceRange={setPriceRange}
                      clearFilters={clearFilters}
                    />
                  </div>
                </SheetContent>
              </Sheet>

              <p className="text-sm text-muted-foreground">{sortedProducts.length} productos encontrados</p>
            </div>

            <div className="flex items-center gap-2">
              {/* Ordenar por */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Ordenar por" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Nombre</SelectItem>
                  <SelectItem value="price-low">Precio: Menor a Mayor</SelectItem>
                  <SelectItem value="price-high">Precio: Mayor a Menor</SelectItem>
                </SelectContent>
              </Select>

              {/* Vista */}
              <div className="flex border rounded-md">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="rounded-r-none"
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="rounded-l-none"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Sidebar de filtros (desktop) */}
          <div className="hidden sm:block w-64 space-y-6">
            <FilterContent
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              selectedColors={selectedColors}
              handleColorChange={handleColorChange}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              clearFilters={clearFilters}
            />
          </div>

          {/* Grid de productos */}
          <div className="flex-1">
            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {sortedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {sortedProducts.map((product) => (
                  <ProductListItem key={product.id} product={product} />
                ))}
              </div>
            )}

            {sortedProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No se encontraron productos que coincidan con los filtros.</p>
                <Button onClick={clearFilters} className="mt-4">
                  Limpiar filtros
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function FilterContent({
  selectedCategory,
  setSelectedCategory,
  selectedColors,
  handleColorChange,
  priceRange,
  setPriceRange,
  clearFilters,
}: {
  selectedCategory: string
  setSelectedCategory: (category: string) => void
  selectedColors: string[]
  handleColorChange: (color: string, checked: boolean) => void
  priceRange: number[]
  setPriceRange: (range: number[]) => void
  clearFilters: () => void
}) {
  return (
    <>
      <div>
        <Label className="text-base font-semibold">Categoría</Label>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="mt-2">
            <SelectValue placeholder="Seleccionar categoría" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas las categorías</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label className="text-base font-semibold">Color</Label>
        <div className="mt-2 space-y-2">
          {colors.map((color) => (
            <div key={color} className="flex items-center space-x-2">
              <Checkbox
                id={color}
                checked={selectedColors.includes(color)}
                onCheckedChange={(checked) => handleColorChange(color, checked as boolean)}
              />
              <Label htmlFor={color} className="text-sm font-normal">
                {color}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <Label className="text-base font-semibold">Precio</Label>
        <div className="mt-2 space-y-2">
          <Slider value={priceRange} onValueChange={setPriceRange} max={200} min={0} step={5} className="w-full" />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
        </div>
      </div>

      <Button onClick={clearFilters} variant="outline" className="w-full bg-transparent">
        Limpiar filtros
      </Button>
    </>
  )
}

function ProductCard({ product }: { product: (typeof products)[0] }) {
  return (
    <Card className="group cursor-pointer hover:shadow-lg transition-shadow">
      <CardContent className="p-0">
        <div className="relative overflow-hidden rounded-t-lg">
          <Image
            src="https://kzmp67bztaq917gt085v.lite.vusercontent.net/placeholder.svg?height=300&width=300"
            alt={product.name}
            width={300}
            height={300}
            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {product.sale && (
            <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 text-xs font-semibold rounded">
              OFERTA
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-lg mb-1 line-clamp-2">{product.name}</h3>
          <p className="text-sm text-muted-foreground mb-2">{product.color}</p>
          <div className="flex items-center gap-2">
            <span className="font-bold text-lg">${product.price}</span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">${product.originalPrice}</span>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button className="w-full">Agregar al carrito</Button>
      </CardFooter>
    </Card>
  )
}

function ProductListItem({ product }: { product: (typeof products)[0] }) {
  return (
    <Card className="cursor-pointer hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex gap-4">
          <div className="relative">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              width={120}
              height={120}
              className="w-24 h-24 object-cover rounded"
            />
            {product.sale && (
              <div className="absolute -top-1 -right-1 bg-red-500 text-white px-1 py-0.5 text-xs font-semibold rounded">
                OFERTA
              </div>
            )}
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
            <p className="text-sm text-muted-foreground mb-2">{product.color}</p>
            <div className="flex items-center gap-2 mb-3">
              <span className="font-bold text-lg">${product.price}</span>
              {product.originalPrice && (
                <span className="text-sm text-muted-foreground line-through">${product.originalPrice}</span>
              )}
            </div>
            <Button>Agregar al carrito</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
