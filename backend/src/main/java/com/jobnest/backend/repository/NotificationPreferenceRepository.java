package com.jobnest.backend.repository;

import com.jobnest.backend.entities.NotificationPreference;
import com.jobnest.backend.entities.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface NotificationPreferenceRepository extends JpaRepository<NotificationPreference, Long> {
    Optional<NotificationPreference> findByAccount(Account account);
}
