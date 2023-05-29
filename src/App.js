import { createGlobalStyle } from "styled-components";
import CoinTracker from "./pages/CoinTracker";

const GlobalStyle = createGlobalStyle`
  body,html{
    margin: 0;
    padding: 0;
    background-color: #222831;
  }
input::-webkit-inner-spin-button {
  appearance: none;
  -moz-appearance: none;
  -webkit-appearance: none;
}
`;

function App() {
  return (
    <div>
      <GlobalStyle />
      <CoinTracker />
    </div>
  );
}

export default App;
