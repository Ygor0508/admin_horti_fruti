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
        <StatCard title="Nº Clientes" value={stats.totalUsuarios} icon={<Users className="text-blue-600" />} change="+12%" colorClass="bg-blue-100" />
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
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Clientes por Bairro</h3>
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
