import { updateDearTableData } from "./../../listicle";

function Button(props) {
  const { dearRow, dearComponentsProps } = props;
  const { users, setUsers } = dearComponentsProps;

  function handleClick(event) {
    event.stopPropagation();
    dearRow.dearDelete = true;
    updateDearTableData(dearRow);
  }

  return (
    <>
      <button className="my-button" onClick={handleClick}>
        Delete
      </button>
    </>
  );
}

export default Button;
