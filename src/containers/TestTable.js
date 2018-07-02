import React, { Component } from "react";
import Chance from "chance";

import ReactTable from "react-table";
// import "react-table/react-table.css";

import { withStyles, Paper } from "@material-ui/core";

import selectTableHOC from "react-table/lib/hoc/selectTable";
import treeTableHOC from "react-table/lib/hoc/treeTable";

const SelectTreeTable = selectTableHOC(treeTableHOC(ReactTable));

const TreeTable = treeTableHOC(ReactTable);

import testData from "../data/testData";

const styles = themes => ({
  root: {
    minHeight: "100%"
  }
});

const chance = new Chance();

function getTdProps(state, ri, ci) {
  console.log({ state, ri, ci });
  return {};
}

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

function getNodes(data, node = []) {
  data.forEach(item => {
    if (item.hasOwnProperty("_subRows") && item._subRows) {
      node = getNodes(item._subRows, node);
    } else {
      node.push(item._original);
    }
  });
  return node;
}

class TestTable extends React.Component {
  constructor(props) {
    super(props);
    const data = getData();
    const columns = getColumns(data);
    this.state = {
      data,
      columns,
      selection: [],
      selectAll: false,
      selectType: "checkbox",
      pivotBy: ["state"],
      expanded: {}
    };
  }
  toggleSelection = (key, shift, row) => {
    /*
      Implementation of how to manage the selection state is up to the developer.
      This implementation uses an array stored in the component state.
      Other implementations could use object keys, a Javascript Set, or Redux... etc.
    */
    // start off with the existing state
    if (this.state.selectType === "radio") {
      let selection = [];
      if (selection.indexOf(key) < 0) selection.push(key);
      this.setState({ selection });
    } else {
      let selection = [...this.state.selection];
      const keyIndex = selection.indexOf(key);
      // check to see if the key exists
      if (keyIndex >= 0) {
        // it does exist so we will remove it using destructing
        selection = [
          ...selection.slice(0, keyIndex),
          ...selection.slice(keyIndex + 1)
        ];
      } else {
        // it does not exist so add it
        selection.push(key);
      }
      // update the state
      this.setState({ selection });
    }
  };
  toggleAll = () => {
    /*
      'toggleAll' is a tricky concept with any filterable table
      do you just select ALL the records that are in your data?
      OR
      do you only select ALL the records that are in the current filtered data?
      
      The latter makes more sense because 'selection' is a visual thing for the user.
      This is especially true if you are going to implement a set of external functions
      that act on the selected information (you would not want to DELETE the wrong thing!).
      
      So, to that end, access to the internals of ReactTable are required to get what is
      currently visible in the table (either on the current page or any other page).
      
      The HOC provides a method call 'getWrappedInstance' to get a ref to the wrapped
      ReactTable and then get the internal state and the 'sortedData'. 
      That can then be iterrated to get all the currently visible records and set
      the selection state.
    */
    const selectAll = this.state.selectAll ? false : true;
    const selection = [];
    if (selectAll) {
      // we need to get at the internals of ReactTable
      const wrappedInstance = this.selectTable.getWrappedInstance();
      // the 'sortedData' property contains the currently accessible records based on the filter and sort
      const currentRecords = wrappedInstance.getResolvedState().sortedData;
      // we need to get all the 'real' (original) records out to get at their IDs
      const nodes = getNodes(currentRecords);
      // we just push all the IDs onto the selection array
      nodes.forEach(item => {
        selection.push(item._id);
      });
    }
    this.setState({ selectAll, selection });
  };
  isSelected = key => {
    /*
      Instead of passing our external selection state we provide an 'isSelected'
      callback and detect the selection state ourselves. This allows any implementation
      for selection (either an array, object keys, or even a Javascript Set object).
    */
    return this.state.selection.includes(key);
  };
  logSelection = () => {
    console.log("selection:", this.state.selection);
  };
  toggleType = () => {
    this.setState({
      selectType: this.state.selectType === "radio" ? "checkbox" : "radio",
      selection: [],
      selectAll: false
    });
  };
  toggleTree = () => {
    if (this.state.pivotBy.length) {
      this.setState({ pivotBy: [], expanded: {} });
    } else {
      this.setState({ pivotBy: ["state"], expanded: {} });
    }
  };
  onExpandedChange = expanded => {
    this.setState({ expanded });
  };

  render() {
    const {
      toggleSelection,
      toggleAll,
      isSelected,
      logSelection,
      toggleType,
      onExpandedChange,
      toggleTree
    } = this;
    const {
      data,
      columns,
      selectAll,
      selectType,
      pivotBy,
      expanded
    } = this.state;
    const extraProps = {
      selectAll,
      isSelected,
      toggleAll,
      toggleSelection,
      selectType,
      pivotBy,
      expanded,
      onExpandedChange
    };
    const { classes } = this.props;
    return (
      <Paper className={classes.root}>
        <TreeTable
          // filterable
          // defaultFilterMethod={(filter, row, column) => {
          //   const id = filter.pivotId || filter.id;
          //   return row[id] !== undefined
          //     ? String(row[id])
          //         .toLowerCase()
          //         .includes(filter.value.toLowerCase())
          //     : true;
          // }}
          data={data}
          pivotBy={["state"]}
          columns={[
            // we only require the accessor so TreeTable
            // can handle the pivot automatically
            {
              accessor: "state"
            },
            // {
            //   accessor: "post"
            // },
            // {
            //   accessor: "city"
            // },

            // any other columns we want to display
            // {
            //   Header: "First Name",
            //   accessor: "first_name"
            // },
            // {
            //   Header: "Last Name",
            //   accessor: "last_name"
            // },
            // {
            //   Header: "Company Name",
            //   accessor: "company_name"
            // },
            // {
            //   Header: "Address",
            //   accessor: "address"
            // },
            // {
            //   Header: "Phone 1",
            //   accessor: "phone1"
            // },
            {
              Header: "Email",
              accessor: "email"
            }
          ]}
          defaultPageSize={10}
          SubComponent={row => {
            // a SubComponent just for the final detail
            const columns = [
              {
                Header: "Property",
                accessor: "property",
                width: 200,
                Cell: ci => {
                  return `${ci.value}:`;
                },
                style: {
                  backgroundColor: "#DDD",
                  textAlign: "right",
                  fontWeight: "bold"
                }
              },
              { Header: "Value", accessor: "value" }
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
          }}
        />
      </Paper>
    );
  }
}

export default withStyles(styles)(TestTable);
