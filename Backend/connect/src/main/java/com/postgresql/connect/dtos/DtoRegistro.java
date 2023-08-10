package com.postgresql.connect.dtos;

import lombok.Data;

@Data
public class DtoRegistro {
    private Long usu_persona;
    private String login;
    private String password;
    private Long estado;
}
