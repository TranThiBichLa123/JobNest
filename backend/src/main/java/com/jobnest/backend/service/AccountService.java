package com.jobnest.backend.service;

import com.jobnest.backend.dto.RegisterRequest;
import com.jobnest.backend.entities.Account;

public interface AccountService {
Account register(RegisterRequest req);

Account registerWithGoogle(String email, String name, String picture, String googleId);
    
}
