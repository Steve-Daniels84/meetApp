import { useState, useEffect } from 'react';
import {
  ScatterChart,
  Scatter,
  XAxis, YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const CityEventsChart = ({ allLocations, events }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = () => {
      const data = allLocations.map((location) => {
        const count = events.filter((event) => event.location === location).length;
        let city = location.split(', ')[0];

        if (city === "Dubai - United Arab Emirates") {
          city = "Dubai";
        }

        return { city, count };
      });
      return data;
    };

    setData(getData()); // Call the function here

  }, [allLocations, events]); // Only run when `allLocations` or `events` change

  return (
    <ResponsiveContainer width="99%" height={400}>
      <ScatterChart
        margin={{
          top: 20,
          right: 20,
          bottom: 20,
          left: 20,
        }}
      >
        <CartesianGrid />
        <XAxis type="category" dataKey="city" name="Location" />
        <YAxis type="number" dataKey="count" name="Number of events" allowDecimals={false} />
        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
        <Scatter name="Cities" data={data} fill="#8884d8" />
      </ScatterChart>
    </ResponsiveContainer>
  );
};

export default CityEventsChart;