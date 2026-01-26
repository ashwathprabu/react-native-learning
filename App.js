import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import BootSplash from 'react-native-bootsplash';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import RootNavigator from './src/navigation/RootNavigator';
import { AuthProvider, useAuth } from './src/store/authStore';
import { ThemeProvider, useTheme } from './src/theme/ThemeContext';

function AppContent() {
  const { loading } = useAuth();
  const { theme, isDarkMode } = useTheme();

  useEffect(() => {
    if (!loading) {
      BootSplash.hide({ fade: true });
      console.log('BootSplash hidden');
    }
  }, [loading]);

  if (loading) {
    return null; // Keep splash screen visible while loading
  }

  return (
    <>
      <StatusBar
        barStyle={isDarkMode ? "light-content" : "dark-content"}
        backgroundColor={theme.background}
      />
      <RootNavigator />
    </>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

