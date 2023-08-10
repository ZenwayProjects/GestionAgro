package com.postgresql.connect.security;

import java.util.List;

public class RutaConfig {
    private String metodo;
    private String ruta;
    private List<String> roles;

    public RutaConfig() {
    }

    public RutaConfig(String metodo, String ruta, List<String> roles) {
        this.metodo = metodo;
        this.ruta = ruta;
        this.roles = roles;
    }

    public String getMetodo() {
        return metodo;
    }

    public void setMetodo(String metodo) {
        this.metodo = metodo;
    }

    public String getRuta() {
        return ruta;
    }

    public void setRuta(String ruta) {
        this.ruta = ruta;
    }

    public List<String> getRoles() {
        return roles;
    }

    public void setRoles(List<String> roles) {
        this.roles = roles;
    }
}

