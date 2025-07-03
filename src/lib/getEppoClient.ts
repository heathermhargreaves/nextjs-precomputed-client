import * as EppoSDK from '@eppo/node-server-sdk';

let eppoClient: any = null;

export default async function getEppoClient() {
  if (!eppoClient) {
    const apiKey = process.env.NEXT_PUBLIC_EPPO_SDK_KEY;
    
    if (!apiKey) {
      console.warn('NEXT_PUBLIC_EPPO_SDK_KEY environment variable is not set. Please add it to your .env.local file.');
      return null;
    }
    
    await EppoSDK.init({
      apiKey,
      assignmentLogger: { 
        logAssignment(assignment) {
          console.log('Eppo server assignment:', assignment);
        } 
      },
    });
    eppoClient = EppoSDK.getInstance();
  }
  return eppoClient;
} 