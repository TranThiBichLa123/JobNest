package com.jobnest.backend.repository;

import com.jobnest.backend.entities.JobView;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.Optional;

@Repository
public interface JobViewRepository extends JpaRepository<JobView, Long> {
    long countByJobId(Long jobId);
    boolean existsByJobIdAndViewerId(Long jobId, Long viewerId);
    boolean existsByJobIdAndViewerIp(Long jobId, String viewerIp);
    Page<JobView> findByViewerIdOrderByViewedAtDesc(Long viewerId, Pageable pageable);
    Optional<JobView> findFirstByJobIdAndViewerIdAndViewedAtAfterOrderByViewedAtDesc(
        Long jobId, Long viewerId, LocalDateTime viewedAt);
}
