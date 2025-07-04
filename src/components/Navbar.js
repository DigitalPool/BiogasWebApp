import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useRouter, usePathname } from 'expo-router';

export default function Navbar() {
	const router = useRouter();
	const pathname = usePathname();

	const getNavLinkStyle = (route) => {
		const isActive = pathname === route;
		return [
			styles.navLink,
			isActive && styles.navLinkActive
		];
	};

	return (
		<View style={styles.navbar}>
			{/* ✅ Logo and Title (clickable) */}
			<TouchableOpacity style={styles.navLeft} onPress={() => router.push('/')}>
				<Image source={require('../assets/logo.png')} style={styles.navLogo} />
				<Text style={styles.navTitle}>Biogas Analyzer</Text>
			</TouchableOpacity>

			{/* ✅ Navigation Tabs */}
			<View style={styles.navTabs}>
				<TouchableOpacity onPress={() => router.push('/')}>
					<Text style={getNavLinkStyle('/')}>Home</Text>
				</TouchableOpacity>
				<TouchableOpacity onPress={() => router.push('/HomeScreen')}>
					<Text style={getNavLinkStyle('/HomeScreen')}>Dashboard</Text>
				</TouchableOpacity>
				<TouchableOpacity onPress={() => router.push('/AIInsightsScreen')}>
					<Text style={getNavLinkStyle('/AIInsightsScreen')}>All Gas Insights</Text>
				</TouchableOpacity>
				<TouchableOpacity onPress={() => router.push('/CalibrationScreen')}>
					<Text style={getNavLinkStyle('/CalibrationScreen')}>Calibration Tools</Text>
				</TouchableOpacity>
				<TouchableOpacity onPress={() => router.push('/ExportDataScreen')}>
					<Text style={getNavLinkStyle('/ExportDataScreen')}>Export Data</Text>
				</TouchableOpacity>
				<TouchableOpacity onPress={() => router.push('/ReactorProfileScreen')}>
					<Text style={getNavLinkStyle('/ReactorProfileScreen')}>Reactor Profile</Text>
				</TouchableOpacity>
				<TouchableOpacity onPress={() => router.push('/AppInfoScreen')}>
					<Text style={getNavLinkStyle('/AppInfoScreen')}>App Info</Text>
				</TouchableOpacity>
				<TouchableOpacity onPress={() => router.push('/ThingSpeakSettingsScreen')}>
					<Text style={getNavLinkStyle('/ThingSpeakSettingsScreen')}>ThingSpeak Settings</Text>
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
        paddingLeft: 20,
        paddingRight: 20,
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
		justifyContent: 'center',
		gap: 10,
		width: '100%',
		marginTop: 10,
	},
	navLink: {
		color: '#fff',
		fontSize: 14,
		fontWeight: '600',
		paddingVertical: 6,
		paddingHorizontal: 10,
		borderRadius: 4,
		transition: 'all 0.3s ease',
	},
	navLinkActive: {
		backgroundColor: '#00cc88',
		color: '#fff',
		fontWeight: 'bold',
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.2,
		shadowRadius: 3,
	},
});
