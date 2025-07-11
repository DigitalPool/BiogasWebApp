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
					const normalized = Math.min(Math.max(val || 0, 0), 100);
					const percentage = val != null ? (val / 1_000_000 * 100).toFixed(6) : null;

					return (
						<TouchableOpacity
							key={gas.label}
							style={styles.card}
							onPress={() =>
								router.push({
									pathname: '/GasScreen',
									params: { gasType: gas.label },
								})
							}
							activeOpacity={0.8}
						>
							<View>
								<Text style={styles.cardText}>{gas.label}</Text>
								<Text style={styles.valueText}>
									{val != null ? `${val} ppm (${percentage}%)` : 'No Data'}
								</Text>
								<GasPieChart value={normalized} label={gas.label} />

								<View style={styles.graphButtonContainer}>
									<Text style={styles.graphText}>📈 Click to View Graph</Text>
								</View>
							</View>
						</TouchableOpacity>
					);
				})
			)}
		</ScrollView>

	);
}


const styles = StyleSheet.create({
  container: {
	alignItems: 'center',
	paddingVertical: 24,
	paddingHorizontal: '5%',
	backgroundColor: '#f4f4f4',
	paddingBottom: 20,
	},

	title: {
		fontSize: 26,
		fontWeight: 'bold',
		marginBottom: 20,
	},

	card: {
		backgroundColor: '#004225',
		padding: 20,
		borderRadius: 10,
		width: '95%',
		maxWidth: 500,
		minWidth: 320,
		marginVertical: 10,
		alignSelf: 'center',
		alignItems: 'center',
	},


	cardText: {
		color: '#fff',
		fontSize: 18,
		marginBottom: 6,
		textAlign: 'center',
	},

	valueText: {
		color: '#eee',
		fontSize: 16,
		marginBottom: 10,
		textAlign: 'center',
	},

	viewButton: {
		marginTop: 10,
		alignSelf: 'flex-end',
		backgroundColor: '#006d4c',
		paddingVertical: 6,
		paddingHorizontal: 12,
		borderRadius: 6,
	},

	viewButtonText: {
		color: '#fff',
		fontSize: 13,
		fontWeight: '600',
	},
	graphButtonContainer: {
		marginTop: 10,
		alignItems: 'center',
		width: '100%',
	},

	graphText: {
		color: '#fff',
		fontSize: 12,
		backgroundColor: '#006645',
		paddingVertical: 4,
		paddingHorizontal: 8,
		borderRadius: 4,
		textAlign: 'center',
	},
});
