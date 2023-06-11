import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from "react-router-dom";
import { DarkMode } from '../../App';
import { UserContext } from '../../App';
import Grid from '@mui/material/Grid';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ComponentLoader from '../loader/ComponentLoader';
import './order.css'

function Order(props) {
  const userContext = useContext(UserContext);
  const location = useLocation();
  let currentPath = location.pathname;
  const isDarkModeEnabled = useContext(DarkMode);
  const [rows, setRows] = useState();
  const [loader, setLoader] = useState(true);

  // TODO :: Handle userID
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_COMMON_DATA_SERVICE_URL}/order/get/${parseInt(userContext?.userId)}`)
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
    <Grid container item lg={12} md={12} xs={12}>
      {
        loader ?
          <ComponentLoader position={props.position} />
          :
          <TableContainer component={Paper} className="table" sx={{
            backgroundColor: isDarkModeEnabled ? '#121212' : '',
          }}>
            <Table sx={{ minWidth: 650, color: isDarkModeEnabled ? '#fff' : '' }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell
                    sx={{
                      color: isDarkModeEnabled ? '#fff' : ''
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
                      color: isDarkModeEnabled ? '#fff' : ''
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
    </Grid>
  )
}

export default Order