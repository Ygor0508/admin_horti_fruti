'use client'
import Cookies from "js-cookie"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Sidebar } from "../../components/Sidebar"; 

export default function PrincipalLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const router = useRouter()
  const [logado, setLogado] = useState<boolean>(false)

  // Lógica de autenticação que você já tinha
  useEffect(() => {
    if (Cookies.get("admin_logado_id")) {
      setLogado(true)
    } else {
      router.replace("/") // Redireciona se não estiver logado
    }
  }, [router])

  // Renderiza o layout apenas se o admin estiver logado
  if (!logado) {
    // Pode retornar um loader aqui se preferir
    return null;
  }

  return (
    // Estrutura do novo layout que eu sugeri
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <main className="flex-1 p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}