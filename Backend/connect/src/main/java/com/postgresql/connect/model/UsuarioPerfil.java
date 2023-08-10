package com.postgresql.connect.model;
import jakarta.persistence.*;
import lombok.Data;


@Data
@Entity
@Table(name = "usuario_perfil")

public class UsuarioPerfil {

    @Id
    @Column(name = "usp_id")
    private Long Id;

    @Column(name = "usp_usuario")
    private Long usp_usuario;

    @Column(name = "usp_perfil")
    private Long usp_perfil;

    @Column(name = "usp_estado")
    private int usp_estado;
}
