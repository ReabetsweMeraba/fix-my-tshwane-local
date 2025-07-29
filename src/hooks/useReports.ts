import { useState, useEffect } from 'react';
import { Report, ReportCategory, ReportStatus, ReportLocation } from '@/types/report';
import { useAuth } from '@/contexts/AuthContext';

export const useReports = () => {
  const { user } = useAuth();
  const [reports, setReports] = useState<Report[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      if (user) {
        console.log('User logged in, loading reports for:', user.id);
        await loadUserReports();
      } else {
        console.log('No user, clearing reports');
        setReports([]);
      }
      setIsLoading(false);
    };
    
    loadData();
  }, [user]);

  const loadUserReports = async () => {
    try {
      const allReports = JSON.parse(localStorage.getItem('tshwanefix_reports') || '[]');
      const userReports = allReports.filter((report: Report) => report.userId === user?.id);
      console.log('Loading user reports:', { userId: user?.id, totalReports: allReports.length, userReports: userReports.length });
      setReports(userReports);
    } catch (error) {
      console.error('Error loading reports:', error);
      setReports([]);
    }
  };

  const loadAllReports = (): Report[] => {
    try {
      return JSON.parse(localStorage.getItem('tshwanefix_reports') || '[]');
    } catch (error) {
      console.error('Error loading all reports:', error);
      return [];
    }
  };

  const createReport = async (
    category: ReportCategory,
    title: string,
    description: string,
    location: ReportLocation,
    photos: string[],
    audioRecording?: string
  ): Promise<boolean> => {
    if (!user) return false;

    try {
      const newReport: Report = {
        id: crypto.randomUUID(),
        userId: user.id,
        category,
        title,
        description,
        location,
        photos,
        audioRecording,
        status: 'submitted',
        submittedAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const allReports = loadAllReports();
      allReports.push(newReport);
      localStorage.setItem('tshwanefix_reports', JSON.stringify(allReports));
      
      await loadUserReports(); // Refresh user reports
      return true;
    } catch (error) {
      console.error('Error creating report:', error);
      return false;
    }
  };

  const updateReportStatus = async (reportId: string, status: ReportStatus, adminNotes?: string): Promise<boolean> => {
    if (!user || (user.role !== 'admin' && user.role !== 'municipal_worker')) {
      return false;
    }

    try {
      const allReports = loadAllReports();
      const reportIndex = allReports.findIndex((r: Report) => r.id === reportId);
      
      if (reportIndex === -1) return false;

      allReports[reportIndex] = {
        ...allReports[reportIndex],
        status,
        adminNotes,
        updatedAt: new Date().toISOString(),
      };

      localStorage.setItem('tshwanefix_reports', JSON.stringify(allReports));
      await loadUserReports(); // Refresh user reports
      return true;
    } catch (error) {
      console.error('Error updating report status:', error);
      return false;
    }
  };

  const getReportsByStatus = (status: ReportStatus): Report[] => {
    return reports.filter(report => report.status === status);
  };

  const getReportsByCategory = (category: ReportCategory): Report[] => {
    return reports.filter(report => report.category === category);
  };

  return {
    reports,
    isLoading,
    createReport,
    updateReportStatus,
    getReportsByStatus,
    getReportsByCategory,
    loadAllReports,
    refreshReports: loadUserReports,
  };
};