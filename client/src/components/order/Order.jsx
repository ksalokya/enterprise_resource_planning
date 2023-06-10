import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from "react-router-dom";
import { DarkMode } from '../../App';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ComponentLoader from '../loader/ComponentLoader';
import './order.css'

function Order() {
  const location = useLocation();
  let currentPath = location.pathname;
  const isDarkModeEnabled = useContext(DarkMode);
  const [rows, setRows] = useState();
  const [loader, setLoader] = useState(true);

  // TODO :: Handle userID
  // Add optimization for call from profile
  useEffect(() => {
    axios.get(`http://localhost:8080/api/v1/order/get/${1}`)
      .then((res) => {
        if (res.status === 200) {
          let data = res.data;
          setRows(currentPath === "/profile" ? data.sort().reverse().splice(0, 5) : data);
          setLoader(false);
        }
      })
      .catch((err) => console.log(err))
  }, [])

  return (
    <>
      {
        loader ?
          <ComponentLoader position='relative' style={{ top: "100%" }} />
          :
          <TableContainer component={Paper} className="table" sx={{
            backgroundColor: isDarkModeEnabled ? '#121212' : '',
          }}>
            <Table sx={{ minWidth: 650, color: isDarkModeEnabled ? '#fff' : '' }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell
                    sx={{
                      color: isDarkModeEnabled ? '#fff' : '',
                      display: currentPath === "/profile" ? 'none' : ''
                    }}
                  >Tracking ID</TableCell>
                  <TableCell sx={{ color: isDarkModeEnabled ? '#fff' : '' }}>Product</TableCell>
                  <TableCell sx={{ color: isDarkModeEnabled ? '#fff' : '' }}>Customer Name</TableCell>
                  <TableCell sx={{ color: isDarkModeEnabled ? '#fff' : '' }}>Date</TableCell>
                  <TableCell sx={{ color: isDarkModeEnabled ? '#fff' : '' }}>Amount</TableCell>
                  <TableCell sx={{ color: isDarkModeEnabled ? '#fff' : '' }}>Payment Method</TableCell>
                  <TableCell sx={{ color: isDarkModeEnabled ? '#fff' : '' }}>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody  >
                {rows.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell sx={{
                      color: isDarkModeEnabled ? '#fff' : '',
                      display: currentPath === "/profile" ? 'none' : ''
                    }}>{row.id}</TableCell>
                    <TableCell sx={{ color: isDarkModeEnabled ? '#fff' : '' }}>
                      <div className="cellWrapper">
                        <img src={row.img} alt="" className="image" />
                        {row.product}
                      </div>
                    </TableCell>
                    <TableCell sx={{ color: isDarkModeEnabled ? '#fff' : '' }}>{row.customerName}</TableCell>
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
      }
    </>
  )
}

export default Order