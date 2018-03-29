# react-cohort-graph

[![npm version](https://badge.fury.io/js/react-cohort-graph.svg)](https://badge.fury.io/js/react-cohort-graph)

Cohort Analysis Graph using ReactJS

Basic Version with minimal visualization without any actions or events.

#### Documentation


```json
{
    data : PropTypes.object.isRequired, //{days: [], weeks: [], months: []}
    dataType: PropTypes.string, //keys of data
    defaultValueType: PropTypes.string, //["value", "percent"]
    cellClickEvent : PropTypes.func,
    showEmptyDataMessage : PropTypes.bool,
    customEmptyDataMessage : PropTypes.any,
    columnClickEvent : PropTypes.func,
    shadeColor: PropTypes.string, //#3f83a3
    labelFormatter: PropTypes.func, //function(label){ return formattedLabel;}
    /*maxDays : PropTypes.number,
    maxWeeks : PropTypes.number, //TODO:
    maxMonths : PropTypes.number,*/
    //enableTooltip : PropTypes.bool, TODO
    showAbsolute : PropTypes.bool,
    toggleValues : PropTypes.bool,
    showHeaderValues : PropTypes.bool,
    onStoreUpdate : PropTypes.func, //function(store, currentType, valueType)
    //Styles
    headerCellStyles: PropTypes.object,
    bodyCellStyles: PropTypes.object,
    tableCellStyles: PropTypes.object,
    tableStyles: PropTypes.object,
    tableRowStyles: PropTypes.object,
    tableHeadingStyles: PropTypes.object,
    tableBodyStyles: PropTypes.object,
    fixedTablePartStyles: PropTypes.object,
    wrapperStyles: PropTypes.object,
    scrollableTablePartStyles: PropTypes.object,
    scrollableTableContentStyles: PropTypes.object,
    headerValueStyles: PropTypes.object,
    headerLabelStyles: PropTypes.object,
}
```
 

[Non React Version](https://arajajyothibabu.github.io/retention-graph-cohort-analysis/)
