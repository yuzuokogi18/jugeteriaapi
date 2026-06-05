export interface CreateProductoDto {
    categoriaId: string;
    nombre: string;
    descripcion?: string;
    precio: number;
    stock: number;
    edadRecomendada?: string;
    marca?: string;
    imagenUrl?: string;
}
export interface UpdateProductoDto {
    categoriaId?: string;
    nombre?: string;
    descripcion?: string;
    precio?: number;
    stock?: number;
    edadRecomendada?: string;
    marca?: string;
    imagenUrl?: string;
}
//# sourceMappingURL=producto.dto.d.ts.map