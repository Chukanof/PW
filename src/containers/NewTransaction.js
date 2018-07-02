import React, { Component } from "react";
import {
  Stepper,
  Step,
  StepLabel,
  Typography,
  Paper,
  Divider,
  withStyles
} from "@material-ui/core";

const styles = themes => ({
  root: {
    height: "100%"
  }
});

function getSteps() {
  return ["Find a user", "Enter a value", "Completion status"];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return <div>sdfdfd</div>;
    case 1:
      return "What is an ad group anyways?";
    case 2:
      return "This is the bit I really care about!";
    default:
      return "Unknown step";
  }
}

class NewTransaction extends Component {
  state = {
    activeStep: 0,
    skipped: new Set()
  };

  isStepOptional = step => {
    return step === 1;
  };

  handleNext = () => {
    const { activeStep } = this.state;
    let { skipped } = this.state;
    if (this.isStepSkipped(activeStep)) {
      skipped = new Set(skipped.values());
      skipped.delete(activeStep);
    }
    this.setState({
      activeStep: activeStep + 1,
      skipped
    });
  };

  // handleBack = () => {
  //   const { activeStep } = this.state;
  //   this.setState({
  //     activeStep: activeStep - 1
  //   });
  // };

  // handleSkip = () => {
  //   const { activeStep } = this.state;
  //   if (!this.isStepOptional(activeStep)) {
  //     // You probably want to guard against something like this,
  //     // it should never occur unless someone's actively trying to break something.
  //     throw new Error("You can't skip a step that isn't optional.");
  //   }

  //   this.setState(state => {
  //     const skipped = new Set(state.skipped.values());
  //     skipped.add(activeStep);
  //     return {
  //       activeStep: state.activeStep + 1,
  //       skipped
  //     };
  //   });
  // };

  handleReset = () => {
    this.setState({
      activeStep: 0
    });
  };

  // isStepSkipped(step) {
  //   return this.state.skipped.has(step);
  // }

  render() {
    const { classes } = this.props;
    const steps = getSteps();
    const { activeStep } = this.state;

    return (
      <Paper className={classes.root}>
        <Stepper>
          {steps.map((label, index) => {
            const props = {};
            const labelProps = {};
            // if (this.isStepOptional(index)) {
            //   labelProps.optional = (
            //     <Typography variant="caption">Optional</Typography>
            //   );
            // }
            // if (this.isStepSkipped(index)) {
            //   props.completed = false;
            // }
            return (
              <Step key={label} {...props}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        <Divider />
      </Paper>
    );
  }
}

export default withStyles(styles)(NewTransaction);
