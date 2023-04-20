package com.postgresql.connect.model;
import jakarta.persistence.*;
import lombok.Data;


@Data
@Entity

@Table(name = "usuario")

public class Usuario {
    @Id
    @Column(name = "usu_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @OneToOne
    @PrimaryKeyJoinColumn(name = "per_id")
    private Persona u_persona;

    @Column(name = "usu_login")
    private String login;

    @Column(name = "usu_password")
    private String password;

    @Column(name = "usu_estado")
    private int estado;

}
