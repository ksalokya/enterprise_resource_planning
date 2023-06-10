import { useEffect, useState } from 'react';
import { useMediaQuery } from '@mui/material';
import axios from "axios";
import Grid from '@mui/material/Grid';
import WorldMap from './maps/Worldmap';
import Country from './maps/Country';
import Network from './maps/Network';
import ComponentLoader from "../loader/ComponentLoader"

function DeliveryMap() {
    const matches = useMediaQuery('(max-width:900px)')

    const [loading, setLoading] = useState(true)
    const [deliveryData, setDeliveryData] = useState();

    // TODO ::  Handle UserID
    useEffect(() => {
        axios.get(`http://localhost:8004/api/v1/delivery/get/${1}`)
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
                    <Grid direction={matches ? "column" : ''} container sx={{ paddingLeft: 2, paddingRight: 2 }} columnSpacing={2}>
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