import { useState, useContext, useEffect } from 'react';
import { UserContext } from '../../../App';
import ComponentLoader from '../../loader/ComponentLoader';
import axios from 'axios';
import { BarChart, Bar, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import "../chart.css"

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