package com.jobnest.backend.dto;

import com.jobnest.backend.entities.Job;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class JobResponse {
    private Long id;
    private Long employerId;
    private String employerName;
    private Long companyId;
    private String companyName;
    private String companyLogo;
    private String title;
    private String description;
    private String category;
    private String location;
    private Job.JobType type;
    private Integer minSalary;
    private Integer maxSalary;
    private Job.JobStatus status;
    private LocalDateTime postedAt;
    private LocalDateTime updatedAt;
    private LocalDateTime expiresAt;
    private Long viewCount;
    private Boolean isSaved;

    // Constructor from Job entity
    public JobResponse(Job job) {
        this.id = job.getId();
        this.employerId = job.getEmployerId();
        this.companyId = job.getCompanyId();
        this.title = job.getTitle();
        this.description = job.getDescription();
        this.category = job.getCategory();
        this.location = job.getLocation();
        this.type = job.getType();
        this.minSalary = job.getMinSalary();
        this.maxSalary = job.getMaxSalary();
        this.status = job.getStatus();
        this.postedAt = job.getPostedAt();
        this.updatedAt = job.getUpdatedAt();
        this.expiresAt = job.getExpiresAt();
    }
}
