package com.jobnest.backend.dto;

import com.jobnest.backend.entities.Job;
import lombok.Data;

@Data
public class JobRequest {
    private Long companyId;
    private String title;
    private String description;
    private String category;
    private String location;
    private Job.JobType type;
    private Integer minSalary;
    private Integer maxSalary;
}
