'use client'
import { useForm } from "react-hook-form"
import Cookies from "js-cookie"
import { toast } from "sonner"
import { useState, useEffect } from "react"
import { FeiranteI } from "@/utils/types/feirantes"

type Inputs = {
  nome: string
  feirante_id: number
  preco: number
  quantidade: number
  foto: string
  categoria: string
}

function NovaMercadoria() {
  const [feirantes, setFeirantes] = useState<FeiranteI[]>([])
  const {
    register,
    handleSubmit,
    reset,
    setFocus
  } = useForm<Inputs>()

  useEffect(() => {
    async function getFeirantes() {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/feirantes`)
      const dados = await response.json()
      setFeirantes(dados)
    }
    getFeirantes()
    setFocus("nome")
  }, [setFocus])

  const optionsFeirante = feirantes.map(feirante => (
    <option key={feirante.id} value={feirante.id}>{feirante.nome}</option>
  ))

  async function incluirMercadoria(data: Inputs) {
    const novaMercadoria = {
      nome: data.nome,
      feirante_id: Number(data.feirante_id),
      preco: Number(data.preco),
      quantidade: Number(data.quantidade),
      foto: data.foto,
      categoria: data.categoria
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/mercadorias`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + Cookies.get("admin_logado_token") as string
        },
        body: JSON.stringify(novaMercadoria)
      },
    )

    if (response.status === 201) {
      toast.success("Ok! Mercadoria cadastrada com sucesso")
      reset()
    } else {
      try {
        const errorData = await response.json();
        console.error("Erro detalhado (JSON):", errorData);
        
        
        const primeiraMensagem = errorData.erro?.issues?.[0]?.message;

        if (primeiraMensagem) {
          toast.error(`Erro no cadastro: ${primeiraMensagem}`);
        } else {
          toast.error("Erro ao cadastrar. Verifique os dados e tente novamente.");
        }

      } catch {
        const errorText = await response.text();
        console.error("Erro detalhado (Texto):", errorText);
        toast.error("Erro no cadastro. Verifique o console do navegador para mais detalhes.");
      }
    }
  }

  return (
    <>
      <h1 className="mb-4 mt-24 text-2xl font-bold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl dark:text-white me-56">
        Inclusão de Mercadorias
      </h1>

      <form className="max-w-xl mx-auto" onSubmit={handleSubmit(incluirMercadoria)}>
        <div className="mb-3">
          <label htmlFor="nome" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Nome da Mercadoria</label>
          <input type="text" id="nome"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required
            {...register("nome")}
          />
        </div>
        <div className="grid gap-6 mb-3 md:grid-cols-2">
          <div className="mb-3">
            <label htmlFor="feirante_id" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Feirante</label>
            <select id="feirante_id"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required
              {...register("feirante_id")}
            >
              <option value="">Selecione um feirante</option>
              {optionsFeirante}
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="quantidade" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Quantidade (Kg, Un, etc)</label>
            <input type="number" id="quantidade" step="0.01"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required
              {...register("quantidade")}
            />
          </div>
        </div>
        <div className="grid gap-6 mb-3 md:grid-cols-2">
          <div className="mb-3">
            <label htmlFor="preco" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Preço R$</label>
            <input type="number" id="preco" step="0.01"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required
              {...register("preco")}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="foto" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              URL da Foto</label>
            <input type="text" id="foto"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required
              {...register("foto")}
            />
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="categoria" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Categoria</label>
          <select id="categoria"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required
            {...register("categoria")}
          >
            <option>FRUTAS</option>
            <option>LEGUMES</option>
            <option>VERDURAS</option>
            <option>TEMPEROS</option>
          </select>
        </div>

        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          Incluir</button>
      </form>
    </>
  )
}

export default NovaMercadoria