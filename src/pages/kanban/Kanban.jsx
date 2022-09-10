import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'

import KanbanBoard from '../../components/kanban/Kanban'

import './kanban.css'

function Kanban(props) {
    return (
        <div className="kanban">
            <Sidebar />
            <div className="kanban-container">
                <Navbar handle={props.handle} />
                <div className='kanban-container-board'>
                    <KanbanBoard />
                </div>
            </div>
        </div>
    )
}

export default Kanban