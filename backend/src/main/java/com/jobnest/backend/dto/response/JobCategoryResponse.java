package com.jobnest.backend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class JobCategoryResponse {
    private Long id;
    private String name;
    private String slug;
    private String iconUrl;
    private String description;
    private Long openPositions; // For stats
}
