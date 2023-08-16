package com.postgresql.connect.repo;

import com.postgresql.connect.model.UsuarioPerfil;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UsuarioPerfilRepo extends JpaRepository<UsuarioPerfil,Long> {

    //metodo para encontrar el usuario por su id
    //Optional<UsuarioPerfil> findByUsp_usuario(String usp_usuario);
}
