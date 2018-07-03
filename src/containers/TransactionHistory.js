import React, { Component } from "react";
import PropTypes from "prop-types";
import Chance from "chance";

import ReactTable from "react-table";
// used custom styles from src/styles/components/reactTable.scss
// import "react-table/react-table.css";

import { withStyles, Paper } from "@material-ui/core";
import layoutTypesEnum from "../constants/layoutTypes";

import testData from "../data/testData";

const styles = themes => ({
  root: {
    minHeight: "100%"
  }
});

function getData() {
  const data = testData.map(item => {
    // using chancejs to generate guid
    // shortid is probably better but seems to have performance issues
    // on codesandbox.io
    const _id = chance.guid();
    return {
      _id,
      ...item
    };
  });
  return data;
}

const ignoreColumns = ["phone1", "phone2", "web", "email", "_id"];
function getColumns(data) {
  const columns = [];
  const sample = data[0];
  for (let key in sample) {
    if (ignoreColumns.includes(key)) continue;
    columns.push({
      accessor: key,
      Header: key,
      style: { whiteSpace: "normal" }
    });
  }
  return columns;
}

function getColumnsForLayout(layoutType) {
  switch (layoutType) {
    case layoutTypesEnum.small:
      return [
        {
          Header: "first_name",
          accessor: "first_name"
        }
      ];

    default:
      return [
        {
          Header: "first_name",
          accessor: "first_name"
        },
        {
          Header: "Second_name",
          accessor: "last_name"
        }
      ];
  }
}

function getSubComponentTemplate(layoutType) {
  return layoutType != layoutTypesEnum.small
    ? null
    : row => {
        // a SubComponent just for the final detail
        const columns = [
          {
            // Header: "Property",
            accessor: "property",
            // width: 200,
            Cell: ci => {
              return `${ci.value}:`;
            },
            style: {
              backgroundColor: "#DDD",
              textAlign: "right",
              fontWeight: "bold"
            }
          },
          {
            //  Header: "Value",
            accessor: "value"
          }
        ];
        const rowData = Object.keys(row.original).map(key => {
          return {
            property: key,
            value: row.original[key].toString()
          };
        });
        return (
          <div style={{ padding: "10px" }}>
            <ReactTable
              data={rowData}
              columns={columns}
              pageSize={rowData.length}
              showPagination={false}
            />
          </div>
        );
      };
}

class TransactionHistory extends React.Component {
  constructor(props) {
    super(props);
    const data = getData();
    const columns = getColumns(data);
    this.state = {
      data,
      columns
    };
  }

  render() {
    const { classes, layoutType } = this.props;

    var cols = getColumnsForLayout(layoutType);
    var sub = getSubComponentTemplate(layoutType);

    return (
      <Paper className={classes.root}>
        <ReactTable
          data={this.state.data}
          // pivotBy={["first_name"]}
          showPaginationTop={true}
          showPaginationBottom={false}
          showPageJump={false}
          columns={cols}
          SubComponent={sub}
          defaultPageSize={10}
          className="-highlight"
        />
      </Paper>
    );
  }
}

TransactionHistory.propTypes = {
  layoutType: PropTypes.string.isRequired
};

export default withStyles(styles)(TransactionHistory);
