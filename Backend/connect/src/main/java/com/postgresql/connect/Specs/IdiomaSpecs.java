package com.postgresql.connect.Specs;
import com.postgresql.connect.model.Idioma;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;




public class IdiomaSpecs {
    public static Specification<Idioma> searchByCriteria(String searchCriteria) {
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
