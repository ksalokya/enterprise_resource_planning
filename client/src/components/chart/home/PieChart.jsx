import { useState, useContext, useEffect } from 'react';
import { UserContext } from '../../../App';
import ComponentLoader from '../../loader/ComponentLoader';
import axios from 'axios';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';
import MoreVertIcon from "@mui/icons-material/MoreVert";
import "../chart.css"

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

function CustomPieChart() {

  const userContext = useContext(UserContext);
  const [data, setData] = useState();
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_CHART_DATA_SERVICE_URL}/pie/get/${parseInt(userContext?.userId)}`)
      .then((res) => {
        if (res.status === 200) {
          setData(res.data);
          setLoader(false);
        }
      })
      .catch((err) => console.log(err))
  }, []);

  return (
    <div className="pie-chart">
      <div className="chart-top">
        <p className="chart-title">Total Revenue</p>
        <MoreVertIcon />
      </div>
      {
        loader ?
          <ComponentLoader position='relative' style={{ width: 300 }} />
          :
          <ResponsiveContainer height="95%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={180}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
      }
    </div>
  )
}

export default CustomPieChart