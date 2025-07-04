import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Linking } from 'react-native';
import { useRouter } from 'expo-router';

export default function Index() {
	const router = useRouter();

	const openWebsite = () => {
		Linking.openURL('https://biogas.czu.cz/en');
	};

	return (
		<View style={styles.page}>
			{/* ✅ MAIN BODY */}
			<ScrollView contentContainerStyle={styles.container}>
				<Image source={require('../assets/logo.png')} style={styles.heroLogo} />
				<Text style={styles.title}>Biogas Analyzer</Text>
				<Text style={styles.subtitle}>
					Monitor and analyze your biogas system in real-time with smart AI insights and detailed visualizations.
				</Text>

				<View style={styles.features}>
					<Text style={styles.feature}>Live Gas Readings from Sensors</Text>
					<Text style={styles.feature}>Historical Graphs and Charts</Text>
					<Text style={styles.feature}>AI-Generated Operational Insights</Text>
					<Text style={styles.feature}>Sensor Calibration Tools</Text>
					<Text style={styles.feature}>Data Export in CSV Format</Text>
				</View>

				<TouchableOpacity style={styles.button} onPress={() => router.push('/HomeScreen')}>
					<Text style={styles.buttonText}>🚀 Launch Dashboard</Text>
				</TouchableOpacity>

				{/* ✅ ABOUT SECTION */}
				<View style={styles.infoBox}>
					<Text style={styles.sectionTitle}>📍 About the BRT Division</Text>
					<Text style={styles.description}>
						This tool is developed by the <Text style={styles.bold}>BioResources and Technology (BRT)</Text> research team at the
						Faculty of Tropical AgriSciences (FTZ), Czech University of Life Sciences Prague (CZU).
					</Text>
					<Text style={styles.description}>
						Our research focuses on sustainable technologies in agriculture, energy, and environmental systems. The Biogas Analyzer
						app is part of our effort to make bioenergy systems more efficient and intelligent.
					</Text>
					<TouchableOpacity onPress={openWebsite}>
						<Text style={styles.linkText}>🌐 Learn more: https://biogas.czu.cz/en</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>

			{/* ✅ FOOTER */}
			<View style={styles.footer}>
				<Text style={styles.footerText}>© {new Date().getFullYear()} BRT Research Team · CZU Prague · All rights reserved.</Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	page: {
		flex: 1,
		backgroundColor: '#f9f9f9',
	},
	navbar: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		backgroundColor: '#004225',
		paddingVertical: 10,
		paddingHorizontal: 16,
		flexWrap: 'wrap',
	},
	navLeft: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	navLogo: {
		width: 36,
		height: 36,
		marginRight: 8,
	},
	navTitle: {
		fontSize: 18,
		fontWeight: 'bold',
		color: '#fff',
	},
	navTabs: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'flex-end',
		gap: 10,
	},
	navLink: {
		color: '#fff',
		fontSize: 14,
		fontWeight: '600',
		paddingVertical: 6,
		paddingHorizontal: 10,
	},
	container: {
		flexGrow: 1,
		alignItems: 'center',
		justifyContent: 'center',
		padding: 24,
	},
	heroLogo: {
		width: 100,
		height: 100,
		marginTop: 20,
		marginBottom: 16,
		padding: 100,
	},
	title: {
		fontSize: 28,
		fontWeight: 'bold',
		color: '#004225',
		marginBottom: 8,
		textAlign: 'center',
	},
	subtitle: {
		fontSize: 16,
		color: '#555',
		textAlign: 'center',
		marginBottom: 20,
		paddingHorizontal: 12,
	},
	features: {
		marginBottom: 30,
		width: '100%',
		maxWidth: 400,
	},
	feature: {
		fontSize: 15,
		color: '#333',
		marginVertical: 4,
		textAlign: 'center',
		paddingHorizontal: 10,
		backgroundColor: '#eaeaea',
		paddingVertical: 8,
		borderRadius: 6,
		elevation: 1,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.1,
		shadowRadius: 2,
		overflow: 'hidden',
		borderWidth: 1,
		borderColor: '#ddd',
		transition: 'background-color 0.3s ease',	
	},
	button: {
		backgroundColor: '#004225',
		paddingVertical: 14,
		paddingHorizontal: 30,
		borderRadius: 8,
		marginBottom: 30,
		alignItems: 'center',
		justifyContent: 'center',
		elevation: 2,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.1,
		shadowRadius: 2,
		transition: 'background-color 0.3s ease',
	},
	buttonText: {
		color: '#fff',
		fontSize: 16,
		fontWeight: 'bold',
	},
	infoBox: {
		width: '100%',
		maxWidth: 500,
		paddingHorizontal: 10,
		marginBottom: 40,
		backgroundColor: '#f1f1f1',
		paddingVertical: 20,
		borderRadius: 10,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.1,
		shadowRadius: 2,
		borderWidth: 1,
		borderColor: '#ddd',
		marginHorizontal: 20,
		elevation: 1,
		alignItems: 'center',
		justifyContent: 'center',
		padding: 20,
		gap: 10,
	},
	sectionTitle: {
		fontSize: 18,
		fontWeight: 'bold',
		color: '#004225',
		marginBottom: 10,
		textAlign: 'center',
	},
	description: {
		fontSize: 14,
		color: '#444',
		marginBottom: 10,
		lineHeight: 20,
		textAlign: 'center',
	},
	bold: {
		fontWeight: 'bold',
	},
	linkText: {
		color: '#007AFF',
		fontSize: 14,
		marginTop: 5,
		textAlign: 'center',
	},
	footer: {
		backgroundColor: '#eaeaea',
		paddingVertical: 12,
		alignItems: 'center',
		borderTopWidth: 1,
		borderTopColor: '#ddd',
		marginTop: 'auto',
		paddingHorizontal: 20,
		justifyContent: 'center',
		elevation: 1,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: -1 },
	},
	footerText: {
		color: '#777',
		fontSize: 12,
	},
});
