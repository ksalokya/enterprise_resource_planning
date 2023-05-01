import Grid from '@mui/material/Grid';
import Document from '../../components/editor/Document'

function Editor() {
  return (
    <Grid container sx={{ paddingLeft: 2, paddingRight: 2 }}>
      <Grid item lg={12} md={12} xs={12} >
        <Document />
      </Grid>
    </Grid>
  )
}

export default Editor