import { useEffect, useState, forwardRef } from 'react';
import { SpreadsheetComponent } from '@syncfusion/ej2-react-spreadsheet';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Header from '../header/Header'
import { debounce } from "../../utils/debounce"
import ComponentLoader from "../loader/ComponentLoader"
import './spreadsheet.css'

function Spreadsheet() {
    let spreadsheet;
    const [loader, setLoader] = useState(true);
    useEffect(() => {
        // TODO :: Change to AXIOS
        fetch('http://localhost:8080/api/v1/sheet/get', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ Email: "user@gmail.com", Name: spreadsheet.sheets[0].name }),
        })
            .then((response) => response.json())
            .then((data) => {
                spreadsheet.openFromJson({ file: data.JSONData });
                setLoader(false);
            })
    }, [])


    const saveSheetToDB = debounce(() => {
        if (spreadsheet) {
            spreadsheet.endEdit();
            spreadsheet.saveAsJson().then(Json => (fetch('http://localhost:8080/api/v1/sheet/update', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ Email: "user@gmail.com", Name: spreadsheet.sheets[0].name, JSONData: JSON.stringify(Json.jsonObject), ContentType: "Xlsx", VersionType: "Xlsx" }),
            })
                .then(() => {
                    openSnackBar();
                })))
        }
    }, 2000)


    const [state, setState] = useState({
        open: false,
        vertical: 'bottom',
        horizontal: 'right',
    });
    const { vertical, horizontal, open } = state;
    const openSnackBar = () => setState({ ...state, open: true });
    const cloeseSnackBar = () => setState({ ...state, open: false });

    const Alert = forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    const CustomSnackBar = (
        <div>
            <Snackbar open={open} autoHideDuration={2000} onClose={cloeseSnackBar} key={vertical + horizontal} anchorOrigin={{ vertical, horizontal }}>
                <Alert onClose={cloeseSnackBar} severity="success" sx={{ width: '100%' }}>
                    Saved Successfully...
                </Alert>
            </Snackbar>
        </div>
    )

    return (
        <div className='spreadsheet'>
            <Header title="Spreadsheet" />
            <ComponentLoader style={{ display: !loader ? 'none' : '' }} />
            <SpreadsheetComponent
                style={{ visibility: loader ? 'hidden' : '' }}
                ref={(scope) => { spreadsheet = scope }}
                height="82%"
                allowOpen={true}
                openUrl='https://ej2services.syncfusion.com/production/web-services/api/spreadsheet/open'
                allowSave={true}
                saveUrl='https://ej2services.syncfusion.com/production/web-services/api/spreadsheet/save'
                cellEditing={saveSheetToDB}
                cellSave={() => setTimeout(() => saveSheetToDB(), 3000)}
                enablePersistence={true}
            >
            </SpreadsheetComponent>
            {CustomSnackBar}
        </div >
    )
}

export default Spreadsheet