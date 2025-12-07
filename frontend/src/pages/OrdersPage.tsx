import { useEffect, useState } from 'react';
import { api } from '../services/api';
import { type Order } from '../types';
import { Package} from 'lucide-react';

export const OrdersPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    api.getOrders().then(res => setOrders(res.data)).catch(console.error);
  }, []);

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-slate-800">Gestão de Pedidos</h2>
      <div className="grid gap-4">
        {orders.map(order => (
          <div key={order.id} className="bg-white p-6 rounded-xl shadow-sm border flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="bg-orange-100 p-3 rounded-full text-orange-600"><Package /></div>
              <div>
                <p className="font-bold text-slate-700">Pedido #{order.id}</p>
                <p className="text-sm text-slate-500">Usuário: {order.usuarioId} • Livro: {order.livroId}</p>
              </div>
            </div>
            <div className="text-right">
              <span className="block font-bold text-lg">R$ {order.preco?.toFixed(2)}</span>
              <span className="text-xs px-2 py-1 bg-slate-100 rounded uppercase font-bold text-slate-500">{order.status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};