import React, { useEffect, useState } from "react";
import { api } from "../services/api";
import { type Book, type PurchasePayload } from "../types";
import { ShoppingCart, Plus, BookOpen, CreditCard } from "lucide-react";
import { useUser } from "../context/UserContext";

export const Catalog = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const { currentUser } = useUser();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newBook, setNewBook] = useState({
    titulo: "",
    autor: "",
    categoria: "",
    preco: "",
  });

  // Estado para Compra
  const [purchasingBook, setPurchasingBook] = useState<Book | null>(null);
  const [paymentMethod, setPaymentMethod] =
    useState<PurchasePayload["meioPagamento"]>("PIX");

  const loadBooks = async () => {
    try {
      const res = await api.getBooks();
      setBooks(res.data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    (async () => {
      await loadBooks();
    })();
  }, []);

  const handleCreateBook = async (e: React.FormEvent) => {
    e.preventDefault();
    await api.createBook({ ...newBook, preco: Number(newBook.preco) });
    setIsModalOpen(false);
    setNewBook({ titulo: "", autor: "", categoria: "", preco: "" });
    loadBooks();
    alert("Livro criado! MS Catálogo funcionando.");
  };

  const handleBuy = async () => {
    if (!currentUser || !purchasingBook)
      return alert("Selecione usuário e livro");

    try {
      await api.buyBook({
        usuarioId: currentUser.id,
        livroId: purchasingBook.id,
        valor: purchasingBook.preco,
        meioPagamento: paymentMethod,
      });
      alert(
        `Compra de "${purchasingBook.titulo}" realizada via ${paymentMethod}! Verifique as notificações.`
      );
      setPurchasingBook(null);
    } catch (error) {
      alert(
        "Erro na compra. Verifique se os serviços de Pagamento e Catálogo estão rodando."
      );
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-slate-800">
            Catálogo de Livros
          </h2>
          <p className="text-slate-500">
            Explore e gerencie o inventário da biblioteca
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg flex items-center gap-2 font-medium shadow-lg transition-all"
        >
          <Plus size={20} /> Novo Livro
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {books.map((book) => (
          <div
            key={book.id}
            className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-all group relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 bg-blue-50 text-blue-600 text-xs font-bold px-3 py-1 rounded-bl-xl">
              {book.categoria}
            </div>
            <div className="h-48 bg-slate-50 rounded-xl mb-4 flex items-center justify-center text-slate-300 group-hover:scale-105 transition-transform duration-300">
              <BookOpen size={64} strokeWidth={1} />
            </div>
            <h3 className="font-bold text-lg text-slate-800 leading-tight mb-1">
              {book.titulo}
            </h3>
            <p className="text-sm text-slate-500 mb-4">{book.autor}</p>
            <div className="flex justify-between items-center pt-4 border-t border-slate-50">
              <span className="text-xl font-bold text-slate-800">
                R$ {book.preco.toFixed(2)}
              </span>
              <button
                onClick={() => setPurchasingBook(book)}
                className="bg-slate-900 text-white p-2.5 rounded-lg hover:bg-blue-600 transition-colors"
                title="Comprar"
              >
                <ShoppingCart size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL CRIAR LIVRO */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm">
          <form
            onSubmit={handleCreateBook}
            className="bg-white p-8 rounded-2xl w-full max-w-md shadow-2xl"
          >
            <h3 className="text-xl font-bold mb-6 text-slate-800">
              Adicionar ao Catálogo
            </h3>
            <div className="space-y-4">
              <input
                required
                placeholder="Título"
                className="w-full p-3 border rounded-lg bg-slate-50"
                value={newBook.titulo}
                onChange={(e) =>
                  setNewBook({ ...newBook, titulo: e.target.value })
                }
              />
              <input
                required
                placeholder="Autor"
                className="w-full p-3 border rounded-lg bg-slate-50"
                value={newBook.autor}
                onChange={(e) =>
                  setNewBook({ ...newBook, autor: e.target.value })
                }
              />
              <input
                required
                placeholder="Categoria"
                className="w-full p-3 border rounded-lg bg-slate-50"
                value={newBook.categoria}
                onChange={(e) =>
                  setNewBook({ ...newBook, categoria: e.target.value })
                }
              />
              <input
                required
                type="number"
                step="0.01"
                placeholder="Preço"
                className="w-full p-3 border rounded-lg bg-slate-50"
                value={newBook.preco}
                onChange={(e) =>
                  setNewBook({ ...newBook, preco: e.target.value })
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
                className="flex-1 p-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
              >
                Salvar
              </button>
            </div>
          </form>
        </div>
      )}

      {/* MODAL PAGAMENTO */}
      {purchasingBook && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-white p-8 rounded-2xl w-full max-w-sm shadow-2xl text-center">
            <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <CreditCard size={32} />
            </div>
            <h3 className="text-xl font-bold text-slate-800">
              Confirmar Compra
            </h3>
            <p className="text-slate-500 mt-2 mb-6">
              Você está comprando <strong>{purchasingBook.titulo}</strong> por{" "}
              <span className="text-slate-900 font-bold">
                R$ {purchasingBook.preco.toFixed(2)}
              </span>
            </p>

            <div className="text-left mb-6">
              <label className="text-xs font-bold text-slate-400 uppercase block mb-2">
                Forma de Pagamento
              </label>
              <select
                className="w-full p-3 border rounded-lg bg-slate-50 font-medium"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value as any)}
              >
                <option value="PIX">PIX (Instantâneo)</option>
                <option value="CARTAO_CREDITO">Cartão de Crédito</option>
                <option value="BOLETO">Boleto Bancário</option>
              </select>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setPurchasingBook(null)}
                className="flex-1 p-3 text-slate-600 hover:bg-slate-100 rounded-lg font-medium"
              >
                Cancelar
              </button>
              <button
                onClick={handleBuy}
                className="flex-1 p-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 shadow-lg shadow-green-200"
              >
                Pagar Agora
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
