/**
 * Created by jyothi on 30/5/17.
 */
import React from 'react';
import PropTypes from 'prop-types';
import {
    Table, TableRow, TableHeading,
    TableBody, FixedTablePart,
    ScrollableTablePart, ScrollableTableContent
} from './styles';
import DataStore from './DataStore';
import { HeaderCell, BodyCell, ScrollableContent } from './components';
import { VALUE_KEYS } from './constants';

class ReactCohortGraph extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            dataStore: new DataStore({}),
            currentType: "",
            valueType: VALUE_KEYS.PERCENT
        };
    }

    componentWillMount(){
        const { data } = this.props;
        const keys = Object.keys(data);
        if(keys.length > 0) {
            this.setState({
                currentType: Object.keys(data)[0]
            });
            this.setState({
                dataStore: new DataStore(data || {})
            });
        }
    }

    componentWillReceiveProps(nextProps) {
        const { data, dataType, valueType } = nextProps;
        const { currentType } = this.state;
        const keys = Object.keys(data);
        if(keys.length > 0) {
            if (currentType === "" || (valueType === this.state.valueType && dataType === currentType)) {
                this.setState({
                    dataStore: new DataStore(data || {})
                });
            }else{
                this.setState({
                    currentType: dataType || Object.keys(data)[0],
                    valueType: valueType
                });
            }
        }
    }

    componentDidMount(){

    }

    isFixed = (index) => index < 2;

    render(){
        const {showEmptyDataMessage = true, customEmptyDataMessage} = this.props;
        const { dataStore, currentType, valueType } = this.state;
        const header = dataStore.getHeader(currentType);
        const rows = dataStore.getRows(currentType);
        if(header && header.length > 0){
            return(
                <div style={Table}>
                    <div style={TableBody}>
                        <div style={TableRow}>
                            <div style={FixedTablePart}>
                                <div style={Table}>
                                    <div style={TableHeading}>
                                        {
                                            header.map((headerCell, i) =>
                                                this.isFixed(i) && <HeaderCell key={"header" + i} {...headerCell} valueType={valueType} />
                                            )
                                        }
                                    </div>
                                    <div style={TableBody}>
                                        {
                                            rows.map((row, j) =>
                                                <div style={TableRow} key={"row" + j}>
                                                    {
                                                        row.map((cell, k) =>
                                                            this.isFixed(k) && <BodyCell key={"cell" + k} {...cell} valueType={valueType} />
                                                        )
                                                    }
                                                </div>
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                            <div style={ScrollableTablePart}>
                                <ScrollableContent>
                                    <div style={Table}>
                                        <div style={TableHeading}>
                                            {
                                                header.map((headerCell, i) =>
                                                    !this.isFixed(i) && <HeaderCell key={"header" + i} {...headerCell} valueType={valueType} />
                                                )
                                            }
                                        </div>
                                        <div style={TableBody}>
                                            {
                                                rows.map((row, j) =>
                                                    <div style={TableRow} key={"row" + j}>
                                                        {
                                                            row.map((cell, k) =>
                                                                !this.isFixed(k) && <BodyCell key={"cell" + k} {...cell} valueType={valueType} />
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
    dataType: PropTypes.string.isRequired, //keys of data
    valueType: PropTypes.string.isRequired, //["value", "percent"]
    cellClickEvent : PropTypes.func,
    showEmptyDataMessage : PropTypes.bool,
    customEmptyDataMessage : PropTypes.any,
    columnClickEvent : PropTypes.func,
    /*maxDays : PropTypes.number,
    maxWeeks : PropTypes.number, //TODO:
    maxMonths : PropTypes.number,*/
    //enableTooltip : PropTypes.bool, TODO
    showAbsolute : PropTypes.bool,
    toggleValues : PropTypes.bool,
    showHeaderValues : PropTypes.bool
};

export default ReactCohortGraph;