import { useState, useContext, useEffect } from 'react';
import { UserContext } from '../../../App';
import ComponentLoader from '../../loader/ComponentLoader';
import axios from 'axios';
import { BarChart, Bar, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import "../chart.css"

// const data = [
//   {
//     CP: 4000,
//     SP: 2400,
//     amt: 2400,
//   },
//   {
//     CP: 3000,
//     SP: 1398,
//     amt: 2210,
//   },
//   {
//     CP: 2000,
//     SP: 9800,
//     amt: 2290,
//   },
//   {
//     CP: 2780,
//     SP: 3908,
//     amt: 2000,
//   },
//   {
//     CP: 1890,
//     SP: 4800,
//     amt: 2181,
//   },
//   {
//     CP: 2390,
//     SP: 3800,
//     amt: 2500,
//   },
//   {
//     CP: 3490,
//     SP: 4300,
//     amt: 2100,
//   },
// ];

function CustomBarChart() {
  const userContext = useContext(UserContext);
  const [data, setData] = useState();
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_CHART_DATA_SERVICE_URL}/bar/get/${parseInt(userContext?.userId)}`)
      .then((res) => {
        if (res.status === 200) {
          setData(res.data);
          setLoader(false);
        }
      })
      .catch((err) => console.log(err))
  }, []);

  return (
    <div className="bar-chart">
      <div className="chart-top">
        <p className="chart-title">Last 6 Months (Sales)</p>
      </div>
      {
        loader ?
          <ComponentLoader position='relative' />
          :
          <ResponsiveContainer height="95%">
            <BarChart
              data={data}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Legend />
              <Bar dataKey="cp" fill="#8884d8" />
              <Bar dataKey="sp" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
      }
    </div>
  )
}

export default CustomBarChart