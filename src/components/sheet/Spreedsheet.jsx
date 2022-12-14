import { SpreadsheetComponent, SheetsDirective, SheetDirective, RangesDirective } from '@syncfusion/ej2-react-spreadsheet';
import { RangeDirective, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-react-spreadsheet';
import Header from '../header/Header'
import { data } from './data';
import './spreedsheet.css'

function Spreedsheet() {
    return (
        <div className='spreedsheet'>
            <Header title="Spreedsheet" />
            <SpreadsheetComponent
                height="82%"
                allowOpen={true}
                openUrl='https://ej2services.syncfusion.com/production/web-services/api/spreadsheet/open'
                allowSave={true}
                saveUrl='https://ej2services.syncfusion.com/production/web-services/api/spreadsheet/save'>
                <SheetsDirective>
                    <SheetDirective>
                        <RangesDirective>
                            <RangeDirective dataSource={data}></RangeDirective>
                        </RangesDirective>
                        <ColumnsDirective>
                            {data.map((item, index) => <ColumnDirective key={index} width={150} />)}
                        </ColumnsDirective>
                    </SheetDirective>
                </SheetsDirective>
            </SpreadsheetComponent>
        </div>
    )
}

export default Spreedsheet