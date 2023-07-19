import "devextreme/dist/css/dx.dark.css";
import "./App.css";
import DataGrid from "devextreme-react/data-grid";

import { employees, countries, orders, products } from "./data";
import { Column, Lookup, Editing } from "devextreme-react/data-grid";

const setEmployeeValue = (rowData, value) => {
  console.log(rowData, value);
  rowData.employeeId = value;
  rowData.countryId = null;
  rowData.orderId = null;
};

const setCountryValue = (rowData, value) => {
  rowData.countryId = value;
  rowData.orderId = null;
};

const getFilteredCountries = (options) => {
  return {
    store: countries,
    filter: options.data ? ["employeeId", "=", options.data.employeeId] : null,
  };
};

const getFilteredOrders = (options) => {
  let filterArray;
  if (options.data) {
    filterArray = options.data.countryId
      ? [
          ["employeeId", "=", options.data.employeeId],
          ["countryId", "=", options.data.countryId],
        ]
      : ["employeeId", "=", options.data.employeeId];
  } else filterArray = null;

  return {
    store: orders,
    filter: filterArray,
  };
};

const onEditorPreparing = (e) => {
  if (e.parentType === "dataRow" && e.dataField === "orderId") {
    e.editorOptions.disabled = typeof e.row.data.countryId !== "number";
  }
};

const totalPriceValue = (rowData) => {
  return rowData.Price * rowData.Count;
};

function App() {
  return (
    <div className="App">
      <h3>Cascading Lookups</h3>
      <DataGrid
        showBorders={true}
        dataSource={employees}
        onEditorPreparing={onEditorPreparing}
      >
        <Editing mode="row" allowUpdating={true} allowAdding={true} />
        <Column
          dataField="employeeId"
          caption="Name"
          setCellValue={setEmployeeValue}
          width={200}
        >
          <Lookup
            dataSource={employees}
            valueExpr="employeeId"
            displayExpr="fullName"
          />
        </Column>
        <Column
          dataField="countryId"
          caption="Country"
          setCellValue={setCountryValue}
          width={200}
        >
          <Lookup
            dataSource={getFilteredCountries}
            valueExpr="countryId"
            displayExpr="name"
          />
        </Column>
        <Column dataField="orderId" caption="Order" width={200}>
          <Lookup
            dataSource={getFilteredOrders}
            valueExpr="orderId"
            displayExpr="orderName"
          />
        </Column>
      </DataGrid>
      <br />
      <h3>Calculated values</h3>
      <DataGrid dataSource={products} showBorders={true}>
        <Column dataField="ProductName" width={200} />
        <Column dataField="Price" width={200} />
        <Column dataField="Count" width={200} />
        <Column
          caption="Total Price"
          width={200}
          calculateCellValue={totalPriceValue}
        />
      </DataGrid>
    </div>
  );
}

export default App;
