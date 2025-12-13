package com.jobnest.backend.repository;

import com.jobnest.backend.entities.Account;
import com.jobnest.backend.entities.Notification;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long> {

    Page<Notification> findByRecipientIdOrderByCreatedAtDesc(
            Long recipientId, Pageable pageable
    );

    Optional<Notification> findByIdAndRecipientId(Long id, Long recipientId);

    long countByRecipientIdAndIsReadFalse(Long recipientId);

    @Modifying
    @Query("update Notification n set n.isRead = true where n.recipient.id = :recipientId")
    void markAllAsReadByRecipientId(Long recipientId);

    java.util.List<Notification> findByRecipient(Account recipient);
}
