import BarChart from '../../components/chart/BarChart'
import PieChart from '../../components/chart/PieChart'
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
          <BarChart />
          <PieChart />
        </div>
      </div>
    </div>
  )
}

export default Home