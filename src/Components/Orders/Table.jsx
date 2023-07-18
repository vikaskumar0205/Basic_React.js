import "./Table.css";

const Table = (props) => {
  const deleteButtonHandler = (e) => {
    e.preventDefault();
    props.onDeleteButton(props.id);
    localStorage.removeItem(props.id);
  };

  return (
    <li className="table-items">
      {props.price}-{props.table}-{props.dish}
      <button type="button" onClick={deleteButtonHandler}>
        Delete Order
      </button>
    </li>
  );
};

export default Table;
