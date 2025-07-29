import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Bell, AlertTriangle, Info, CheckCircle } from 'lucide-react';
import { format } from 'date-fns';

interface Notice {
  id: string;
  title: string;
  message: string;
  priority: 'low' | 'medium' | 'high';
  publishedAt: string;
  type: 'info' | 'warning' | 'success' | 'urgent';
}

export const CityNotices: React.FC = () => {
  const notices: Notice[] = [
    {
      id: '1',
      title: 'Scheduled Water Maintenance',
      message: 'Water supply will be temporarily interrupted in Centurion area on Saturday, 3rd February 2024, from 09:00 to 15:00 for routine maintenance.',
      priority: 'high',
      type: 'warning',
      publishedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: '2',
      title: 'Community Clean-Up Campaign',
      message: 'Join us for the monthly community clean-up in Mamelodi on Sunday, 4th February 2024. Registration starts at 07:00 at the community centre.',
      priority: 'medium',
      type: 'info',
      publishedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: '3',
      title: 'Road Repairs Completed',
      message: 'Pothole repairs on Steve Biko Road have been completed. Thank you for your patience during the construction period.',
      priority: 'low',
      type: 'success',
      publishedAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString()
    },
    {
      id: '4',
      title: 'Load Shedding Schedule Update',
      message: 'Stage 2 load shedding is currently in effect. Please check your area schedule on the City Power website for specific times.',
      priority: 'high',
      type: 'urgent',
      publishedAt: new Date(Date.now() - 30 * 60 * 1000).toISOString()
    }
  ];

  const getNoticeIcon = (type: string) => {
    switch (type) {
      case 'warning':
        return AlertTriangle;
      case 'urgent':
        return Bell;
      case 'success':
        return CheckCircle;
      default:
        return Info;
    }
  };

  const getNoticeVariant = (type: string) => {
    switch (type) {
      case 'warning':
        return 'destructive';
      case 'urgent':
        return 'destructive';
      case 'success':
        return 'default';
      default:
        return 'default';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-300';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'low':
        return 'bg-green-100 text-green-800 border-green-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="h-5 w-5" />
          City Notices & Announcements
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {notices.map((notice) => {
            const IconComponent = getNoticeIcon(notice.type);
            return (
              <Alert key={notice.id} variant={getNoticeVariant(notice.type)} className="relative">
                <IconComponent className="h-4 w-4" />
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-sm font-semibold">{notice.title}</h4>
                      <Badge variant="outline" className={getPriorityColor(notice.priority)}>
                        {notice.priority}
                      </Badge>
                    </div>
                    <AlertDescription className="text-sm">
                      {notice.message}
                    </AlertDescription>
                    <div className="text-xs text-muted-foreground mt-2">
                      {format(new Date(notice.publishedAt), 'MMM dd, yyyy HH:mm')}
                    </div>
                  </div>
                </div>
              </Alert>
            );
          })}
        </div>
        
        <div className="mt-4 pt-4 border-t text-center">
          <p className="text-sm text-muted-foreground">
            Stay informed about municipal services and announcements
          </p>
        </div>
      </CardContent>
    </Card>
  );
};