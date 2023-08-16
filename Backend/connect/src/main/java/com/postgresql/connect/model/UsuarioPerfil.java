package com.postgresql.connect.model;
import jakarta.persistence.*;
import lombok.Data;


@Data
@Entity
@Table(name = "usuario_perfil")

public class UsuarioPerfil {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "usp_id")
    private Long Id;

    @Column(name = "usp_usuario")  // Make sure the column name matches your database schema
    private Long usp_usuario;

    @Column(name = "usp_perfil")  // Make sure the column name matches your database schema
    private Long usp_perfil;
    /*@ManyToOne
    @JoinColumn(name = "usp_usuario")
    private Usuario usp_usuario;

    @ManyToOne
    @JoinColumn(name = "usp_perfil")
    private Perfil usp_perfil;*/

    @Column(name = "usp_estado")
    private int usp_estado;


    public Long getId() {
        return Id;
    }

    public void setId(Long id) {
        Id = id;
    }

    public Long getUsp_usuario() {
        return usp_usuario;
    }

    public void setUsp_usuario(Long usp_usuario) {
        this.usp_usuario = usp_usuario;
    }

    public Long getUsp_perfil() {
        return usp_perfil;
    }

    public void setUsp_perfil(Long usp_perfil) {
        this.usp_perfil = usp_perfil;
    }

    public int getUsp_estado() {
        return usp_estado;
    }

    public void setUsp_estado(int usp_estado) {
        this.usp_estado = usp_estado;
    }
}
