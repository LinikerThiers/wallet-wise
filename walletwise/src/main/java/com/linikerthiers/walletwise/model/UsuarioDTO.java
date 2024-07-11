package com.linikerthiers.walletwise.model;

import java.util.List;

public class UsuarioDTO {

    private Long id;
    private String nome;
    private String email;
    private byte[] fotoPerfil;
    private List<UsuarioGasto> gastos;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public byte[] getFotoPerfil() {
        return fotoPerfil;
    }

    public void setFotoPerfil(byte[] fotoPerfil) {
        this.fotoPerfil = fotoPerfil;
    }

    public List<UsuarioGasto> getGastos() {
        return gastos;
    }

    public void setGastos(List<UsuarioGasto> gastos) {
        this.gastos = gastos;
    }
}
