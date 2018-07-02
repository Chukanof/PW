import React from "react";
import { render } from "react-dom";
import createHistory from "history/createBrowserHistory";
import { BrowserRouter as Router } from "react-router-dom";

import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { lightBlue, red } from "@material-ui/core/colors";

import Root from "./containers/Root";
import configureStore from "./store/configureStore";
import styles from "./styles/main.scss";

const theme = createMuiTheme({
  palette: {
    primary: lightBlue,
    error: red
  }
});

const history = createHistory();
const store = configureStore(history);

render(
  <Root store={store} history={history} theme={theme} />,
  document.getElementById("root")
);
