export interface User {
  id: number;
  nome: string;
  email: string;
  telefone: string;
}

export interface Book {
  id: number;
  titulo: string;
  autor: string;
  categoria: string;
  preco: number;
}

export interface Order {
  id: number;
  usuarioId: number;
  livroId: number;
  preco: number;
  status: string;
  dataCriacao: string;
}

export interface Notification {
  id: number;
  titulo: string;
  mensagem: string;
  tipo: string;
  dataCriacao: string;
  status?: string;
}

export interface PurchasePayload {
  usuarioId: number;
  livroId: number;
  valor: number;
  meioPagamento: "PIX" | "BOLETO" | "CARTAO";
}
