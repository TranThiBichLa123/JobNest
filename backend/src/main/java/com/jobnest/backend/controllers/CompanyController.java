package com.jobnest.backend.controllers;

import com.jobnest.backend.dto.response.CompanyResponse;
import com.jobnest.backend.service.CompanyService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/companies")
@RequiredArgsConstructor
public class CompanyController {
    
    private final CompanyService companyService;
    
    @GetMapping("/top")
    public ResponseEntity<List<CompanyResponse>> getTopCompanies() {
        return ResponseEntity.ok(companyService.getTopCompanies());
    }
}
