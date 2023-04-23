import { useContext } from 'react';
import { DarkMode } from '../../App';
import Grid from '@mui/material/Grid';
import BarChart from '../../components/chart/BarChart'
import PieChart from '../../components/chart/PieChart'
import Widget from '../../components/widgets/Widget'
import C3Chart from '../../components/chart/C3Chart'

function Home() {
  const isDarkModeEnabled = useContext(DarkMode);

  return (
    <Grid
      container
      rowSpacing={1}
      columnSpacing={2}
      sx={{
        paddingLeft: 2,
        paddingRight: 2,
        color: isDarkModeEnabled ? '#fff' : ''
      }}
    >
      <Grid item lg={3} md={6} sm={6} xs={12}>
        <Widget type="user" />
      </Grid>
      <Grid item lg={3} md={6} sm={6} xs={12}>
        <Widget type="order" />
      </Grid>
      <Grid item lg={3} md={6} sm={6} xs={12}>
        <Widget type="earning" />
      </Grid>
      <Grid item lg={3} md={6} sm={6} xs={12}>
        <Widget type="balance" />
      </Grid>
      <Grid item lg={12} md={12} xs={12}>
        <C3Chart />
      </Grid>
      <Grid item lg={8} md={6} xs={12}>
        <BarChart />
      </Grid>
      <Grid item lg={4} md={6} xs={12}>
        <PieChart />
      </Grid>
    </Grid>
  )
}

export default Home