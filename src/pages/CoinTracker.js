import React from "react";
import styled from "styled-components";

import LoadingBar from "../components/Spinner.js";
import DollarToCoinConverter from "../components/DollarToCoinConverter.js";

const Content = styled.div`
  background: #ececec;
  border-radius: 15px;
  width: 70%;
  margin: auto;
  padding: 2em 0;
  input {
    border: none;
    border-bottom: 2px solid #393e46;
    background-color: transparent;
  }
  ul {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 1em 0;
    li {
      color: #393e46;
    }
  }
`;
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

const CoinTracker = () => {
  const [coins, setCoins] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setLoading(false);
      });
  }, []);
  const [dollars, setDollars] = React.useState(0);
  const [keyWord, setKeyWord] = React.useState("");
  const [searchKeyword, setSearchKeyword] = React.useState([]);
  const onChangeSearch = (e) => {
    setKeyWord(e.target.value);
  };
  const onSubmitSearch = (e) => {
    e.preventDefault();
    if (keyWord) {
      setSearchKeyword(
        coins.filter((item) =>
          item.name.toUpperCase().includes(keyWord.toUpperCase())
        )
      );
    } else {
      setSearchKeyword([]);
    }
  };
  function renderTag(arr) {
    return arr.map((v) => (
      <li key={v.id} style={{ padding: "0.2em" }}>
        {v.name}/{v.symbol}/$ {v.quotes.USD.price}
        {dollars
          ? "/ [You can get $ " + Math.round(dollars / v.quotes.USD.price) + "]"
          : ""}
      </li>
    ));
  }

  return (
    <div>
      <h1 style={{ textAlign: "center", color: "#EEEEEE" }}>Coin Tracker</h1>
      {loading ? (
        <>
          <LoadingBar visible={loading} />
        </>
      ) : (
        <Content>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <DollarToCoinConverter dollars={dollars} setDollars={setDollars} />
            <form onSubmit={onSubmitSearch} style={{ marginLeft: "2em" }}>
              <input
                type="text"
                placeholder="search"
                name="search"
                onChange={onChangeSearch}
                style={{ padding: "0.2em" }}
              />
              <Btn>Search</Btn>
            </form>
          </div>
          <ul>
            {searchKeyword.length > 0
              ? renderTag(searchKeyword)
              : renderTag(coins)}
          </ul>
        </Content>
      )}
    </div>
  );
};

export default CoinTracker;
