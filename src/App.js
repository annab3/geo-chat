import React from "react";
import "./App.css";
import { HashRouter } from "react-router-dom";
import routes from "./routes";
import { Provider } from "react-redux";
import store from "./store";

function App() {
  return (
    <Provider store={store}>
      <HashRouter>{routes}</HashRouter>
    </Provider>
  );
}

export default App;
