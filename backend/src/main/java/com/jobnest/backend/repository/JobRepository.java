package com.jobnest.backend.repository;

import com.jobnest.backend.entities.Job;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JobRepository extends JpaRepository<Job, Long> {
    
    // Candidate queries - only active jobs
    Page<Job> findByStatus(Job.JobStatus status, Pageable pageable);
    
    @Query("SELECT j FROM Job j WHERE j.status = 'active' AND " +
           "(LOWER(j.title) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(j.description) LIKE LOWER(CONCAT('%', :keyword, '%')))")
    Page<Job> searchActiveJobs(@Param("keyword") String keyword, Pageable pageable);
    
    // Count active jobs by category with JOIN
    @Query("SELECT c.id, c.name, c.slug, c.iconUrl, COUNT(j.id) " +
           "FROM JobCategory c LEFT JOIN Job j ON c.id = j.categoryId AND j.status = 'active' " +
           "GROUP BY c.id, c.name, c.slug, c.iconUrl " +
           "ORDER BY c.name ASC")
    List<Object[]> countActiveJobsByCategory();
    
    // Employer queries - their own jobs
    Page<Job> findByEmployerId(Long employerId, Pageable pageable);
    
    List<Job> findByEmployerId(Long employerId);
    
    @Query("SELECT j FROM Job j WHERE j.employerId = :employerId AND " +
           "LOWER(j.title) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    Page<Job> searchEmployerJobs(@Param("employerId") Long employerId, 
                                   @Param("keyword") String keyword, 
                                   Pageable pageable);
    
    // Admin queries - all jobs
    Page<Job> findAll(Pageable pageable);
    
    @Query("SELECT j FROM Job j WHERE " +
           "LOWER(j.title) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "CAST(j.employerId AS string) LIKE CONCAT('%', :keyword, '%')")
    Page<Job> searchAllJobs(@Param("keyword") String keyword, Pageable pageable);
    
    // Count by employer
    long countByEmployerId(Long employerId);
    
    // Count by status
    long countByStatus(Job.JobStatus status);
}
