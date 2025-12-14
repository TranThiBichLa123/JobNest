package com.jobnest.backend.security.filter;

import com.jobnest.backend.security.user.CustomUserDetails;
import com.jobnest.backend.security.user.CustomUserDetailsService;
import com.jobnest.backend.utils.JwtUtil;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private CustomUserDetailsService userDetailsService;

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {
        String path = request.getServletPath();

        return
            // AUTH (KHÔNG BAO GỒM /me)
            path.equals("/api/auth/login")
            || path.equals("/api/auth/register")
            || path.equals("/api/auth/refresh")
            || path.startsWith("/api/auth/google")

            // DOCS
            || path.startsWith("/swagger-ui")
            || path.startsWith("/v3/api-docs")

            // PUBLIC APIs
            || path.startsWith("/api/jobs")
            || path.matches("^/api/employers/\\d+/jobs$");
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                HttpServletResponse response,
                                FilterChain filterChain)
        throws ServletException, IOException {

    String authHeader = request.getHeader("Authorization");

    if (authHeader == null || !authHeader.startsWith("Bearer ")) {
        filterChain.doFilter(request, response);
        return;
    }

    String token = authHeader.substring(7);

    // Sử dụng validateToken(token, userDetails) đúng signature
    String email = jwtUtil.extractEmail(token);

    CustomUserDetails userDetails =
            (CustomUserDetails) userDetailsService.loadUserByUsername(email);

    if (!jwtUtil.validateToken(token, userDetails)) {
        filterChain.doFilter(request, response);
        return;
    }

    UsernamePasswordAuthenticationToken authentication =
            new UsernamePasswordAuthenticationToken(
                    userDetails,
                    null,
                    userDetails.getAuthorities()
            );

    authentication.setDetails(
            new WebAuthenticationDetailsSource().buildDetails(request)
    );

    // 🔥🔥🔥 DÒNG SỐNG CÒN
    SecurityContextHolder.getContext().setAuthentication(authentication);

    filterChain.doFilter(request, response);
}

}
