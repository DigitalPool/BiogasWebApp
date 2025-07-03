// App.js (for Web + Native with Expo Router)
import { ExpoRoot } from 'expo-router';
import { registerRootComponent } from 'expo';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Fix React Native Web support
import 'react-native-gesture-handler';
import 'react-native-reanimated';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { View, Platform } from 'react-native';

const App = () => {
  const ctx = require.context('./app');
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <ExpoRoot context={ctx} />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

registerRootComponent(App);
export default App;
