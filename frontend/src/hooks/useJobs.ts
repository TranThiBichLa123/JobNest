import { useState, useCallback } from 'react';
import api from '@/lib/axios';
import { Job } from '@/types/job';

interface JobFilter {
  categoryId?: number;
  location?: string;
  type?: string;
  minSalary?: number;
  maxSalary?: number;
  search?: string;
  page?: number;
  limit?: number;
}

interface JobResponse {
  data: Job[];
  total: number;
  page: number;
  totalPages: number;
}

export const useJobs = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Get all jobs with filters
  const getJobs = useCallback(async (filters?: JobFilter): Promise<JobResponse | null> => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (filters?.categoryId) params.append('categoryId', filters.categoryId.toString());
      if (filters?.location) params.append('location', filters.location);
      if (filters?.type) params.append('type', filters.type);
      if (filters?.minSalary) params.append('minSalary', filters.minSalary.toString());
      if (filters?.maxSalary) params.append('maxSalary', filters.maxSalary.toString());
      if (filters?.search) params.append('search', filters.search);
      if (filters?.page) params.append('page', filters.page.toString());
      if (filters?.limit) params.append('limit', filters.limit.toString());

      const response = await api.get(`/jobs${params.toString() ? '?' + params.toString() : ''}`);
      return response.data;
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || 'Failed to fetch jobs';
      setError(errorMsg);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Get single job by ID
  const getJobById = useCallback(async (id: number): Promise<Job | null> => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get(`/jobs/${id}`);
      return response.data;
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || 'Failed to fetch job';
      setError(errorMsg);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Search jobs
  const searchJobs = useCallback(async (query: string, filters?: JobFilter): Promise<JobResponse | null> => {
    return getJobs({ ...filters, search: query });
  }, [getJobs]);

  // Get jobs by category
  const getJobsByCategory = useCallback(async (categoryId: number, page = 1): Promise<JobResponse | null> => {
    return getJobs({ categoryId, page });
  }, [getJobs]);

  // Get trending/featured jobs
  const getFeaturedJobs = useCallback(async (): Promise<Job[] | null> => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get('/jobs/featured');
      return response.data;
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || 'Failed to fetch featured jobs';
      setError(errorMsg);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Save job
  const saveJob = useCallback(async (jobId: number): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      await api.post(`/jobs/${jobId}/save`);
      return true;
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || 'Failed to save job';
      setError(errorMsg);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  // Unsave job
  const unsaveJob = useCallback(async (jobId: number): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      await api.delete(`/jobs/${jobId}/save`);
      return true;
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || 'Failed to unsave job';
      setError(errorMsg);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  // Get saved jobs
  const getSavedJobs = useCallback(async (page = 1): Promise<JobResponse | null> => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get(`/jobs/saved?page=${page}`);
      return response.data;
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || 'Failed to fetch saved jobs';
      setError(errorMsg);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Apply for job
  const applyForJob = useCallback(async (jobId: number, cvId: number, coverLetter?: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      await api.post(`/jobs/${jobId}/apply`, {
        cvId,
        coverLetter,
      });
      return true;
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || 'Failed to apply for job';
      setError(errorMsg);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  // Get job applications
  const getJobApplications = useCallback(async (jobId: number): Promise<any[] | null> => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get(`/jobs/${jobId}/applications`);
      return response.data;
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || 'Failed to fetch applications';
      setError(errorMsg);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // View job (increment view count)
  const viewJob = useCallback(async (jobId: number): Promise<boolean> => {
    try {
      await api.post(`/jobs/${jobId}/view`);
      return true;
    } catch (err) {
      return false;
    }
  }, []);

  return {
    loading,
    error,
    getJobs,
    getJobById,
    searchJobs,
    getJobsByCategory,
    getFeaturedJobs,
    saveJob,
    unsaveJob,
    getSavedJobs,
    applyForJob,
    getJobApplications,
    viewJob,
  };
};
