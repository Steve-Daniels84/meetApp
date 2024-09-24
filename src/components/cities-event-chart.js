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
        let city = location.split((/, | - /))[0];



        return { city, count };
      });
      return data;
    };

    setData(getData()); 

  }, [allLocations, events]);

  return (
    <ResponsiveContainer width="99%" height={400} className="charts">
      <ScatterChart
        margin={{
          top: 20,
          right: 20,
          bottom: 20,
          left: 20,
        }}
      >
        <CartesianGrid />
        <XAxis
          type="category" dataKey="city" name="Location"
          angle={20} interval={0} tick={{ dx: 20, dy: 20, fontSize: 11 }}
        />
        <YAxis type="number" dataKey="count" name="Number of events" allowDecimals={false} />
        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
        <Scatter name="Cities" data={data} fill="#8884d8" />
      </ScatterChart>
    </ResponsiveContainer>
  );
};

export default CityEventsChart;