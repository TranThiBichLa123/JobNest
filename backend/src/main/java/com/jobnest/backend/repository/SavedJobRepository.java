package com.jobnest.backend.repository;

import com.jobnest.backend.entities.SavedJob;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SavedJobRepository extends JpaRepository<SavedJob, SavedJob.SavedJobId> {
    
    @Query("SELECT sj FROM SavedJob sj WHERE sj.id.userId = :userId")
    List<SavedJob> findByUserId(@Param("userId") Long userId);
    
    @Query("SELECT COUNT(sj) FROM SavedJob sj WHERE sj.id.jobId = :jobId")
    long countByJobId(@Param("jobId") Long jobId);
    
    @Query("SELECT CASE WHEN COUNT(sj) > 0 THEN true ELSE false END FROM SavedJob sj " +
           "WHERE sj.id.userId = :userId AND sj.id.jobId = :jobId")
    boolean existsByUserIdAndJobId(@Param("userId") Long userId, @Param("jobId") Long jobId);
}
