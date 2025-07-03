// src/app/_layout.js

import { Slot } from 'expo-router';
import Navbar from '../components/Navbar';
import { SafeAreaView, StyleSheet } from 'react-native';

export default function Layout() {
	return (
		<SafeAreaView style={styles.wrapper}>
			<Navbar />
			<Slot />
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	wrapper: {
		flex: 1,
		backgroundColor: '#f9f9f9',
	},
});
