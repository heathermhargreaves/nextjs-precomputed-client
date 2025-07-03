'use client';

import { useEffect, useState } from 'react';
import * as EppoSdk from '@eppo/js-client-sdk';

export const FeatureFlagTest = () => {
  const [flagValue, setFlagValue] = useState<boolean | null>(null);
  const [assignmentData, setAssignmentData] = useState<any>(null);

  const flagKey = process.env.NEXT_PUBLIC_EPPO_FLAG_KEY;

  useEffect(() => {
    // Test evaluating a feature flag - this should trigger assignment logs
    try {
      // Capture assignment logs using a global event listener
      const captureAssignment = (event: any) => {
        if (event.detail && event.detail.featureFlag === flagKey) {
          setAssignmentData(event.detail);
        }
      };

      // Listen for custom assignment events
      window.addEventListener('eppo-assignment', captureAssignment);
      
      const client = EppoSdk.getPrecomputedInstance();
      const variant = client.getBooleanAssignment(flagKey, false);
      console.log('Feature flag evaluation result:', variant);
      setFlagValue(variant);

      return () => {
        window.removeEventListener('eppo-assignment', captureAssignment);
      };
    } catch (error) {
      console.error('Error evaluating feature flag:', error);
    }
  }, [flagKey]);

  return (
    <div className="p-4 border rounded-lg">
      <h2 className="text-lg font-semibold mb-2">Feature Flag Test</h2>
      <div className="space-y-2">
        <div>
          <label className="block text-sm font-medium">User ID:</label>
          <span className="text-lg font-mono">
            {assignmentData?.subject || 'Loading...'}
          </span>
        </div>
        <div>
          <label className="block text-sm font-medium">Flag Value:</label>
          <span className="text-lg font-mono">
            {flagValue === null ? 'Loading...' : flagValue.toString()}
          </span>
        </div>

        {assignmentData && (
          <div>
            <label className="block text-sm font-medium mb-2">Assignment Details:</label>
            <div className="bg-gray-100 p-3 rounded text-sm font-mono">
              <div><strong>Experiment:</strong> {assignmentData.experiment}</div>
              <div><strong>Feature Flag:</strong> {assignmentData.featureFlag}</div>
              <div><strong>Allocation:</strong> {assignmentData.allocation}</div>
              <div><strong>Variation:</strong> {assignmentData.variation}</div>
              <div><strong>Subject:</strong> {assignmentData.subject}</div>
              {assignmentData.timestamp && (
                <div><strong>Timestamp:</strong> {new Date(assignmentData.timestamp).toLocaleString()}</div>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}; 