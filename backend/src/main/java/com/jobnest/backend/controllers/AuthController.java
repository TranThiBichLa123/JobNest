package com.jobnest.backend.controllers;

import com.jobnest.backend.dto.RegisterRequest;
import com.jobnest.backend.entities.Account;
import com.jobnest.backend.service.AccountService;
import com.jobnest.backend.service.GoogleService;
import com.jobnest.backend.security.user.CustomUserDetails;

import lombok.RequiredArgsConstructor;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AccountService userAccountService;
    private final GoogleService googleService;
    private final AccountService accountService;

    @PostMapping("/register")
    public Account register(@RequestBody RegisterRequest req) {
        return userAccountService.register(req);
    }

    @PostMapping("/google/verify")
    public ResponseEntity<?> verifyGoogle(@RequestBody Map<String, String> body) {

        String token = body.get("credential");
        var payload = googleService.verify(token);

        String email = payload.getEmail();
        String name = (String) payload.get("name");
        String picture = (String) payload.get("picture");
        String googleId = payload.getSubject();

        Account acc = accountService.registerWithGoogle(email, name, picture, googleId);

        return ResponseEntity.ok(acc);
    }

    @GetMapping("/me")
    public ResponseEntity<?> getMe(@AuthenticationPrincipal CustomUserDetails user) {
        if (user == null) {
            return ResponseEntity.status(401).body("Not logged in");
        }

        return ResponseEntity.ok(user.getAccount());
    }
}
