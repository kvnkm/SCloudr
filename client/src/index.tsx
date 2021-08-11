import React from "react";
import ReactDOM from "react-dom";
import { TestFetch } from "./components/testFetch";

const App = () => (
  <div>
    <TestFetch items={["bread", "milk", "cheese"]} />
  </div>
);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
