package com.jobnest.backend.service;

import com.jobnest.backend.entities.Account;
import com.jobnest.backend.dto.request.RegisterRequest;

public interface UserService {
    Account register(RegisterRequest req);

}
