'use client'
import { Dispatch, SetStateAction } from "react"
import { TiDeleteOutline } from "react-icons/ti"
import Cookies from "js-cookie"
import { UsuarioI } from "@/utils/types/usuarios"
import { toast } from "sonner"

interface ListaUsuarioProps {
  usuario: UsuarioI,
  usuarios: UsuarioI[],
  setUsuarios: Dispatch<SetStateAction<UsuarioI[]>>
}

function ItemUsuario({ usuario, usuarios, setUsuarios }: ListaUsuarioProps) {

  async function excluirUsuario() {
    if (confirm(`Confirma a exclusão do usuário "${usuario.nome}"?`)) {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/usuarios/${usuario.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-type": "application/json",
            Authorization: "Bearer " + Cookies.get("admin_logado_token") as string
          },
        },
      )

      if (response.status == 200) {
        const usuarios2 = usuarios.filter(x => x.id != usuario.id)
        setUsuarios(usuarios2)
        toast.success("Usuário excluído com sucesso")
      } else {
        toast.error("Erro... Usuário não foi excluído")
      }
    }
  }

  return (
    <tr key={usuario.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
      <td className="px-6 py-4 font-bold">
        {usuario.nome}
      </td>
      <td className="px-6 py-4">
        {usuario.email}
      </td>
      <td className="px-6 py-4">
        {usuario.endereco}
      </td>
      <td className="px-6 py-4">
        <TiDeleteOutline className="text-3xl text-red-600 inline-block cursor-pointer" title="Excluir"
          onClick={excluirUsuario} />
      </td>
    </tr>
  )
}

export default ItemUsuario