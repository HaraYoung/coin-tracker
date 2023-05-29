import React from "react";
import styled from "styled-components";

const Btn = styled.button`
  background-color: #ffd369;
  padding: 0.2em 0.5em;
  border: 2px solid #393e46;
  border-radius: 15px;
  &:hover {
    box-shadow: #f79327 3px 3px 6px 0px inset,
      rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset;
  }
`;

const DollarToCoinConverter = ({ dollars, setDollars }) => {
  const onSubmitDollars = (e) => {
    e.preventDefault();
    setDollars(e.target.elements.need.value);
  };

  return (
    <div>
      <form onSubmit={onSubmitDollars}>
        <input
          type="number"
          style={{ padding: "0.2em" }}
          placeholder=" Please enter the amount"
          name="need"
        />
        <Btn>USD</Btn>
      </form>
    </div>
  );
};

export default DollarToCoinConverter;
