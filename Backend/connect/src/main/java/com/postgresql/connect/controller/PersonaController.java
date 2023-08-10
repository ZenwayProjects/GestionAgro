package com.postgresql.connect.controller;

import com.postgresql.connect.model.Persona;
import com.postgresql.connect.repo.PersonaRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;


import java.util.List;
import java.util.Optional;

@RestController
public class PersonaController {

    @Autowired
    PersonaRepo personaRepo;


    @PostMapping("api/persona/create")
    public void addPersona(@RequestBody Persona persona) {
        personaRepo.save(persona);
    }

    @GetMapping("api/persona/list")
    public List<Persona> getAllPersonas() {
        return personaRepo.findAll();
    }

    @DeleteMapping("api/persona/delete/{id}")
    public void deleteById(@PathVariable Long id){
        personaRepo.deleteById(id);
    }

    @GetMapping("api/persona/{id}")
    public ResponseEntity<Persona> getPersonaById(@PathVariable Long id) {
        Optional<Persona> persona = personaRepo.findById(id);
        if (persona.isPresent()) {
            return ResponseEntity.ok(persona.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("api/persona/update/{id}")
    public Persona updatePersona(@PathVariable Long id, @RequestBody Persona persona) {
        Optional<Persona> personaExistenteOptional = personaRepo.findById(id);
        if (personaExistenteOptional.isPresent()) {
            Persona personaExistente = personaExistenteOptional.get();
            personaExistente.setNombre(persona.getNombre());
            personaExistente.setApellido(persona.getApellido());
            personaExistente.setGenero(persona.getGenero());
            personaExistente.setFechaNacimiento(persona.getFechaNacimiento());
            personaExistente.setEmail(persona.getEmail());
            personaExistente.setEstado(persona.getEstado());
            personaExistente.setIdentificacion(persona.getIdentificacion());
            personaExistente.setTipoIdentificacion(persona.getTipoIdentificacion());
            return personaRepo.save(personaExistente);
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Persona no encontrada");
        }
    }



}
