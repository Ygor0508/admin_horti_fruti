'use client'
import './page.css'
import { useEffect, useState } from "react";
import { VictoryPie, VictoryLabel, VictoryTheme } from "victory";

// Interfaces adaptadas para o novo contexto
interface GraficoMercadoriaItf {
  mercadoria: string
  num: number
}

interface GraficoUsuarioItf {
  endereco: string
  num: number
}

interface GeralDadosI {
  usuarios: number
  feirantes: number
  pedidos: number
}

export default function Principal() {
  const [mercadoriasFeirante, setMercadoriasFeirante] = useState<GraficoMercadoriaItf[]>([])
  const [usuariosEndereco, setUsuariosEndereco] = useState<GraficoUsuarioItf[]>([])
  const [dados, setDados] = useState<GeralDadosI>({} as GeralDadosI)

  useEffect(() => {
    // Busca dados gerais (usuários, feirantes, pedidos)
    async function getDadosGerais() {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/dashboard/gerais`)
      const dados = await response.json()
      setDados(dados)
    }
    getDadosGerais()

    // Busca dados para o gráfico de mercadorias
    async function getDadosGraficoMercadoria() {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/dashboard/feirantesMercadoria`)
      const dados = await response.json()
      setMercadoriasFeirante(dados)
    }
    getDadosGraficoMercadoria()

    // Busca dados para o gráfico de usuários por endereço
    async function getDadosGraficoUsuario() {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/dashboard/usuarioEndereco`)
      const dados = await response.json()
      setUsuariosEndereco(dados)
    }
    getDadosGraficoUsuario()

  }, [])

  // Adapta os dados para o formato do gráfico
  const listaMercadoriasFeirante = mercadoriasFeirante.map(item => (
    { x: item.mercadoria, y: item.num }
  ))

  const listaUsuariosEndereco = usuariosEndereco.map(item => (
    { x: item.endereco, y: item.num }
  ))

  return (
    <div className="container mt-24">
      <h2 className="text-3xl mb-4 font-bold">Visão Geral do Sistema</h2>

      <div className="w-2/3 flex justify-between mx-auto mb-5">
        <div className="border-blue-600 border rounded p-6 w-1/3 me-3">
          <span className="bg-blue-100 text-blue-800 text-xl text-center font-bold mx-auto block px-2.5 py-5 rounded dark:bg-blue-900 dark:text-blue-300">
            {dados.usuarios}</span>
          <p className="font-bold mt-2 text-center">Nº Usuários</p>
        </div>
        <div className="border-red-600 border rounded p-6 w-1/3 me-3">
          <span className="bg-red-100 text-red-800 text-xl text-center font-bold mx-auto block px-2.5 py-5 rounded dark:bg-red-900 dark:text-red-300">
            {dados.feirantes}</span>
          <p className="font-bold mt-2 text-center">Nº Feirantes</p>
        </div>
        <div className="border-green-600 border rounded p-6 w-1/3">
          <span className="bg-green-100 text-green-800 text-xl text-center font-bold mx-auto block px-2.5 py-5 rounded dark:bg-green-900 dark:text-green-300">
            {dados.pedidos}</span>
          <p className="font-bold mt-2 text-center">Nº Pedidos</p>
        </div>
      </div>

      <div className="div-graficos">
        <svg viewBox="30 55 400 400">
          <VictoryPie
            standalone={false}
            width={400}
            height={400}
            data={listaMercadoriasFeirante}
            innerRadius={50}
            labelRadius={80}
            theme={VictoryTheme.clean}
            style={{ labels: { fontSize: 10, fill: "#fff", fontFamily: "Arial", fontWeight: "bold" } }}
          />
          <VictoryLabel
            textAnchor="middle"
            style={{ fontSize: 12, fill: "#f00", fontFamily: "Arial", fontWeight: "bold" }}
            x={200}
            y={200}
            text={["Contagem de", "Mercadorias"]}
          />
        </svg>

        <svg viewBox="30 55 400 400">
          <VictoryPie
            standalone={false}
            width={400}
            height={400}
            data={listaUsuariosEndereco}
            innerRadius={50}
            labelRadius={80}
            theme={VictoryTheme.clean}
            style={{ labels: { fontSize: 10, fill: "#fff", fontFamily: "Arial", fontWeight: "bold" } }}
          />
          <VictoryLabel
            textAnchor="middle"
            style={{ fontSize: 12, fill: "#f00", fontFamily: "Arial", fontWeight: "bold" }}
            x={200}
            y={200}
            text={["Usuários", "por Endereço"]}
          />
        </svg>
      </div>
    </div>
  )
}