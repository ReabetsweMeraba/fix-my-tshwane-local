export type ReportCategory = 'pothole' | 'illegal_dumping';
export type ReportStatus = 'submitted' | 'in_progress' | 'resolved' | 'rejected';

export interface ReportLocation {
  latitude: number;
  longitude: number;
  address?: string;
}

export interface Report {
  id: string;
  userId: string;
  category: ReportCategory;
  title: string;
  description: string;
  location: ReportLocation;
  photos: string[]; // Base64 encoded images
  audioRecording?: string; // Base64 encoded audio
  status: ReportStatus;
  submittedAt: string;
  updatedAt: string;
  adminNotes?: string;
}

export interface CityNotice {
  id: string;
  title: string;
  message: string;
  priority: 'low' | 'medium' | 'high';
  publishedAt: string;
  expiresAt?: string;
}