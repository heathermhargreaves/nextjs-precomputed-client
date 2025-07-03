# Eppo Feature Flag Debugging with Next.js

A Next.js application designed to replicate and debug Eppo feature flag implementations using precomputed configurations. This project demonstrates server-side precomputed configuration generation with client-side feature flag evaluation.

## Features

- **Server-side precomputed configuration**: Generates Eppo configurations on the server using random user IDs
- **Client-side feature flag evaluation**: Uses the Eppo precomputed client to evaluate feature flags
- **Assignment logging**: Captures and displays feature flag assignment details both in console and UI
- **Environment-based configuration**: Configurable feature flag keys and SDK settings
- **Real-time debugging**: Visual display of user assignments, flag values, and evaluation metadata

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with Eppo provider wrapper
│   └── page.tsx            # Main page with feature flag test component
├── components/
│   ├── EppoProviderWrapper.tsx      # Server component that fetches precomputed config
│   ├── EppoRandomizationProvider.tsx # Client provider for Eppo SDK initialization
│   └── FeatureFlagTest.tsx          # UI component for testing and displaying flag results
└── lib/
    ├── getEppoClient.ts             # Utility for Eppo client initialization
    └── getPrecomputedConfiguration.ts # Server function to generate precomputed configs
```

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Configuration

Create a `.env.local` file in the root directory:

```env
# Required: Your Eppo SDK Key
NEXT_PUBLIC_EPPO_SDK_KEY=your-eppo-sdk-key-here

# Optional: Custom feature flag key to test (defaults to 'Next.js-POC')
NEXT_PUBLIC_EPPO_FLAG_KEY=your-flag-key-here
```

### 3. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## How It Works

### Server-Side Configuration Generation

1. **User ID Generation**: Each request generates a random user ID (format: `test-user-xxxxxxxx`)
2. **Precomputed Configuration**: The server calls Eppo's API to get a precomputed configuration for the user
3. **Configuration Passing**: The precomputed config is passed to the client-side provider

### Client-Side Feature Flag Evaluation

1. **SDK Initialization**: The Eppo precomputed client is initialized with the server-generated configuration
2. **Flag Evaluation**: Feature flags are evaluated using the precomputed data
3. **Assignment Logging**: Assignment events are captured and displayed in the UI

### Key Components

#### `getPrecomputedConfiguration.ts`
- Generates random user IDs for testing
- Fetches precomputed configurations from Eppo API
- Handles fallback scenarios when API calls fail

#### `EppoProviderWrapper.tsx`
- Server component that fetches precomputed configuration
- Passes configuration to client-side provider
- Handles server-side errors gracefully

#### `EppoRandomizationProvider.tsx`
- Client component that initializes Eppo SDK
- Dispatches assignment events for debugging
- Provides Eppo context to child components

#### `FeatureFlagTest.tsx`
- Evaluates feature flags using the precomputed client
- Displays assignment details including experiment, allocation, variation
- Shows real-time user ID and flag evaluation results

## Debugging Features

The application provides comprehensive debugging information:

- **User ID**: Shows the randomly generated user ID used for bucketing
- **Flag Value**: Displays the boolean result of the feature flag evaluation
- **Assignment Details**: Shows detailed assignment information including:
  - Experiment name
  - Feature flag key
  - Allocation details
  - Variation assigned
  - Subject (user ID)
  - Timestamp of assignment

## Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `NEXT_PUBLIC_EPPO_SDK_KEY` | Your Eppo SDK key | Yes | - |
| `NEXT_PUBLIC_EPPO_FLAG_KEY` | Feature flag key to test | No | `Next.js-POC` |

## Common Issues and Solutions

### "Invalid precomputed configuration wire" Error
- Ensure your Eppo SDK key is correct
- Check that the feature flag exists in your Eppo dashboard
- Verify the flag configuration matches the expected format

### Empty Subject Key
- The application automatically generates random user IDs
- No manual cookie setting required - user IDs are generated server-side

### No Assignment Logs
- Check browser console for assignment events
- Ensure the feature flag key matches what's configured in Eppo
- Verify the flag is active and properly configured

## Development

### Adding New Feature Flags

1. Update the `NEXT_PUBLIC_EPPO_FLAG_KEY` environment variable
2. Modify the `FeatureFlagTest.tsx` component to evaluate your new flag
3. Adjust the evaluation method (`getBooleanAssignment`, `getStringAssignment`, etc.) based on your flag type

### Customizing User Attributes

Update the `getPrecomputedConfiguration.ts` file to include custom user attributes:

```typescript
const userId = `test-user-${generateRandomId()}`;
const userAttributes = {
  // Add custom attributes here
  plan: 'premium',
  region: 'us-east-1'
};
```

## Dependencies

- **Next.js 15**: React framework with app directory
- **@eppo/js-client-sdk**: Eppo JavaScript client SDK
- **@eppo/node-server-sdk**: Eppo Node.js server SDK
- **TypeScript**: Type safety and development experience
- **Tailwind CSS**: Styling and UI components

## License

This project is for debugging and testing purposes. Please refer to Eppo's licensing terms for SDK usage.
