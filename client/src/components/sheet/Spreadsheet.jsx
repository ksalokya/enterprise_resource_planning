import { useEffect } from 'react';
import { SpreadsheetComponent, SheetsDirective, SheetDirective, RangesDirective } from '@syncfusion/ej2-react-spreadsheet';
import { RangeDirective, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-react-spreadsheet';
import Header from '../header/Header'
import { debounce } from "../../utils/debounce"
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
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                spreadsheet.openFromJson({ file: data.JSONData });
            })
    }, [])


    const saveSheetToDB = debounce(() => {
        console.log("saving res...");
        spreadsheet.endEdit();
        spreadsheet.saveAsJson().then(Json => (fetch('http://localhost:8080/api/v1/sheet/update', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ Email: "user@gmail.com", Name: spreadsheet.sheets[0].name, JSONData: JSON.stringify(Json.jsonObject), ContentType: "Xlsx", VersionType: "Xlsx" }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
            })))
    }, 2000)

    return (
        <div className='spreadsheet'>
            <Header title="Spreadsheet" />
            <SpreadsheetComponent
                ref={(scope) => { spreadsheet = scope }}
                height="82%"
                allowOpen={true}
                openUrl='https://ej2services.syncfusion.com/production/web-services/api/spreadsheet/open'
                allowSave={true}
                saveUrl='https://ej2services.syncfusion.com/production/web-services/api/spreadsheet/save'
                cellEditing={saveSheetToDB}
            >
                <SheetsDirective>
                    <SheetDirective>
                        <RangesDirective>
                            <RangeDirective></RangeDirective>
                        </RangesDirective>
                    </SheetDirective>
                </SheetsDirective>
            </SpreadsheetComponent>
        </div >
    )
}

export default Spreadsheet