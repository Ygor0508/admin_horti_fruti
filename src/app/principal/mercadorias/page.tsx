'use client'
import { useEffect, useState } from "react"
import Link from 'next/link'

import ItemMercadoria from '@/components/ItemMercadoria'
import { MercadoriaI } from "@/utils/types/mercadorias"

function CadMercadorias() {
  const [mercadorias, setMercadorias] = useState<MercadoriaI[]>([])

  useEffect(() => {
    async function getMercadorias() {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/mercadorias`)
      const dados = await response.json()
      setMercadorias(dados)
    }
    getMercadorias()
  }, [])

  const listaMercadorias = mercadorias.map(mercadoria => (
    <ItemMercadoria key={mercadoria.id} mercadoria={mercadoria} mercadorias={mercadorias} setMercadorias={setMercadorias} />
  ))

  return (
    <div className='m-4 mt-24'>
      <div className='flex justify-between'>
        <h1 className="mb-4 text-2xl font-bold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl dark:text-white">
          Cadastro de Mercadorias
        </h1>
        <Link href="mercadorias/novo"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-bold rounded-lg text-md px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
          Nova Mercadoria
        </Link>
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">Foto</th>
              <th scope="col" className="px-6 py-3">Nome da Mercadoria</th>
              <th scope="col" className="px-6 py-3">Feirante</th>
              <th scope="col" className="px-6 py-3">Quantidade</th>
              <th scope="col" className="px-6 py-3">Preço R$</th>
              <th scope="col" className="px-6 py-3">Ações</th>
            </tr>
          </thead>
          <tbody>
            {listaMercadorias}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default CadMercadorias