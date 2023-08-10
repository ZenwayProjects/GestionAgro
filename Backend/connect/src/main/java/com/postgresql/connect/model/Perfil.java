package com.postgresql.connect.model;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "perfil")

public class Perfil {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "per_id")
    private Long id;

    @Column(name = "per_nombre")
    private String nombre;

    @Column(name = "per_perfil")
    private String perfil;

    @Column(name = "per_estado")
    private int estado;
}
