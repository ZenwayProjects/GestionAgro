package com.postgresql.connect.controller;

import com.postgresql.connect.model.Perfil;
import com.postgresql.connect.repo.PerfilRepo;


import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.lang.reflect.Array;
import java.util.Arrays;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;



class PerfilControllerTest {


    @Mock
    PerfilRepo perfilRepo;

    @InjectMocks
    PerfilController PerfilController;

    Perfil perfil;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);
        perfil = new Perfil();
        perfil.setId(1L);
        perfil.setPerfil("ADMIN");
        perfil.setNombre("Obrero23");
        perfil.setEstado(1);

    }

    @Test
    void getAllPerfiles() {
        when(perfilRepo.findAll()).thenReturn(Arrays.asList(perfil));
        assertNotNull(PerfilController.getAllPerfiles());
    }

    @Test
    void addPerfil() {
        when(perfilRepo.save(any(Perfil.class))).thenReturn(perfil);
        PerfilController.addPerfil(perfil);
        verify(perfilRepo, times(1)).save(any(Perfil.class));
    }

    @Test
    void deleteById() {
        Long perfilId = 1L;
        doNothing().when(perfilRepo).deleteById(perfilId);
        PerfilController.deleteById(perfilId);
        verify(perfilRepo, times(1)).deleteById(perfilId);
    }

    @Test
    void updatePerfil() {
        Long perfilId = 1L;
        Perfil perfilActualizado = new Perfil();
        perfilActualizado.setId(perfilId);
        perfilActualizado.setPerfil("Nuevo2 Perfil");
        perfilActualizado.setNombre("Nuevo2 Nombre");
        perfilActualizado.setEstado(0);

        when(perfilRepo.findById(perfilId)).thenReturn(Optional.of(perfil));
        when(perfilRepo.save(any(Perfil.class))).thenReturn(perfilActualizado);

        Perfil resultado = PerfilController.updatePerfil(perfilId, perfilActualizado);

        assertNotNull(resultado);
        assertEquals(perfilId, resultado.getId());
        assertEquals("Nuevo2 Perfil", resultado.getPerfil());
        assertEquals("Nuevo2 Nombre", resultado.getNombre());
        assertEquals(0, resultado.getEstado());

        verify(perfilRepo, times(1)).findById(perfilId);
        verify(perfilRepo, times(1)).save(any(Perfil.class));
    }
}