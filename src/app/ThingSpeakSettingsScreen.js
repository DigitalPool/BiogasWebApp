// screens/ThingSpeakSettingsScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ThingSpeakSettingsScreen() {
  const [channelId, setChannelId] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [logInterval, setLogInterval] = useState('');

  useEffect(() => {
    const loadSettings = async () => {
      const storedChannelId = await AsyncStorage.getItem('channelId');
      const storedApiKey = await AsyncStorage.getItem('apiKey');
      const storedInterval = await AsyncStorage.getItem('logInterval');
      if (storedChannelId) setChannelId(storedChannelId);
      if (storedApiKey) setApiKey(storedApiKey);
      if (storedInterval) setLogInterval(storedInterval);
    };
    loadSettings();
  }, []);

  const saveSettings = async () => {
    try {
      await AsyncStorage.setItem('channelId', channelId);
      await AsyncStorage.setItem('apiKey', apiKey);
      await AsyncStorage.setItem('logInterval', logInterval);
      Alert.alert('Saved', 'ThingSpeak settings updated successfully');
    } catch (error) {
      Alert.alert('Error', 'Failed to save settings');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.label}>ThingSpeak Channel ID</Text>
        <TextInput
          style={styles.input}
          value={channelId}
          onChangeText={setChannelId}
          placeholder="Enter Channel ID"
          keyboardType="numeric"
        />
        <Text style={styles.label}>API Key</Text>
        <TextInput
          style={styles.input}
          value={apiKey}
          onChangeText={setApiKey}
          placeholder="Enter API Key"
        />
        <Text style={styles.label}>Logging Interval (secs)</Text>
        <TextInput
          style={styles.input}
          value={logInterval}
          onChangeText={setLogInterval}
          placeholder="e.g. 30"
          keyboardType="numeric"
        />
          <TouchableOpacity style={styles.saveButton} onPress={saveSettings}>
            <Text style={styles.saveButtonText}>Save Settings</Text>
          </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20,
    alignItems: 'center',
  },
  formContainer: {
    width: '100%',
    maxWidth: 400,
  },
  label: { 
    fontSize: 16, 
    marginTop: 20, 
    fontWeight: 'bold',
    textAlign: 'center',
  },
  input: {
	borderColor: '#ccc',
	borderWidth: 1,
	borderRadius: 5,
	paddingVertical: 8,
	paddingHorizontal: 10,
	marginBottom: 12,
	width: '100%',
	fontSize: 16,
	textAlign: 'center',
  },

    saveButton: {
	marginTop: 20,
	alignSelf: 'center',
	backgroundColor: '#004225',
	paddingVertical: 10,
	paddingHorizontal: 20,
	borderRadius: 6,
  },

  saveButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});