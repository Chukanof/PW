import React, { Component } from "react";
import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Field, reduxForm } from "redux-form";
// import validate from "./validate";
// import renderField from "./renderField";

const styles =theme=>({

});
const emailFinder = ({ input, label, type, meta: { touched, error } }) => (
  <Autosuggest
    theme={{
      container: classes.container,
      suggestionsContainerOpen: classes.suggestionsContainerOpen,
      suggestionsList: classes.suggestionsList,
      suggestion: classes.suggestion
    }}
    renderInputComponent={renderInput}
    suggestions={emailSuggestions}
    onSuggestionsFetchRequested={this.handleSuggestionsFetchRequested}
    onSuggestionsClearRequested={this.handleSuggestionsClearRequested}
    onSuggestionSelected={this.handleSuggestionSelected}
    renderSuggestionsContainer={renderSuggestionsContainer}
    getSuggestionValue={getSuggestionValue}
    renderSuggestion={renderSuggestion}
    inputProps={{
      classes,
      label: "Find recipient by email",
      placeholder: "email",
      value: value,
      onChange: this.handleChange
    }}
  />
);

const FirstTransactionScreen = ({}) => {
  return null;
};

const SecondTransactionScreen = ({}) => {
  return null;
};

class TransactionForm extends Component{
    state={
        screen:1
    }

    render(){
        const { screen}= this.state;

        return(<React.Fragment>
            {screen===1&&<FirstTransactionScreen/>}
            {screen===2&&<SecondTransactionScreen/>}
        </React.Fragment>);
    }
}

export default reduxForm({
  form: "wizard", // <------ same form name
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate
})(withStyles(styles)(TransactionForm));
