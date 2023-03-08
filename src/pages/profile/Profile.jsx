import Grid from '@mui/material/Grid';
import ProfileChart from '../../components/chart/ProfileChart'
import List from '../../components/order/Order'
import './profile.css'

const rows = [
  {
    id: 1143155,
    product: "Acer Nitro 5",
    img: "https://m.media-amazon.com/images/I/81bc8mA3nKL._AC_UY327_FMwebp_QL65_.jpg",
    type: "Primary",
    date: "1 March",
    amount: 785,
    method: "Cash on Delivery",
    status: "Approved",
  },
  {
    id: 2235235,
    product: "Playstation 5",
    img: "https://m.media-amazon.com/images/I/31JaiPXYI8L._AC_UY327_FMwebp_QL65_.jpg",
    type: "Office",
    date: "1 March",
    amount: 900,
    method: "Online Payment",
    status: "Pending",
  },
  {
    id: 2342353,
    product: "Redragon S101",
    img: "https://m.media-amazon.com/images/I/71kr3WAj1FL._AC_UY327_FMwebp_QL65_.jpg",
    type: "Other",
    date: "1 March",
    amount: 35,
    method: "Cash on Delivery",
    status: "Pending",
  },
  {
    id: 2357741,
    product: "Razer Blade 15",
    img: "https://m.media-amazon.com/images/I/71wF7YDIQkL._AC_UY327_FMwebp_QL65_.jpg",
    type: "Primary",
    date: "1 March",
    amount: 920,
    method: "Online",
    status: "Approved",
  }
];

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
              alt=""
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
        <Grid item lg={8} md={8} xs={12} className="profile-right">
          <ProfileChart/>
        </Grid>
      </Grid>
      <Grid container item lg={12} md={12} xs={12} className="profile-bottom">
        <h1 className="profile-title">Last Transactions</h1>
        <List rows={rows} type={"Address"} />
      </Grid>
    </Grid>
  )
}

export default Profile