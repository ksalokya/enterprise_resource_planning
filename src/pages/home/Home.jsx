import CustomBarChart from '../../components/chart/CustomBarChart'
import CustomPieChart from '../../components/chart/CustomPieChart'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import Widget from '../../components/widgets/Widget'
import "./home.css"

function Home(props) {
  return (
    <div className="home">
      <Sidebar />
      <div className="home-container">
        <Navbar handle={props.handle} />
        <div className="widgets">
          <Widget type="user" />
          <Widget type="order" />
          <Widget type="earning" />
          <Widget type="balance" />
        </div>
        <div className="chart">
          <CustomBarChart />
          <CustomPieChart />
        </div>
      </div>
    </div>
  )
}

export default Home