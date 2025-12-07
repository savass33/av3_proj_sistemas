package com.catalogo_livros.pedidos.dto

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;;

@JsonIgnoreProperties(ignoreUnknown = true)
public class UsuarioDTO {
    public Long id;
    public String nome;
    public String email;
    public String telefone;
}
