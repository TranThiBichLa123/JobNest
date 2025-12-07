import api from './axios';
import { CandidateProfile, CandidateProfileRequest } from '@/types/profile';

export const API_URL = "http://localhost:8080/api";

export const jobApi = {
  // Get category statistics with full category info
  getCategoryStats: async () => {
    const response = await api.get('/jobs/categories/stats');
    return response.data;
  },
};

export const companyApi = {
  // Get top companies with active job counts
  getTopCompanies: async () => {
    const response = await api.get('/companies/top');
    return response.data;
  },
};

export const candidateProfileApi = {
  // Get current user's profile
  getMyProfile: async (): Promise<CandidateProfile> => {
    const response = await api.get('/candidate/profile');
    return response.data;
  },

  // Create or update profile
  updateMyProfile: async (data: CandidateProfileRequest): Promise<CandidateProfile> => {
    const response = await api.put('/candidate/profile', data);
    return response.data;
  },

  // Upload avatar
  uploadAvatar: async (file: File): Promise<{ avatarUrl: string; message: string }> => {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await api.post('/candidate/profile/avatar', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
};
