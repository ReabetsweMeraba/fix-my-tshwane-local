import { useEffect } from 'react';
import { Report } from '@/types/report';

export const useDemoReports = () => {
  useEffect(() => {
    // Only add demo reports if none exist
    const existingReports = JSON.parse(localStorage.getItem('tshwanefix_reports') || '[]');
    
    if (existingReports.length === 0) {
      const demoReports: Report[] = [
        {
          id: 'demo-1',
          userId: 'demo-user-1',
          category: 'pothole',
          title: 'Large Pothole on Main Road',
          description: 'Deep pothole causing damage to vehicles near the traffic intersection. Water collects here during rain making it dangerous for motorcycles.',
          location: {
            latitude: -25.7479,
            longitude: 28.2293,
            address: 'Main Road, Pretoria Central'
          },
          photos: [],
          status: 'in_progress',
          submittedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
          updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
          adminNotes: 'Repair crew has been dispatched. Expected completion by end of week.'
        },
        {
          id: 'demo-2',
          userId: 'demo-user-2',
          category: 'illegal_dumping',
          title: 'Illegal Dumping Behind Shopping Centre',
          description: 'Large pile of construction debris and household waste dumped illegally. Creating health hazard and attracting vermin.',
          location: {
            latitude: -25.7615,
            longitude: 28.1949,
            address: 'Behind Wonderpark Shopping Centre'
          },
          photos: [],
          status: 'submitted',
          submittedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
          updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
          id: 'demo-3',
          userId: 'demo-user-3',
          category: 'pothole',
          title: 'Multiple Potholes on Residential Street',
          description: 'Several medium-sized potholes along residential street affecting daily commute. Street lighting also needs attention.',
          location: {
            latitude: -25.7069,
            longitude: 28.2294,
            address: 'Rodewald Street, New Muckleneuk'
          },
          photos: [],
          status: 'resolved',
          submittedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
          updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
          adminNotes: 'Potholes filled and road surface restored. Street lighting repair scheduled separately.'
        },
        {
          id: 'demo-4',
          userId: 'demo-user-4',
          category: 'illegal_dumping',
          title: 'Abandoned Appliances in Park',
          description: 'Old refrigerator and washing machine dumped in public park area. Needs immediate removal for safety.',
          location: {
            latitude: -25.7308,
            longitude: 28.2137,
            address: 'Venning Park, Arcadia'
          },
          photos: [],
          status: 'in_progress',
          submittedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
          updatedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
          adminNotes: 'Removal team scheduled for this week. Investigating illegal dumping source.'
        },
        {
          id: 'demo-5',
          userId: 'demo-user-5',
          category: 'pothole',
          title: 'Dangerous Pothole Near School',
          description: 'Very deep pothole near school entrance creating safety hazard for children and parents. Urgent attention required.',
          location: {
            latitude: -25.7190,
            longitude: 28.2773,
            address: 'Church Street, near Primary School'
          },
          photos: [],
          status: 'submitted',
          submittedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
          updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
        }
      ];

      localStorage.setItem('tshwanefix_reports', JSON.stringify(demoReports));
    }
  }, []);
};