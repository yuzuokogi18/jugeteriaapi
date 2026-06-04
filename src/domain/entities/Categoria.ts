export interface Categoria {
  id: string;
  nombre: string;
  descripcion: string | null;
  activa: boolean;
  createdAt: Date;
  updatedAt: Date;
}