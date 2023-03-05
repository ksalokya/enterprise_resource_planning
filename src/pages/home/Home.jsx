import { useState } from 'react';
import Grid from '@mui/material/Grid';
import BarChart from '../../components/chart/BarChart'
import PieChart from '../../components/chart/PieChart'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import Widget from '../../components/widgets/Widget'

function Home(props) {

  const [open, setOpen] = useState(true);
  const [sbar, setSbar] = useState("default");
  const [nbar, setNbar] = useState(10.5);
  const handleOpen = () => {
    setSbar("default");
    setNbar(10.5);
    setOpen(true);
  }
  const handleClose = () => {
    setSbar("none");
    setNbar(12);
    setOpen(false);
  }

  return (
    <Grid container>
      <Grid item xs={1.5} sx={{display : sbar}}>
        <Sidebar />
      </Grid>
      <Grid item xs={nbar}>
        <Navbar handle={props.handle} sidebar={open ? handleClose : handleOpen}/>
        <Grid container rowSpacing={1} columnSpacing={2} sx={{paddingLeft: 1, paddingRight: 1 }} >
          <Grid item lg={3} md={6} xs={12}>
            <Widget type="user" />
          </Grid>
          <Grid item lg={3} md={6} xs={12}>
            <Widget type="order" />
          </Grid>
          <Grid item lg={3} md={6} xs={12}>
            <Widget type="earning" />
          </Grid>
          <Grid item lg={3} md={6} xs={12}>
            <Widget type="balance" />
          </Grid>
          <Grid item lg={8} md={6} xs={12}>
            <BarChart />
          </Grid>
          <Grid item lg={4} md={6} xs={12}>
            <PieChart />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Home