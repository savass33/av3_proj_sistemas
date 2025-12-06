import React, { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";
import { api } from "../services/api";
import { type Notification } from "../types";
import { Bell, CheckCircle, RefreshCw } from "lucide-react";

export const NotificationsPage = () => {
  const { currentUser } = useUser();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(false);

  const loadNotifications = async () => {
    if (!currentUser) return;
    setLoading(true);
    try {
      const res = await api.getUserNotifications(currentUser.id);
      // Ordena por data decrescente
      const sorted = res.data.sort(
        (a, b) =>
          new Date(b.dataCriacao).getTime() - new Date(a.dataCriacao).getTime()
      );
      setNotifications(sorted);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadNotifications();
  }, [currentUser]);

  if (!currentUser)
    return (
      <div className="text-center p-10 text-slate-500">
        Selecione um usuário no menu lateral para ver as notificações.
      </div>
    );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-slate-800">
            Minhas Notificações
          </h2>
          <p className="text-slate-500">
            Histórico de compras e alertas para {currentUser.nome}
          </p>
        </div>
        <button
          onClick={loadNotifications}
          className="bg-white border border-slate-200 text-slate-600 px-4 py-2 rounded-lg flex items-center gap-2 font-medium hover:bg-slate-50 transition-colors"
        >
          <RefreshCw size={18} className={loading ? "animate-spin" : ""} />{" "}
          Atualizar
        </button>
      </div>

      <div className="space-y-4 max-w-4xl">
        {notifications.length === 0 && (
          <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-300">
            <Bell className="mx-auto h-16 w-16 text-slate-200 mb-4" />
            <p className="text-slate-400 font-medium">
              Nenhuma notificação encontrada.
            </p>
          </div>
        )}

        {notifications.map((notif) => (
          <div
            key={notif.id}
            className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm flex gap-5 hover:shadow-md transition-shadow relative overflow-hidden"
          >
            <div
              className={`w-1 bg-gradient-to-b absolute left-0 top-0 bottom-0 ${
                notif.tipo === "PAGAMENTO"
                  ? "from-green-400 to-green-600"
                  : "from-blue-400 to-blue-600"
              }`}
            ></div>

            <div
              className={`mt-1 p-3 rounded-full h-fit flex-shrink-0 ${
                notif.tipo === "PAGAMENTO"
                  ? "bg-green-50 text-green-600"
                  : "bg-blue-50 text-blue-600"
              }`}
            >
              {notif.tipo === "PAGAMENTO" ? (
                <CheckCircle size={24} />
              ) : (
                <Bell size={24} />
              )}
            </div>

            <div className="flex-1">
              <div className="flex justify-between items-start">
                <h4 className="font-bold text-slate-800 text-lg">
                  {notif.titulo}
                </h4>
                <span className="text-xs font-semibold bg-slate-100 text-slate-500 px-2 py-1 rounded uppercase tracking-wide">
                  {notif.status || "ENVIADA"}
                </span>
              </div>
              <p className="text-slate-600 mt-2 leading-relaxed">
                {notif.mensagem}
              </p>
              <div className="mt-4 flex items-center gap-4 text-xs text-slate-400">
                <span>{new Date(notif.dataCriacao).toLocaleString()}</span>
                <span>•</span>
                <span className="uppercase">{notif.tipo}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
