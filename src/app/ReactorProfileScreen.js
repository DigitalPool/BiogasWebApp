import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ReactorProfileScreen() {
  const [feedstock, setFeedstock] = useState('');
  const [temperature, setTemperature] = useState('');
  const [retentionTime, setRetentionTime] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    const loadProfile = async () => {
      const storedFeedstock = await AsyncStorage.getItem('feedstock');
      const storedTemperature = await AsyncStorage.getItem('temperature');
      const storedRetentionTime = await AsyncStorage.getItem('retentionTime');
      const storedStatus = await AsyncStorage.getItem('status');
      if (storedFeedstock) setFeedstock(storedFeedstock);
      if (storedTemperature) setTemperature(storedTemperature);
      if (storedRetentionTime) setRetentionTime(storedRetentionTime);
      if (storedStatus) setStatus(storedStatus);
    };
    loadProfile();
  }, []);

  const saveProfile = async () => {
    try {
      await AsyncStorage.setItem('feedstock', feedstock);
      await AsyncStorage.setItem('temperature', temperature);
      await AsyncStorage.setItem('retentionTime', retentionTime);
      await AsyncStorage.setItem('status', status);
      Alert.alert('Saved', 'Reactor profile updated successfully');
    } catch (error) {
      Alert.alert('Error', 'Failed to save profile');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.label}>Feedstock Description</Text>
        <TextInput
          style={styles.input}
          value={feedstock}
          onChangeText={setFeedstock}
          placeholder="e.g. Chicken manure, straw, MCC"
        />
        <Text style={styles.label}>Temperature Range (°C)</Text>
        <TextInput
          style={styles.input}
          value={temperature}
          onChangeText={setTemperature}
          placeholder="e.g. 35–38"
          keyboardType="default"
        />
        <Text style={styles.label}>Retention Time (days)</Text>
        <TextInput
          style={styles.input}
          value={retentionTime}
          onChangeText={setRetentionTime}
          placeholder="e.g. 20"
          keyboardType="numeric"
        />
        <Text style={styles.label}>Current Status</Text>
        <TextInput
          style={styles.input}
          value={status}
          onChangeText={setStatus}
          placeholder="active / paused"
        />
        <TouchableOpacity style={styles.saveButton} onPress={saveProfile}>
          <Text style={styles.saveButtonText}>Save Profile</Text>
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
	width: '90%',
	maxWidth: 500,
	alignSelf: 'center',
	fontSize: 16,
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
