import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'

import Spreadsheet from '../../components/sheet/Spreadsheet'

import './sheet.css'

function Sheet(props) {
    return (
        <div className="sheet">
            <Sidebar />
            <div className="sheet-container">
                <Navbar handle={props.handle} />
                <div className="sheet-component">
                    <Spreadsheet />
                </div>
            </div>
        </div>
    )
}

export default Sheet