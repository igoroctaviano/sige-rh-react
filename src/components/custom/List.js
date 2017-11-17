import React from "react";

function List(props) {
  return (
    <ul
      style={{
        listStyleType: "none",
        backgroundColor: "rgb(18, 147, 154)",
        borderRadius: 10,
        padding: 20
      }}
    >
      {props.items}
    </ul>
  );
}

export default List;
