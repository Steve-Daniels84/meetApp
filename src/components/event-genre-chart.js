import { useState, useEffect } from "react";
import {
PieChart, Pie,
  ResponsiveContainer,
} from "recharts";

const genres = ['React', 'JavaScript', 'Node', 'jQuery', 'Angular'];

const EventsGenreChart = ({ events }) => {
    const [data, setData] = useState([])


  useEffect(() => {
    const getData = () => {
        const data = genres.map((genre) => {
          const filteredEvents = events.filter(event => event.summary.includes(genre));
  
          return {
                  name: genre, 
                  count: filteredEvents.length 
                  };
        });
        return data
      };
      setData(getData())
  }, [events])

  const renderCustomizedLabel = ({ cx, cy, midAngle, outerRadius, percent, index }) => {
    const RADIAN = Math.PI / 180;
    const radius = outerRadius;
    const x = cx + radius * Math.cos(-midAngle * RADIAN) * 1.07;
    const y = cy + radius * Math.sin(-midAngle * RADIAN) * 1.07;
    return percent ? (
      <text
        x={x}
        y={y}
        fill="#8884d8"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
      >
        {`${genres[index]} ${(percent * 100).toFixed(0)}%`}
      </text>
    ) : null;
  };


  return (
    <ResponsiveContainer width="99%" height={400} className="charts">
      <PieChart width={730} height={250}>
        <Pie
          data={data}
          dataKey="count"
          fill="#8884d8"
          labelLine={false}
          label={renderCustomizedLabel}
          
          outerRadius={130}     
        />

      </PieChart>
    </ResponsiveContainer>
  );
};

export default EventsGenreChart;
