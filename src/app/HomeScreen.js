import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { fetchGasLatestValue } from '../utils/fetchThingSpeakData';
import GasPieChart from '../components/PieChart';
import Constants from 'expo-constants';
import { useRouter } from 'expo-router';

const GAS_FIELDS = [
  { label: 'Methane', field: 1 },
  { label: 'H2S', field: 2 },
  { label: 'Oxygen', field: 3 },
  { label: 'Hydrogen', field: 4 },
  { label: 'CO2', field: 5 },
  { label: 'CO', field: 6 },
];

// ThingsSpeak Channel and API Key
const { EXPO_PUBLIC_CHANNEL_ID, EXPO_PUBLIC_THINGSPEAK_API_KEY } = Constants.expoConfig.extra;

export default function HomeScreen() {
	const router = useRouter(); // ✅ use this instead of `navigation`

	const [gasData, setGasData] = useState({});
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchAllData = async () => {
			let results = {};
			for (let gas of GAS_FIELDS) {
				const val = await fetchGasLatestValue(EXPO_PUBLIC_CHANNEL_ID, EXPO_PUBLIC_THINGSPEAK_API_KEY, gas.field);
				results[gas.label] = val;
			}
			setGasData(results);
			setLoading(false);
		};

		fetchAllData();
	}, []);

	return (
		<ScrollView contentContainerStyle={styles.container}>
			<Text style={styles.title}>Gas Monitoring</Text>
			{loading ? (
				<ActivityIndicator size="large" color="#004225" />
			) : (
				GAS_FIELDS.map((gas) => {
					const val = gasData[gas.label];
					const normalized = Math.min(Math.max(val || 0, 0), 100); // Clamp 0–100
					return (
						<TouchableOpacity
							key={gas.label}
							style={styles.card}
							onPress={() => router.push({ pathname: '/GasScreen', params: { gasType: gas.label } })} // ✅ This works
						>
							<Text style={styles.cardText}>{gas.label}</Text>
							<Text style={styles.valueText}>
								{val != null ? `${val} ppm` : 'No Data'}
							</Text>
							<GasPieChart value={normalized} label={gas.label} />
						</TouchableOpacity>
					);
				})
			)}
		</ScrollView>
	);
}


const styles = StyleSheet.create({
  container: {
    padding: '3%',
    backgroundColor: '#f4f4f4',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#004225',
    padding: 20,

    marginBottom: 20,
    borderRadius: 10,
  },
  cardText: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 6,
  },
  valueText: {
    color: '#eee',
    fontSize: 16,
    marginBottom: 10,
  },
});
