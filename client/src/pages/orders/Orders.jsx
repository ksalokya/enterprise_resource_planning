import Grid from '@mui/material/Grid';
import Order from '../../components/chart/order/Order';
import Product from '../../components/order/Order'

function Orders() {
  return (
    <Grid container rowSpacing={3} columnSpacing={2} sx={{ paddingLeft: 2, paddingRight: 2 }} >
      <Order />
      <Product position='relative'/>
    </Grid>
  )
}

export default Orders