package com.postgresql.connect.model;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;


@Data
@Entity

@Table(name = "usuario")

public class Usuario {
    @Id
    @Column(name = "usu_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @OneToOne
    @JoinColumn(name = "usu_persona", referencedColumnName = "per_id")
    private Persona usu_persona;


    @Column(name = "usu_login")
    private String login;

    @Column(name = "usu_password")
    private String password;

    @Column(name = "usu_estado")
    private int estado;

    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinTable(name = "usuario_perfil",
            joinColumns = @JoinColumn(name = "usp_usuario", referencedColumnName = "usu_id"),
            inverseJoinColumns = @JoinColumn(name = "usp_perfil", referencedColumnName = "per_id"))
    private List<Perfil> perfiles = new ArrayList<>();


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUsu_persona() {
        return usu_persona.getId();
    }
    public void setUsu_persona(Persona persona) {
        this.usu_persona = persona;
    }

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public int getEstado() {
        return estado;
    }

    public void setEstado(int estado) {
        this.estado = estado;
    }
}
