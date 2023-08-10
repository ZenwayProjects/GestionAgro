package com.postgresql.connect.repo;

import com.postgresql.connect.model.UsuarioPerfil;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsuarioPerfilRepo extends JpaRepository<UsuarioPerfil,Long> {
}
