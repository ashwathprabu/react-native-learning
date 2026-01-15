import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import BootSplash from 'react-native-bootsplash';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import RootNavigator from './src/navigation/RootNavigator';
import { AuthProvider, useAuth } from './src/store/authStore';

function AppContent() {
  const { loading } = useAuth();

  useEffect(() => {
    if (!loading) {
      BootSplash.hide({ fade: true });
      console.log('BootSplash hidden');
    }
  }, [loading]);

  if (loading) {
    return null; // Keep splash screen visible while loading
  }

  return <RootNavigator />;
}

export default function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <StatusBar barStyle="light-content" backgroundColor="#6E3194" />
        <AppContent />
      </AuthProvider>
    </SafeAreaProvider>
  );
}

