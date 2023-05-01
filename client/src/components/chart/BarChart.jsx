import { BarChart, Bar, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import "./chart.css"

const data = [
  {
    CP: 4000,
    SP: 2400,
    amt: 2400,
  },
  {
    CP: 3000,
    SP: 1398,
    amt: 2210,
  },
  {
    CP: 2000,
    SP: 9800,
    amt: 2290,
  },
  {
    CP: 2780,
    SP: 3908,
    amt: 2000,
  },
  {
    CP: 1890,
    SP: 4800,
    amt: 2181,
  },
  {
    CP: 2390,
    SP: 3800,
    amt: 2500,
  },
  {
    CP: 3490,
    SP: 4300,
    amt: 2100,
  },
];

function CustomBarChart() {
  return (
    <div className="bar-chart">
      <div className="chart-top">
        <p className="chart-title">Last 6 Months (Sales)</p>
      </div>
      <ResponsiveContainer height="95%">
        <BarChart
          data={data}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          <Bar dataKey="CP" fill="#8884d8" />
          <Bar dataKey="SP" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default CustomBarChart