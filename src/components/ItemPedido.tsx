'use client'
import { Dispatch, SetStateAction } from "react"
import { TiDeleteOutline } from "react-icons/ti"
import { FaRegEdit } from "react-icons/fa"
import Cookies from "js-cookie"
import { PedidoI } from "@/utils/types/pedidos"
import { toast } from "sonner"

interface ListaPedidoProps {
  pedido: PedidoI,
  pedidos: PedidoI[],
  setPedidos: Dispatch<SetStateAction<PedidoI[]>>
}

function ItemPedido({ pedido, pedidos, setPedidos }: ListaPedidoProps) {

  async function excluirPedido() {
    if (confirm(`Confirma Exclusão do Pedido da mercadoria "${pedido.mercadoria.nome}"?`)) {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/pedidos/${pedido.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-type": "application/json",
            Authorization: "Bearer " + Cookies.get("admin_logado_token") as string
          },
        },
      )

      if (response.status == 200) {
        const pedidos2 = pedidos.filter(x => x.id != pedido.id)
        setPedidos(pedidos2)
        toast.success("Pedido excluído com sucesso")
      } else {
        toast.error("Erro... Pedido não foi excluído")
      }
    }
  }

  async function alterarStatus() {
    const novoStatus = prompt(`Novo status para o pedido de "${pedido.mercadoria.nome}" (Ex: EM_ROTA, ENTREGUE):`, pedido.status)

    if (novoStatus == null || novoStatus.trim() == "") {
      return
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/pedidos/status/${pedido.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + Cookies.get("admin_logado_token") as string
        },
        body: JSON.stringify({ status: novoStatus.toUpperCase() })
      },
    )

    if (response.status == 200) {
      const pedidos2 = pedidos.map(x => {
        if (x.id == pedido.id) {
          return { ...x, status: novoStatus.toUpperCase() }
        }
        return x
      })
      setPedidos(pedidos2)
      toast.success("Status do pedido alterado com sucesso!")
    } else {
      toast.error("Erro ao alterar status do pedido.")
    }
  }

  return (
    <tr key={pedido.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
      <td className={"px-6 py-4 font-bold"}>
        {pedido.mercadoria.nome}
      </td>
      <td className={"px-6 py-4"}>
        {Number(pedido.mercadoria.preco).toLocaleString("pt-br", { minimumFractionDigits: 2 })}
      </td>
      <td className={`px-6 py-4`}>
        {pedido.usuario.nome}
      </td>
      <td className={`px-6 py-4`}>
        {Number(pedido.quantidade)}
      </td>
      <td className={`px-6 py-4`}>
        {pedido.status}
      </td>
      <td className="px-6 py-4">
        <TiDeleteOutline className="text-3xl text-red-600 inline-block cursor-pointer" title="Excluir"
          onClick={excluirPedido} />&nbsp;
        <FaRegEdit className="text-3xl text-yellow-600 inline-block cursor-pointer" title="Alterar Status"
          onClick={alterarStatus} />
      </td>
    </tr>
  )
}

export default ItemPedido