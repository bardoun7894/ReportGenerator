import React from 'react';
import { LOGO_BASE64 } from '@/lib/logo-data';

interface MinistryLogoProps {
          className?: string; // Allow passing Tailwind classes for width/height/position
}

export const MinistryLogo: React.FC<MinistryLogoProps> = ({ className }) => {
          return (
                    <img
                              src={LOGO_BASE64}
                              alt="وزارة التعليم"
                              className={className}
                              style={{
                                        display: 'block',
                                        maxWidth: '100%',
                                        height: 'auto'
                              }}
                    />
          );
};
