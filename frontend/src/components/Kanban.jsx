import React from 'react';
import { KanbanComponent, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-react-kanban';
import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';

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
      <div className='flex flex-row'>
        <div className="mt-4 text-center">
          <button className="bg-green-500 text-white px-4 py-2 rounded">Add Column</button>
        </div>
        <div className="mt-4 text-center">
          <button className="bg-green-500 text-white px-4 py-2 rounded">Edit column</button>
        </div>
        <div className="mt-4 text-center">
          <button className="bg-green-500 text-white px-4 py-2 rounded">Delete column</button>
        </div>
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
