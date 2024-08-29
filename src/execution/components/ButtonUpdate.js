import { updateDearTableData } from "./../../listicle";

function Button(props) {
  const { dearRow, dearComponentsProps } = props;
  const { users, setUsers } = dearComponentsProps;

  function handleClick(event) {
    event.stopPropagation();
    // Prevents event from propagating up the DOM tree
    // This is necessary for the proper functioning of various components

    dearRow.status = dearRow.status == "unverified" ? "verified" : "unverified";
    updateDearTableData(dearRow);
  }

  return (
    <>
      <button className="my-button" onClick={handleClick}>
        {dearRow.status == "verified" ? "unverified" : "verified"}
      </button>
    </>
  );
}

export default Button;
