import Grid from '@mui/material/Grid';
import Monitor from '../../components/monitor/Monitor'
import MonitorChart from '../../components/chart/MonitorChart'
import MultipleChart from '../../components/chart/MultipleChart'
import LineBarArea from '../../components/chart/LineBarArea'

function Health() {
  return (
    <Grid container sx={{ paddingLeft: 2, paddingRight: 2 }} columnSpacing={2}>
      <Grid item lg={4} md={6} xs={12} >
        <Grid item lg={12} md={12} xs={12} >
          <Monitor
            title="CPU"
            unit="GHz"
            color='rgb(30, 183, 255)'
          />
        </Grid>
        <Grid item lg={12} md={12} xs={12} >
          <Monitor
            title="Memory"
            unit="GB"
            color='rgb(202, 142, 255)'
          />
        </Grid>
        <Grid item lg={12} md={12} xs={12} >
          <Monitor
            title="Traffic"
            unit="Mb"
            color='rgb(27, 185, 52)'
          />
        </Grid>
        <Grid item lg={12} md={12} xs={12} >
          <Monitor
            title="Disk I/O"
            unit="MB"
            color='rgb(247, 191, 71)'
          />
        </Grid>
      </Grid>
      <Grid item lg={8} md={6} xs={12} >
        <Grid item lg={12} md={12} xs={12} >
          <MonitorChart />
        </Grid>
        <Grid item lg={6} md={6} xs={12} >
          <MultipleChart />
        </Grid>
        <Grid item lg={6} md={6} xs={12} >
          <LineBarArea />
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Health