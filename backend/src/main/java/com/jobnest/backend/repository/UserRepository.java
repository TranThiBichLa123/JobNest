package com.jobnest.backend.repository;
import com.jobnest.backend.entities.Account;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<Account, Long> {
    Optional<Account> findByEmail(String email);
    Optional<Account> findByUsername(String username);
    boolean existsByEmail(String email);
    boolean existsByUsername(String username);
}
