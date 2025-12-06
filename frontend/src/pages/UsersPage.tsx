import React, { useState } from "react";
import { useUser } from "../context/UserContext";
import { api } from "../services/api";
import { UserPlus, Mail, Phone, User as UserIcon } from "lucide-react";

export const UsersPage = () => {
  const { usersList, refreshUsers } = useUser();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newUser, setNewUser] = useState({ nome: "", email: "", telefone: "" });

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.createUser(newUser);
      await refreshUsers();
      setIsModalOpen(false);
      setNewUser({ nome: "", email: "", telefone: "" });
      alert("Usuário criado com sucesso!");
    } catch (error) {
      alert("Erro ao criar usuário.");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-slate-800">
            Base de Usuários
          </h2>
          <p className="text-slate-500">
            Gerencie quem tem acesso à plataforma
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2.5 rounded-lg flex items-center gap-2 font-medium shadow-lg transition-all"
        >
          <UserPlus size={20} /> Criar Usuário
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-bold">
            <tr>
              <th className="p-4">ID</th>
              <th className="p-4">Nome</th>
              <th className="p-4">Contato</th>
              <th className="p-4 text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {usersList.map((user) => (
              <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                <td className="p-4 text-slate-400 font-mono text-sm">
                  #{user.id}
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-400">
                      <UserIcon size={20} />
                    </div>
                    <span className="font-semibold text-slate-700">
                      {user.nome}
                    </span>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex flex-col gap-1 text-sm">
                    <div className="flex items-center gap-2 text-slate-600">
                      <Mail size={14} /> {user.email}
                    </div>
                    <div className="flex items-center gap-2 text-slate-400">
                      <Phone size={14} /> {user.telefone}
                    </div>
                  </div>
                </td>
                <td className="p-4 text-right">
                  <span className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">
                    Ativo
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm">
          <form
            onSubmit={handleCreate}
            className="bg-white p-8 rounded-2xl w-full max-w-md shadow-2xl"
          >
            <h3 className="text-xl font-bold mb-6 text-slate-800">
              Novo Usuário
            </h3>
            <div className="space-y-4">
              <input
                required
                placeholder="Nome Completo"
                className="w-full p-3 border rounded-lg bg-slate-50"
                value={newUser.nome}
                onChange={(e) =>
                  setNewUser({ ...newUser, nome: e.target.value })
                }
              />
              <input
                required
                type="email"
                placeholder="E-mail"
                className="w-full p-3 border rounded-lg bg-slate-50"
                value={newUser.email}
                onChange={(e) =>
                  setNewUser({ ...newUser, email: e.target.value })
                }
              />
              <input
                required
                placeholder="Telefone"
                className="w-full p-3 border rounded-lg bg-slate-50"
                value={newUser.telefone}
                onChange={(e) =>
                  setNewUser({ ...newUser, telefone: e.target.value })
                }
              />
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
                className="flex-1 p-3 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700"
              >
                Cadastrar
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
