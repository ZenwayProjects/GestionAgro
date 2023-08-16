package com.postgresql.connect.controller;

import com.postgresql.connect.model.UsuarioPerfil;
import com.postgresql.connect.repo.UsuarioPerfilRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@RestController

public class UsuarioPerfilController {

    @Autowired
    UsuarioPerfilRepo usuarioPerfilRepo;

    @PostMapping("api/usuarioperfil/create")
    public void addUsuarioPerfil(@RequestBody UsuarioPerfil usuarioPerfil) {
        usuarioPerfilRepo.save(usuarioPerfil);
    }

    @GetMapping("api/usuarioperfil/list")
    public List<UsuarioPerfil> getAllUsuarioPerfiles() {
        return usuarioPerfilRepo.findAll();
    }

    @DeleteMapping("api/usuarioperfil/delete/{id}")
    public void deleteById(@PathVariable Long id){
        usuarioPerfilRepo.deleteById(id);
    }

    @GetMapping("api/usuarioperfil/{id}")
    public ResponseEntity<UsuarioPerfil> getUsuarioPerfilById(@PathVariable Long id) {
        Optional<UsuarioPerfil> usuarioPerfil = usuarioPerfilRepo.findById(id);
        if (usuarioPerfil.isPresent()) {
            return ResponseEntity.ok(usuarioPerfil.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("api/usuarioperfil/update/{id}")
    public UsuarioPerfil updateUsuarioPerfil(@PathVariable Long id, @RequestBody UsuarioPerfil usuarioPerfil) {
        Optional<UsuarioPerfil> usuarioPerfilExistenteOptional = usuarioPerfilRepo.findById(id);
        if (usuarioPerfilExistenteOptional.isPresent()) {
            UsuarioPerfil usuarioPerfilExistente = usuarioPerfilExistenteOptional.get();
            /*usuarioPerfilExistente.setUsp_usuario(usuarioPerfil.getUsp_usuario());
            usuarioPerfilExistente.setUsp_perfil(usuarioPerfil.getUsp_perfil());*/
            usuarioPerfilExistente.setUsp_estado(usuarioPerfil.getUsp_estado());
            return usuarioPerfilRepo.save(usuarioPerfilExistente);
        }else{
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "UsuarioPerfil no encontrado");
        }
    }

}