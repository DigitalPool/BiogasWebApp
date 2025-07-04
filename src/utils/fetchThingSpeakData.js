import axios from 'axios';
import { getCalibrationValues, applyCalibrationType, getGasTypeFromField } from './calibration';

export async function fetchGasLatestValue(channelId, readApiKey, fieldNum) {
  try {
    const response = await axios.get(
      `https://api.thingspeak.com/channels/${channelId}/fields/${fieldNum}/last.json?api_key=${readApiKey}`
    );
    
    const rawValue = parseFloat(response.data[`field${fieldNum}`]);
    
    // Apply calibration
    const calibrationValues = await getCalibrationValues();
    const gasType = getGasTypeFromField(fieldNum);
    const calibratedValue = applyCalibrationType(rawValue, gasType, calibrationValues);
    
    return calibratedValue;
  } catch (err) {
    console.error(`Error fetching field ${fieldNum}:`, err);
    return null;
  }
}

export async function fetchGasDataHistory(channelId, readApiKey, fieldNum) {
  try {
    const url = `https://api.thingspeak.com/channels/${channelId}/fields/${fieldNum}.json?api_key=${readApiKey}&results=100`;
    const response = await axios.get(url);

    // Get calibration values once for all data points
    const calibrationValues = await getCalibrationValues();
    const gasType = getGasTypeFromField(fieldNum);

    return response.data.feeds.map(feed => {
      const rawValue = parseFloat(feed[`field${fieldNum}`]);
      const calibratedValue = applyCalibrationType(rawValue, gasType, calibrationValues);
      
      return {
        time: feed.created_at,
        value: calibratedValue,
      };
    }).filter(d => !isNaN(d.value));
  } catch (err) {
    console.error(`Error fetching history for field ${fieldNum}`, err);
    return [];
  }
}
