import 'dotenv/config';

export default {
	expo: {
		name: 'BiogasApp',
		slug: 'biogas-web-app',
		extra: {
			EXPO_PUBLIC_THINGSPEAK_API_KEY: process.env.EXPO_PUBLIC_THINGSPEAK_API_KEY,
			EXPO_PUBLIC_CHANNEL_ID: process.env.EXPO_PUBLIC_CHANNEL_ID,
			EXPO_PUBLIC_OPENAI_API_KEY: process.env.EXPO_PUBLIC_OPENAI_API_KEY,
		},
        web: {
			favicon: './assets/favicon.png',
		},
	},
};
