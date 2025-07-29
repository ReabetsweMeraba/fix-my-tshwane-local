import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useReports } from '@/hooks/useReports';
import { useAuth } from '@/contexts/AuthContext';
import { useDemoReports } from '@/hooks/useDemoReports';
import { Plus, MapPin, FileText, Bell, Users, Map, Phone } from 'lucide-react';
import { ReportForm } from '@/components/reports/ReportForm';
import { ReportsList } from '@/components/reports/ReportsList';
import { AdminPanel } from '@/components/admin/AdminPanel';
import { ReportsMap } from '@/components/map/ReportsMap';
import { CityNotices } from '@/components/notices/CityNotices';
import { SocialLinks } from '@/components/social/SocialLinks';

type DashboardView = 'overview' | 'report' | 'my-reports' | 'admin' | 'map' | 'notices' | 'contact';

export const DashboardPage: React.FC = () => {
  const [currentView, setCurrentView] = useState<DashboardView>('overview');
  const { user } = useAuth();
  const { reports, getReportsByStatus } = useReports();
  
  // Initialize demo reports
  useDemoReports();

  const submittedReports = getReportsByStatus('submitted');
  const inProgressReports = getReportsByStatus('in_progress');
  const resolvedReports = getReportsByStatus('resolved');

  const renderContent = () => {
    switch (currentView) {
      case 'report':
        return <ReportForm onSuccess={() => setCurrentView('my-reports')} />;
      case 'my-reports':
        return <ReportsList reports={reports} title="My Reports" />;
      case 'admin':
        return user?.role === 'admin' || user?.role === 'municipal_worker' ? 
          <AdminPanel /> : 
          <div className="text-center text-muted-foreground">Access denied</div>;
      case 'map':
        return <ReportsMap />;
      case 'notices':
        return <CityNotices />;
      case 'contact':
        return <SocialLinks />;
      default:
        return (
          <div className="grid gap-6">
            {/* Quick Actions */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setCurrentView('report')}>
                <CardHeader className="pb-2">
                  <div className="flex items-center space-x-2">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Plus className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-lg">Report an Issue</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription>Submit a new report for potholes or illegal dumping</CardDescription>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setCurrentView('my-reports')}>
                <CardHeader className="pb-2">
                  <div className="flex items-center space-x-2">
                    <div className="p-2 bg-secondary/10 rounded-lg">
                      <FileText className="h-6 w-6 text-secondary-foreground" />
                    </div>
                    <CardTitle className="text-lg">Track My Reports</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription>View and track the status of your submissions</CardDescription>
                  <div className="mt-2">
                    <Badge variant="secondary">{reports.length} reports</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setCurrentView('map')}>
                <CardHeader className="pb-2">
                  <div className="flex items-center space-x-2">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Map className="h-6 w-6 text-blue-600" />
                    </div>
                    <CardTitle className="text-lg">Map View</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription>View all reports on an interactive map</CardDescription>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setCurrentView('notices')}>
                <CardHeader className="pb-2">
                  <div className="flex items-center space-x-2">
                    <div className="p-2 bg-accent/10 rounded-lg">
                      <Bell className="h-6 w-6 text-accent-foreground" />
                    </div>
                    <CardTitle className="text-lg">City Notices</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription>Stay updated with municipal announcements</CardDescription>
                  <div className="mt-2">
                    <Badge variant="outline">4 active notices</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Reports Overview */}
            <Card>
              <CardHeader>
                <CardTitle>Your Reports Overview</CardTitle>
                <CardDescription>Summary of your service delivery requests</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-600">{submittedReports.length}</div>
                    <div className="text-sm text-muted-foreground">Submitted</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{inProgressReports.length}</div>
                    <div className="text-sm text-muted-foreground">In Progress</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{resolvedReports.length}</div>
                    <div className="text-sm text-muted-foreground">Resolved</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact & Social Links */}
            <SocialLinks />

            {/* Admin Section */}
            {(user?.role === 'admin' || user?.role === 'municipal_worker') && (
              <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setCurrentView('admin')}>
                <CardHeader className="pb-2">
                  <div className="flex items-center space-x-2">
                    <div className="p-2 bg-destructive/10 rounded-lg">
                      <Users className="h-6 w-6 text-destructive" />
                    </div>
                    <CardTitle className="text-lg">Admin Panel</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription>Manage all reports and update statuses</CardDescription>
                </CardContent>
              </Card>
            )}
          </div>
        );
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Navigation */}
      <div className="flex flex-wrap gap-2 mb-6">
        <Button
          variant={currentView === 'overview' ? 'default' : 'outline'}
          onClick={() => setCurrentView('overview')}
        >
          Dashboard
        </Button>
        <Button
          variant={currentView === 'report' ? 'default' : 'outline'}
          onClick={() => setCurrentView('report')}
        >
          Report Issue
        </Button>
        <Button
          variant={currentView === 'my-reports' ? 'default' : 'outline'}
          onClick={() => setCurrentView('my-reports')}
        >
          My Reports
        </Button>
        <Button
          variant={currentView === 'map' ? 'default' : 'outline'}
          onClick={() => setCurrentView('map')}
        >
          <Map className="h-4 w-4 mr-2" />
          Map View
        </Button>
        <Button
          variant={currentView === 'notices' ? 'default' : 'outline'}
          onClick={() => setCurrentView('notices')}
        >
          <Bell className="h-4 w-4 mr-2" />
          City Notices
        </Button>
        {(user?.role === 'admin' || user?.role === 'municipal_worker') && (
          <Button
            variant={currentView === 'admin' ? 'default' : 'outline'}
            onClick={() => setCurrentView('admin')}
          >
            Admin Panel
          </Button>
        )}
      </div>

      {/* Content */}
      {renderContent()}
    </div>
  );
};