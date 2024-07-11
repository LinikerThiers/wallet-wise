package com.linikerthiers.walletwise.model;

import jakarta.persistence.*;

import java.time.LocalDateTime;


@Entity
@Table(name = "usuario_gasto")
public class UsuarioGasto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String descricao;
    private Double valor;
    private LocalDateTime dataCompleta;
    private Integer mesAno;
    @ManyToOne
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;
    @Column(name = "tipo")
    private String tipo;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public Double getValor() {
        return valor;
    }

    public void setValor(Double valor) {
        this.valor = valor;
    }

    public LocalDateTime getDataCompleta() {
        return dataCompleta;
    }

    public void setDataCompleta(LocalDateTime dataCompleta) {
        this.dataCompleta = dataCompleta;
    }

    public Integer getMesAno() {
        return mesAno;
    }

    public void setMesAno(Integer mesAno) {
        this.mesAno = mesAno;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }
}
