'use client'
import { Dispatch, SetStateAction } from "react"
import { TiDeleteOutline } from "react-icons/ti"
import { FaRegStar } from "react-icons/fa"
import Cookies from "js-cookie"
import { MercadoriaI } from "@/utils/types/mercadorias"
import { toast } from "sonner"
import Image from "next/image"

interface ListaMercadoriaProps {
  mercadoria: MercadoriaI,
  mercadorias: MercadoriaI[],
  setMercadorias: Dispatch<SetStateAction<MercadoriaI[]>>
}

function ItemMercadoria({ mercadoria, mercadorias, setMercadorias }: ListaMercadoriaProps) {

  async function excluirMercadoria() {

    if (confirm(`Confirma a exclusão da mercadoria "${mercadoria.nome}"?`)) {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/mercadorias/${mercadoria.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-type": "application/json",
            Authorization: "Bearer " + Cookies.get("admin_logado_token") as string
          },
        },
      )

      if (response.status == 200) {
        const mercadorias2 = mercadorias.filter(x => x.id != mercadoria.id)
        setMercadorias(mercadorias2)
        toast.success("Mercadoria excluída com sucesso")
      } else {
        toast.error("Erro... Mercadoria não foi excluída")
      }
    }
  }

  async function alterarDestaque() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/mercadorias/destacar/${mercadoria.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + Cookies.get("admin_logado_token") as string
        },
      },
    )

    if (response.status == 200) {
      const mercadorias2 = mercadorias.map(x => {
        if (x.id == mercadoria.id) {
          return { ...x, destaque: !x.destaque }
        }
        return x
      })
      setMercadorias(mercadorias2)
    }
  }

  return (
    <tr key={mercadoria.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        <Image src={mercadoria.foto} alt="Foto da Mercadoria"
          width={200} height={200} />
      </th>
      <td className={`px-6 py-4 ${mercadoria.destaque ? "font-extrabold" : ""}`}>
        {mercadoria.nome}
      </td>
      <td className={`px-6 py-4 ${mercadoria.destaque ? "font-extrabold" : ""}`}>
        {mercadoria.feirante.nome}
      </td>
      <td className={`px-6 py-4 ${mercadoria.destaque ? "font-extrabold" : ""}`}>
        {mercadoria.quantidade}
      </td>
      <td className={`px-6 py-4 ${mercadoria.destaque ? "font-extrabold" : ""}`}>
        {Number(mercadoria.preco).toLocaleString("pt-br", { minimumFractionDigits: 2 })}
      </td>
      <td className="px-6 py-4">
        <TiDeleteOutline className="text-3xl text-red-600 inline-block cursor-pointer" title="Excluir"
          onClick={excluirMercadoria} />&nbsp;
        <FaRegStar className="text-3xl text-yellow-600 inline-block cursor-pointer" title="Destacar"
          onClick={alterarDestaque} />
      </td>
    </tr>
  )
}

export default ItemMercadoria