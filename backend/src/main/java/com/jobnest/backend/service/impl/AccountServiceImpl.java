package com.jobnest.backend.service.impl;

import com.jobnest.backend.dto.RegisterRequest;
import com.jobnest.backend.entities.Account;
import com.jobnest.backend.repository.UserRepository;
import com.jobnest.backend.service.AccountService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AccountServiceImpl implements AccountService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public Account register(RegisterRequest req) {

        if (userRepository.existsByEmail(req.getEmail())) {
            throw new RuntimeException("Email already in use!");
        }

        Account acc = new Account();
        acc.setFullName(req.getFullName());
        acc.setEmail(req.getEmail());
        acc.setPhoneNumber(req.getPhoneNumber());
        acc.setPasswordHash(passwordEncoder.encode(req.getPassword()));
        acc.setRole("candidate");

        return userRepository.save(acc);
    }

    @Override
    public Account registerWithGoogle(String email, String name, String picture, String googleId) {

        // Nếu user đã tồn tại → Login
        java.util.Optional<Account> opt = userRepository.findByEmail(email);
        if (opt.isPresent())
            return opt.get();

        // Nếu chưa tồn tại → Register mới
        Account acc = new Account();
        acc.setEmail(email);
        acc.setFullName(name);
        acc.setAvatarUrl(picture);
        acc.setGoogleId(googleId);
        acc.setRole("candidate");

        return userRepository.save(acc);
    }

}
