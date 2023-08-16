package com.postgresql.connect.specs;
import com.postgresql.connect.model.Persona;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;




public class PersonaSpecs {
    public static Specification<Persona> searchByCriteria(String searchCriteria) {
        return (root, query, cb) -> {
            if (searchCriteria == null || searchCriteria.isEmpty()) {
                return null;
            }

            String likePattern = "%" + searchCriteria.toLowerCase() + "%";

            return cb.or(
                    root.getModel().getDeclaredSingularAttributes().stream()
                            .filter(attribute -> attribute.getJavaType() == String.class)
                            .map(attribute -> cb.like(cb.lower(root.get(attribute.getName())), likePattern))
                            .toArray(Predicate[]::new)
            );
        };
    }

}
