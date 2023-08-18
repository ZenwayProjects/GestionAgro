package com.postgresql.connect.controller;

import com.postgresql.connect.model.Usuario;
import com.postgresql.connect.repo.UsuarioRepo;
import com.postgresql.connect.specs.PersonaSpecs;
import com.postgresql.connect.model.Persona;
import com.postgresql.connect.repo.PersonaRepo;
import com.postgresql.connect.utils.PaginatedResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.ResponseEntity;


import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Pageable;

@RestController
@RequestMapping("/api/persona/")
public class PersonaController {

    @Autowired
    UsuarioRepo usuarioRepo;

    @Autowired
    PersonaRepo personaRepo;


    @PostMapping("create")
    public void addPersona(@RequestBody Persona persona) {
        personaRepo.save(persona);
    }

    @GetMapping("list")
    public List<Persona> getAllPersonas() {
        return personaRepo.findAll();
    }

    @GetMapping("listbyparams")
    public ResponseEntity<PaginatedResponse<Persona>> getAllPersonas2(
            @RequestParam("limite") int limite,
            @RequestParam("offset") int offset,
            @RequestParam(value = "busqueda", required = false) String busqueda
    ) {




        Pageable pageable = PageRequest.of(offset, limite);
        Page<Persona> page;

        Specification<Persona> specs = PersonaSpecs.searchByCriteria(busqueda); // Crear la especificación

        if (busqueda != null && !busqueda.isEmpty()) {
            page = personaRepo.findAll(specs, pageable); // Utilizar la especificación en la consulta
        } else {
            page = personaRepo.findAll(pageable);
        }

        List<Persona> personas = page.getContent();
        long totalRecords;

        if (busqueda != null && !busqueda.isEmpty()) {
            totalRecords = personaRepo.count(specs); // Contar utilizando la especificación
        } else {
            totalRecords = personaRepo.count();
        }

        PaginatedResponse<Persona> response = new PaginatedResponse<>(personas, totalRecords);


        // Devolver la respuesta con el código de estado 200 (OK)
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("delete/{id}")
    public ResponseEntity<String> deleteById(@PathVariable Long id){
        Optional<Persona> personaOptional = personaRepo.findById(id);

        if (personaOptional.isPresent()) {
            Persona persona = personaOptional.get();
            Usuario usuario = persona.getUsuario();

            if (usuario != null) {
                // Eliminar referencias en usuario_perfil si existen
                usuario.getPerfiles().clear(); // Asegura que los perfiles se desvinculen
                usuarioRepo.save(usuario); // Guarda el usuario actualizado

                usuarioRepo.delete(usuario); // Elimina el usuario

                // Ahora que el usuario no tiene referencias en usuario_perfil, se puede eliminar la persona
                personaRepo.delete(persona); // Elimina la persona
            }

            personaRepo.delete(persona); // Elimina la persona

            return ResponseEntity.ok("Persona y usuario eliminados correctamente.");
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("{id}")
    public ResponseEntity<Persona> getPersonaById(@PathVariable Long id) {
        Optional<Persona> persona = personaRepo.findById(id);
        if (persona.isPresent()) {
            return ResponseEntity.ok(persona.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("update/{id}")
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
            personaExistente.setDireccion(persona.getDireccion());
            personaExistente.setTelefono(persona.getTelefono());
            return personaRepo.save(personaExistente);
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Persona no encontrada");
        }
    }



}
