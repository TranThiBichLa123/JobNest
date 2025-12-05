package com.jobnest.backend.repository;

import com.jobnest.backend.entities.JobView;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JobViewRepository extends JpaRepository<JobView, Long> {
    long countByJobId(Long jobId);
    boolean existsByJobIdAndViewerId(Long jobId, Long viewerId);
    boolean existsByJobIdAndViewerIp(Long jobId, String viewerIp);
}
