import { useEffect, useState } from 'react';
import { ScheduleComponent, ViewsDirective, ViewDirective, Day, Week, WorkWeek, Month, Agenda, Inject, Resize, DragAndDrop } from '@syncfusion/ej2-react-schedule';
import { DataManager, UrlAdaptor, Query } from '@syncfusion/ej2-data';
import ComponentLoader from "../loader/ComponentLoader"
import Header from "../header/Header";
import './calendar.css'

function Calendar() {
    const [loader, setLoader] = useState(true);
    const onDragStart = (arg) => {
        arg.navigation.enable = true;
    }

    let baseUrl = process.env.REACT_APP_APPLICATION_SERVICE_URL;
    // TODO :: Handle username
    let dataManager = new DataManager({
        url: `${baseUrl}/calendar/get`,
        crudUrl: `${baseUrl}/calendar/update`,
        adaptor: new UrlAdaptor(),
        crossDomain: true
    });

    let dataQuery = new Query().addParams('Email', 'user@gmail.com');
    const eventSettings = { dataSource: dataManager, query: dataQuery };

    return (
        <div className="scheduler">
            <Header title="Calendar" />
            <ComponentLoader style={{ display: !loader ? 'none' : '' }} />
            <ScheduleComponent
                style={{ visibility: loader ? 'hidden' : '' }}
                height="85%"
                selectedDate={new Date(2021, 0, 10)}
                eventSettings={eventSettings}
                dragStart={onDragStart}
                enablePersistence={true}
                dataBound={() => setLoader(false)}
            >
                <ViewsDirective>
                    {['Day', 'Week', 'WorkWeek', 'Month', 'Agenda'].map((item) => <ViewDirective key={item} option={item} />)}
                </ViewsDirective>
                <Inject services={[Day, Week, WorkWeek, Month, Agenda, Resize, DragAndDrop]} />
            </ScheduleComponent>
        </div>
    )
}

export default Calendar