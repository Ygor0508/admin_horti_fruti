// "use client"
// import Cookies from "js-cookie"
// import { useRouter } from "next/navigation"
// import { IoExitOutline } from "react-icons/io5"
// import { BiSolidDashboard } from "react-icons/bi"
// import { FaCarrot, FaUsers } from "react-icons/fa6" 
// import { BsBasketFill } from "react-icons/bs" 
// import Link from "next/link"

// export function MenuLateral() {
//   const router = useRouter()

//   function adminSair() {
//     if (confirm("Confirma Saída?")) {
//       Cookies.remove("admin_logado_id")
//       Cookies.remove("admin_logado_nome")
//       Cookies.remove("admin_logado_token")
//       router.replace("/")
//     }
//   }

//   return (
//     <aside id="default-sidebar" className="fixed mt-24 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
//       <div className="h-full px-3 py-4 overflow-y-auto bg-blue-300 dark:bg-gray-800">
//         <ul className="space-y-2 font-medium">
//           <li>
//             <Link href="/principal" className="flex items-center p-2">
//               <span className="h-5 text-gray-600 text-2xl"><BiSolidDashboard /></span>
//               <span className="ms-2 mt-1">Visão Geral</span>
//             </Link>
//           </li>
//           <li>
//             <Link href="/principal/mercadorias" className="flex items-center p-2">
//               <span className="h-5 text-gray-600 text-2xl"><FaCarrot /></span>
//               <span className="ms-2 mt-1">Cadastro de Mercadorias</span>
//             </Link>
//           </li>
//           <li>
//             <Link href="/principal/usuarios" className="flex items-center p-2">
//               <span className="h-5 text-gray-600 text-2xl"><FaUsers /></span>
//               <span className="ms-2 mt-1">Controle de Usuários</span>
//             </Link>
//           </li>
//           <li>
//             <Link href="/principal/pedidos" className="flex items-center p-2 cursor-pointer">
//               <span className="h-5 text-gray-600 text-2xl"><BsBasketFill /></span>
//               <span className="ms-2 mt-1">Controle de Pedidos</span>
//             </Link>
//           </li>
//           <li>
//             <span className="flex items-center p-2 cursor-pointer" onClick={adminSair}>
//               <span className="h-5 text-gray-600 text-2xl"><IoExitOutline /></span>
//               <span className="ms-2 mt-1">Sair do Sistema</span>
//             </span>
//           </li>
//         </ul>
//       </div>
//     </aside>
//   )
// }