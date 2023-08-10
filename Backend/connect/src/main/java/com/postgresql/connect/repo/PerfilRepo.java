package com.postgresql.connect.repo;

import com.postgresql.connect.model.Perfil;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PerfilRepo extends JpaRepository <Perfil, Long> {
}
