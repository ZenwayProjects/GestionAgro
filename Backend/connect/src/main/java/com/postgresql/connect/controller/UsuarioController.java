package com.postgresql.connect.controller;

import com.postgresql.connect.model.Persona;
import com.postgresql.connect.model.Usuario;
import com.postgresql.connect.repo.UsuarioRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@RestController
public class UsuarioController {
    @Autowired
    UsuarioRepo usuarioRepo;

    @PostMapping("/api/usuario/create")
    public void addUsuario(@RequestBody Usuario usuario){usuarioRepo.save(usuario);
    }

    @GetMapping("api/usuario/list")
    public List<Usuario> getAllUsuarios() {
        return usuarioRepo.findAll();
    }

    @DeleteMapping("api/usuario/delete/{id}")
    public void deleteById(@PathVariable Long id){
        usuarioRepo.deleteById(id);
    }

    @PutMapping("api/usuario/update/{id}")
    public Usuario updateUsuario(@PathVariable Long id, @RequestBody Usuario usuario) {
        Optional<Usuario> usuarioExistenteOptional = usuarioRepo.findById(id);
        if (usuarioExistenteOptional.isPresent()) {
            Usuario usuarioExistente = usuarioExistenteOptional.get();
            usuarioExistente.setU_persona(usuario.getU_persona());
            usuarioExistente.setLogin(usuario.getLogin());
            usuarioExistente.setPassword(usuario.getPassword());
            usuarioExistente.setEstado(usuario.getEstado());
            return usuarioRepo.save(usuarioExistente);
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuario no encontrado");
        }
    }
}



