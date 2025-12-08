package com.jobnest.backend.service.impl;

import com.jobnest.backend.dto.request.ApplicationRequest;
import com.jobnest.backend.dto.response.ApplicationResponse;
import com.jobnest.backend.entities.Application;
import com.jobnest.backend.entities.CandidateProfile;
import com.jobnest.backend.entities.Job;
import com.jobnest.backend.repository.ApplicationRepository;
import com.jobnest.backend.repository.CandidateProfileRepository;
import com.jobnest.backend.repository.JobRepository;
import com.jobnest.backend.service.ApplicationService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class ApplicationServiceImpl implements ApplicationService {

    private final ApplicationRepository applicationRepository;
    private final JobRepository jobRepository;
    private final CandidateProfileRepository candidateProfileRepository;

    @Override
    @Transactional
    public ApplicationResponse applyForJob(Long jobId, Long candidateId, ApplicationRequest request) {
        // Check if already applied
        if (applicationRepository.existsByJobIdAndCandidateId(jobId, candidateId)) {
            throw new RuntimeException("You have already applied for this job");
        }

        // Get job
        Job job = jobRepository.findById(jobId)
            .orElseThrow(() -> new RuntimeException("Job not found"));

        // Get candidate profile
        CandidateProfile candidate = candidateProfileRepository.findById(candidateId)
            .orElseThrow(() -> new RuntimeException("Candidate profile not found"));

        // Create application
        Application application = new Application();
        application.setJob(job);
        application.setCandidate(candidate);
        application.setCvId(request.getCvId());
        application.setCoverLetter(request.getCoverLetter());
        application.setResumeUrl(request.getResumeUrl());
        application.setStatus(Application.ApplicationStatus.PENDING);

        Application saved = applicationRepository.save(application);
        return new ApplicationResponse(saved);
    }

    @Override
    public boolean hasApplied(Long jobId, Long candidateId) {
        return applicationRepository.existsByJobIdAndCandidateId(jobId, candidateId);
    }

    @Override
    public Page<ApplicationResponse> getJobApplications(Long jobId, Pageable pageable) {
        Page<Application> applications = applicationRepository.findByJobId(jobId, pageable);
        return applications.map(ApplicationResponse::new);
    }

    @Override
    public Page<ApplicationResponse> getCandidateApplications(Long candidateId, Pageable pageable) {
        Page<Application> applications = applicationRepository.findByCandidateId(candidateId, pageable);
        return applications.map(ApplicationResponse::new);
    }

    @Override
    public ApplicationResponse getApplicationById(Long applicationId) {
        Application application = applicationRepository.findById(applicationId)
            .orElseThrow(() -> new RuntimeException("Application not found"));
        return new ApplicationResponse(application);
    }

    @Override
    @Transactional
    public ApplicationResponse updateApplicationStatus(Long applicationId, String status, String notes) {
        Application application = applicationRepository.findById(applicationId)
            .orElseThrow(() -> new RuntimeException("Application not found"));

        application.setStatus(Application.ApplicationStatus.valueOf(status.toUpperCase()));
        application.setNotes(notes);
        application.setReviewedAt(LocalDateTime.now());

        Application updated = applicationRepository.save(application);
        return new ApplicationResponse(updated);
    }

    @Override
    @Transactional
    public void withdrawApplication(Long applicationId, Long candidateId) {
        Application application = applicationRepository.findById(applicationId)
            .orElseThrow(() -> new RuntimeException("Application not found"));

        // Verify ownership
        if (!application.getCandidate().getId().equals(candidateId)) {
            throw new RuntimeException("You are not authorized to withdraw this application");
        }

        applicationRepository.delete(application);
    }

    @Override
    public long countApplications(Long jobId) {
        return applicationRepository.countByJobId(jobId);
    }
}
