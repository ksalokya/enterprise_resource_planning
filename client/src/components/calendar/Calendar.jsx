import { useState } from "react";
import { ScheduleComponent, ViewsDirective, ViewDirective, Day, Week, WorkWeek, Month, Agenda, Inject, Resize, DragAndDrop } from '@syncfusion/ej2-react-schedule';
import { DatePickerComponent } from '@syncfusion/ej2-react-calendars';
import { DataManager, UrlAdaptor } from '@syncfusion/ej2-data';
import Header from "../header/Header";
import { scheduleData } from './data';
import './calendar.css'

function Calendar() {

    const [scheduleObj, setScheduleObj] = useState();

    const change = (args) => {
        scheduleObj.selectedDate = args.value;
        scheduleObj.dataBind();
    };

    const onDragStart = (arg) => {
        // eslint-disable-next-line no-param-reassign
        arg.navigation.enable = true;
    }

    let dataManager = new DataManager({
        url: 'http://localhost:5000/get',
        crudUrl: 'http://localhost:5000/update',
        adaptor: new UrlAdaptor(),
        crossDomain: true
    });

    return (
        <div className="scheduler">
            <Header title="Calendar" />
            <ScheduleComponent
                height="72%"
                ref={(schedule) => setScheduleObj(schedule)}
                selectedDate={new Date(2021, 0, 10)}
                eventSettings={{ dataSource: dataManager }}
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
    )
}

export default Calendar