import { useEffect, useState, useContext } from 'react';
import { useMediaQuery } from '@mui/material';
import { UserContext } from '../../App';
import axios from "axios";
import Grid from '@mui/material/Grid';
import WorldMap from './maps/Worldmap';
import Country from './maps/Country';
import Network from './maps/Network';
import ComponentLoader from "../loader/ComponentLoader"

function DeliveryMap() {
    const userContext = useContext(UserContext);
    const matches = useMediaQuery('(max-width:900px)')

    const [loading, setLoading] = useState(true)
    const [deliveryData, setDeliveryData] = useState();

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_COMMON_DATA_SERVICE_URL}/delivery/get/${parseInt(userContext?.userId)}`)
            .then((res) => {
                if (res.status === 200) {
                    setDeliveryData(res.data);
                    setLoading(false);
                }
            })
            .catch((err) => console.log(err))
    }, []);

    return (
        <>
            {
                loading ?
                    <ComponentLoader />
                    :
                    <Grid container sx={{ paddingLeft: 2, paddingRight: 2 }} columnSpacing={2}>
                        <Grid item lg={6} md={6} xs={6} >
                            <WorldMap deliveryData={deliveryData} />
                        </Grid>
                        <Grid item lg={6} md={6} xs={6} sx={{ mt: matches ? 3 : '' }}>
                            <Grid item xs>
                                <Country />
                            </Grid>
                            <Grid item xs sx={{ mt: 2 }}>
                                <Network />
                            </Grid>
                        </Grid>
                    </Grid>
            }
        </>
    )
}

export default DeliveryMap