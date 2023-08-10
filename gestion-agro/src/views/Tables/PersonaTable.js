import React, { useState } from 'react';
import DataTable from 'react-data-table-component';

const PersonaTable = () => {
  const [selectedRow, setSelectedRow] = useState(null);

  const handleRowClicked = (row) => {
    setSelectedRow(row.id === selectedRow?.id ? null : row);
  };

  const data = [
    { id: 1, name: 'John Doe', age: 30 },
    { id: 2, name: 'Jane Smith', age: 28 },
    { id: 3, name: 'Bob Johnson', age: 35 },
    // ... más filas de datos
  ];

  const columns = [
    { name: 'Name', selector: 'name', sortable: true },
    { name: 'Age', selector: 'age', sortable: true },
  ];

  const conditionalRowStyles = [
    {
      when: (row) => row.id === selectedRow?.id,
      style: {
        backgroundColor: 'green',
        userSelect: 'none',
      },
    },
  ];

  return (
    <DataTable
      title="Movies"
      columns={columns}
      data={data}
      defaultSortField="title"
      pagination
      onRowClicked={handleRowClicked}
      conditionalRowStyles={conditionalRowStyles}
      selectableRows
      selectableRowHighlight

    />
  );
};

export default PersonaTable;