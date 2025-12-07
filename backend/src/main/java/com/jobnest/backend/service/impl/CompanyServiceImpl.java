package com.jobnest.backend.service.impl;

import com.jobnest.backend.dto.response.CompanyResponse;
import com.jobnest.backend.repository.CompanyRepository;
import com.jobnest.backend.service.CompanyService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CompanyServiceImpl implements CompanyService {
    
    private final CompanyRepository companyRepository;
    
    @Override
    public List<CompanyResponse> getTopCompanies() {
        List<Object[]> results = companyRepository.findTopCompaniesByJobCount();
        
        return results.stream()
                .map(row -> new CompanyResponse(
                    (Long) row[0],      // id
                    (String) row[1],    // name
                    (String) row[2],    // logoUrl
                    (String) row[3],    // industry
                    (String) row[4],    // address
                    (Boolean) row[5],   // verified
                    (Long) row[6]       // openPositions (job count)
                ))
                .collect(Collectors.toList());
    }
}
