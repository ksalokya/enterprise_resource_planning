import Grid from '@mui/material/Grid';
import StackedChart from '../../components/chart/StackedChart'
import MixedBarChart from '../../components/chart/MixedBarChart'
import TwoLevelPieChart from '../../components/chart/TwoLevelPieChart'
import Product from '../../components/order/Order'
import {orders} from './orderData'

function Orders() {
  return (
    <Grid container rowSpacing={3} columnSpacing={2} sx={{ paddingLeft: 2, paddingRight: 2 }} >
      <Grid item lg={4} md={6} xs={12}>
        <StackedChart />
      </Grid>
      <Grid item lg={4} md={6} xs={12}>
        <MixedBarChart />
      </Grid>
      <Grid item lg={4} md={12} xs={12}>
        <TwoLevelPieChart />
      </Grid>
      <Grid item lg={12} md={12} xs={12}>
        <Product rows={orders} type={"Order"} />
      </Grid>
    </Grid>
  )
}

export default Orders