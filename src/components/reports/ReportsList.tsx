import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Report } from '@/types/report';
import { MapPin, Calendar, Camera, Mic } from 'lucide-react';
import { format } from 'date-fns';

interface ReportsListProps {
  reports: Report[];
  title: string;
  showUserInfo?: boolean;
}

export const ReportsList: React.FC<ReportsListProps> = ({ reports, title, showUserInfo = false }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'submitted':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'resolved':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'rejected':
        return 'bg-red-100 text-red-800 border-red-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getCategoryIcon = (category: string) => {
    return category === 'pothole' ? '🕳️' : '🗑️';
  };

  if (reports.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center text-muted-foreground py-8">
            <p>No reports found</p>
            <p className="text-sm mt-2">Submit your first report to get started!</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-primary">{title}</h2>
      <div className="space-y-4">
        {reports.map((report) => (
          <Card key={report.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <span>{getCategoryIcon(report.category)}</span>
                    {report.title}
                  </CardTitle>
                  <CardDescription className="flex items-center gap-4 text-sm">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {format(new Date(report.submittedAt), 'MMM dd, yyyy')}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {report.location.latitude.toFixed(4)}, {report.location.longitude.toFixed(4)}
                    </span>
                  </CardDescription>
                </div>
                <Badge 
                  variant="outline" 
                  className={getStatusColor(report.status)}
                >
                  {report.status.replace('_', ' ').toUpperCase()}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-muted-foreground mb-4">{report.description}</p>
              
              <div className="flex items-center gap-4 mb-4">
                {report.photos.length > 0 && (
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Camera className="h-4 w-4" />
                    {report.photos.length} photo(s)
                  </div>
                )}
                {report.audioRecording && (
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Mic className="h-4 w-4" />
                    Audio recording
                  </div>
                )}
              </div>

              {report.photos.length > 0 && (
                <div className="grid grid-cols-3 gap-2 mb-4">
                  {report.photos.slice(0, 3).map((photo, index) => (
                    <img
                      key={index}
                      src={photo}
                      alt={`Report photo ${index + 1}`}
                      className="w-full h-20 object-cover rounded border cursor-pointer hover:opacity-80"
                      onClick={() => window.open(photo, '_blank')}
                    />
                  ))}
                  {report.photos.length > 3 && (
                    <div className="w-full h-20 bg-muted rounded border flex items-center justify-center text-sm text-muted-foreground">
                      +{report.photos.length - 3} more
                    </div>
                  )}
                </div>
              )}

              {report.audioRecording && (
                <div className="mb-4">
                  <audio controls className="w-full h-8">
                    <source src={report.audioRecording} type="audio/wav" />
                    Your browser does not support audio playback.
                  </audio>
                </div>
              )}

              {report.adminNotes && (
                <div className="bg-muted p-3 rounded-md mt-4">
                  <p className="text-sm font-medium text-muted-foreground mb-1">Admin Notes:</p>
                  <p className="text-sm">{report.adminNotes}</p>
                </div>
              )}

              <div className="flex items-center justify-between mt-4 pt-4 border-t">
                <div className="text-xs text-muted-foreground">
                  Updated: {format(new Date(report.updatedAt), 'MMM dd, yyyy HH:mm')}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open(`https://maps.google.com/?q=${report.location.latitude},${report.location.longitude}`, '_blank')}
                >
                  View on Map
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};