import React, { useState, useEffect } from 'react';
import {
	View,
	Text,
	StyleSheet,
	TextInput,
	ScrollView,
	TouchableOpacity,
	Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CalibrationScreen() {
	const [calibrationValues, setCalibrationValues] = useState({
		Methane: '',
		H2S: '',
		Oxygen: '',
		Hydrogen: '',
		CO2: '',
		CO: '',
	});

	// Load saved calibration values on component mount
	useEffect(() => {
		const loadCalibrationValues = async () => {
			try {
				const saved = await AsyncStorage.getItem('calibrationValues');
				if (saved) {
					setCalibrationValues(JSON.parse(saved));
				}
			} catch (error) {
				console.error('Error loading calibration values:', error);
			}
		};
		loadCalibrationValues();
	}, []);

	const handleChange = (key, value) => {
		setCalibrationValues((prev) => ({ ...prev, [key]: value }));
	};

	const handleSave = async () => {
		try {
			// Validate that all values are numbers
			const errors = [];
			Object.entries(calibrationValues).forEach(([gas, value]) => {
				if (value && isNaN(parseFloat(value))) {
					errors.push(`${gas} must be a valid number`);
				}
			});

			if (errors.length > 0) {
				Alert.alert('❌ Invalid Input', errors.join('\n'));
				return;
			}

			// Save to AsyncStorage
			await AsyncStorage.setItem('calibrationValues', JSON.stringify(calibrationValues));
			console.log('Calibration saved:', calibrationValues);
			Alert.alert('✅ Success', 'Calibration values saved and will be applied to all sensor readings!');
		} catch (error) {
			console.error('Error saving calibration values:', error);
			Alert.alert('❌ Error', 'Failed to save calibration values');
		}
	};

	const handleReset = async () => {
		try {
			const defaultValues = {
				Methane: '1.0',
				H2S: '1.0',
				Oxygen: '1.0',
				Hydrogen: '1.0',
				CO2: '1.0',
				CO: '1.0',
			};
			setCalibrationValues(defaultValues);
			await AsyncStorage.setItem('calibrationValues', JSON.stringify(defaultValues));
			Alert.alert('🔄 Reset Complete', 'All calibration factors reset to 1.0 (no adjustment)');
		} catch (error) {
			console.error('Error resetting calibration values:', error);
			Alert.alert('❌ Error', 'Failed to reset calibration values');
		}
	};

	return (
		<ScrollView contentContainerStyle={styles.container}>
			<Text style={styles.title}>🛠️ Sensor Calibration</Text>

			<View style={styles.formContainer}>
				{Object.keys(calibrationValues).map((gas) => (
					<View key={gas} style={styles.inputGroup}>
						<Text style={styles.label}>{gas} Calibration Factor</Text>
						<TextInput
							style={styles.input}
							value={calibrationValues[gas]}
							onChangeText={(val) => handleChange(gas, val)}
							keyboardType="numeric"
							placeholder={`e.g. 1.25`}
						/>
					</View>
				))}

				<TouchableOpacity style={styles.button} onPress={handleSave}>
					<Text style={styles.buttonText}>💾 Save Calibration</Text>
				</TouchableOpacity>

				<TouchableOpacity style={styles.resetButton} onPress={handleReset}>
					<Text style={styles.resetButtonText}>🔄 Reset to Default (1.0)</Text>
				</TouchableOpacity>
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		padding: 20,
		backgroundColor: '#fff',
		alignItems: 'center',
	},
	title: {
		fontSize: 24,
		fontWeight: 'bold',
		marginBottom: 20,
		textAlign: 'center',
	},
	formContainer: {
		width: '100%',
		maxWidth: 400,
		alignItems: 'center',
	},
	inputGroup: {
		marginBottom: 15,
		width: '100%',
	},
	label: {
		fontSize: 16,
		marginBottom: 5,
		color: '#333',
		textAlign: 'center',
	},
	input: {
		borderWidth: 1,
		borderColor: '#ccc',
		borderRadius: 6,
		padding: 10,
		fontSize: 16,
		width: '100%',
		textAlign: 'center',
	},
	button: {
		marginTop: 30,
		backgroundColor: '#28a745',
		paddingVertical: 12,
		paddingHorizontal: 24,
		borderRadius: 8,
	},
	buttonText: {
		color: '#fff',
		fontWeight: 'bold',
		fontSize: 16,
	},
	resetButton: {
		marginTop: 15,
		backgroundColor: '#6c757d',
		paddingVertical: 12,
		paddingHorizontal: 24,
		borderRadius: 8,
	},
	resetButtonText: {
		color: '#fff',
		fontWeight: 'bold',
		fontSize: 16,
	},
});
