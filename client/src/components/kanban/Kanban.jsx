import { useState, useEffect } from "react";
import { KanbanComponent, ColumnsDirective, ColumnDirective } from "@syncfusion/ej2-react-kanban";
import { DataManager, UrlAdaptor } from '@syncfusion/ej2-data';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { NumericTextBoxComponent, FormValidator, TextBoxComponent } from '@syncfusion/ej2-react-inputs';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';

import { kanbanData, kanbanGrid } from './datasource';
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
    let statusData = ['Open', 'InProgress', 'Testing', 'Close'];
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
                        <td className="e-label">ID</td>
                        <td>
                            <div className="e-float-input e-control-wrapper">
                                <input
                                    id="Id"
                                    name="Id"
                                    type="text"
                                    className="e-field"
                                    value={data.Id}
                                    disabled
                                />
                            </div>
                        </td>
                    </tr>
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
    // every request is post request
    let data = new DataManager({
        url: 'http://localhost:5000/get',
        updateUrl: 'http://localhost:5000/update',
        insertUrl: 'http://localhost:5000/insert',
        removeUrl: 'http://localhost:5000/delete',
        adaptor: new UrlAdaptor(),
        crossDomain: true
    });

    let kanbanObj;
    let addFormObj;
    let deleteFormObj;
    let header;
    let addIndex;
    let deleteIndex;
    let dialogInstance;

    function addClick() {
        console.log("addclick");

        const cardIds = kanbanObj.kanbanData.map((obj) =>
            parseInt(obj.Id.replace('Task ', ''), 10)
        );

        const cardCount = Math.max.apply(Math, cardIds) + 1;

        const cardDetails = {
            Id: 'Task ' + cardCount,
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
        // console.log("dialogTemplate", props);
        return <KanbanDialogFormTemplate {...props} />;
    }

    useEffect(() => {
        rendereComplete()
    }, []);


    function rendereComplete() {
        // initialize the form validator
        addFormObj = new FormValidator('#addForm');
        deleteFormObj = new FormValidator('#deleteForm');
        document.getElementById('addForm').addEventListener('submit', (e) => e.preventDefault());
        document.getElementById('deleteForm').addEventListener('submit', (e) => e.preventDefault());
    }

    function onAdd() {
        let text = header.value;
        let key = "User Defined";
        let index = addIndex.value;
        if (kanbanObj.columns.length >= index && text && text.length > 0 && index !== null) {
            kanbanObj.addColumn({ keyField: key, headerText: text, showItemCount: true }, index);
            addIndex.max = kanbanObj.columns.length;
            deleteIndex.max = kanbanObj.columns.length - 1;
            addFormObj.reset();
            addIndex.value = null;
        }
        else if (!(text && text.length > 0)) {
            dialogInstance.content = 'Enter Column Header Text';
            dialogInstance.show();
        }
        else if (!index) {
            dialogInstance.content = 'Enter Column Index';
            dialogInstance.show();
        }
    }

    function onDelete() {
        let index = deleteIndex.value;
        if (kanbanObj.columns.length > 1) {
            if (kanbanObj.columns.length >= (index + 1) && index !== null) {
                kanbanObj.deleteColumn(index);
                addIndex.max = kanbanObj.columns.length;
                deleteIndex.max = kanbanObj.columns.length - 1;
                deleteFormObj.reset();
                deleteIndex.value = null;
            }
            else {
                dialogInstance.content = 'Enter Column Index';
                dialogInstance.show();
            }
        }
        else {
            dialogInstance.content = 'Atleast one column must be displayed in kanban';
            dialogInstance.show();
        }
    }

    return (
        <div className="kanban-board">
            < Header title="Kanban" />
            <KanbanComponent
                id="kanban"
                keyField="Status"
                height="83%"
                // dataSource={data}
                dataSource={kanbanData}
                cardSettings={{ contentField: "Summary", headerField: "Id" }}
                enableTooltip={true}
                ref={(kanban) => {
                    kanbanObj = kanban;
                }}
                dialogSettings={{ template: dialogTemplate.bind(this) }}
            // enablePersistence={true}
            >
                <ColumnsDirective>
                    {kanbanGrid.map((item, index) => <ColumnDirective key={index} {...item} />)}
                </ColumnsDirective>
            </KanbanComponent>

            <div className="col-lg-3 property-section property-customization">
                <p className="property-panel-header">Add Card</p>
                <div className="property-panel-content">
                    <ButtonComponent id='add' type='button' className="e-btn" onClick={addClick}>Add</ButtonComponent>
                </div>
                <div className="property-panel-section">
                    <p className="property-panel-header header-customization">Add Column</p>
                    <div className="property-panel-content">
                        <form id="addForm">
                            <table>
                                <tr>
                                    <td><TextBoxComponent ref={(kanban) => { header = kanban; }} id="text" className="e-input" type="text" placeholder="Text Field"></TextBoxComponent></td>
                                </tr>
                                <tr>
                                    <td><NumericTextBoxComponent ref={(kanban) => { addIndex = kanban; }} id="index" format='###.##' min={0} value={0} max={3} placeholder="Index">
                                    </NumericTextBoxComponent></td>
                                </tr>
                                <tr>
                                    <td className='e-check'><ButtonComponent id='add' type='button' className="e-btn" onClick={onAdd.bind(this)}>Add</ButtonComponent></td>
                                </tr>
                            </table>
                        </form>
                    </div>
                    <p className="property-panel-header">Delete Column</p>
                    <div className="property-panel-content">
                        <form id="deleteForm">
                            <table>
                                <tbody>
                                    <tr>
                                        <td>
                                            <NumericTextBoxComponent ref={(kanban) => { deleteIndex = kanban; }} id="deteteIndex" format='###.##' min={0} value={0} max={2} placeholder="Index">
                                            </NumericTextBoxComponent>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className='e-check'>
                                            <ButtonComponent id='delete' type='button' className="e-btn" onClick={onDelete.bind(this)}>Delete</ButtonComponent></td>
                                    </tr>
                                </tbody>
                            </table>
                        </form>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Kanban