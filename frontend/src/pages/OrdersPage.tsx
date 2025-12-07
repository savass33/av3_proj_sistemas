// src/pages/OrdersPage.tsx
import React, { useEffect, useState } from "react";
import { api } from "../services/api";
import { type Order, type User, type Book } from "../types";
import { Package, Plus, RefreshCw, CheckCircle, Truck } from "lucide-react";

export const OrdersPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [books, setBooks] = useState<Book[]>([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<number | "">("");
  const [selectedBook, setSelectedBook] = useState<number | "">("");
  const [loading, setLoading] = useState(false);

  const loadData = async () => {
    setLoading(true);
    try {
      const [ordersRes, usersRes, booksRes] = await Promise.allSettled([
        api.getOrders(),
        api.getUsers(),
        api.getBooks(),
      ]);

      if (ordersRes.status === "fulfilled") setOrders(ordersRes.value.data);
      if (usersRes.status === "fulfilled") setUsers(usersRes.value.data);
      if (booksRes.status === "fulfilled") setBooks(booksRes.value.data);
    } catch (e) {
      console.error("Erro ao carregar dados", e);
    }
    setLoading(false);
  };

  // Carrega dados iniciais para popular os selects
  useEffect(() => {
    const initializeData = async () => {
      await loadData();
    };
    initializeData();
  }, []);

  const handleCreateOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUser || !selectedBook) return;

    try {
      await api.createOrder(Number(selectedUser), Number(selectedBook));
      alert(
        "Pedido criado com sucesso! (Integração Pedidos -> Usuários/Livros OK)"
      );
      setIsModalOpen(false);
      setSelectedUser("");
      setSelectedBook("");
      loadData();
    } catch (error) {
      alert("Erro ao criar pedido. Verifique se o usuário e o livro existem.");
    }
  };

  const handleStatusUpdate = async (id: number, newStatus: string) => {
    try {
      await api.updateOrderStatus(id, newStatus);
      loadData(); // Recarrega a lista para mostrar o novo status
    } catch (error) {
      alert("Erro ao atualizar status.");
    }
  };

  const getStatusColor = (status: string) => {
    switch (status?.toUpperCase()) {
      case "CONCLUIDO":
        return "bg-green-100 text-green-700 border-green-200";
      case "CANCELADO":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-end border-b border-slate-200 pb-6">
        <div>
          <h2 className="text-3xl font-bold text-slate-800">
            Gestão de Pedidos
          </h2>
          <p className="text-slate-500 mt-1">
            Orquestração entre MS-Pedidos, Usuários e Catálogo.
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={loadData}
            className="p-2.5 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors"
            title="Atualizar"
          >
            <RefreshCw size={20} className={loading ? "animate-spin" : ""} />
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-orange-600 hover:bg-orange-700 text-white px-5 py-2.5 rounded-lg flex items-center gap-2 font-medium shadow-md transition-all active:scale-95"
          >
            <Plus size={20} /> Novo Pedido
          </button>
        </div>
      </div>

      {/* Lista de Pedidos */}
      <div className="grid gap-4">
        {orders.length === 0 && !loading && (
          <div className="text-center py-20 text-slate-400">
            Nenhum pedido encontrado.
          </div>
        )}

        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex flex-col md:flex-row justify-between items-center gap-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-5 w-full">
              <div className="bg-orange-50 p-4 rounded-full text-orange-500 flex-shrink-0">
                <Package size={28} />
              </div>
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h4 className="font-bold text-slate-700 text-lg">
                    Pedido #{order.id}
                  </h4>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded border uppercase font-bold tracking-wide ${getStatusColor(
                      order.status
                    )}`}
                  >
                    {order.status || "PENDENTE"}
                  </span>
                </div>
                <div className="text-sm text-slate-500 space-y-1">
                  <p>
                    👤 <strong>Usuário ID:</strong> {order.usuarioId}{" "}
                    (Verificado no MS-Usuários)
                  </p>
                  <p>
                    📖 <strong>Livro ID:</strong> {order.livroId} (Verificado no
                    MS-Catálogo)
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-6 w-full md:w-auto justify-end border-t md:border-t-0 pt-4 md:pt-0 border-slate-100">
              <div className="text-right">
                <span className="block text-xs text-slate-400 uppercase font-bold">
                  Valor Total
                </span>
                <span className="block font-bold text-xl text-slate-800">
                  R$ {order.preco?.toFixed(2) || "0.00"}
                </span>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleStatusUpdate(order.id, "CONCLUIDO")}
                  className="p-2 hover:bg-green-50 text-green-600 rounded-lg transition-colors"
                  title="Concluir Pedido"
                >
                  <CheckCircle size={20} />
                </button>
                <button
                  onClick={() => handleStatusUpdate(order.id, "ENVIADO")}
                  className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors"
                  title="Marcar como Enviado"
                >
                  <Truck size={20} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Criar Pedido */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 flex items-center justify-center z-50 backdrop-blur-sm p-4">
          <form
            onSubmit={handleCreateOrder}
            className="bg-white p-8 rounded-2xl w-full max-w-md shadow-2xl relative animate-in fade-in zoom-in duration-200"
          >
            <h3 className="text-xl font-bold mb-6 text-slate-800">
              Novo Pedido Manual
            </h3>
            <p className="text-sm text-slate-500 mb-6">
              Isso testará a comunicação síncrona do <strong>MS-Pedidos</strong>{" "}
              consultando os serviços de Usuários e Livros.
            </p>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase">
                  Selecione o Usuário
                </label>
                <select
                  required
                  className="w-full p-3 border border-slate-200 rounded-lg mt-1 bg-white outline-none focus:border-orange-500"
                  value={selectedUser}
                  onChange={(e) => setSelectedUser(Number(e.target.value))}
                >
                  <option value="">-- Selecione --</option>
                  {users.map((u) => (
                    <option key={u.id} value={u.id}>
                      {u.nome} (ID: {u.id})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-500 uppercase">
                  Selecione o Livro
                </label>
                <select
                  required
                  className="w-full p-3 border border-slate-200 rounded-lg mt-1 bg-white outline-none focus:border-orange-500"
                  value={selectedBook}
                  onChange={(e) => setSelectedBook(Number(e.target.value))}
                >
                  <option value="">-- Selecione --</option>
                  {books.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.titulo} - R$ {b.preco}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-8 flex gap-3">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="flex-1 p-3 text-slate-600 hover:bg-slate-100 rounded-lg font-medium"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="flex-1 p-3 bg-orange-600 text-white rounded-lg font-bold hover:bg-orange-700 shadow-lg shadow-orange-200"
              >
                Criar Pedido
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
