import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import Datatable from '../../components/datatable/Datatable'
import './list.css'

function List(props) {
    return (
        <div className="list">
            <Sidebar />
            <div className="list-container">
                <Navbar handle={props.handle} />
                <div className="table">
                    <Datatable />
                </div>
            </div>
        </div>
    )
}

export default List