package com.postgresql.connect.controller;

import com.postgresql.connect.specs.IdiomaSpecs;
import com.postgresql.connect.model.Idioma;
import com.postgresql.connect.repo.IdiomaRepo;
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
@RequestMapping("/api/idioma/")
public class IdiomaController {

    @Autowired
    IdiomaRepo idiomaRepo;


    @PostMapping("create")
    public void addIdioma(@RequestBody Idioma idioma) {
        idiomaRepo.save(idioma);
    }


    @GetMapping("list")
    public List<Idioma> getAllIdiomas() {
        return idiomaRepo.findAll();
    }

    @GetMapping("listbyparams")
    public ResponseEntity<PaginatedResponse<Idioma>> getAllIdiomas2(
            @RequestParam("limite") int limite,
            @RequestParam("offset") int offset,
            @RequestParam(value = "busqueda", required = false) String busqueda
    ) {


        Pageable pageable = PageRequest.of(offset, limite);
        Page<Idioma> page;

        Specification<Idioma> specs = IdiomaSpecs.searchByCriteria(busqueda); // Crear la especificación

        if (busqueda != null && !busqueda.isEmpty()) {
            page = idiomaRepo.findAll(specs, pageable); // Utilizar la especificación en la consulta
        } else {
            page = idiomaRepo.findAll(pageable);
        }

        List<Idioma> idiomas = page.getContent();
        long totalRecords;

        if (busqueda != null && !busqueda.isEmpty()) {
            totalRecords = idiomaRepo.count(specs); // Contar utilizando la especificación
        } else {
            totalRecords = idiomaRepo.count();
        }

        PaginatedResponse<Idioma> response = new PaginatedResponse<>(idiomas, totalRecords);


        // Devolver la respuesta con el código de estado 200 (OK)
        return ResponseEntity.ok(response);
    }

    @GetMapping("getidioma")
    public ResponseEntity getIdiom(
            @RequestParam("busqueda") String busqueda
    ) {
        List<String> jsonDataList = idiomaRepo.findCampoJsonByNombre(busqueda);

        if (jsonDataList != null && !jsonDataList.isEmpty()) {
            String jsonData = jsonDataList.get(0);

            // Devolver el JSON del registro encontrado con el código de estado 200 (OK)
            return ResponseEntity.ok(jsonData);
        } else {
            // Si no se encuentra ningún registro, devolver un mensaje de error con el código de estado 404 (Not Found)
            return ResponseEntity.notFound().build();
        }
    }


    @DeleteMapping("delete/{id}")
    public void deleteById(@PathVariable Long id){
        idiomaRepo.deleteById(id);
    }

    @GetMapping("{id}")
    public ResponseEntity<Idioma> getIdiomaById(@PathVariable Long id) {
        Optional<Idioma> Idioma = idiomaRepo.findById(id);
        if (Idioma.isPresent()) {
            return ResponseEntity.ok(Idioma.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("update/{id}")
    public Idioma updateIdioma(@PathVariable Long id, @RequestBody Idioma idioma) {
        Optional<Idioma> IdiomaExistenteOptional = idiomaRepo.findById(id);
        if (IdiomaExistenteOptional.isPresent()) {
            Idioma idiomaExistente = IdiomaExistenteOptional.get();
            idiomaExistente.setNombre(idioma.getNombre());
            idiomaExistente.setContenido(idioma.getContenido());
            idiomaExistente.setEstado(idioma.getEstado());
            return idiomaRepo.save(idiomaExistente);
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Idioma no encontrado");
        }
    }



}
