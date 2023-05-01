import { Link } from "react-router-dom";
import { DataGrid } from '@mui/x-data-grid';
import { userColumns, userRows } from './datasource.js';
import './datatable.css'

function Datatable() {

    const actionColumn = [
        {
            field: "action",
            headerName: "Action",
            width: 200,
            renderCell: (params) => {
                return (
                    <div className="cellAction">
                        <Link to="/users/test" style={{ textDecoration: "none" }}>
                            <div className="viewButton">View</div>
                        </Link>
                        <div
                            className="deleteButton"
                            // onClick={() => handleDelete(params.row.id)}
                        >
                            Delete
                        </div>
                    </div>
                );
            },
        },
    ];

    return (
        <div className='data-table'>
            <DataGrid
                rows={userRows}
                columns={userColumns.concat(actionColumn)}
                pageSize={10}
                rowsPerPageOptions={[10, 20, 50]}
                checkboxSelection
            />
        </div>
    )
}

export default Datatable