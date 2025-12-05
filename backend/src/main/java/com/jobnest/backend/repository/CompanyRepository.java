package com.jobnest.backend.repository;

import com.jobnest.backend.entities.Company;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CompanyRepository extends JpaRepository<Company, Long> {
    List<Company> findByEmployerId(Long employerId);
    Optional<Company> findByEmployerIdAndId(Long employerId, Long id);
    boolean existsByEmployerIdAndName(Long employerId, String name);
}
