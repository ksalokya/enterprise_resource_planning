import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'

import Scheduler from '../../components/calendar/Calendar'

import './calendar.css'

function Calendar(props) {
    return (
        <div className="calendar">
            <Sidebar />
            <div className="calendar-container">
                <Navbar handle={props.handle} />
                <div className="calendar-component">
                    <Scheduler />
                </div>
            </div>
        </div>
    )
}

export default Calendar