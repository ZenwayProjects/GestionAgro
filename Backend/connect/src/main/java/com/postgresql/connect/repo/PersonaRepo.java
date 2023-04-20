package com.postgresql.connect.repo;

import com.postgresql.connect.model.Persona;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PersonaRepo extends JpaRepository<Persona, Long> {

}
