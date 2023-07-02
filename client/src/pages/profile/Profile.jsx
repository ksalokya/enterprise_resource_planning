import Grid from '@mui/material/Grid';
import ProfileChart from '../../components/chart/ProfileChart'
import List from '../../components/order/Order'
import './profile.css'

function Profile() {
  return (
    <Grid container rowSpacing={5} sx={{ paddingLeft: 2, paddingRight: 2 }} >
      <Grid container item lg={12} md={12} xs={12} columnSpacing={3} className="profile-top">
        <Grid item lg={4} md={6} xs={12} className="profile-left">
          <div className="profile-editButton">Edit</div>
          <h1 className="profile-title">Information</h1>
          <div className="profile-item">
            <img
              src="https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt="profile photo"
              className="profile-itemImg" />
            <div className="profile-details">
              <h1 className="profile-itemTitle">Jane Doe</h1>
              <div className="profile-detailItem">
                <span className="profile-itemKey">Email:</span>
                <span className="profile-itemValue">janedoe@gmail.com</span>
              </div>
              <div className="profile-detailItem">
                <span className="profile-itemKey">Phone:</span>
                <span className="profile-itemValue">+1 2345 67 89</span>
              </div>
              <div className="profile-detailItem">
                <span className="profile-itemKey">Address:</span>
                <span className="profile-itemValue">
                  Elton St. 234 Garden Yd. NewYork
                </span>
              </div>
              <div className="profile-detailItem">
                <span className="profile-itemKey">Country:</span>
                <span className="profile-itemValue">USA</span>
              </div>
            </div>
          </div>
        </Grid>
        <Grid item lg={8} md={6} xs={12} className="profile-right">
          <ProfileChart />
        </Grid>
      </Grid>
      <Grid container item lg={12} md={12} xs={12} className="profile-bottom">
        <h1 className="profile-title">Recent Transactions</h1>
        <List position='relative'/>
      </Grid>
    </Grid>
  )
}

export default Profile