import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Facebook, Instagram, Twitter } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const SocialLinks: React.FC = () => {
  const socialLinks = [
    {
      name: 'Email',
      icon: Mail,
      url: 'mailto:TMSDGROUPA@gmail.com',
      color: 'hover:bg-blue-50 hover:text-blue-600'
    },
    {
      name: 'Facebook',
      icon: Facebook,
      url: 'https://www.facebook.com/profile.php?id=61578176020772&mibextid=rS40aB7S9Ucbxw6v',
      color: 'hover:bg-blue-50 hover:text-blue-600'
    },
    {
      name: 'Instagram',
      icon: Instagram,
      url: 'https://www.instagram.com/tms_d1/profilecard/?igsh=OXk2amRyMG8wYW96',
      color: 'hover:bg-pink-50 hover:text-pink-600'
    },
    {
      name: 'Twitter/X',
      icon: Twitter,
      url: 'https://x.com/T_msd_1?t=4mfhmWgXy404XGm6EPAvlQ&s=08',
      color: 'hover:bg-gray-50 hover:text-gray-900'
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Contact & Social Media</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {socialLinks.map((link) => {
            const IconComponent = link.icon;
            return (
              <Button
                key={link.name}
                variant="outline"
                size="sm"
                className={`flex flex-col items-center gap-2 h-auto py-4 ${link.color} transition-colors`}
                onClick={() => window.open(link.url, '_blank')}
              >
                <IconComponent className="h-5 w-5" />
                <span className="text-xs">{link.name}</span>
              </Button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};