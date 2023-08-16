package com.postgresql.connect.dtos;

import lombok.Data;

import java.util.Date;

@Data
public class DtoRegistro {
    private String nombre;
    private String apellido;
    private char genero;
    private Date fechaNacimiento;
    private String email;
    private String login;
    private String password;
    private String tipoIdentificacion;
    private String identificacion;
    private String direccion;
    private int telefono;
    private Long estado;
}
