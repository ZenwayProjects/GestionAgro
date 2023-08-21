package com.postgresql.connect.controller;

import com.postgresql.connect.model.Perfil;
import com.postgresql.connect.model.Perfil;
import com.postgresql.connect.repo.PerfilRepo;
import com.postgresql.connect.specs.PerfilSpecs;
import com.postgresql.connect.utils.PaginatedResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/perfil/")

public class PerfilController {

    @Autowired
    PerfilRepo perfilRepo;


    @PostMapping("create")
    public void addPerfil(@RequestBody Perfil perfil){
        perfilRepo.save(perfil);
    }

    @GetMapping("list")
    public List<Perfil> getAllPerfiles(){
        return perfilRepo.findAll();
    }

    @GetMapping("listbyparams")
    public ResponseEntity<PaginatedResponse<Perfil>> getAllPerfils2(
            @RequestParam("limite") int limite,
            @RequestParam("offset") int offset,
            @RequestParam(value = "busqueda", required = false) String busqueda
    ) {




        Pageable pageable = PageRequest.of(offset, limite);
        Page<Perfil> page;

        Specification<Perfil> specs = PerfilSpecs.searchByCriteria(busqueda); // Crear la especificación

        if (busqueda != null && !busqueda.isEmpty()) {
            page = perfilRepo.findAll(specs, pageable); // Utilizar la especificación en la consulta
        } else {
            page = perfilRepo.findAll(pageable);
        }

        List<Perfil> perfiles = page.getContent();
        long totalRecords;

        if (busqueda != null && !busqueda.isEmpty()) {
            totalRecords = perfilRepo.count(specs); // Contar utilizando la especificación
        } else {
            totalRecords = perfilRepo.count();
        }

        PaginatedResponse<Perfil> response = new PaginatedResponse<>(perfiles, totalRecords);


        // Devolver la respuesta con el código de estado 200 (OK)
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("delete/{id}")
    public void deleteById(@PathVariable Long id){
        perfilRepo.deleteById(id);
    }

    @PutMapping("update/{id}")
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
