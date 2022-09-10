import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'

import Spreedsheet from '../../components/sheet/Spreedsheet'

import './sheet.css'

function Sheet(props) {
    return (
        <div className="sheet">
            <Sidebar />
            <div className="sheet-container">
                <Navbar handle={props.handle} />
                <div className="sheet-component">
                    <Spreedsheet />
                </div>
            </div>
        </div>
    )
}

export default Sheet