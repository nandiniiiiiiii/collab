import React from 'react';
import { KanbanComponent, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-react-kanban';
import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';
import socket from '../socket/index.js';
import { PlusCircle, Edit, Trash2 } from 'lucide-react'

const Kanban = () => {
  const kanbanData = new DataManager({
    url: 'http://localhost:5000/api/getkanban',
    adaptor: new WebApiAdaptor(),
    crossDomain: true,
  });

  const kanbanColumns = [
    { headerText: 'Open', keyField: 'Open' },
    { headerText: 'In Progress', keyField: 'InProgress' },
    { headerText: 'Review', keyField: 'Review', minCount: 1, maxCount: 3 },
    { headerText: 'Testing', keyField: 'Testing', minCount: 5, maxCount: 8 },
    { headerText: 'Done', keyField: 'Done' },
  ];

  return (
    <div>
      <div className="flex flex-row space-x-4 justify-center mt-6 mb-6">
      <button variant="outline" className="bg-blue-500 hover:bg-blue-600 text-white border-blue-600 flex rounded px-4 py-2 justify-center items-center">
        <PlusCircle className="mr-2 h-4 w-4" />
        Add Column
      </button>
      <button variant="outline" className="bg-amber-500 hover:bg-amber-600 text-white border-amber-600 flex rounded px-4 py-2 justify-center items-center">
        <Edit className="mr-2 h-4 w-4" />
        Edit Column
      </button>
      <button variant="outline" className="bg-red-500 hover:bg-red-600 text-white border-red-600 flex rounded px-4 py-2 justify-center items-center">
        <Trash2 className="mr-2 h-4 w-4" />
        Delete Column
      </button>
    </div>
      <KanbanComponent
        id="kanban"
        dataSource={kanbanData}
        keyField="Status"
        cardSettings={{ contentField: "Summary", headerField: "Id", selectionType: "Multiple" }}
        swimlaneSettings={{ keyField: "Assignee" }}
        enableTooltip={true}
      >
        <ColumnsDirective>
          {kanbanColumns.map((col, index) => (
            <ColumnDirective key={index} {...col} />
          ))}
        </ColumnsDirective>
      </KanbanComponent>
    </div>
  );
};

export default Kanban;
