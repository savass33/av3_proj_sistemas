package com.catalogo_livros.pedidos.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.catalogo_livros.pedidos.dto.UsuarioDTO;

@FeignClient(name = "usuarios-service", url = "http://localhost:8081")
public interface UsuarioClient {
    
    @GetMapping("/usuarios/{id}")
    UsuarioDTO buscarUsuarioPorId(@PathVariable("id") Long id);
}
