package com.jobnest.backend.repository;

import com.jobnest.backend.entities.JobCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface JobCategoryRepository extends JpaRepository<JobCategory, Long> {
    
    Optional<JobCategory> findBySlug(String slug);
    
    Optional<JobCategory> findByName(String name);
    
    @Query("SELECT c FROM JobCategory c ORDER BY c.name ASC")
    List<JobCategory> findAllOrderByName();
}
