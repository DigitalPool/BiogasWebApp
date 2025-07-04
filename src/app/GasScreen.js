// screens/GasScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity, Share } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import { fetchGasDataHistory } from '../utils/fetchThingSpeakData';
import { Ionicons } from '@expo/vector-icons';
import Constants from 'expo-constants';
import { getAiInsight } from '../utils/getAiInsight';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GasPieChart from '../components/PieChart';

const screenWidth = Dimensions.get('window').width;

const { EXPO_PUBLIC_CHANNEL_ID, EXPO_PUBLIC_THINGSPEAK_API_KEY } = Constants.expoConfig.extra || {};

if (!EXPO_PUBLIC_CHANNEL_ID || !EXPO_PUBLIC_THINGSPEAK_API_KEY) {
  console.error('Missing ThingSpeak configuration: EXPO_PUBLIC_CHANNEL_ID or EXPO_PUBLIC_THINGSPEAK_API_KEY is undefined.');
}



export default function GasScreen({ route }) {
  const gasType = route?.params?.gasType || 'Methane';
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [latest, setLatest] = useState(null);
  const [aiInsight, setAiInsight] = useState('AI insight not loaded');
  const [insightLoading, setInsightLoading] = useState(false);

  const FIELD_MAPPING = {
    Methane: 1,
    H2S: 2,
    Oxygen: 3,
    Hydrogen: 4,
    CO2: 5,
    CO: 6,
  };

  const fieldNum = FIELD_MAPPING[gasType];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const history = await fetchGasDataHistory(EXPO_PUBLIC_CHANNEL_ID, EXPO_PUBLIC_THINGSPEAK_API_KEY, fieldNum);
        const valid = history.filter(d => !isNaN(d.value));
        setData(valid);
        const latestVal = valid.length > 0 ? valid[valid.length - 1].value : null;
        setLatest(latestVal);
      } catch (err) {
        console.error('Error fetching gas data history:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleGetInsight = async () => {
    const valuesOnly = data.map(d => d.value);
    if (valuesOnly.length === 0) {
      setAiInsight('Not enough data for AI insight.');
      return;
    }

    setInsightLoading(true);
    try {
      const insight = await getAiInsight(gasType, valuesOnly);
      setAiInsight(insight);
    } catch (aiError) {
      console.error('Error fetching AI insight:', aiError);
      if (aiError.response?.status === 429) {
        setAiInsight('Too many requests to AI. Please wait and try again later.');
      } else {
        setAiInsight('AI insight could not be retrieved.');
      }
    } finally {
      setInsightLoading(false);
    }
  };

  const labels = data.map((d, i) => (i % 30 === 0 ? new Date(d.time).toLocaleTimeString() : ''));
  const values = data.map((d) => d.value);

  // Use same normalization logic as dashboard
  const normalized = Math.min(Math.max(latest || 0, 0), 100); // Clamp to 0–100
  const gasPercentage = latest ? parseFloat(((latest / 1000000) * 100).toFixed(2)) : 0;

  const handleShare = async () => {
    try {
      await Share.share({
        message: `${gasType} current level: ${latest || 'N/A'} ppm`,
      });
    } catch (error) {
      alert('Error sharing data');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerRow}>
        <Ionicons name="analytics" size={28} color="#004225" />
        <Text style={styles.title}>{gasType} Dashboard</Text>
        <TouchableOpacity onPress={handleShare}>
          <Ionicons name="share-social" size={24} color="#004225" />
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#004225" />
      ) : (
        <>
          <View style={styles.metricCard}>
            <Text style={styles.metricLabel}>Current Level</Text>
            <Text style={styles.metricValue}>
              {latest != null ? `${latest} ppm` : 'N/A'}
            </Text>
            <Text style={styles.metricPercentage}>
              {latest != null ? `(${gasPercentage}%)` : ''}
            </Text>
          </View>

          <Text style={styles.chartLabel}>Composition of {gasType}</Text>
          <View style={styles.chartContainer}>
            <GasPieChart value={normalized} label={gasType} />
          </View>

          {values.length === 0 ? (
            <Text style={styles.noDataText}>No data available for this gas</Text>
          ) : (
            <>
              <Text style={styles.chartLabel}>Last 100 readings</Text>
              <View style={styles.chartContainer}>
                <LineChart
                  data={{
                    labels,
                    datasets: [{ data: values }],
                  }}
                  width={Math.min(screenWidth - 20, 800)}
                  height={300}
                  yAxisSuffix=" ppm"
                  chartConfig={{
                      backgroundColor: '#ffffff',
                      backgroundGradientFrom: '#ffffff',
                      backgroundGradientTo: '#ffffff',
                      decimalPlaces: 1,
                      color: (opacity = 1) => `rgba(0, 66, 37, ${opacity})`,
                      labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                      propsForBackgroundLines: {
                        stroke: '#',
                      },
                      propsForDots: {
                        r: '4',
                        strokeWidth: '2',
                        stroke: '#00cc88',
                      },
                    }}
                  bezier
                  style={{
                    marginVertical: 12,
                    borderRadius: 16,
                    backgroundColor: '#ffffff',
                  }}
                />
              </View>
            </>
          )}

          <View style={styles.insightBox}>
            <Text style={styles.insightTitle}>AI Insight</Text>
            <TouchableOpacity onPress={handleGetInsight} style={styles.insightButton}>
              <Text style={styles.insightButtonText}>Read Insight</Text>
            </TouchableOpacity>
            {insightLoading ? (
              <ActivityIndicator size="small" color="#004225" style={{ marginTop: 10 }} />
            ) : (
              <Text style={styles.insightText}>{aiInsight}</Text>
            )}
          </View>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fdfdfd',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#004225',
  },
  metricCard: {
    backgroundColor: '#004225',
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    elevation: 2,
    alignItems: 'center',
  },
  metricLabel: {
    color: '#bbb',
    fontSize: 16,
    textAlign: 'center',
  },
  metricValue: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 4,
    textAlign: 'center',
  },
  metricPercentage: {
    color: '#fff',
    fontSize: 18,
    marginTop: 4,
    textAlign: 'center',
    opacity: 0.8,
  },
  chartLabel: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
    marginTop: 12,
    textAlign: 'center',
  },
  chartContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    width: '100%',
  },
  noDataText: {
    color: '#999',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
  insightBox: {
    marginTop: 20,
    backgroundColor: '#f1f1f1',
    padding: 16,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  insightTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 6,
    color: '#333',
  },
  insightButton: {
    backgroundColor: '#004225',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 8,
    maxWidth: 150,
  },
  insightButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  insightText: {
    fontSize: 15,
    color: '#333',
    marginTop: 12,
  },
});
