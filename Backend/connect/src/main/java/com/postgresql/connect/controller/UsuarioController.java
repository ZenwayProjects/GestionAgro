package com.postgresql.connect.controller;

import com.postgresql.connect.model.Usuario;
import com.postgresql.connect.repo.UsuarioRepo;
import com.postgresql.connect.security.CustomUserDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/usuario/")
public class UsuarioController {
    @Autowired
    UsuarioRepo usuarioRepo;
    @Autowired
    private CustomUserDetails customUserDetails;

    /*@PostMapping("create")//Metodo viejo que ya no se usa, se debe usar el del RestControllerAuth
    public void addUsuario(@RequestBody Usuario usuario){
        usuarioRepo.save(usuario);
    }*/


    @GetMapping(value = "list")
    public List<Usuario> getAllUsuarios() {
        return usuarioRepo.findAll();
    }

    @GetMapping("mi-info")
    public ResponseEntity<Optional<Usuario>> obtenerMiInfo() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String login = authentication.getName();
        Optional<Usuario> usuario = usuarioRepo.findByLogin(login);

        if (usuario.isPresent()) {
            return ResponseEntity.ok(usuario);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("{id}")
    public ResponseEntity<Usuario> obtenerUsuarioPorId(@PathVariable Long id) {
        Optional<Usuario> usuarioOptional = usuarioRepo.findById(id);
        return usuarioOptional.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }



    @DeleteMapping("delete/{id}")
    public void deleteById(@PathVariable Long id){
        usuarioRepo.deleteById(id);
    }

    @PatchMapping("update/{id}")
    public Usuario updateUsuario(@PathVariable Long id, @RequestBody Usuario usuario) {
        Optional<Usuario> usuarioExistenteOptional = usuarioRepo.findById(id);
        if (usuarioExistenteOptional.isPresent()) {
            Usuario usuarioExistente = usuarioExistenteOptional.get();
            //usuarioExistente.setU_persona(usuario.getU_persona());

            usuarioExistente.setLogin(usuario.getLogin());
            usuarioExistente.setPassword(usuario.getPassword());
            usuarioExistente.setEstado(usuario.getEstado());
            return usuarioRepo.save(usuarioExistente);
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuario no encontrado");
        }
    }
}



