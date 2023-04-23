import { useContext } from 'react';
import { DarkMode } from '../../App';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import './order.css'

function Order(props) {
  const isDarkModeEnabled = useContext(DarkMode);

  return (
    <TableContainer component={Paper} className="table" sx={{
      backgroundColor: isDarkModeEnabled ? '#121212' : '',
    }}>
      <Table sx={{ minWidth: 650, color: isDarkModeEnabled ? '#fff' : '' }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ color: isDarkModeEnabled ? '#fff' : '' }}>Tracking ID</TableCell>
            <TableCell sx={{ color: isDarkModeEnabled ? '#fff' : '' }}>Product</TableCell>
            <TableCell sx={{ color: isDarkModeEnabled ? '#fff' : '' }}>{props.type}</TableCell>
            <TableCell sx={{ color: isDarkModeEnabled ? '#fff' : '' }}>Date</TableCell>
            <TableCell sx={{ color: isDarkModeEnabled ? '#fff' : '' }}>Amount</TableCell>
            <TableCell sx={{ color: isDarkModeEnabled ? '#fff' : '' }}>Payment Method</TableCell>
            <TableCell sx={{ color: isDarkModeEnabled ? '#fff' : '' }}>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell sx={{ color: isDarkModeEnabled ? '#fff' : '' }}>{row.id}</TableCell>
              <TableCell sx={{ color: isDarkModeEnabled ? '#fff' : '' }}>
                <div className="cellWrapper">
                  <img src={row.img} alt="" className="image" />
                  {row.product}
                </div>
              </TableCell>
              <TableCell sx={{ color: isDarkModeEnabled ? '#fff' : '' }}>{row.type}</TableCell>
              <TableCell sx={{ color: isDarkModeEnabled ? '#fff' : '' }}>{row.date}</TableCell>
              <TableCell sx={{ color: isDarkModeEnabled ? '#fff' : '' }}>{row.amount}</TableCell>
              <TableCell sx={{ color: isDarkModeEnabled ? '#fff' : '' }}>{row.method}</TableCell>
              <TableCell>
                <span className={`status ${row.status}`}>{row.status}</span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default Order