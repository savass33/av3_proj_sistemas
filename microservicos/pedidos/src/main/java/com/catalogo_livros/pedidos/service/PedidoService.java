package com.catalogo_livros.pedidos.service;

import com.catalogo_livros.pedidos.dto.LivroDTO;
import com.catalogo_livros.pedidos.dto.UsuarioDTO;
import com.catalogo_livros.pedidos.model.Pedido;
import com.catalogo_livros.pedidos.repository.PedidoRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import java.util.List;

@Service
public class PedidoService {

    private final PedidoRepository repository;
    private final RestTemplate restTemplate;

    @Value("${usuarios.service.url}")
    private String usuariosUrl;

    @Value("${livros.service.url}")
    private String livrosUrl;

    public PedidoService(PedidoRepository repository, RestTemplate restTemplate) {
        this.repository = repository;
        this.restTemplate = restTemplate;
    }

    public Pedido criarPedido(Long usuarioId, Long livroId) {
        System.out.println("Iniciando criação do pedido. UsuarioID: " + usuarioId + ", LivroID: " + livroId);

        UsuarioDTO usuario = null;
        LivroDTO livro = null;

        try {
            String urlUsuario = usuariosUrl + "/user/" + usuarioId;
            System.out.println("Buscando usuário em: " + urlUsuario);
            usuario = restTemplate.getForObject(urlUsuario, UsuarioDTO.class);
        } catch (Exception e) {
            System.err.println("Erro ao buscar usuário: " + e.getMessage());
            throw new RuntimeException("Erro ao validar usuário: " + e.getMessage());
        }

        try {
            String urlLivro = livrosUrl + "/livros/" + livroId;
            System.out.println("Buscando livro em: " + urlLivro);
            livro = restTemplate.getForObject(urlLivro, LivroDTO.class);
        } catch (Exception e) {
            System.err.println("Erro ao buscar livro: " + e.getMessage());
            throw new RuntimeException("Erro ao validar livro: " + e.getMessage());
        }

        if (usuario == null)
            throw new RuntimeException("Usuário não encontrado (ID " + usuarioId + ")");
        if (livro == null)
            throw new RuntimeException("Livro não encontrado (ID " + livroId + ")");

        try {
            Pedido pedido = new Pedido(usuarioId, livroId, livro.getPreco());
            return repository.save(pedido);
        } catch (Exception e) {
            System.err.println("Erro ao salvar no banco: " + e.getMessage());
            throw new RuntimeException("Erro de banco de dados ao salvar pedido.");
        }
    }

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