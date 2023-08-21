package com.postgresql.connect.repo;

import com.postgresql.connect.model.Persona;
import com.postgresql.connect.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.awt.*;
import java.util.Optional;

@Repository
public interface UsuarioRepo extends JpaRepository <Usuario, Long>, JpaSpecificationExecutor<Usuario> {

    //metodo para buscarlo por su login o username o lo que sea
    Optional<Usuario> findByLogin(String login);
    //Optional<Usuario> findByUsu_persona(Long usu_persona);

    //Metodo para verificar si un usuario existe en nuestra BD
    Boolean existsByLogin(String login);

}
