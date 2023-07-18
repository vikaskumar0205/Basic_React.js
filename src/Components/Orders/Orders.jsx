import "./Orders.css";
import Table from "./Table";

const Orders = (props) => {
  const table1 = props.dataPoints.filter(
    (dataPoint) => dataPoint.table === "Table1"
  );
  const table2 = props.dataPoints.filter(
    (dataPoint) => dataPoint.table === "Table2"
  );
  const table3 = props.dataPoints.filter(
    (dataPoint) => dataPoint.table === "Table3"
  );

  return (
    <div>
      <h3>Table 1</h3>
      <ul className="table1">
        {table1.map((table) => (
          <Table
            key={table.uniqueId}
            id={table.uniqueId}
            price={table.price}
            dish={table.dish}
            table={table.table}
            onDeleteButton={props.onDeleteButton}
          />
        ))}
      </ul>
      <h3>Table 2</h3>
      <ul className="table2">
        {table2.map((table) => (
          <Table
            key={table.uniqueId}
            id={table.uniqueId}
            price={table.price}
            dish={table.dish}
            table={table.table}
            onDeleteButton={props.onDeleteButton}
          />
        ))}
      </ul>
      <h3>Table 3</h3>
      <ul className="table3">
        {table3.map((table) => (
          <Table
            key={table.uniqueId}
            id={table.uniqueId}
            price={table.price}
            dish={table.dish}
            table={table.table}
            onDeleteButton={props.onDeleteButton}
          />
        ))}
      </ul>
    </div>
  );
};

export default Orders;
