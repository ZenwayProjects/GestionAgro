package com.postgresql.connect.controller;

import com.postgresql.connect.model.Perfil;
import com.postgresql.connect.repo.PerfilRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@RestController

public class PerfilController {

    @Autowired
    PerfilRepo perfilRepo;


    @PostMapping("api/perfil/create")
    public void addPerfil(@RequestBody Perfil perfil){
        Perfil perfil2 = new Perfil();
        perfilRepo.save(perfil);
    }

    @GetMapping("api/perfil/list")
    public List<Perfil> getAllPerfiles(){
        return perfilRepo.findAll();
    }

    @DeleteMapping("api/perfil/delete/{id}")
    public void deleteById(@PathVariable Long id){
        perfilRepo.deleteById(id);
    }

    @PutMapping("api/perfil/update/{id}")
    public Perfil updatePerfil(@PathVariable Long id, @RequestBody Perfil perfil){
        Optional<Perfil> perfilExistenteOptional = perfilRepo.findById(id);
        if (perfilExistenteOptional.isPresent()) {
            Perfil perfilExistente = perfilExistenteOptional.get();
            perfilExistente.setNombre(perfil.getNombre());
            perfilExistente.setPerfil(perfil.getPerfil());
            perfilExistente.setEstado(perfil.getEstado());
            return perfilRepo.save(perfilExistente);
    }else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Perfil no encontrado");

        }

    }
}
