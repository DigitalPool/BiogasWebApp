// screens/ExportDataScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Share, ActivityIndicator, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { fetchGasDataHistory } from '../utils/fetchThingSpeakData';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import Constants from 'expo-constants';

const { EXPO_PUBLIC_CHANNEL_ID: CHANNEL_ID, EXPO_PUBLIC_THINGSPEAK_API_KEY: READ_API_KEY } = Constants.expoConfig.extra || {};

export default function ExportDataScreen() {
	const [exporting, setExporting] = useState(false);
	const [statusMsg, setStatusMsg] = useState('');

	const FIELD_MAPPING = {
		CH4: 1,
		CO2: 2,
		H2S: 3,
		O2: 4,
	};

	const exportData = async () => {
		setExporting(true);
		setStatusMsg('Preparing data...');

		try {
			// Check if API credentials are available
			if (!CHANNEL_ID || !READ_API_KEY) {
				Alert.alert('❌ Configuration Error', 'ThingSpeak API credentials not found. Please check your environment variables.');
				return;
			}

			let csvContent = 'Timestamp,Gas,Value (Calibrated)\n';

			for (const [gas, fieldNum] of Object.entries(FIELD_MAPPING)) {
				setStatusMsg(`Fetching ${gas} data...`);
				const history = await fetchGasDataHistory(CHANNEL_ID, READ_API_KEY, fieldNum);
				const cleanData = history.filter(d => !isNaN(d.value));
				
				if (cleanData.length > 0) {
					const lines = cleanData.map(d => `${d.time},${gas},${d.value.toFixed(2)}`);
					csvContent += lines.join('\n') + '\n';
				}
			}

			// Create file
			const fileName = `biogas_data_${new Date().toISOString().slice(0, 10)}.csv`;
			const fileUri = FileSystem.documentDirectory + fileName;
			
			setStatusMsg('Creating CSV file...');
			await FileSystem.writeAsStringAsync(fileUri, csvContent);

			// Share the file
			try {
				if (await Sharing.isAvailableAsync()) {
					await Sharing.shareAsync(fileUri, {
						mimeType: 'text/csv',
						dialogTitle: 'Export Biogas Data',
					});
					setStatusMsg('Data exported successfully!');
				} else {
					throw new Error('File sharing not available');
				}
			} catch (sharingError) {
				console.log('File sharing failed, using fallback:', sharingError);
				// Fallback to basic share
				await Share.share({
					message: csvContent,
					title: 'Biogas Data Export'
				});
				setStatusMsg('Data shared successfully!');
			}

		} catch (err) {
			console.error('Export error:', err);
			setStatusMsg('Failed to export data. Please try again.');
			Alert.alert('❌ Export Failed', err.message || 'An error occurred while exporting data.');
		} finally {
			setExporting(false);
		}
	};

	return (
		<View style={styles.container}>
			<Ionicons name="cloud-download" size={40} color="#004225" />
			<Text style={styles.title}>Export Gas Data</Text>
			<Text style={styles.subtitle}>Export readings from ThingSpeak and share as CSV</Text>

			<TouchableOpacity style={styles.button} onPress={exportData} disabled={exporting}>
				{exporting ? (
					<ActivityIndicator size="small" color="#fff" />
				) : (
					<Text style={styles.buttonText}>Export All Gas Data</Text>
				)}
			</TouchableOpacity>

			{statusMsg !== '' && <Text style={styles.status}>{statusMsg}</Text>}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 24,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#fefefe',
	},
	title: {
		fontSize: 24,
		fontWeight: 'bold',
		color: '#004225',
		marginVertical: 10,
	},
	subtitle: {
		fontSize: 14,
		color: '#666',
		marginBottom: 30,
		textAlign: 'center',
	},
	button: {
		backgroundColor: '#004225',
		paddingVertical: 12,
		paddingHorizontal: 28,
		borderRadius: 8,
	},
	buttonText: {
		color: '#fff',
		fontSize: 16,
	},
	status: {
		marginTop: 16,
		fontSize: 14,
		color: '#333',
	},
});
