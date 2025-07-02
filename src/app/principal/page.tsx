// 'use client'
// import './page.css'
// import { useEffect, useState } from "react";
// import { VictoryPie, VictoryLabel, VictoryTheme } from "victory";

// // Interfaces adaptadas para o novo contexto
// interface GraficoMercadoriaItf {
//   mercadoria: string
//   num: number
// }

// interface GraficoUsuarioItf {
//   endereco: string
//   num: number
// }

// interface GeralDadosI {
//   usuarios: number
//   feirantes: number
//   pedidos: number
// }

// export default function Principal() {
//   const [mercadoriasFeirante, setMercadoriasFeirante] = useState<GraficoMercadoriaItf[]>([])
//   const [usuariosEndereco, setUsuariosEndereco] = useState<GraficoUsuarioItf[]>([])
//   const [dados, setDados] = useState<GeralDadosI>({} as GeralDadosI)

//   useEffect(() => {
//     // Busca dados gerais (usuários, feirantes, pedidos)
//     async function getDadosGerais() {
//       const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/dashboard/gerais`)
//       const dados = await response.json()
//       setDados(dados)
//     }
//     getDadosGerais()

//     // Busca dados para o gráfico de mercadorias
//     async function getDadosGraficoMercadoria() {
//       const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/dashboard/feirantesMercadoria`)
//       const dados = await response.json()
//       setMercadoriasFeirante(dados)
//     }
//     getDadosGraficoMercadoria()

//     // Busca dados para o gráfico de usuários por endereço
//     async function getDadosGraficoUsuario() {
//       const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/dashboard/usuarioEndereco`)
//       const dados = await response.json()
//       setUsuariosEndereco(dados)
//     }
//     getDadosGraficoUsuario()

//   }, [])

//   // Adapta os dados para o formato do gráfico
//   const listaMercadoriasFeirante = mercadoriasFeirante.map(item => (
//     { x: item.mercadoria, y: item.num }
//   ))

//   const listaUsuariosEndereco = usuariosEndereco.map(item => (
//     { x: item.endereco, y: item.num }
//   ))

//   return (
//     <div className="container mt-24">
//       <h2 className="text-3xl mb-4 font-bold">Visão Geral do Sistema</h2>

//       <div className="w-2/3 flex justify-between mx-auto mb-5">
//         <div className="border-blue-600 border rounded p-6 w-1/3 me-3">
//           <span className="bg-blue-100 text-blue-800 text-xl text-center font-bold mx-auto block px-2.5 py-5 rounded dark:bg-blue-900 dark:text-blue-300">
//             {dados.usuarios}</span>
//           <p className="font-bold mt-2 text-center">Nº Usuários</p>
//         </div>
//         <div className="border-red-600 border rounded p-6 w-1/3 me-3">
//           <span className="bg-red-100 text-red-800 text-xl text-center font-bold mx-auto block px-2.5 py-5 rounded dark:bg-red-900 dark:text-red-300">
//             {dados.feirantes}</span>
//           <p className="font-bold mt-2 text-center">Nº Feirantes</p>
//         </div>
//         <div className="border-green-600 border rounded p-6 w-1/3">
//           <span className="bg-green-100 text-green-800 text-xl text-center font-bold mx-auto block px-2.5 py-5 rounded dark:bg-green-900 dark:text-green-300">
//             {dados.pedidos}</span>
//           <p className="font-bold mt-2 text-center">Nº Pedidos</p>
//         </div>
//       </div>

//       <div className="div-graficos">
//         <svg viewBox="30 55 400 400">
//           <VictoryPie
//             standalone={false}
//             width={400}
//             height={400}
//             data={listaMercadoriasFeirante}
//             innerRadius={50}
//             labelRadius={80}
//             theme={VictoryTheme.clean}
//             style={{ labels: { fontSize: 10, fill: "#fff", fontFamily: "Arial", fontWeight: "bold" } }}
//           />
//           <VictoryLabel
//             textAnchor="middle"
//             style={{ fontSize: 12, fill: "#f00", fontFamily: "Arial", fontWeight: "bold" }}
//             x={200}
//             y={200}
//             text={["Contagem de", "Mercadorias"]}
//           />
//         </svg>

//         <svg viewBox="30 55 400 400">
//           <VictoryPie
//             standalone={false}
//             width={400}
//             height={400}
//             data={listaUsuariosEndereco}
//             innerRadius={50}
//             labelRadius={80}
//             theme={VictoryTheme.clean}
//             style={{ labels: { fontSize: 10, fill: "#fff", fontFamily: "Arial", fontWeight: "bold" } }}
//           />
//           <VictoryLabel
//             textAnchor="middle"
//             style={{ fontSize: 12, fill: "#f00", fontFamily: "Arial", fontWeight: "bold" }}
//             x={200}
//             y={200}
//             text={["Usuários", "por Endereço"]}
//           />
//         </svg>
//       </div>
//     </div>
//   )
// }





// 'use client'
// import { useEffect, useState } from "react";
// import { VictoryPie, VictoryChart, VictoryBar, VictoryTheme, VictoryAxis, VictoryLabel } from "victory";
// import { Users, Store, ShoppingBag } from "lucide-react";

// // Interfaces para os dados da API
// interface MercadoriaPorCategoria {
//   categoria: string;
//   quantidade: number;
// }
// interface UsuarioPorBairro {
//   bairro: string;
//   quantidade: number;
// }
// interface Stats {
//   totalUsuarios: number;
//   totalFeirantes: number;
//   totalPedidos: number;
// }

// // Componente para os Cards de Estatísticas
// function StatCard({ title, value, icon, change, colorClass }: { title: string, value: number, icon: React.ReactNode, change: string, colorClass: string }) {
//   return (
//     <div className="bg-white p-6 rounded-xl shadow-md flex justify-between items-center transition-transform transform hover:-translate-y-1">
//       <div>
//         <p className="text-gray-500">{title}</p>
//         <p className="text-3xl font-bold text-gray-800">{value?.toLocaleString('pt-BR') || 0}</p>
//       </div>
//       <div className="flex flex-col items-end">
//         <div className={`p-3 rounded-lg ${colorClass}`}>
//           {icon}
//         </div>
//         <span className="text-green-500 text-sm mt-1 font-semibold">{change}</span>
//       </div>
//     </div>
//   );
// }

// export default function Principal() {
//   const [stats, setStats] = useState<Stats>({} as Stats);
//   const [mercadorias, setMercadorias] = useState<MercadoriaPorCategoria[]>([]);
//   const [usuarios, setUsuarios] = useState<UsuarioPorBairro[]>([]);

//   useEffect(() => {
//     // Busca os dados das 3 rotas da API
//     async function fetchData() {
//       try {
//         // Stats
//         const statsRes = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/dashboard/stats`);
//         if (statsRes.ok) {
//             const statsData = await statsRes.json();
//             setStats(statsData);
//         }

//         // Mercadorias
//         const mercadoriasRes = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/dashboard/mercadorias-por-categoria`);
//         if (mercadoriasRes.ok) {
//             const mercadoriasData = await mercadoriasRes.json();
//             setMercadorias(mercadoriasData);
//         }

//         // Usuários
//         const usuariosRes = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/dashboard/usuarios-por-bairro`);
//         if (usuariosRes.ok) {
//             const usuariosData = await usuariosRes.json();
//             setUsuarios(usuariosData);
//         }
//       } catch (error) {
//           console.error("Falha ao buscar dados do dashboard:", error);
//       }
//     }
//     fetchData();
//   }, []);

//   // Formata os dados para os gráficos Victory
//   const mercadoriasChartData = mercadorias.map(m => ({ x: m.categoria, y: m.quantidade }));
//   const usuariosChartData = usuarios.map(u => ({ x: u.bairro, y: u.quantidade }));

//   return (
//     <div>
//       <h1 className="text-3xl font-bold text-gray-800">Visão Geral do Sistema</h1>
//       <p className="text-gray-500 mt-1">Dashboard administrativo com métricas e relatórios em tempo real</p>

//       {/* Cards de Estatísticas */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
//         <StatCard title="Nº Usuários" value={stats.totalUsuarios} icon={<Users className="text-blue-600" />} change="+12%" colorClass="bg-blue-100" />
//         <StatCard title="Nº Feirantes" value={stats.totalFeirantes} icon={<Store className="text-red-600" />} change="+8%" colorClass="bg-red-100" />
//         <StatCard title="Nº Pedidos" value={stats.totalPedidos} icon={<ShoppingBag className="text-green-600" />} change="+23%" colorClass="bg-green-100" />
//       </div>

//       {/* Gráficos */}
//       <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mt-8">
//         <div className="lg:col-span-3 bg-white p-6 rounded-xl shadow-md">
//           <h3 className="text-lg font-semibold text-gray-700 mb-4">Contagem de Mercadorias</h3>
//           <VictoryChart
//             theme={VictoryTheme.material}
//             domainPadding={{ x: 30 }}
//             padding={{ top: 20, bottom: 60, left: 50, right: 30 }}
//             height={300}
//           >
//             <VictoryAxis
//               tickLabelComponent={<VictoryLabel angle={-45} textAnchor="end" />}
//               style={{ tickLabels: { fontSize: 10, padding: 5 } }}
//             />
//             <VictoryAxis dependentAxis tickFormat={(tick) => `${tick}`} />
//             <VictoryBar
//               data={mercadoriasChartData}
//               style={{ data: { fill: "#2563eb" } }}
//               animate={{ duration: 500 }}
//               barWidth={35}
//             />
//           </VictoryChart>
//         </div>

//         <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-md flex flex-col items-center">
//           <h3 className="text-lg font-semibold text-gray-700 mb-4">Usuários por Bairro</h3>
//           <VictoryPie
//             data={usuariosChartData}
//             colorScale={["#2563eb", "#16a34a", "#f97316", "#ef4444", "#9333ea"]}
//             innerRadius={70}
//             labelRadius={90}
//             style={{ labels: { fill: "white", fontSize: 12, fontWeight: "bold" } }}
//             animate={{ duration: 500 }}
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

'use client'
import { useEffect, useState } from "react";
import { VictoryPie, VictoryChart, VictoryBar, VictoryTheme, VictoryAxis, VictoryLabel } from "victory";
import { Users, Store, ShoppingBag } from "lucide-react";


interface MercadoriaPorCategoria {
  categoria: string;
  quantidade: number;
}
interface UsuarioPorBairro {
  bairro: string;
  quantidade: number;
}
interface Stats {
  totalUsuarios: number;
  totalFeirantes: number;
  totalPedidos: number;
}

// Componente para os Cards de Estatísticas
function StatCard({ title, value, icon, change, colorClass }: { title: string, value: number, icon: React.ReactNode, change: string, colorClass: string }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md flex justify-between items-center transition-transform transform hover:-translate-y-1">
      <div>
        <p className="text-gray-500">{title}</p>
        <p className="text-3xl font-bold text-gray-800">{value?.toLocaleString('pt-BR') || 0}</p>
      </div>
      <div className="flex flex-col items-end">
        <div className={`p-3 rounded-lg ${colorClass}`}>
          {icon}
        </div>
        <span className="text-green-500 text-sm mt-1 font-semibold">{change}</span>
      </div>
    </div>
  );
}

export default function Principal() {
  const [stats, setStats] = useState<Stats>({} as Stats);
  const [mercadorias, setMercadorias] = useState<MercadoriaPorCategoria[]>([]);
  const [usuarios, setUsuarios] = useState<UsuarioPorBairro[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);
      try {
        const [statsRes, mercadoriasRes, usuariosRes] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_URL_API}/dashboard/stats`),
          fetch(`${process.env.NEXT_PUBLIC_URL_API}/dashboard/mercadorias-por-categoria`),
          fetch(`${process.env.NEXT_PUBLIC_URL_API}/dashboard/usuarios-por-bairro`)
        ]);

        if (!statsRes.ok || !mercadoriasRes.ok || !usuariosRes.ok) {
          throw new Error('Falha ao buscar um ou mais recursos do dashboard.');
        }

        const statsData = await statsRes.json();
        const mercadoriasData = await mercadoriasRes.json();
        const usuariosData = await usuariosRes.json();

        setStats(statsData);
        setMercadorias(mercadoriasData);
        setUsuarios(usuariosData);

      } catch (err) {
        console.error("Falha ao buscar dados do dashboard:", err);
        setError("Não foi possível carregar os dados. Verifique a conexão com a API.");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // Formata os dados para os gráficos Victory
  const mercadoriasChartData = mercadorias.map(m => ({ x: m.categoria, y: m.quantidade }));
  const usuariosChartData = usuarios.map(u => ({ x: u.bairro, y: u.quantidade }));
  
  const colorScale = ["#2563eb", "#16a34a", "#f97316", "#ef4444", "#9333ea", "#f59e0b", "#10b981"];

  if (loading) {
    return <div className="flex justify-center items-center h-full">A carregar dados...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-full text-red-500">{error}</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800">Visão Geral do Sistema</h1>
      <p className="text-gray-500 mt-1">Dashboard administrativo com métricas e relatórios em tempo real</p>

      {/* Cards de Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <StatCard title="Nº Usuários" value={stats.totalUsuarios} icon={<Users className="text-blue-600" />} change="+12%" colorClass="bg-blue-100" />
        <StatCard title="Nº Feirantes" value={stats.totalFeirantes} icon={<Store className="text-red-600" />} change="+8%" colorClass="bg-red-100" />
        <StatCard title="Nº Pedidos" value={stats.totalPedidos} icon={<ShoppingBag className="text-green-600" />} change="+23%" colorClass="bg-green-100" />
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        {/* Gráfico de Barras */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Contagem de Mercadorias</h3>
          <VictoryChart
            theme={VictoryTheme.material}
            domainPadding={{ x: 30 }}
            padding={{ top: 20, bottom: 60, left: 50, right: 30 }}
            height={350}
          >
            <VictoryAxis
              tickLabelComponent={<VictoryLabel angle={-45} textAnchor="end" />}
              style={{ tickLabels: { fontSize: 10, padding: 5 } }}
            />
            <VictoryAxis dependentAxis tickFormat={(tick) => `${tick}`} />
            <VictoryBar
              data={mercadoriasChartData}
              style={{ data: { fill: "#2563eb" } }}
              animate={{ duration: 500 }}
              barWidth={35}
            />
          </VictoryChart>
        </div>

        {/* Gráfico de Pizza */}
        <div className="bg-white p-6 rounded-xl shadow-md flex flex-col items-center">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Usuários por Bairro</h3>
          <VictoryPie
            data={usuariosChartData}
            colorScale={colorScale}
            labels={({ datum }) => `${datum.x}\n(${datum.y})`}
            // AJUSTE: Aumenta o raio para dar mais espaço ao texto curvo
            labelRadius={95}
            labelPlacement="parallel"
            style={{
              labels: {
                // AJUSTE: Reduz a fonte
                fontSize: 10,
                fill: "white",
                fontWeight: "bold",
                padding: 5
              }
            }}
            // Mantém o gráfico como um "donut"
            innerRadius={70}
            animate={{ duration: 500 }}
            height={350}
            // Aumenta o padding para garantir que os rótulos não sejam cortados
            padding={5}
          />
        </div>
      </div>
    </div>
  );
}
