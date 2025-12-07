package com.jobnest.backend.service;

import com.jobnest.backend.dto.response.CompanyResponse;

import java.util.List;

public interface CompanyService {
    List<CompanyResponse> getTopCompanies();
}
