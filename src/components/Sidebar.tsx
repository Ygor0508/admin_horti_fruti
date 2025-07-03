'use client'
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation"; 
import Image from 'next/image';
import { LayoutDashboard, Package, Users, LogOut, ClipboardList } from 'lucide-react';
// import { LayoutDashboard, Package, Users, Settings, LogOut, ClipboardList } from 'lucide-react';
import Cookies from 'js-cookie'; 
export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter(); 
  const menuItems = [
    { href: "/principal", label: "Visão Geral", icon: LayoutDashboard },
    { href: "/principal/mercadorias", label: "Cadastro de Mercadorias", icon: Package },
    { href: "/principal/usuarios", label: "Controle de Clientes", icon: Users },
    { href: "/principal/pedidos", label: "Controle de Pedidos", icon: ClipboardList },
    // { href: "/principal/configuracoes", label: "Configurações", icon: Settings },
  ];

 
  function handleLogout() {
   
    if (window.confirm("Tem a certeza que deseja sair do sistema?")) {
     
      Cookies.remove('admin_logado_id');
      Cookies.remove('admin_logado_token');
      
      router.push('/');
    }
  }

  return (
    <aside className="w-64 bg-white flex-shrink-0 flex flex-col shadow-lg">
      <div className="p-4 border-b flex items-center gap-3">
        <Image src="/logo.png" width={40} height={40} alt="Logo Feirô Admin" />
        <h1 className="text-xl font-bold text-gray-800">Feirô Admin</h1>
      </div>
      <nav className="flex-1 px-4 py-4 space-y-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex items-center px-3 py-2 text-gray-600 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200
                ${isActive ? "bg-blue-100 text-blue-700 font-semibold" : ""}`}
            >
              <item.icon className="w-5 h-5" />
              <span className="ml-3">{item.label}</span>
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t">
        <button 
          onClick={handleLogout} 
          className="flex items-center w-full px-3 py-2 text-red-500 rounded-lg hover:bg-red-50 transition-colors duration-200"
        >
          <LogOut className="w-5 h-5" />
          <span className="ml-3">Sair do Sistema</span>
        </button>
      </div>
    </aside>
  );
}