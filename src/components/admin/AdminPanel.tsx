import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useReports } from '@/hooks/useReports';
import { useToast } from '@/hooks/use-toast';
import { Report, ReportStatus } from '@/types/report';
import { Calendar, MapPin, User } from 'lucide-react';
import { format } from 'date-fns';

export const AdminPanel: React.FC = () => {
  const [allReports, setAllReports] = useState<Report[]>([]);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [newStatus, setNewStatus] = useState<ReportStatus>('submitted');
  const [adminNotes, setAdminNotes] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  
  const { updateReportStatus, loadAllReports } = useReports();
  const { toast } = useToast();

  useEffect(() => {
    refreshReports();
  }, []);

  const refreshReports = () => {
    const reports = loadAllReports();
    setAllReports(reports);
  };

  const handleUpdateStatus = async () => {
    if (!selectedReport) return;

    setIsUpdating(true);
    const success = await updateReportStatus(selectedReport.id, newStatus, adminNotes);
    
    if (success) {
      toast({
        title: "Status updated",
        description: "Report status has been successfully updated",
      });
      refreshReports();
      setSelectedReport(null);
      setAdminNotes('');
    } else {
      toast({
        title: "Update failed",
        description: "Could not update report status",
        variant: "destructive",
      });
    }
    setIsUpdating(false);
  };

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

  const getReportsByStatus = (status: ReportStatus) => {
    return allReports.filter(report => report.status === status);
  };

  const submittedReports = getReportsByStatus('submitted');
  const inProgressReports = getReportsByStatus('in_progress');
  const resolvedReports = getReportsByStatus('resolved');

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-yellow-600">Submitted</CardTitle>
            <CardDescription>New reports pending review</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{submittedReports.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-blue-600">In Progress</CardTitle>
            <CardDescription>Reports being worked on</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{inProgressReports.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-green-600">Resolved</CardTitle>
            <CardDescription>Completed reports</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{resolvedReports.length}</div>
          </CardContent>
        </Card>
      </div>

      {selectedReport && (
        <Card className="border-primary">
          <CardHeader>
            <CardTitle className="text-xl text-primary">Update Report Status</CardTitle>
            <CardDescription>Report ID: {selectedReport.id}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">{selectedReport.title}</h3>
              <p className="text-muted-foreground">{selectedReport.description}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">New Status</label>
                <Select value={newStatus} onValueChange={(value: ReportStatus) => setNewStatus(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="submitted">Submitted</SelectItem>
                    <SelectItem value="in_progress">In Progress</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium">Current Status</label>
                <div className="mt-2">
                  <Badge className={getStatusColor(selectedReport.status)}>
                    {selectedReport.status.replace('_', ' ').toUpperCase()}
                  </Badge>
                </div>
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium">Admin Notes</label>
              <Textarea
                placeholder="Add notes about the status update..."
                value={adminNotes}
                onChange={(e) => setAdminNotes(e.target.value)}
                rows={3}
              />
            </div>
            
            <div className="flex gap-2">
              <Button 
                onClick={handleUpdateStatus}
                disabled={isUpdating}
                className="bg-primary hover:bg-primary/90"
              >
                {isUpdating ? 'Updating...' : 'Update Status'}
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setSelectedReport(null)}
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="text-xl text-primary">All Reports</CardTitle>
          <CardDescription>Manage municipal service delivery reports</CardDescription>
        </CardHeader>
        <CardContent>
          {allReports.length === 0 ? (
            <div className="text-center text-muted-foreground py-8">
              <p>No reports found</p>
            </div>
          ) : (
            <div className="space-y-3">
              {allReports.map((report) => (
                <div
                  key={report.id}
                  className="border rounded-lg p-4 hover:bg-muted/50 cursor-pointer transition-colors"
                  onClick={() => {
                    setSelectedReport(report);
                    setNewStatus(report.status);
                    setAdminNotes(report.adminNotes || '');
                  }}
                >
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span>{getCategoryIcon(report.category)}</span>
                        <h3 className="font-medium">{report.title}</h3>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {format(new Date(report.submittedAt), 'MMM dd, yyyy')}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {report.location.latitude.toFixed(4)}, {report.location.longitude.toFixed(4)}
                        </span>
                        <span className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          ID: {report.userId.slice(0, 8)}...
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {report.description}
                      </p>
                    </div>
                    <Badge className={getStatusColor(report.status)}>
                      {report.status.replace('_', ' ').toUpperCase()}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};