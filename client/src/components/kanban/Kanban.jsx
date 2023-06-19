import { useState, useContext } from "react";
import { KanbanComponent, ColumnsDirective, ColumnDirective } from "@syncfusion/ej2-react-kanban";
import { UserContext } from '../../App';
import { DataManager, UrlAdaptor } from '@syncfusion/ej2-data';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { Button, Grid } from "@mui/material";
import { kanbanGrid } from './metadata';
import ComponentLoader from "../loader/ComponentLoader"
import Header from "../header/Header";
import './kanban.css'

const KanbanDialogFormTemplate = (props) => {
    let assigneeData = [
        'Nancy Davloio',
        'Andrew Fuller',
        'Janet Leverling',
        'Steven walker',
        'Robert King',
        'Margaret hamilt',
        'Michael Suyama',
    ];
    let statusData = ['Open', 'In Progress', 'Testing', 'Close'];
    let priorityData = ['Low', 'Normal', 'Critical', 'Release Breaker', 'High'];

    const [data, setData] = useState(props);
    function onChange(args) {
        let key = args.target.name;
        let value = args.target.value;
        setData(prevData => ({
            ...prevData,
            Summary: value
        }))
    }

    return (
        <div>
            <table>
                <tbody>
                    <tr>
                        <td className="e-label">Status</td>
                        <td>
                            <DropDownListComponent
                                id="Status"
                                name="Status"
                                dataSource={statusData}
                                className="e-field"
                                placeholder="Status"
                                value={data.Status}
                            ></DropDownListComponent>
                        </td>
                    </tr>
                    <tr>
                        <td className="e-label">Assignee</td>
                        <td>
                            <DropDownListComponent
                                id="Assignee"
                                name="Assignee"
                                className="e-field"
                                dataSource={assigneeData}
                                placeholder="Assignee"
                                value={data.Assignee}
                            ></DropDownListComponent>
                        </td>
                    </tr>
                    <tr>
                        <td className="e-label">Priority</td>
                        <td>
                            <DropDownListComponent
                                type="text"
                                name="Priority"
                                id="Priority"
                                popupHeight="300px"
                                className="e-field"
                                value={data.Priority}
                                dataSource={priorityData}
                                placeholder="Priority"
                            >

                            </DropDownListComponent>
                        </td>
                    </tr>
                    <tr>
                        <td className="e-label">Summary</td>
                        <td>
                            <div className="e-float-input e-control-wrapper">
                                <textarea
                                    name="Summary"
                                    className="e-field"
                                    value={data.Summary}
                                    onChange={(e) => onChange(e)}
                                ></textarea>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

function Kanban() {
    const userContext = useContext(UserContext);
    const [loader, setLoader] = useState(true);
    let baseUrl = process.env.REACT_APP_APPLICATION_SERVICE_URL;

    let data = new DataManager({
        url: `${baseUrl}/kanban/get/${userContext?.username}`,
        updateUrl: `${baseUrl}/kanban/update/${userContext?.username}`,
        insertUrl: `${baseUrl}/kanban/insert/${userContext?.username}`,
        removeUrl: `${baseUrl}/kanban/delete/${userContext?.username}`,
        adaptor: new UrlAdaptor(),
        crossDomain: true
    });

    let kanbanObj;

    function addClick() {
        const cardIds = kanbanObj.kanbanData.map((obj) =>
            parseInt(obj.Id.replace('Task ', ''), 10)
        );

        const cardCount = Math.max.apply(Math, cardIds) + 1;

        const cardDetails = {
            Id: 'Task ' + (cardCount < 0 ? 1 : cardCount),
            Status: '',
            Priority: '',
            Assignee: '',
            Estimate: '',
            Tags: '',
            Summary: '',
        };

        kanbanObj.openDialog('Add', cardDetails);
    }

    function dialogTemplate(props) {
        return <KanbanDialogFormTemplate {...props} />;
    }


    return (
        <div className="kanban-board">
            <Grid container direction="row" justifyContent="space-between" alignItems="center">
                <Grid item lg={6} xs={8}>
                    <Header title='Kanban' />
                </Grid>
                <Grid item lg={6} xs={4} style={{ textAlign: 'end' }}>
                    <Button variant="contained" sx={{ backgroundColor: 'rgb(26, 115, 232)', marginRight: '3%' }} onClick={addClick}>
                        Add Card
                    </Button>
                </Grid>
            </Grid>
            <ComponentLoader style={{ display: !loader ? 'none' : '' }} />
            <KanbanComponent
                style={{ visibility: loader ? 'hidden' : '' }}
                id="kanban"
                keyField="Status"
                height="83%"
                dataSource={data}
                cardSettings={{ contentField: "Summary", headerField: "Id" }}
                enableTooltip={true}
                ref={(kanban) => { kanbanObj = kanban; }}
                dialogSettings={{ template: dialogTemplate.bind(this) }}
                enablePersistence={true}
                dataBound={() => setLoader(false)}
            >
                <ColumnsDirective>
                    {kanbanGrid.map((item, index) => <ColumnDirective key={index} {...item} />)}
                </ColumnsDirective>
            </KanbanComponent>
        </div >
    )
}

export default Kanban