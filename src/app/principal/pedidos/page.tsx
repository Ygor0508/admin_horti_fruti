'use client'
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Trash2, Edit, X } from 'lucide-react';

// Interface para definir a estrutura dos dados do pedido
interface Pedido {
  id: number;
  quantidade: string; 
  status: string;
  usuario: {
    nome: string;
  };
  mercadoria: {
    nome: string;
    preco: string;
  };
}

// Enum para os status, para usar no select de edição
const statusOptions = [
  "EM_PREPARACAO",
  "EM_ROTA",
  "ENTREGUE",
  "CANCELADO",
  "PENDENTE",
  "FINALIZADO",
  "EM_ANDAMENTO",
  "RETORNANDO"
];

export default function ControleDePedidos() {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [loading, setLoading] = useState(true);

  // Estados para controlar os modais
  const [pedidoParaExcluir, setPedidoParaExcluir] = useState<Pedido | null>(null);
  const [pedidoParaEditar, setPedidoParaEditar] = useState<Pedido | null>(null);
  const [editData, setEditData] = useState({ quantidade: '', status: '' });

  useEffect(() => {
    fetchPedidos();
  }, []);

  async function fetchPedidos() {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/pedido`);
      if (!response.ok) {
        throw new Error("Falha ao buscar os pedidos.");
      }
      const data = await response.json();
      setPedidos(data);
    } catch (error) {
      console.error(error);
      toast.error("Não foi possível carregar os pedidos.");
    } finally {
      setLoading(false);
    }
  }

  // Função para excluir um pedido
  async function handleDelete() {
    if (!pedidoParaExcluir) return;

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/pedido/${pedidoParaExcluir.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Falha ao excluir o pedido.');
      }

      // Remove o pedido da lista localmente para atualizar a UI
      setPedidos(pedidos.filter(p => p.id !== pedidoParaExcluir.id));
      toast.success('Pedido excluído com sucesso!');
    } catch (error) {
      console.error(error);
      toast.error('Não foi possível excluir o pedido.');
    } finally {
      setPedidoParaExcluir(null); // Fecha o modal
    }
  }

  // Função para atualizar um pedido
  async function handleUpdate() {
    if (!pedidoParaEditar) return;

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/pedido/${pedidoParaEditar.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          quantidade: Number(editData.quantidade),
          status: editData.status,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.erro?.issues?.[0]?.message || 'Falha ao atualizar o pedido.');
      }

      toast.success('Pedido atualizado com sucesso!');
      setPedidoParaEditar(null); // Fecha o modal
      fetchPedidos(); // Re-busca os dados para mostrar a atualização
    } catch (error) {
      console.error(error);
      toast.error((error as Error).message);
    }
  }

  // Abre o modal de edição e preenche com os dados atuais
  function openEditModal(pedido: Pedido) {
    setPedidoParaEditar(pedido);
    setEditData({
      quantidade: String(pedido.quantidade),
      status: pedido.status,
    });
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <p className="text-lg">A carregar pedidos...</p>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Controle de Pedidos</h1>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3">Mercadoria</th>
                <th scope="col" className="px-6 py-3">Preço Unit. R$</th>
                <th scope="col" className="px-6 py-3">Cliente</th>
                <th scope="col" className="px-6 py-3">Quantidade</th>
                <th scope="col" className="px-6 py-3">Status</th>
                <th scope="col" className="px-6 py-3 text-center">Ações</th>
              </tr>
            </thead>
            <tbody>
              {pedidos.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-10 text-gray-500">
                    Nenhum pedido encontrado.
                  </td>
                </tr>
              ) : (
                pedidos.map((pedido) => (
                  <tr key={pedido.id} className="bg-white border-b hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                      {pedido.mercadoria.nome}
                    </td>
                    <td className="px-6 py-4">
                      {Number(pedido.mercadoria.preco).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </td>
                    <td className="px-6 py-4">
                      {pedido.usuario.nome}
                    </td>
                    <td className="px-6 py-4">
                      {Number(pedido.quantidade)}
                    </td>
                    <td className="px-6 py-4">
                      <span className="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded">
                        {pedido.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 flex justify-center gap-2">
                      <button onClick={() => openEditModal(pedido)} className="text-yellow-500 hover:text-yellow-700">
                        <Edit size={20} />
                      </button>
                      <button onClick={() => setPedidoParaExcluir(pedido)} className="text-red-500 hover:text-red-700">
                        <Trash2 size={20} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal de Exclusão */}
      {pedidoParaExcluir && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-xl">
            <h2 className="text-lg font-bold mb-4">Confirmar Exclusão</h2>
            <p>Tem a certeza que deseja excluir o pedido de <span className="font-bold">{pedidoParaExcluir.mercadoria.nome}</span>?</p>
            <div className="flex justify-end gap-4 mt-6">
              <button onClick={() => setPedidoParaExcluir(null)} className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300">Cancelar</button>
              <button onClick={handleDelete} className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600">Excluir</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Edição */}
      {pedidoParaEditar && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold">Editar Pedido: {pedidoParaEditar.mercadoria.nome}</h2>
                <button onClick={() => setPedidoParaEditar(null)}><X size={24} /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label htmlFor="quantidade" className="block text-sm font-medium text-gray-700">Quantidade</label>
                <input
                  type="number"
                  id="quantidade"
                  value={editData.quantidade}
                  onChange={(e) => setEditData({ ...editData, quantidade: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
                <select
                  id="status"
                  value={editData.status}
                  onChange={(e) => setEditData({ ...editData, status: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                >
                  {statusOptions.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-4 mt-6">
              <button onClick={() => setPedidoParaEditar(null)} className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300">Cancelar</button>
              <button onClick={handleUpdate} className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600">Salvar Alterações</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
