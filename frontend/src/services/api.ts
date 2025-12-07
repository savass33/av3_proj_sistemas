import axios, { type AxiosResponse } from "axios";
import {
  type User,
  type Book,
  type Notification,
  type PurchasePayload,
  type Order,
} from "../types";

// Detecta se está em desenvolvimento local ou produção
const isDevelopment = import.meta.env.DEV || window.location.hostname === 'localhost';

const URLS = isDevelopment ? {
  USERS: "http://localhost:8081",
  CATALOG: "http://localhost:8084",
  PAYMENT: "http://localhost:8082",
  NOTIFICATION: "http://localhost:8083",
  ORDER: "http://localhost:8085",
} : {
  USERS: "https://ms-usuarios-kcc5.onrender.com",
  CATALOG: "https://ms-catalogo-kcc5.onrender.com",
  PAYMENT: "https://ms-pagamento-kcc5.onrender.com",
  NOTIFICATION: "https://ms-notificacao-kcc5.onrender.com",
  ORDER: "https://ms-pedidos-kcc5.onrender.com",
};

export const api = {
  // Usuários
  createUser: (data: Omit<User, "id">): Promise<AxiosResponse<User>> =>
    axios.post(`${URLS.USERS}/user`, data),

  getUsers: (): Promise<AxiosResponse<User[]>> =>
    axios.get(`${URLS.USERS}/user`),

  // Catálogo
  getBooks: (): Promise<AxiosResponse<Book[]>> =>
    axios.get(`${URLS.CATALOG}/livros`),

  createBook: (data: Omit<Book, "id">): Promise<AxiosResponse<Book>> =>
    axios.post(`${URLS.CATALOG}/livros`, data),

  buyBook: (data: PurchasePayload): Promise<AxiosResponse<any>> =>
    axios.post(`${URLS.CATALOG}/compras`, data),

  // Notificações
  getUserNotifications: (
    userId: number
  ): Promise<AxiosResponse<Notification[]>> =>
    axios.get(`${URLS.NOTIFICATION}/notificacoes/usuario/${userId}`),

  // Pedidos
  getOrders: (): Promise<AxiosResponse<Order[]>> =>
    axios.get(`${URLS.ORDER}/pedidos`),

  createOrder: (
    usuarioId: number,
    livroId: number
  ): Promise<AxiosResponse<Order>> =>
    axios.post(`${URLS.ORDER}/pedidos/${usuarioId}/${livroId}`, {}),

  updateOrderStatus: (
    id: number,
    status: string
  ): Promise<AxiosResponse<Order>> =>
    axios.put(`${URLS.ORDER}/pedidos/${id}/status`, null, {
      params: { status },
    }),
};
