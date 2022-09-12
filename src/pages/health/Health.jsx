import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import Monitor from '../../components/monitor/Monitor'

import './health.css'

function Health(props) {
  return (
    <div className="health">
      <Sidebar />
      <div className="health-container">
        <Navbar handle={props.handle} />
        <div className="health-progress">
          <Monitor
            title="CPU"
            unit="GHz"
            color='rgb(30, 183, 255)'
          />
          <Monitor
            title="Memory"
            unit="GB"
            color='rgb(202, 142, 255)'
          />
          <Monitor
            title="Traffic"
            unit="Mb"
            color='rgb(27, 185, 52)'
          />
          <Monitor
            title="Disk I/O"
            unit="MB"
            color='rgb(247, 191, 71)'
          />
        </div>
      </div>
    </div>
  )
}

export default Health