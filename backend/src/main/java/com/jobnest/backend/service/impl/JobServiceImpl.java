package com.jobnest.backend.service.impl;

import com.jobnest.backend.dto.ExtendJobRequest;
import com.jobnest.backend.dto.JobRequest;
import com.jobnest.backend.dto.JobResponse;
import com.jobnest.backend.entities.*;
import com.jobnest.backend.repository.UserRepository;
import com.jobnest.backend.repository.AuditLogRepository;
import com.jobnest.backend.repository.CompanyRepository;
import com.jobnest.backend.repository.JobRepository;
import com.jobnest.backend.repository.JobViewRepository;
import com.jobnest.backend.repository.SavedJobRepository;
import com.jobnest.backend.service.JobService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class JobServiceImpl implements JobService {

    private final JobRepository jobRepository;
    private final JobViewRepository jobViewRepository;
    private final SavedJobRepository savedJobRepository;
    private final CompanyRepository companyRepository;
    private final UserRepository userRepository;
    private final AuditLogRepository auditLogRepository;

    // ==================== CANDIDATE OPERATIONS ====================

    @Override
    public Page<JobResponse> getAllActiveJobs(Pageable pageable) {
        return jobRepository.findByStatus(Job.JobStatus.active, pageable)
                .map(this::convertToResponse);
    }

    @Override
    public Page<JobResponse> searchActiveJobs(String keyword, Pageable pageable) {
        return jobRepository.searchActiveJobs(keyword, pageable)
                .map(this::convertToResponse);
    }

    @Override
    @Transactional
    public JobResponse getJobById(Long id, Long viewerId, String viewerIp) {
        Job job = jobRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Job not found"));

        // Record view if not already viewed
        boolean alreadyViewed = false;
        if (viewerId != null) {
            alreadyViewed = jobViewRepository.existsByJobIdAndViewerId(id, viewerId);
        } else if (viewerIp != null) {
            alreadyViewed = jobViewRepository.existsByJobIdAndViewerIp(id, viewerIp);
        }

        if (!alreadyViewed) {
            JobView jobView = new JobView();
            jobView.setJobId(id);
            jobView.setViewerId(viewerId);
            jobView.setViewerIp(viewerIp);
            jobViewRepository.save(jobView);
        }

        JobResponse response = convertToResponse(job);
        response.setViewCount(jobViewRepository.countByJobId(id));
        if (viewerId != null) {
            response.setIsSaved(savedJobRepository.existsByUserIdAndJobId(viewerId, id));
        }
        return response;
    }

    // ==================== EMPLOYER OPERATIONS ====================

    @Override
    @Transactional
    public JobResponse createJob(Long employerId, JobRequest request) {
        // Verify employer exists
        userRepository.findById(employerId)
                .orElseThrow(() -> new RuntimeException("Employer not found"));

        Job job = new Job();
        job.setEmployerId(employerId);
        job.setTitle(request.getTitle());
        job.setDescription(request.getDescription());
        job.setCategory(request.getCategory());
        job.setLocation(request.getLocation());
        job.setType(request.getType());
        job.setMinSalary(request.getMinSalary());
        job.setMaxSalary(request.getMaxSalary());
        job.setStatus(Job.JobStatus.active);
        job.setExpiresAt(LocalDateTime.now().plusDays(30)); // Default 30 days

        Job saved = jobRepository.save(job);
        return convertToResponse(saved);
    }

    @Override
    @Transactional
    public JobResponse updateJob(Long employerId, Long jobId, JobRequest request) {
        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new RuntimeException("Job not found"));

        if (!job.getEmployerId().equals(employerId)) {
            throw new RuntimeException("Not authorized to update this job");
        }

        job.setTitle(request.getTitle());
        job.setDescription(request.getDescription());
        job.setCategory(request.getCategory());
        job.setLocation(request.getLocation());
        job.setType(request.getType());
        job.setMinSalary(request.getMinSalary());
        job.setMaxSalary(request.getMaxSalary());

        Job updated = jobRepository.save(job);
        return convertToResponse(updated);
    }

    @Override
    @Transactional
    public void hideJob(Long employerId, Long jobId) {
        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new RuntimeException("Job not found"));

        if (!job.getEmployerId().equals(employerId)) {
            throw new RuntimeException("Not authorized to hide this job");
        }

        job.setStatus(Job.JobStatus.hidden);
        jobRepository.save(job);
    }

    @Override
    @Transactional
    public void unhideJob(Long employerId, Long jobId) {
        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new RuntimeException("Job not found"));

        if (!job.getEmployerId().equals(employerId)) {
            throw new RuntimeException("Not authorized to unhide this job");
        }

        job.setStatus(Job.JobStatus.active);
        jobRepository.save(job);
    }

    @Override
    @Transactional
    public void extendJob(Long employerId, Long jobId, ExtendJobRequest request) {
        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new RuntimeException("Job not found"));

        if (!job.getEmployerId().equals(employerId)) {
            throw new RuntimeException("Not authorized to extend this job");
        }

        LocalDateTime newExpiresAt = job.getExpiresAt() != null 
                ? job.getExpiresAt().plusDays(request.getDays())
                : LocalDateTime.now().plusDays(request.getDays());
        
        job.setExpiresAt(newExpiresAt);
        jobRepository.save(job);
    }

    @Override
    public Page<JobResponse> getEmployerJobs(Long employerId, Pageable pageable) {
        return jobRepository.findByEmployerId(employerId, pageable)
                .map(this::convertToResponse);
    }

    @Override
    public List<JobResponse> getAllEmployerJobs(Long employerId) {
        return jobRepository.findByEmployerId(employerId).stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    // ==================== ADMIN OPERATIONS ====================

    @Override
    public Page<JobResponse> getAllJobs(Pageable pageable) {
        return jobRepository.findAll(pageable)
                .map(this::convertToResponse);
    }

    @Override
    @Transactional
    public void approveJob(Long adminId, Long jobId) {
        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new RuntimeException("Job not found"));

        job.setStatus(Job.JobStatus.active);
        jobRepository.save(job);

        logAdminAction(adminId, "APPROVE_JOB", "Job", jobId, 
                "Approved job: " + job.getTitle());
    }

    @Override
    @Transactional
    public void rejectJob(Long adminId, Long jobId) {
        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new RuntimeException("Job not found"));

        job.setStatus(Job.JobStatus.hidden);
        jobRepository.save(job);

        logAdminAction(adminId, "REJECT_JOB", "Job", jobId, 
                "Rejected job: " + job.getTitle());
    }

    @Override
    @Transactional
    public void adminHideJob(Long adminId, Long jobId) {
        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new RuntimeException("Job not found"));

        job.setStatus(Job.JobStatus.hidden);
        jobRepository.save(job);

        logAdminAction(adminId, "HIDE_JOB", "Job", jobId, 
                "Hidden job: " + job.getTitle());
    }

    @Override
    @Transactional
    public void restoreJob(Long adminId, Long jobId) {
        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new RuntimeException("Job not found"));

        job.setStatus(Job.JobStatus.active);
        jobRepository.save(job);

        logAdminAction(adminId, "RESTORE_JOB", "Job", jobId, 
                "Restored job: " + job.getTitle());
    }

    // ==================== SAVED JOBS ====================

    @Override
    @Transactional
    public void saveJob(Long userId, Long jobId) {
        if (!jobRepository.existsById(jobId)) {
            throw new RuntimeException("Job not found");
        }

        SavedJob.SavedJobId id = new SavedJob.SavedJobId();
        id.setUserId(userId);
        id.setJobId(jobId);

        if (!savedJobRepository.existsById(id)) {
            SavedJob savedJob = new SavedJob();
            savedJob.setId(id);
            savedJobRepository.save(savedJob);
        }
    }

    @Override
    @Transactional
    public void unsaveJob(Long userId, Long jobId) {
        SavedJob.SavedJobId id = new SavedJob.SavedJobId();
        id.setUserId(userId);
        id.setJobId(jobId);
        savedJobRepository.deleteById(id);
    }

    @Override
    public List<JobResponse> getSavedJobs(Long userId) {
        return savedJobRepository.findByUserId(userId).stream()
                .map(savedJob -> {
                    Job job = savedJob.getJob();
                    JobResponse response = convertToResponse(job);
                    response.setIsSaved(true);
                    return response;
                })
                .collect(Collectors.toList());
    }

    // ==================== HELPER METHODS ====================

    private JobResponse convertToResponse(Job job) {
        JobResponse response = new JobResponse(job);
        
        // Get employer name
        userRepository.findById(job.getEmployerId()).ifPresent(account -> {
            response.setEmployerName(account.getUsername());
        });
        
        // Get company info if exists
        List<Company> companies = companyRepository.findByEmployerId(job.getEmployerId());
        if (!companies.isEmpty()) {
            Company company = companies.get(0);
            response.setCompanyName(company.getName());
            response.setCompanyLogo(company.getLogoUrl());
        }
        
        return response;
    }

    private void logAdminAction(Long adminId, String action, String targetType, 
                                 Long targetId, String details) {
        AuditLog log = new AuditLog();
        log.setAdminId(adminId);
        log.setAction(action);
        log.setTargetType(targetType);
        log.setTargetId(targetId);
        log.setDetails(details);
        auditLogRepository.save(log);
    }
}
