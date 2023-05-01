import { useEffect } from 'react';
import { SpreadsheetComponent } from '@syncfusion/ej2-react-spreadsheet';
import Header from '../header/Header'
import { debounce } from '../../utils/debounce';
import './spreadsheet.css'

function Spreadsheet() {
    let spreadsheet;

    useEffect(() => {
        fetch('http://localhost:8080/api/v1/sheet/get', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ Email: "user@gmail.com", Name: spreadsheet.sheets[0].name }),
        })
            .then((response) => {
                if (response.status !== 204) {
                    response.json().then((data) => {
                        spreadsheet.openFromJson({ file: data.JSONData });
                    })
                }
            })
    }, [])


    const saveSheetToDB = debounce(() => {
        spreadsheet.endEdit();
        spreadsheet.saveAsJson().then(Json => (fetch('http://localhost:8080/api/v1/sheet/update', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ Email: "user@gmail.com", Name: spreadsheet.sheets[0].name, JSONData: JSON.stringify(Json.jsonObject), ContentType: "Xlsx", VersionType: "Xlsx" }),
        })))
    }, 2000)

    return (
        <div className='spreadsheet'>
            <Header title="Spreadsheet" />
            <SpreadsheetComponent
                ref={(scope) => { spreadsheet = scope }}
                height="85%"
                allowOpen={true}
                openUrl='https://ej2services.syncfusion.com/production/web-services/api/spreadsheet/open'
                allowSave={true}
                saveUrl='https://ej2services.syncfusion.com/production/web-services/api/spreadsheet/save'
                cellEditing={saveSheetToDB}
            />
        </div >
    )
}

export default Spreadsheet