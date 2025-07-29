import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useReports } from '@/hooks/useReports';
import { Report } from '@/types/report';
import { MapPin, Navigation, Filter } from 'lucide-react';
import { format } from 'date-fns';

export const ReportsMap: React.FC = () => {
  const { loadAllReports } = useReports();
  const [allReports, setAllReports] = useState<Report[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  useEffect(() => {
    setAllReports(loadAllReports());
  }, [loadAllReports]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'submitted':
        return 'bg-red-500';
      case 'in_progress':
        return 'bg-yellow-500';
      case 'resolved':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'submitted':
        return 'bg-red-100 text-red-800 border-red-300';
      case 'in_progress':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'resolved':
        return 'bg-green-100 text-green-800 border-green-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const filteredReports = selectedStatus === 'all' 
    ? allReports 
    : allReports.filter(report => report.status === selectedStatus);

  const getCategoryIcon = (category: string) => {
    return category === 'pothole' ? '🕳️' : '🗑️';
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl">Reports Map View</CardTitle>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              <select 
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="text-sm border rounded px-2 py-1"
              >
                <option value="all">All Reports</option>
                <option value="submitted">Active (Red)</option>
                <option value="in_progress">In Progress (Yellow)</option>
                <option value="resolved">Resolved (Green)</option>
              </select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Map Legend */}
          <div className="flex flex-wrap gap-4 mb-6 p-4 bg-muted rounded-lg">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="text-sm">Active Reports</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span className="text-sm">In Progress</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm">Resolved</span>
            </div>
          </div>

          {/* Simulated Map View */}
          <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-lg p-6 min-h-[400px] relative border">
            <div className="absolute top-4 left-4 bg-white rounded-lg p-2 shadow-md">
              <div className="flex items-center gap-1">
                <Navigation className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">Tshwane Metropolitan</span>
              </div>
            </div>

            {/* Map pins representation */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-12">
              {filteredReports.map((report, index) => (
                <div 
                  key={report.id}
                  className="relative"
                  style={{
                    marginTop: `${(index % 3) * 20}px`,
                    marginLeft: `${(index % 4) * 30}px`
                  }}
                >
                  {/* Map Pin */}
                  <div className="relative group">
                    <div className={`w-6 h-6 ${getStatusColor(report.status)} rounded-full border-2 border-white shadow-lg cursor-pointer hover:scale-110 transition-transform`}>
                      <div className="absolute -top-1 -left-1 text-xs">
                        {getCategoryIcon(report.category)}
                      </div>
                    </div>
                    
                    {/* Tooltip on hover */}
                    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-lg p-3 w-64 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-sm">{report.title}</h4>
                          <Badge variant="outline" className={getStatusBadgeColor(report.status)}>
                            {report.status.replace('_', ' ')}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">{report.description}</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <MapPin className="h-3 w-3" />
                          {report.location.latitude.toFixed(4)}, {report.location.longitude.toFixed(4)}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {format(new Date(report.submittedAt), 'MMM dd, yyyy')}
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          className="w-full text-xs"
                          onClick={() => window.open(`https://maps.google.com/?q=${report.location.latitude},${report.location.longitude}`, '_blank')}
                        >
                          View on Google Maps
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredReports.length === 0 && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <MapPin className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>No reports found for the selected filter</p>
                </div>
              </div>
            )}
          </div>

          <div className="mt-4 text-sm text-muted-foreground text-center">
            Showing {filteredReports.length} reports • Click pins for details • Hover for quick info
          </div>
        </CardContent>
      </Card>
    </div>
  );
};