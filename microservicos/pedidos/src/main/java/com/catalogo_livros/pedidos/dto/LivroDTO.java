package com.catalogo_livros.pedidos.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;;

@JsonIgnoreProperties(ignoreUnknown = true)
public class LivroDTO {
    public Long id;
    public String titulo;
    public String autor;
    public double preco;

    // ===== GETTERS E SETTERS =====
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitulo() { return titulo; }
    public void setTitulo(String titulo) { this.titulo = titulo; }

    public String getAutor() { return autor; }
    public void setAutor(String autor) { this.autor = autor; }

    public double getPreco() { return preco; }
    public void setPreco(double preco) { this.preco = preco; }
}
