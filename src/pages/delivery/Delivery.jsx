import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'

import WorldMap from '../../components/map/Worldmap'
import SparkLine from '../../components/chart/SparkLine'
import Network from '../../components/map/Network'

import './delivery.css'

function Delivery(props) {
    return (
        <div className="delivery">
            <Sidebar />
            <div className="delivery-container">
                <Navbar handle={props.handle} />
                <div className="delivery-map">
                    <WorldMap />
                    <div className="country-component">
                        <SparkLine />
                        <Network />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Delivery