import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import Datatable from '../../components/usertable/Datatable'
import './users.css'

function Users(props) {
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

export default Users