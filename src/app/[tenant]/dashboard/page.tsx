"use client"

import * as React from "react"
import Image from "next/image"
import {
  Plus,
  Search,
  MoreHorizontal,
  Edit,
  Trash2,
  ShoppingBag,
  Package,
  DollarSign,
  TrendingUp,
  Users,
  Bell,
  Settings,
  LogOut,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"

// Datos de ejemplo
const initialProducts = [
  {
    id: 1,
    name: "Camiseta Básica Blanca",
    price: 29.99,
    category: "Camisetas",
    stock: 45,
    status: "active",
    image: "/placeholder.svg?height=60&width=60",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Blanco"],
  },
  {
    id: 2,
    name: "Jeans Slim Fit",
    price: 79.99,
    category: "Pantalones",
    stock: 23,
    status: "active",
    image: "/placeholder.svg?height=60&width=60",
    sizes: ["28", "30", "32", "34"],
    colors: ["Azul"],
  },
  {
    id: 3,
    name: "Sneakers Deportivos",
    price: 89.99,
    category: "Zapatos",
    stock: 12,
    status: "low_stock",
    image: "/placeholder.svg?height=60&width=60",
    sizes: ["38", "39", "40", "41", "42"],
    colors: ["Negro", "Blanco"],
  },
]

const categories = ["Camisetas", "Pantalones", "Zapatos", "Sudaderas", "Vestidos", "Chaquetas", "Faldas"]
const sizes = ["XS", "S", "M", "L", "XL", "XXL", "28", "30", "32", "34", "36", "38", "39", "40", "41", "42", "43"]
const colors = ["Blanco", "Negro", "Azul", "Rojo", "Verde", "Amarillo", "Rosa", "Gris", "Marrón", "Multicolor"]

export default function Dashboard() {
  const [products, setProducts] = React.useState(initialProducts)
  const [searchTerm, setSearchTerm] = React.useState("")
  const [selectedCategory, setSelectedCategory] = React.useState("all")
  const [isAddProductOpen, setIsAddProductOpen] = React.useState(false)
  const [editingProduct, setEditingProduct] = React.useState<any>(null)

  // Formulario de producto
  const [formData, setFormData] = React.useState({
    name: "",
    price: "",
    category: "",
    stock: "",
    description: "",
    sizes: [] as string[],
    colors: [] as string[],
    image: "",
  })

  const filteredProducts = React.useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === "all" || product.category === selectedCategory
      return matchesSearch && matchesCategory
    })
  }, [products, searchTerm, selectedCategory])

  const stats = React.useMemo(() => {
    const totalProducts = products.length
    const totalStock = products.reduce((sum, product) => sum + product.stock, 0)
    const lowStockProducts = products.filter((product) => product.stock < 15).length
    const totalValue = products.reduce((sum, product) => sum + product.price * product.stock, 0)

    return {
      totalProducts,
      totalStock,
      lowStockProducts,
      totalValue,
    }
  }, [products])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const productData = {
      ...formData,
      id: editingProduct ? editingProduct.id : Date.now(),
      price: Number.parseFloat(formData.price),
      stock: Number.parseInt(formData.stock),
      status: Number.parseInt(formData.stock) < 15 ? "low_stock" : "active",
      image: formData.image || "/placeholder.svg?height=60&width=60",
    }

    if (editingProduct) {
      setProducts(products.map((p) => (p.id === editingProduct.id ? productData : p)))
    } else {
      setProducts([...products, productData])
    }

    resetForm()
  }

  const resetForm = () => {
    setFormData({
      name: "",
      price: "",
      category: "",
      stock: "",
      description: "",
      sizes: [],
      colors: [],
      image: "",
    })
    setEditingProduct(null)
    setIsAddProductOpen(false)
  }

  const handleEdit = (product: any) => {
    setEditingProduct(product)
    setFormData({
      name: product.name,
      price: product.price.toString(),
      category: product.category,
      stock: product.stock.toString(),
      description: product.description || "",
      sizes: product.sizes || [],
      colors: product.colors || [],
      image: product.image,
    })
    setIsAddProductOpen(true)
  }

  const handleDelete = (id: number) => {
    setProducts(products.filter((p) => p.id !== id))
  }

  const handleSizeChange = (size: string, checked: boolean) => {
    if (checked) {
      setFormData({ ...formData, sizes: [...formData.sizes, size] })
    } else {
      setFormData({ ...formData, sizes: formData.sizes.filter((s) => s !== size) })
    }
  }

  const handleColorChange = (color: string, checked: boolean) => {
    if (checked) {
      setFormData({ ...formData, colors: [...formData.colors, color] })
    } else {
      setFormData({ ...formData, colors: formData.colors.filter((c) => c !== color) })
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="h-6 w-6 text-primary" />
              <span className="font-bold text-xl">StyleCatalog</span>
            </div>
            <Badge variant="secondary">Dashboard</Badge>
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm">
              <Bell className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Settings className="h-4 w-4" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Users className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  Configuración
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  Cerrar Sesión
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Productos</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalProducts}</div>
              <p className="text-xs text-muted-foreground">productos en catálogo</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Stock Total</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalStock}</div>
              <p className="text-xs text-muted-foreground">unidades disponibles</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Stock Bajo</CardTitle>
              <Package className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-500">{stats.lowStockProducts}</div>
              <p className="text-xs text-muted-foreground">productos con poco stock</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Valor Inventario</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${stats.totalValue.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">valor total del inventario</p>
            </CardContent>
          </Card>
        </div>

        {/* Products Section */}
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <CardTitle>Productos</CardTitle>
                <CardDescription>Gestiona tu catálogo de productos</CardDescription>
              </div>

              <Dialog open={isAddProductOpen} onOpenChange={setIsAddProductOpen}>
                <DialogTrigger asChild>
                  <Button onClick={() => resetForm()}>
                    <Plus className="mr-2 h-4 w-4" />
                    Agregar Producto
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>{editingProduct ? "Editar Producto" : "Agregar Nuevo Producto"}</DialogTitle>
                    <DialogDescription>
                      {editingProduct
                        ? "Modifica los datos del producto"
                        : "Completa la información del nuevo producto"}
                    </DialogDescription>
                  </DialogHeader>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Nombre del Producto *</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Ej: Camiseta Básica"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="price">Precio *</Label>
                        <Input
                          id="price"
                          type="number"
                          step="0.01"
                          value={formData.price}
                          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                          placeholder="29.99"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="category">Categoría *</Label>
                        <Select
                          value={formData.category}
                          onValueChange={(value) => setFormData({ ...formData, category: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccionar categoría" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map((category) => (
                              <SelectItem key={category} value={category}>
                                {category}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="stock">Stock *</Label>
                        <Input
                          id="stock"
                          type="number"
                          value={formData.stock}
                          onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                          placeholder="50"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Descripción</Label>
                      <Textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        placeholder="Descripción del producto..."
                        rows={3}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="image">URL de Imagen</Label>
                      <Input
                        id="image"
                        value={formData.image}
                        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                        placeholder="https://ejemplo.com/imagen.jpg"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Tallas Disponibles</Label>
                      <div className="grid grid-cols-4 gap-2">
                        {sizes.map((size) => (
                          <div key={size} className="flex items-center space-x-2">
                            <Checkbox
                              id={`size-${size}`}
                              checked={formData.sizes.includes(size)}
                              onCheckedChange={(checked) => handleSizeChange(size, checked as boolean)}
                            />
                            <Label htmlFor={`size-${size}`} className="text-sm">
                              {size}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Colores Disponibles</Label>
                      <div className="grid grid-cols-3 gap-2">
                        {colors.map((color) => (
                          <div key={color} className="flex items-center space-x-2">
                            <Checkbox
                              id={`color-${color}`}
                              checked={formData.colors.includes(color)}
                              onCheckedChange={(checked) => handleColorChange(color, checked as boolean)}
                            />
                            <Label htmlFor={`color-${color}`} className="text-sm">
                              {color}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-end space-x-2">
                      <Button type="button" variant="outline" onClick={resetForm}>
                        Cancelar
                      </Button>
                      <Button type="submit">{editingProduct ? "Actualizar" : "Agregar"} Producto</Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Buscar productos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Todas las categorías" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas las categorías</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardHeader>

          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Producto</TableHead>
                    <TableHead>Categoría</TableHead>
                    <TableHead>Precio</TableHead>
                    <TableHead>Stock</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Image
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            width={40}
                            height={40}
                            className="rounded-md object-cover"
                          />
                          <div>
                            <div className="font-medium">{product.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {product.sizes?.join(", ")} • {product.colors?.join(", ")}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell>${product.price}</TableCell>
                      <TableCell>{product.stock}</TableCell>
                      <TableCell>
                        <Badge variant={product.status === "active" ? "default" : "destructive"}>
                          {product.status === "active" ? "Activo" : "Stock Bajo"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleEdit(product)}>
                              <Edit className="mr-2 h-4 w-4" />
                              Editar
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDelete(product.id)} className="text-red-600">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Eliminar
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {filteredProducts.length === 0 && (
                <div className="text-center py-12">
                  <Package className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">No se encontraron productos</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}