import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Load calibration values from storage
 * @returns {Object} Calibration factors for each gas
 */
export async function getCalibrationValues() {
  try {
    const saved = await AsyncStorage.getItem('calibrationValues');
    if (saved) {
      return JSON.parse(saved);
    }
    // Return default calibration factors (1.0 = no adjustment)
    return {
      CH4: '1.0',
      CO2: '1.0',
      H2S: '1.0',
      O2: '1.0',
    };
  } catch (error) {
    console.error('Error loading calibration values:', error);
    // Return default values on error
    return {
      CH4: '1.0',
      CO2: '1.0',
      H2S: '1.0',
      O2: '1.0',
    };
  }
}

/**
 * Apply calibration factor to a raw sensor value
 * @param {number} rawValue - Raw sensor reading
 * @param {string} gasType - Type of gas (CH4, CO2, H2S, O2)
 * @param {Object} calibrationValues - Calibration factors object
 * @returns {number} Calibrated value
 */
export function applyCalibrationType(rawValue, gasType, calibrationValues) {
  if (rawValue === null || rawValue === undefined || isNaN(rawValue)) {
    return rawValue;
  }
  
  const calibrationFactor = parseFloat(calibrationValues[gasType] || '1.0');
  if (isNaN(calibrationFactor)) {
    return rawValue;
  }
  
  return rawValue * calibrationFactor;
}

/**
 * Get gas type from ThingSpeak field number
 * This mapping should match your ThingSpeak channel configuration
 * @param {number} fieldNum - ThingSpeak field number
 * @returns {string} Gas type
 */
export function getGasTypeFromField(fieldNum) {
  const fieldMapping = {
    1: 'CH4',
    2: 'CO2', 
    3: 'H2S',
    4: 'O2',
    // Add more mappings as needed for your ThingSpeak setup
  };
  
  return fieldMapping[fieldNum] || 'UNKNOWN';
}
