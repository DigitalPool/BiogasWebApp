import React from 'react';
import { Dimensions } from 'react-native';
import { PieChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

export default function GasPieChart({ value, label }) {
  const chartData = [
    {
      name: label,
      population: value,
      color: '#00cc88',
      legendFontColor: '#333',
      legendFontSize: 12,
    },
    {
      name: 'Remaining',
      population: 100 - value,
      color: '#dddddd',
      legendFontColor: '#333',
      legendFontSize: 12,
    },
  ];

  return (
    <PieChart
      data={chartData}
      width={Math.min(screenWidth * 0.8, 300)}
      height={200}
      chartConfig={{
        color: () => `#00cc88`,
      }}
      accessor="population"
      backgroundColor="transparent"
      paddingLeft="15"
      hasLegend={false}
      center={[10, 0]}
    />
  );
}
