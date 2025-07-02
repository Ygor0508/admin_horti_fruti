import { FeiranteI } from "./feirantes"

export interface MercadoriaI {
  id: number
  nome: string
  preco: number
  quantidade: number
  categoria: string
  foto: string
  destaque: boolean
  feirante: FeiranteI 
  feirante_id: number
}
