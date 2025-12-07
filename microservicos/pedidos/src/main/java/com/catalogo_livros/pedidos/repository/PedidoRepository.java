package com.catalogo_livros.pedidos.repository;
import com.catalogo_livros.pedidos.model.Pedido;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PedidoRepository extends JpaRepository<Pedido, Long> {
    
}