package com.postgresql.connect.repo;

import com.postgresql.connect.model.Idioma;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IdiomaRepo extends JpaRepository<Idioma, Long>, JpaSpecificationExecutor<Idioma> {

    @Query("SELECT i.contenido FROM Idioma i WHERE i.nombre = :busqueda")
    List<String> findCampoJsonByNombre(@Param("busqueda") String busqueda);

}
