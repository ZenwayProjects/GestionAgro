package com.postgresql.connect.model;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
@Table(name = "perfil")

public class Perfil {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "per_id")
    private Long id;




    /*@OneToMany(mappedBy = "usp_perfil")
    private List<UsuarioPerfil> per_usp_perfiles;*/

    @Column(name = "per_nombre")
    private String nombre;

    @Column(name = "per_perfil")
    private String perfil;

    @Column(name = "per_estado")
    private int estado;

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getPerfil() {
        return perfil;
    }

    public void setPerfil(String perfil) {
        this.perfil = perfil;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getEstado() {
        return estado;
    }

    public void setEstado(int estado) {
        this.estado = estado;
    }
}
