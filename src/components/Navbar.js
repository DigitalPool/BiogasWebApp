import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';

export default function Navbar() {
	const router = useRouter();

	return (
		<View style={styles.navbar}>
			{/* ✅ Logo and Title (clickable) */}
			<TouchableOpacity style={styles.navLeft} onPress={() => router.push('/')}>
				<Image source={require('../assets/logo.png')} style={styles.navLogo} />
				<Text style={styles.navTitle}>Biogas Analyzer</Text>
			</TouchableOpacity>

			{/* ✅ Navigation Tabs */}
			<View style={styles.navTabs}>
				<TouchableOpacity onPress={() => router.push('/HomeScreen')}>
					<Text style={styles.navLink}>Dashboard</Text>
				</TouchableOpacity>
				<TouchableOpacity onPress={() => router.push('/AIInsightsScreen')}>
					<Text style={styles.navLink}>All Gas Insights</Text>
				</TouchableOpacity>
				<TouchableOpacity onPress={() => router.push('/CalibrationScreen')}>
					<Text style={styles.navLink}>Calibration Tools</Text>
				</TouchableOpacity>
				<TouchableOpacity onPress={() => router.push('/ExportDataScreen')}>
					<Text style={styles.navLink}>Export Data</Text>
				</TouchableOpacity>
				<TouchableOpacity onPress={() => router.push('/ReactorProfileScreen')}>
					<Text style={styles.navLink}>Reactor Profile</Text>
				</TouchableOpacity>
				<TouchableOpacity onPress={() => router.push('/AppInfoScreen')}>
					<Text style={styles.navLink}>App Info</Text>
				</TouchableOpacity>
				<TouchableOpacity onPress={() => router.push('/ThingSpeakSettingsScreen')}>
					<Text style={styles.navLink}>ThingSpeak Settings</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	navbar: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		backgroundColor: '#004225',
		paddingVertical: 10,
		paddingHorizontal: 16,
        paddingTop: 30, // Extra padding for status bar
        paddingLeft: '5rem',
		flexWrap: 'wrap',
		zIndex: 10,
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
        paddingRight: '5rem',
	},
	navLink: {
		color: '#fff',
		fontSize: 14,
		fontWeight: '600',
		paddingVertical: 6,
		paddingHorizontal: 10,
	},
});
