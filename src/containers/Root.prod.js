import React from "react";
import PropTypes from "prop-types";
import { Provider } from "react-redux";
import { Route } from "react-router-dom";
import { MuiThemeProvider } from "@material-ui/core/styles";
import Home from "./Home";

const Root = ({ store, history, theme }) => (
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <ConnectedRouter history={history}>
        <React.Fragment>
          <Route path="/" component={Home} />
        </React.Fragment>
      </ConnectedRouter>
    </MuiThemeProvider>
  </Provider>
);

Root.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};
export default Root;
