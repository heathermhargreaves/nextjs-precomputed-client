'use client';

import { PropsWithChildren, ReactNode } from 'react';

import { offlinePrecomputedInit } from '@eppo/js-client-sdk';

interface IEppoRandomizationProvider extends PropsWithChildren {
  precomputedConfiguration: string;
}

export const EppoRandomizationProvider = ({
  children,
  precomputedConfiguration,
}: IEppoRandomizationProvider): ReactNode => {
  console.log('EppoRandomizationProvider precomputedConfiguration', precomputedConfiguration);
  
  // Only initialize if we have a valid precomputed configuration
  if (precomputedConfiguration && precomputedConfiguration.trim() !== '') {
    try {
        offlinePrecomputedInit({
    precomputedConfiguration,
    assignmentLogger: {
      logAssignment(assignment) {
        console.log('Eppo assignment:', assignment);
        
        // Dispatch custom event for other components to listen to
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('eppo-assignment', {
            detail: assignment
          }));
        }
      },
    },
  });
    } catch (error) {
      console.error('Failed to initialize Eppo SDK:', error);
    }
  } else {
    console.warn('No valid precomputed configuration provided to EppoRandomizationProvider');
  }

  return children;
}; 