package com.jobnest.backend.service;

import com.jobnest.backend.dto.request.NotificationPreferenceRequest;
import com.jobnest.backend.dto.response.NotificationPreferenceResponse;

public interface NotificationPreferenceService {
    NotificationPreferenceResponse getByAccountId(Long accountId);
    NotificationPreferenceResponse update(Long accountId, NotificationPreferenceRequest request);
}
