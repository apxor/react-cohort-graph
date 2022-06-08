/**
 * Created by jyothi on 30/5/17.
 */
import React from 'react';
import PropTypes from 'prop-types';
import {
    table, tableRow, tableHeading,
    tableBody, fixedTablePart, wrapper,
    scrollableTablePart, scrollableTableContent
} from './styles';
import DataStore from './DataStore';
import { HeaderCell, BodyCell, ScrollableContent } from './components';
import { DEFAULT_VALUES, VALUE_KEYS } from './constants';
import {
    DEFAULT_SHADE_COLOR, DEFAULT_BODY_CELL_COLOR,
    DEFAULT_HEADER_CELL_COLOR, DEFAULT_KEY_CELL_COLOR
}  from './styles';

class ReactCohortGraph extends React.Component {

    constructor(props){
        super(props);
        const {
            data = {},
            defaultValueType =  VALUE_KEYS.PERCENT,
            shadeColor
        } = props;
        this.state = {
            dataStore: this._getStore(props),
            currentType: "",
            valueType: defaultValueType
        };
    }

    _getStore = (props) => {
        const { data = {},
            shadeColor = DEFAULT_SHADE_COLOR, headerCellColor = DEFAULT_HEADER_CELL_COLOR,
            bodyCellColor = DEFAULT_BODY_CELL_COLOR, keyCellColor = DEFAULT_KEY_CELL_COLOR,
            isNormalizedShadeColor = DEFAULT_VALUES.IS_NORMALIZED_SHADE_COLOR,
        } = props;
        return new DataStore(data, {shadeColor, headerCellColor, bodyCellColor, keyCellColor, isNormalizedShadeColor});
    };

    componentWillMount(){
        const { data, onStoreUpdate } = this.props;
        const keys = Object.keys(data);
        if(keys.length > 0) {
            const store  = this._getStore(this.props);
            const currentType =  keys[0];
            if(typeof onStoreUpdate === 'function'){
                onStoreUpdate(store, currentType, this.state.valueType);
            }
            this.setState({
                currentType: currentType,
                dataStore: store
            });
        }
    }

    componentWillReceiveProps(nextProps) {
        const { data, dataType, valueType, onStoreUpdate } = nextProps;
        const { currentType } = this.state;
        const keys = Object.keys(data);
        if(keys.length > 0) {
            const store = this._getStore(this.props);
            const currentDataType = dataType || Object.keys(data)[0];
            if (currentType === "" || (valueType === this.state.valueType && dataType === currentType)) {
                this.setState({
                    dataStore: store
                });
            }else{
                if (valueType) {
                    this.setState({
                        currentType: currentDataType,
                        valueType: valueType
                    });
                } else {
                    this.setState({
                        currentType: currentDataType,
                    });
                }
            }
            if(typeof onStoreUpdate === 'function') {
                onStoreUpdate(store, currentDataType, valueType);
            }
        }
    }

    componentDidMount(){

    }

    isFixed = (index) => index < 2;

    renderChildren = (props) => {
        return React.Children.map(props.children, child => {
            return React.cloneElement(child, props);
        });
    };

    render(){
        const {
            showEmptyDataMessage = true, customEmptyDataMessage, showHeaderValues,
            cellFormatter, headerFormatter,
            bodyCellStyles = {}, headerCellStyles = {},
            tableStyles, tableRowStyles, tableHeadingStyles,
            tableBodyStyles, fixedTablePartStyles, wrapperStyles,
            scrollableTablePartStyles, scrollableTableContentStyles,
            headerLabelStyles, tableCellStyles
        } = this.props;
        const { dataStore, currentType, valueType } = this.state;
        const header = dataStore.getHeader(currentType);
        const rows = dataStore.getRows(currentType);
        const TableStyles = table(tableStyles);
        const TableRowStyles = tableRow(tableRowStyles);
        const TableHeadingStyles = tableHeading(tableHeadingStyles);
        const TableBodyStyles = tableBody(tableBodyStyles);
        const FixedTablePartStyles = fixedTablePart(fixedTablePartStyles);
        const WrapperStyles = wrapper(wrapperStyles);
        const ScrollableTablePartStyles = scrollableTablePart(scrollableTablePartStyles);
        const ScrollableTableContentStyles = scrollableTableContent(scrollableTableContentStyles);
        if(header && header.length > 0){
            return(
                <div style={WrapperStyles}>
                    {
                        this.renderChildren({...this.props, ...this.state})
                    }
                    <div style={TableStyles}>
                        <div style={TableBodyStyles}>
                            <div style={TableRowStyles}>
                                <div style={FixedTablePartStyles}>
                                    <div style={TableStyles}>
                                        <div style={TableHeadingStyles}>
                                            {
                                                header.map((headerCell, i) =>
                                                    this.isFixed(i) &&
                                                    <HeaderCell
                                                        tableCellStyles={tableCellStyles}
                                                        headerLabelStyles={headerLabelStyles}
                                                        style={headerCellStyles}
                                                        key={"header" + i}
                                                        {...headerCell}
                                                        formatter={typeof headerFormatter === "function" ? headerFormatter : cellFormatter}
                                                        showHeaderValues={showHeaderValues}
                                                        valueType={valueType}
                                                        isFixed
                                                    />
                                                )
                                            }
                                        </div>
                                        <div style={TableBodyStyles}>
                                            {
                                                rows.map((row, j) =>
                                                    <div style={TableRowStyles} key={"row" + j}>
                                                        {
                                                            row.map((cell, k) =>
                                                                this.isFixed(k) &&
                                                                <BodyCell
                                                                    tableCellStyles={tableCellStyles}
                                                                    style={bodyCellStyles}
                                                                    key={"cell" + k}
                                                                    {...cell}
                                                                    valueType={valueType}
                                                                    formatter={cellFormatter}
                                                                    isFixed
                                                                />
                                                            )
                                                        }
                                                    </div>
                                                )
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div style={ScrollableTablePartStyles}>
                                    <ScrollableContent scrollableTableContentStyles={scrollableTableContentStyles}>
                                        <div style={TableStyles}>
                                            <div style={TableHeadingStyles}>
                                                {
                                                    header.map((headerCell, i) =>
                                                        !this.isFixed(i) &&
                                                        <HeaderCell
                                                            tableCellStyles={tableCellStyles}
                                                            style={headerCellStyles}
                                                            key={"header" + i}
                                                            {...headerCell}
                                                            formatter={typeof headerFormatter === "function" ? headerFormatter : cellFormatter}
                                                            showHeaderValues={showHeaderValues}
                                                            valueType={valueType}
                                                            isFixed={false}
                                                        />
                                                    )
                                                }
                                            </div>
                                            <div style={TableBodyStyles}>
                                                {
                                                    rows.map((row, j) =>
                                                        <div style={TableRowStyles} key={"row" + j}>
                                                            {
                                                                row.map((cell, k) =>
                                                                    !this.isFixed(k) &&
                                                                    <BodyCell
                                                                        tableCellStyles={tableCellStyles}
                                                                        style={bodyCellStyles}
                                                                        key={"cell" + k}
                                                                        {...cell}
                                                                        valueType={valueType}
                                                                        formatter={cellFormatter}
                                                                        isFixed={false}
                                                                    />
                                                                )
                                                            }
                                                        </div>
                                                    )
                                                }
                                            </div>
                                        </div>
                                    </ScrollableContent>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        if(showEmptyDataMessage){
            return(
                customEmptyDataMessage || <h3>No Data..!</h3>
            );
        }
    }

}

ReactCohortGraph.propTypes = {
    data : PropTypes.object.isRequired,
    dataType: PropTypes.string, //keys of data
    defaultValueType: PropTypes.string, //["value", "percent"]
    cellClickEvent : PropTypes.func,
    showEmptyDataMessage : PropTypes.bool,
    customEmptyDataMessage : PropTypes.any,
    columnClickEvent : PropTypes.func,
    shadeColor: PropTypes.string, //#3f83a3
    headerCellColor: PropTypes.string,
    bodyCellColor: PropTypes.string,
    keyCellColor: PropTypes.string,
    headerFormatter: PropTypes.func,
    cellFormatter: PropTypes.func,
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
    isNormalizedShadeColor: PropTypes.bool,
};

export default ReactCohortGraph;