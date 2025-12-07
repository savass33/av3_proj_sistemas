import React from "react";
import { BookOpen, Users, Bell, Package } from "lucide-react";
import { useUser } from "../context/UserContext";
import { Link, useLocation } from "react-router-dom";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const { currentUser, usersList, setCurrentUser } = useUser();
  const location = useLocation();

  const isActive = (path: string) =>
    location.pathname === path
      ? "bg-blue-600 text-white shadow-md"
      : "text-slate-400 hover:bg-slate-800 hover:text-white";

  return (
    <div className="flex h-screen bg-slate-100">
      {/* Sidebar Dark Mode Profissional */}
      <aside className="w-72 bg-slate-900 text-white flex flex-col shadow-2xl">
        <div className="p-8 border-b border-slate-800">
          <h1 className="text-2xl font-bold flex items-center gap-3 text-blue-400">
            <BookOpen className="w-8 h-8" />
            Livraria<span className="text-white">MS</span>
          </h1>
          <p className="text-xs text-slate-500 mt-2 uppercase tracking-widest">
            Admin Dashboard
          </p>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <Link
            to="/"
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${isActive(
              "/"
            )}`}
          >
            <BookOpen size={20} /> Catálogo
          </Link>
          <Link
            to="/users"
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${isActive(
              "/users"
            )}`}
          >
            <Users size={20} /> Usuários
          </Link>
          <Link
            to="/orders"
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${isActive(
              "/orders"
            )}`}
          >
            <Package size={20} /> Pedidos
          </Link>
          <Link
            to="/notifications"
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${isActive(
              "/notifications"
            )}`}
          >
            <Bell size={20} /> Notificações
          </Link>
        </nav>

        <div className="p-6 bg-slate-800 m-4 rounded-xl border border-slate-700">
          <label className="text-xs text-slate-400 font-bold uppercase mb-2 block">
            Simular Login Como:
          </label>
          <select
            className="w-full bg-slate-900 border border-slate-600 text-white rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            value={currentUser?.id || ""}
            onChange={(e) => {
              const user = usersList.find(
                (u) => u.id === Number(e.target.value)
              );
              setCurrentUser(user || null);
            }}
          >
            <option value="">Selecione...</option>
            {usersList.map((u) => (
              <option key={u.id} value={u.id}>
                {u.nome}
              </option>
            ))}
          </select>
          {currentUser && (
            <div className="mt-3 flex items-center gap-2 text-xs text-green-400">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              Online como: {currentUser.nome.split(" ")[0]}
            </div>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto p-8">{children}</div>
      </main>
    </div>
  );
};
