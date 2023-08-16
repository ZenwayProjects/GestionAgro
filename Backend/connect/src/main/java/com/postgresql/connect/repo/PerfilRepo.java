package com.postgresql.connect.repo;

import com.postgresql.connect.model.Perfil;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PerfilRepo extends JpaRepository <Perfil, Long> {

    //Metodo para buscar roles por su per_perfil en nuestra base de datos
    Optional<Perfil> findByPerfil(String per_perfil);

}
