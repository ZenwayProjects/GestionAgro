package com.postgresql.connect.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;


import java.util.Date;

@Data
@Entity
/*
 * Una expresión regular por si la tabla en mayuscula "\"xx\""
 */
@Table(name = "persona")


public class Persona {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "per_id")
    private Long id;

    @Column(name = "per_nombre")
    private String nombre;

    @Column(name = "per_apellido")
    private String apellido;

    @Column(name = "per_genero")
    private char genero;


    @Column(name = "fecha_nacimiento", nullable = true, unique = true)
    private Date fechaNacimiento;

    @Column(name = "per_email", length = 64)
    private String email;

    @Column(name = "per_estado")
    private int estado;

    @Column(name = "per_identificacion")
    private String identificacion;

    @Column( name = "tipo_identificacion", length = 3)
    private String tipoIdentificacion;

    @Column(name = "per_direccion", nullable = true)
    private String direccion;

    @Column(name = "per_telefono")
    private int telefono;

    @OneToOne(mappedBy = "usu_persona", cascade = CascadeType.ALL)
    @JsonIgnore
    private Usuario usuario;
}
