package com.jobnest.backend.entities;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Table(name = "jobs")
@Data
public class Job {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "employer_id", nullable = false)
    private Long employerId;

    @Column(name = "company_id")
    private Long companyId;

    @Column(nullable = false, length = 200)
    private String title;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String description;

    @Column(nullable = false, length = 100)
    private String category;

    @Column(nullable = false, length = 150)
    private String location;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private JobType type;

    @Column(name = "min_salary")
    private Integer minSalary;

    @Column(name = "max_salary")
    private Integer maxSalary;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private JobStatus status = JobStatus.active;

    @Column(name = "posted_at", nullable = false, updatable = false)
    private LocalDateTime postedAt = LocalDateTime.now();

    @Column(name = "updated_at")
    private LocalDateTime updatedAt = LocalDateTime.now();

    @Column(name = "expires_at")
    private LocalDateTime expiresAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "employer_id", insertable = false, updatable = false)
    private Account employer;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "company_id", insertable = false, updatable = false)
    private Company company;

    public enum JobType {
        fulltime, parttime, intern, remote
    }

    public enum JobStatus {
        active, hidden, expired
    }

    @PreUpdate
    public void preUpdate() {
        this.updatedAt = LocalDateTime.now();
    }
}
