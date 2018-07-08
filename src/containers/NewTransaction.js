//#region imports
import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import isEmailValidator from "validator/lib/isEmail";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import Autosuggest from "react-autosuggest";
import match from "autosuggest-highlight/match";
import parse from "autosuggest-highlight/parse";
import classNames from "classnames";
import { getEmailsMatchedBySubstring } from "../actions";
//#endregion

const styles = theme => ({
  root: {
    height: "100%"
  },
  content: {
    [theme.breakpoints.up("sm")]: {
      border: `2px solid ${theme.palette.grey[200]}`,
      borderRadius: "4px",
      width: "100%",
      display: "inline-flex",
      justifyContent: "flex-start" /*Центрирование по горизонтали*/,
      alignItems: "center" /*Центрирование по вертикали*/,
      padding: "16px"
      // paddingRight: "16px"
    }
  },
  container: {
    background: theme.palette.background.paper,

    marginBottom: "16px",

    flexGrow: 1,
    position: "relative",
    [theme.breakpoints.up("sm")]: {
      margin: theme.spacing.unit
    }
  },
  suggestionsContainerOpen: {
    position: "absolute",
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0
  },
  suggestion: {
    display: "block"
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: "none"
  },
  horizontalStretching: {
    width: "100%"
  },
  verticalStretching: {
    height: "100%"
  },
  padding: { padding: "16px" },
  nextButton: {
    [theme.breakpoints.down("xs")]: {
      position: "relative",
      left: "50%",
      marginLeft: "-47px"
    }
  }
});

const suggestions = [
  { label: "Afghanistan" },
  { label: "Aland Islands" },
  { label: "Albania" },
  { label: "Algeria" },
  { label: "American Samoa" },
  { label: "Andorra" },
  { label: "Angola" },
  { label: "Anguilla" },
  { label: "Antarctica" },
  { label: "Antigua and Barbuda" },
  { label: "Argentina" },
  { label: "Armenia" },
  { label: "Aruba" },
  { label: "Australia" },
  { label: "Austria" },
  { label: "Azerbaijan" },
  { label: "Bahamas" },
  { label: "Bahrain" },
  { label: "Bangladesh" },
  { label: "Barbados" },
  { label: "Belarus" },
  { label: "Belgium" },
  { label: "Belize" },
  { label: "Benin" },
  { label: "Bermuda" },
  { label: "Bhutan" },
  { label: "Bolivia, Plurinational State of" },
  { label: "Bonaire, Sint Eustatius and Saba" },
  { label: "Bosnia and Herzegovina" },
  { label: "Botswana" },
  { label: "Bouvet Island" },
  { label: "Brazil" },
  { label: "British Indian Ocean Territory" },
  { label: "Brunei Darussalam" }
];

function renderInput(inputProps) {
  const { classes, ref, ...other } = inputProps;

  return (
    <TextField
      fullWidth
      label={other.label}
      InputProps={{
        inputRef: ref,
        classes: {
          input: classes.input
        },
        ...other
      }}
    />
  );
}

function renderSuggestion(suggestion, { query, isHighlighted }) {
  const matches = match(suggestion.label, query);
  const parts = parse(suggestion.label, matches);

  return (
    <MenuItem selected={isHighlighted} component="div">
      <div>
        {parts.map((part, index) => {
          return part.highlight ? (
            <span key={String(index)} style={{ fontWeight: 600 }}>
              {part.text}
            </span>
          ) : (
            <strong key={String(index)} style={{ fontWeight: 300 }}>
              {part.text}
            </strong>
          );
        })}
      </div>
    </MenuItem>
  );
}

function renderSuggestionsContainer(options) {
  const { containerProps, children } = options;

  return (
    <Paper {...containerProps} square>
      {children}
    </Paper>
  );
}

function getSuggestionValue(suggestion) {
  return suggestion.label;
}

function getSuggestions(value) {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;
  let count = 0;

  return inputLength === 0
    ? []
    : suggestions.filter(suggestion => {
        const keep =
          count < 5 &&
          suggestion.label.toLowerCase().slice(0, inputLength) === inputValue;

        if (keep) {
          count += 1;
        }

        return keep;
      });
}
class RecipientFinder extends Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
    // suggestions: PropTypes.array.isRequired,
    isNextButtonVisible: PropTypes.bool.isRequired
  };

  render() {
    const { isNextButtonVisible, classes, value } = this.props;

    return (
      <React.Fragment>
        <Autosuggest
          theme={{
            container: classes.container,
            suggestionsContainerOpen: classes.suggestionsContainerOpen,
            suggestionsList: classes.suggestionsList,
            suggestion: classes.suggestion
          }}
          renderInputComponent={renderInput}
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.handleSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.handleSuggestionsClearRequested}
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

        {isNextButtonVisible && (
          <Button
            variant="contained"
            size="medium"
            color="primary"
            className={classes.nextButton}
          >
            NEXT
            <Icon>navigate_next</Icon>
          </Button>
        )}
      </React.Fragment>
    );
  }
}
class TransactionForm extends Component {
  static propTypes = {};

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <TextField className={classes.container} />
        {
          <Button
            variant="contained"
            size="medium"
            color="primary"
            className={classes.nextButton}
          >
            SEND
            <Icon>send</Icon>
          </Button>
        }
      </React.Fragment>
    );
  }
}
class NewTransaction extends Component {
  state = {
    value: "",
    suggestions: [],
    isNextButtonVisible: true,
    isFinding: true
  };

  handleSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value)
    });
  };

  handleSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  handleChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    });

    var isEmail = isEmailValidator(newValue);
    this.setState({ isNextButtonVisible: isEmail });
  };

  onClickHandler = e => {
    this.props.getEmailsMatchedBySubstring("");
  };
  render() {
    const { classes } = this.props;
    const { value, suggestions, isNextButtonVisible, isFinding } = this.state;

    return (
      <Paper className={classNames(classes.root, classes.padding)}>
        <Typography align={"center"} variant={"headline"}>
          New transaction
        </Typography>
        <br />
        <br />
        <br />
        <div className={classes.content}>
          {isFinding && (
            <React.Fragment>
              <Autosuggest
                theme={{
                  container: classes.container,
                  suggestionsContainerOpen: classes.suggestionsContainerOpen,
                  suggestionsList: classes.suggestionsList,
                  suggestion: classes.suggestion
                }}
                renderInputComponent={renderInput}
                suggestions={suggestions}
                onSuggestionsFetchRequested={
                  this.handleSuggestionsFetchRequested
                }
                onSuggestionsClearRequested={
                  this.handleSuggestionsClearRequested
                }
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

              {isNextButtonVisible && (
                <Button
                  variant="contained"
                  size="medium"
                  color="primary"
                  className={classes.nextButton}
                  onClick={this.onClickHandler}
                >
                  NEXT
                  <Icon>navigate_next</Icon>
                </Button>
              )}
            </React.Fragment>
          )}
          {!isFinding && <TransactionForm classes={classes} />}
        </div>
      </Paper>
    );
  }
}

function mapStateToProps(state) {
  return {
    recipientEmail: state.newTransaction.recipientEmail,
    transactionSum: state.newTransaction.transactionSum
  };
}
export default connect(
  mapStateToProps,
  { getEmailsMatchedBySubstring }
)(withStyles(styles, { withTheme: true })(NewTransaction));
