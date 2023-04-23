import { useState, useContext, useEffect } from "react";
import { DarkMode } from '../../App'
import { KanbanComponent, ColumnsDirective, ColumnDirective } from "@syncfusion/ej2-react-kanban";
import { kanbanData, kanbanGrid } from './datasource';
import Header from "../header/Header";
import lightMode from "./light.txt";
import darkMode from "./dark.txt"
import './kanban.css'

import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

function Kanban() {
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
                (isDarkModeEnabled && darkText) || (!isDarkModeEnabled && lightText) ? <div className='kanban-board'>
                    < Header title="Kanban" />
                    <KanbanComponent
                        id="kanban"
                        keyField="Status"
                        height="83%"
                        dataSource={kanbanData}
                        cardSettings={{ contentField: "Summary", headerField: "Id" }}
                    >
                        <ColumnsDirective>
                            {kanbanGrid.map((item, index) => <ColumnDirective key={index} {...item} />)}
                        </ColumnsDirective>
                    </KanbanComponent>
                </div >
                    :
                    <Box sx={{
                        width: 600,
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)'
                    }}>
                        <Skeleton sx={{ backgroundColor: '#aaaaaa' }} variant="rounded" />
                        <Skeleton sx={{ backgroundColor: '#aaaaaa' }} animation="wave" />
                        <Skeleton sx={{ backgroundColor: '#aaaaaa' }} animation={false} />
                        <Skeleton sx={{ marginTop: 2, backgroundColor: isDarkModeEnabled ? '#333333' : '#aaaaaa' }} variant="rounded" />
                        <Skeleton sx={{ backgroundColor: isDarkModeEnabled ? '#333333' : '#aaaaaa' }} animation="wave" />
                        <Skeleton sx={{ backgroundColor: isDarkModeEnabled ? '#333333' : '#aaaaaa' }} animation={false} />
                    </Box>
            }
        </>
    )
}

export default Kanban