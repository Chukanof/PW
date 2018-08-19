//#region imports
import React, { Component } from "react";
import PropTypes from "prop-types";
import { Provider } from "react-redux";
import DevTools from "./DevTools";
import { Route } from "react-router-dom";
import { ConnectedRouter } from "react-router-redux";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { isReduxDevToolsBrowserExtensionExists } from "../helpers/devTools";
import Snackbar from "@material-ui/core/Snackbar";
import MobileDetect from "mobile-detect";

import Home from "./Home";
import NotFound from "../components/404_NotFound";
import CountdownSnackbar from "../components/CountdownSnackbar";
import fakedb from "../fake/db";
//#endregion

const isBrowserExtension = isReduxDevToolsBrowserExtensionExists();
const md = new MobileDetect(window.navigator.userAgent);

const Root = ({ store, history, theme }) => (
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <ConnectedRouter history={history}>
        <React.Fragment>
          <Route path="/" component={Home} />
          {/* <Route path="*" component={NotFound} /> */}
          {!md.mobile() && !isBrowserExtension && <DevTools />}
          {isBrowserExtension && <CountdownSnackbar />}
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
