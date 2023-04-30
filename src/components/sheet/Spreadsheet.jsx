import { SpreadsheetComponent, SheetsDirective, SheetDirective, RangesDirective } from '@syncfusion/ej2-react-spreadsheet';
import { RangeDirective, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-react-spreadsheet';
import Header from '../header/Header'
import { DataManager, UrlAdaptor } from '@syncfusion/ej2-data';
// import { data } from './data';
import './spreadsheet.css'
import { useEffect } from 'react';

function Spreadsheet() {
    let spreadsheet;

    useEffect(() => {
        fetch('http://localhost:5000/get', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ Name: "Sheet1" }),
        })
            .then((response) => response.json())
            .then((data) => {
                spreadsheet.openFromJson({ file: data }); // convert the json data to file and loaded into spreadsheet
            })
    }, [])

    const handleOnclick = () => {
        spreadsheet.saveAsJson().then(Json => (fetch('http://localhost:5000/update', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ JSONData: JSON.stringify(Json.jsonObject), ContentType: "Xlsx", VersionType: "Xlsx" }), // send the filename, json data, content type, version type from client to server
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
            })))
    }

    return (
        <div className='spreadsheet'>
            <Header title="Spreadsheet" />
            <button onClick={handleOnclick}>Save File</button>
            <SpreadsheetComponent
                ref={(scope) => { spreadsheet = scope }}
                height="82%"
                allowOpen={true}
                openUrl='https://ej2services.syncfusion.com/production/web-services/api/spreadsheet/open'
                allowSave={true}
                saveUrl='https://ej2services.syncfusion.com/production/web-services/api/spreadsheet/save'>
                <SheetsDirective>
                    <SheetDirective>
                        <RangesDirective>
                            <RangeDirective></RangeDirective>
                        </RangesDirective>
                        {/* <ColumnsDirective>
                            {data.map((item, index) => <ColumnDirective key={index} width={150} />)}
                        </ColumnsDirective> */}
                    </SheetDirective>
                </SheetsDirective>
            </SpreadsheetComponent>
        </div >
    )
}

export default Spreadsheet