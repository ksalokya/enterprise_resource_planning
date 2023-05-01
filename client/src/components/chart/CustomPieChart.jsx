import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import "./chart.css"

const data = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
];

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

  return (
    <div className="pie-chart">
      <div className="chart-top">
        <p className="chart-title">Total Revenue</p>
        <MoreVertIcon />
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <div>
          <PieChart width={420} height={400}>
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
          </PieChart>
          <div className="summary">
            <div className="item">
              <div className="itemTitle">Last Week</div>
              <div className="itemResult positive">
                <KeyboardArrowUpOutlinedIcon fontSize="small" />
                <div className="resultAmount">$12.4k</div>
              </div>
            </div>
            <div className="item">
              <div className="itemTitle">Target</div>
              <div className="itemResult negative">
                <KeyboardArrowDownIcon fontSize="small" />
                <div className="resultAmount">$12.4k</div>
              </div>
            </div>
            <div className="item">
              <div className="itemTitle">Last Month</div>
              <div className="itemResult positive">
                <KeyboardArrowUpOutlinedIcon fontSize="small" />
                <div className="resultAmount">$12.4k</div>
              </div>
            </div>
          </div>
        </div>
      </ResponsiveContainer>
    </div>
  )
}

export default CustomPieChart