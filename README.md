Here’s a comprehensive `README.md` file for your **BiogasMobileApp**, including an overview, key features, setup instructions, environment variable handling, and known issues:

---

````markdown
# 🔬 BiogasMobileApp (Web + Native)

A cross-platform biogas gas monitoring application that visualizes gas sensor data from **ThingSpeak** and offers **AI-powered insights** for biological diagnosis and gas behavior interpretation. Built using **React Native (Expo Router)** for both mobile and web platforms.

![screenshot](https://user-images.githubusercontent.com/your-image-link.png) <!-- Optional image -->

---

## 📦 Key Features

- 📊 Real-time gas monitoring dashboard (CH₄, CO₂, H₂S, H₂, O₂, CO)
- 🧠 AI insights based on substrate and reactor condition (via OpenAI API)
- 🌐 Web + Mobile support using `expo-router`
- 🔁 Historical trends pulled from **ThingSpeak**
- ⚙️ Sensor calibration, export options (coming soon)

---

## ⚙️ Technologies Used

- **React Native** via [Expo](https://expo.dev)
- **Expo Router**
- **React Native Web**
- **ThingSpeak API**
- **OpenAI GPT-3.5 Turbo**
- **AsyncStorage** for saving local reactor settings

---

## 🚀 Getting Started

### ✅ 1. Clone the Repo

```bash
git clone https://github.com/DigitalPool/BiogasMobileApp.git
cd BiogasMobileApp
````

### ✅ 2. Fix any npm permission issues

> Run the following to fix root-owned `.npm` cache (only needed once):

```bash
sudo chown -R $(whoami) ~/.npm
```

---

### ✅ 3. Install Dependencies

```bash
npm install
```

---

### ✅ 4. Setup Environment Variables

Create a `.env` file in the root folder:

```env
EXPO_PUBLIC_CHANNEL_ID=your_thingspeak_channel_id
EXPO_PUBLIC_THINGSPEAK_API_KEY=your_thingspeak_read_key
EXPO_PUBLIC_OPENAI_API_KEY=your_openai_key
```

You can find these under your [ThingSpeak channel settings](https://thingspeak.com) and [OpenAI API keys](https://platform.openai.com/account/api-keys).

---

### ✅ 5. Install Dotenv Package (Required)

```bash
npm install dotenv
```

---

### ✅ 6. Run the App Locally

```bash
npx expo start --web
```

Once Metro Bundler starts, press:

* `w` → for Web
* `a` or `i` → for Android/iOS simulators
* `Ctrl+C` to quit

The web version will be available at [http://localhost:8081](http://localhost:8081).

---

## ⚠️ Known Issues

* **Dark Mode Chart Bug**: The charts may render black in dark mode due to `recharts` and theme conflicts. Use light mode for now.
* **Outdated Dependencies**: Several deprecated packages may show warnings. App still works. Clean-up and upgrade will follow.

---

## ✨ Planned Features

* Gas threshold alerts with push/email notifications
* Export as CSV or PDF
* Enhanced dashboard UI
* Feedstock-specific predictive analysis

---

## 👥 Contributors

* AbdulAzeez Shobajo – [LinkedIn](https://linkedin.com/in/abdulazeez-shobajo-304171138/) | [Portfolio](https://azeezshobajo.vercel.app/)

---

## 📄 License

This project is licensed under the MIT License.

---

## 🧪 Want to Contribute?

Pull requests are welcome! Please fork this repo and submit a PR. For major changes, open an issue first to discuss what you’d like to change.

```

---

Let me know if you’d like me to auto-create this file in your repo or assist with GitHub Pages/Vercel deployment.
```
