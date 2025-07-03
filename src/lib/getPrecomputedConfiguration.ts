'use server';

import getEppoClient from './getEppoClient';

export const getPrecomputedConfiguration = async (): Promise<string> => {
  const randomUserId = `test-user-${Math.random().toString(36).substring(2, 10)}`;
  const userId = randomUserId;
  const eppoClient = await getEppoClient();
  const subjectAttributes = {};
  
  if (!eppoClient) {
    return '';
  }
  
  console.log('Server-side getPrecomputedConfiguration called with userId:', userId);
  
  return eppoClient.getPrecomputedConfiguration(userId, subjectAttributes) ?? '';
}; 