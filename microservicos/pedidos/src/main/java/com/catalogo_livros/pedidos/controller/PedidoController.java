package com.catalogo_livros.pedidos.controller;
import com.catalogo_livros.pedidos.model.Pedido;
import com.catalogo_livros.pedidos.service.PedidoService;
import org.springframework.web.bind.annotation.*;
import java.util.List;


@RestController
@RequestMapping("/pedidos")
public class PedidoController {

    private final PedidoService service;

    public PedidoController(PedidoService service) {
        this.service = service;
    }

    @PostMapping("/{usuarioId}/{livroId}")
    public Pedido criar(@PathVariable Long usuarioId,
                        @PathVariable Long livroId) {
        return service.criarPedido(usuarioId, livroId);
    }

    @GetMapping
    public List<Pedido> listar() {
        return service.listar();
    }

    @GetMapping("/{id}")
    public Pedido buscarPorId(@PathVariable Long id) {
        return service.buscarPorId(id);
    }

    @PutMapping("/{id}/status")
    public Pedido atualizarStatus(@PathVariable Long id, @RequestParam String status) {
        return service.atualizarStatus(id, status);
    }
}