import { useState, useContext, useEffect } from "react";
import { DarkMode } from '../../App'
import { ScheduleComponent, ViewsDirective, ViewDirective, Day, Week, WorkWeek, Month, Agenda, Inject, Resize, DragAndDrop } from '@syncfusion/ej2-react-schedule';
import { DatePickerComponent } from '@syncfusion/ej2-react-calendars';
import Header from "../header/Header";
import { scheduleData } from './data';
import './calendar.css'

import lightMode from "./light.txt";
import darkMode from "./dark.txt"

import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

function Calendar() {
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


    const [scheduleObj, setScheduleObj] = useState();

    const change = (args) => {
        scheduleObj.selectedDate = args.value;
        scheduleObj.dataBind();
    };

    const onDragStart = (arg) => {
        // eslint-disable-next-line no-param-reassign
        arg.navigation.enable = true;
    }

    return (
        <>
            {
                (isDarkModeEnabled && darkText) || (!isDarkModeEnabled && lightText) ?
                    <div className="scheduler">
                        <Header title="Calendar" />
                        <ScheduleComponent
                            height="72%"
                            ref={(schedule) => setScheduleObj(schedule)}
                            selectedDate={new Date(2021, 0, 10)}
                            eventSettings={{ dataSource: scheduleData }}
                            dragStart={onDragStart}
                        >
                            <ViewsDirective>
                                {['Day', 'Week', 'WorkWeek', 'Month', 'Agenda'].map((item) => <ViewDirective key={item} option={item} />)}
                            </ViewsDirective>
                            <Inject services={[Day, Week, WorkWeek, Month, Agenda, Resize, DragAndDrop]} />
                        </ScheduleComponent>
                        <div>
                            <table
                                style={{ width: '100%' }}
                            >
                                <tbody>
                                    <tr style={{ height: '50px' }}>
                                        <td style={{ width: '100%' }}>
                                            <DatePickerComponent
                                                value={new Date(2021, 0, 10)}
                                                showClearButton={false}
                                                placeholder="Current Date"
                                                floatLabelType="Always"
                                                change={change}
                                            />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    :
                    <Box sx={{
                        width: 600,
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
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

export default Calendar