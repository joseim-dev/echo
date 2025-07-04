# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Core Development
- `npm install` - Install dependencies
- `npm start` or `npx expo start` - Start development server
- `npm run android` - Run on Android emulator/device
- `npm run ios` - Run on iOS simulator/device
- `npm run web` - Run web version
- `npm run lint` - Run ESLint to check code quality
- `npm run reset-project` - Reset project to blank state

### Always run lint after making changes
When making code changes, always run `npm run lint` to ensure code quality and fix any linting errors before considering the task complete.

## Architecture Overview

### Core App Structure
This is a React Native/Expo app using:
- **Expo Router** for file-based navigation in `/app` directory
- **Tab-based navigation** with main tabs: Home (quotes), Store (figure selection)
- **Stack navigation** for modals and settings screens
- **NativeWind** for styling (Tailwind CSS for React Native)

### Key Features
1. **Quote Management System**: Users can add historical/cultural figures as "channels" and receive daily quotes
2. **Local Notifications**: Scheduled daily notifications with quotes
3. **Reward-based Ads**: Users watch ads to unlock new figure channels
4. **Offline-first**: All data stored locally using AsyncStorage

### Data Flow
1. **Figures Data**: Static data in `constants/Figures.ts` and `constants/Quotes.ts`
2. **User Data**: Stored in AsyncStorage via `storage/myQuotesStorage.ts`
3. **Quote System**: Each added figure generates 30 days of quotes with read/unread status
4. **Notifications**: Managed through `hooks/useLocalNotifications.ts`

### File Structure Patterns
- `/app` - Expo Router screens (file-based routing)
- `/components` - Reusable UI components organized by feature
- `/constants` - Static data (figures, quotes, ad IDs)
- `/hooks` - Custom React hooks
- `/contexts` - React Context providers (AdContext)
- `/storage` - AsyncStorage data management
- `/utils` - Utility functions
- `/types` - TypeScript type definitions

### Key Data Models
- **FigureInfo**: Static figure data with category, name, image, description
- **QuoteItem**: User's added figures with quotes organized by date
- **QuoteEntry**: Individual quote with text and read status

### State Management
- **Local State**: React useState for component state
- **Context**: AdContext for ad-related state
- **Persistence**: AsyncStorage for user data (myQuotes)
- **No global state management** library used

### Ad Integration
- Uses `react-native-google-mobile-ads` for rewarded ads
- Users must watch ads to unlock new figure channels
- Ad state managed through AdContext and AdProvider

### Styling Approach
- Uses NativeWind (Tailwind CSS for React Native)
- Custom font loading in root layout
- Dark theme enforced (userInterfaceStyle: "dark")
- Responsive design with percentage-based dimensions

### Navigation Structure
```
/(tabs)
├── index.tsx (Home - Quote List)
├── store.tsx (Store - Figure Selection)
└── _layout.tsx (Tab Navigation)
/settings.tsx (Notification Settings)
/notification.tsx (Notification History)
```

### Important Implementation Details
- Korean language support and comments throughout codebase
- PostHog analytics integration
- Tracking transparency permission for ads
- Platform-specific notification handling (iOS/Android)
- Custom fonts (Montserrat family + Lora for quotes)
- Image optimization using expo-image

### Testing & Quality
- No test framework currently configured
- Uses ESLint for code quality
- TypeScript for type safety