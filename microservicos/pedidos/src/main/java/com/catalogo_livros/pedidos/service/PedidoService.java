package com.catalogo_livros.pedidos.service;

import com.catalogo_livros.pedidos.dto.LivroDTO;
import com.catalogo_livros.pedidos.dto.UsuarioDTO;
import com.catalogo_livros.pedidos.model.Pedido;
import com.catalogo_livros.pedidos.repository.PedidoRepository;
import org.springframework.beans.factory.annotation.Value; // Importante
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import java.util.List;

@Service
public class PedidoService {

    private final PedidoRepository repository;
    private final RestTemplate restTemplate;

    // Variáveis injetadas do application.properties
    @Value("${usuarios.service.url}")
    private String usuariosUrl;

    @Value("${livros.service.url}")
    private String livrosUrl;

    public PedidoService(PedidoRepository repository, RestTemplate restTemplate) {
        this.repository = repository;
        this.restTemplate = restTemplate;
    }

    public Pedido criarPedido(Long usuarioId, Long livroId) {
        // CHAMAR MS-Usuarios (Usando URL dinâmica)
        UsuarioDTO usuario = restTemplate.getForObject(usuariosUrl + "/user/" + usuarioId, UsuarioDTO.class);

        // CHAMAR MS-Livros (Usando URL dinâmica)
        LivroDTO livro = restTemplate.getForObject(livrosUrl + "/livros/" + livroId, LivroDTO.class);

        if (usuario == null || livro == null) {
            throw new RuntimeException("Usuário ou Livro não encontrado");
        }

        Pedido pedido = new Pedido(usuarioId, livroId, livro.getPreco());
        return repository.save(pedido);
    }

    // ... manter o resto dos métodos (listar, buscarPorId, atualizarStatus) iguais
    public List<Pedido> listar() {
        return repository.findAll();
    }

    public Pedido buscarPorId(Long id) {
        return repository.findById(id).orElse(null);
    }

    public Pedido atualizarStatus(Long id, String status) {
        Pedido pedido = repository.findById(id).orElse(null);
        if (pedido != null) {
            pedido.setStatus(status);
            return repository.save(pedido);
        }
        return null;
    }
}