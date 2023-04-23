import { useState, useContext, useEffect } from "react";
import { DarkMode } from '../../App'
import { SpreadsheetComponent, SheetsDirective, SheetDirective, RangesDirective } from '@syncfusion/ej2-react-spreadsheet';
import { RangeDirective, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-react-spreadsheet';
import Header from '../header/Header'
import { data } from './data';
import './spreadsheet.css'

import lightMode from "./light.txt";
import darkMode from "./dark.txt"

import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

function Spreadsheet() {
    const isDarkModeEnabled = useContext(DarkMode);
    const [lightText, setLightText] = useState(false);
    const [darkText, setDarkText] = useState(false);

    function lightModeCss() {
        fetch(lightMode)
            .then((r) => r.text())
            .then(text => {
                const styleTag = document.getElementById('theme');
                styleTag.innerHTML = text;
                setLightText(true);
                setDarkText(false);
            })
    };

    function darkModeCss() {
        fetch(darkMode)
            .then((response) => response.text())
            .then((text) => {
                const styleTag = document.getElementById('theme');
                styleTag.innerHTML = text;
                setLightText(false);
                setDarkText(true);
            });
    };

    useEffect(() => {
        if (isDarkModeEnabled) darkModeCss();
        else lightModeCss();
    }, [isDarkModeEnabled])

    return (
        <>
            {
                (isDarkModeEnabled && darkText) || (!isDarkModeEnabled && lightText) ?
                    <div className='spreadsheet'>
                        <Header title="Spreadsheet" />
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
                    :
                    <Box sx={{
                        width: 600,
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                    }}>
                        <Skeleton variant="rounded" />
                        <Skeleton animation="wave" />
                        <Skeleton animation={false} />
                    </Box>
            }
        </>
    )
}

export default Spreadsheet