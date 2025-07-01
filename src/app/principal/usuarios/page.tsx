'use client'
import { useEffect, useState } from "react"
import ItemUsuario from '@/components/ItemUsuario'
import { UsuarioI } from "@/utils/types/usuarios"

function CadUsuarios() {
  const [usuarios, setUsuarios] = useState<UsuarioI[]>([])

  useEffect(() => {
    async function getUsuarios() {
      // Certifique-se que você tem uma rota /usuarios no seu backend
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/usuarios`)
      const dados = await response.json()
      setUsuarios(dados)
    }
    getUsuarios()
  }, [])

  const listaUsuarios = usuarios.map(usuario => (
    <ItemUsuario key={usuario.id} usuario={usuario} usuarios={usuarios} setUsuarios={setUsuarios} />
  ))

  return (
    <div className='m-4 mt-24'>
      <div className='flex justify-between'>
        <h1 className="mb-4 text-2xl font-bold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl dark:text-white">
          Controle de Usuários
        </h1>
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">Nome do Usuário</th>
              <th scope="col" className="px-6 py-3">E-mail</th>
              <th scope="col" className="px-6 py-3">Endereço</th>
              <th scope="col" className="px-6 py-3">Ações</th>
            </tr>
          </thead>
          <tbody>
            {listaUsuarios}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default CadUsuarios