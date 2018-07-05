import React, { Component } from "react";
import Snackbar from "@material-ui/core/Snackbar";

class CountdownSnackbar extends Component {
  constructor(props) {
    super(props);
    this.state = { isOpened: true };
    this.startCountdown();
  }
  visibleTime = 4000;
  startCountdown() {
    setTimeout(() => {
      this.setState({ isOpened: false });
    }, this.visibleTime);
  }

  render() {
    return (
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={this.state.isOpened}
        ContentProps={{
          "aria-describedby": "message-id"
        }}
        message={
          <span id="message-id">Used Browser Redux DevTools Extension</span>
        }
      />
    );
  }
}

export default CountdownSnackbar;
