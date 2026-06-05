export interface Producto {
    id: string;
    categoriaId: string;
    nombre: string;
    descripcion: string | null;
    precio: number;
    stock: number;
    edadRecomendada: string | null;
    marca: string | null;
    imagenUrl: string | null;
    activo: boolean;
    createdAt: Date;
    updatedAt: Date;
}
//# sourceMappingURL=Producto.d.ts.map