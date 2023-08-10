package com.postgresql.connect.model;

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

    @Column(name = "fecha_nacimiento")
    private Date fechaNacimiento;

    @Column(name = "per_email")
    private String email;

    @Column(name = "per_estado")
    private int estado;

    @Column(name = "identificacion")
    private String identificacion;

    @Column( name = "tipo_identificacion", length = 3)
    private String tipoIdentificacion;

}
