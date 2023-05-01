import { useEffect } from 'react';
import { SpreadsheetComponent, SheetsDirective, SheetDirective, RangesDirective } from '@syncfusion/ej2-react-spreadsheet';
import { RangeDirective, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-react-spreadsheet';
import Header from '../header/Header'
import './spreadsheet.css'

function debounce(a, b, c) {
    var d, e;
    return function () {
        function h() {
            d = null;
            c || (e = a.apply(f, g));
        }
        var f = this, g = arguments;
        return (clearTimeout(d), d = setTimeout(h, b), c && !d && (e = a.apply(f, g)), e)
    }
}

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
                spreadsheet.openFromJson({ file: data });
            })
    }, [])


    const saveSheetToDB = debounce(() => {
        console.log("saving res...");
        spreadsheet.endEdit();
        spreadsheet.saveAsJson().then(Json => (fetch('http://localhost:5000/update', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ JSONData: JSON.stringify(Json.jsonObject), ContentType: "Xlsx", VersionType: "Xlsx" }),
        })
            .then((response) => response.json())
            .then((data) => {
                // console.log(data);
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