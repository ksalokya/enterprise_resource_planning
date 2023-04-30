import { KanbanComponent, ColumnsDirective, ColumnDirective } from "@syncfusion/ej2-react-kanban";
import { kanbanData, kanbanGrid } from './datasource';
import Header from "../header/Header";

import './kanban.css'

function Kanban() {

    function columnTemplate(props) {
        return (
            <div className="header-template-wrap">
                <div className={"header-icon e-icons " + props.keyField}></div>
                <div className="header-text">{props.headerText}</div>
            </div>
        );
    }

    return (
        <div className="kanban-board">
            < Header title="Kanban" />
            <KanbanComponent
                id="kanban"
                keyField="Status"
                height="83%"
                dataSource={kanbanData}
                cardSettings={{ contentField: "Summary", headerField: "Id" }}
                cssClass="kanban-header"
            >
                <ColumnsDirective>
                    <ColumnDirective headerText="To Do" keyField="Open" template={columnTemplate.bind(this)} />
                    <ColumnDirective headerText="In Progress" keyField="InProgress" template={columnTemplate.bind(this)} />
                    <ColumnDirective headerText="In Review" keyField="Review" template={columnTemplate.bind(this)} />
                    <ColumnDirective headerText="Done" keyField="Close" template={columnTemplate.bind(this)} />
                </ColumnsDirective>
            </KanbanComponent>
        </div>
    )
}

export default Kanban