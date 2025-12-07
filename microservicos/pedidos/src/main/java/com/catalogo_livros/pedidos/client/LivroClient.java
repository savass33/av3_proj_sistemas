package com.catalogo_livros.pedidos.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.catalogo_livros.pedidos.dto.LivroDTO;

@FeignClient(name = "catalogo-livros-service", url = "http://localhost:8080")
public interface LivroClient {
    
    @GetMapping("/livros/{id}")
    LivroDTO buscarLivroPorId(@PathVariable("id") Long id);
}
