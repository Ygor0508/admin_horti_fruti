import { MercadoriaI } from "./mercadorias"
import { UsuarioI } from "./usuarios"

export interface PedidoI {
  id: number
  quantidade: number
  status: string
  mercadoria_id: number
  mercadoria: MercadoriaI // Dados da mercadoria aninhados
  usuario_id: string
  usuario: UsuarioI // Dados do usuário aninhados
  createdAt: string
  updatedAt: string | null
}