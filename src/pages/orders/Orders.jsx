import Product from '../../components/order/Order'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'

import StackedChart from '../../components/chart/StackedChart'
import MixedBarChart from '../../components/chart/MixedBarChart'
import TwoLevelPieChart from '../../components/chart/TwoLevelPieChart'

import './orders.css'

function Orders(props) {
    return (
        <div className="orders">
            <Sidebar />
            <div className="orders-container">
                <Navbar handle={props.handle} />
                <div className="order-charts">
                    <StackedChart />
                    <MixedBarChart />
                    <TwoLevelPieChart />
                </div>
                <div className="order-table">
                    <Product />
                </div>
            </div>
        </div>
    )
}

export default Orders