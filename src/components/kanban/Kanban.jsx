import { KanbanComponent, ColumnsDirective, ColumnDirective } from "@syncfusion/ej2-react-kanban";
import { kanbanData, kanbanGrid } from './datasource';
import Header from "../header/Header";

import './kanban.css'

function Kanban() {
    return (
        <div className="kanban-board">
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
        </div>
    )
}

export default Kanban