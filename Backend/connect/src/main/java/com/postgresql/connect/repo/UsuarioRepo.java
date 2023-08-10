package com.postgresql.connect.repo;

import com.postgresql.connect.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsuarioRepo extends JpaRepository <Usuario, Long> {

}
