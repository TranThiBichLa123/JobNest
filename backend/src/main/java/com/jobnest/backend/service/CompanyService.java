package com.jobnest.backend.service;

import com.jobnest.backend.dto.request.CreateCompanyRequest;
import com.jobnest.backend.dto.response.CompanyResponse;
import com.jobnest.backend.entities.Account;

import java.util.List;

public interface CompanyService {
    List<CompanyResponse> getTopCompanies();
        CompanyResponse createCompany(Account employer, CreateCompanyRequest request);

}
