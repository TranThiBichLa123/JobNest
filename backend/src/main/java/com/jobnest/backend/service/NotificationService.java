package com.jobnest.backend.service;

import com.jobnest.backend.dto.response.NotificationResponse;
import com.jobnest.backend.entities.Account;
import com.jobnest.backend.entities.Job;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface NotificationService {

    Page<NotificationResponse> getNotificationsByRecipient(Long recipientId, Pageable pageable);

    NotificationResponse getNotificationDetail(Long notificationId, Long recipientId);

    void markAsRead(Long notificationId, Long recipientId);

    void markAllAsRead(Long recipientId);

    void deleteNotification(Long notificationId, Long recipientId);

    long countUnread(Long recipientId);

    void createNotification(
        Long recipientId,
        String title,
        String message,
        String type,
        Long referenceId
    );

    // Overload: createNotification cho Account trực tiếp
    void createNotification(
        Account recipient,
        String title,
        String message,
        String type,
        Long referenceId
    );

    void notifyCandidateAppliedJob(
        Account candidate,
        Job job
    );

    List<NotificationResponse> getNotificationsByUser(Account account);
}
