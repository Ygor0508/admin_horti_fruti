import { MercadoriaI } from "./mercadorias"
import { UsuarioI } from "./usuarios"

export interface PedidoI {
  id: number
  quantidade: number
  status: string
  mercadoria_id: number
  mercadoria: MercadoriaI
  usuario_id: string
  usuario: UsuarioI
  createdAt: string
  updatedAt: string | null
}