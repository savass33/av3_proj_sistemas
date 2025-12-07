import axios, { type AxiosResponse } from "axios";
import {
  type User,
  type Book,
  type Notification,
  type PurchasePayload,
} from "../types";

const URLS = {
  USERS: "https://ms-usuarios-kcc5.onrender.com",
  CATALOG: "https://ms-catalogo-kcc5.onrender.com",
  PAYMENT: "https://ms-pagamento-kcc5.onrender.com",
  NOTIFICATION: "https://ms-notificacao-kcc5.onrender.com",
  ORDER: "https://ms-pedidos-SEU-ID.onrender.com",
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
};
