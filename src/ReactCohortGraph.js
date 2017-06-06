/**
 * Created by jyothi on 30/5/17.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Table, TableRow, TableHeading, TableBody } from './styles';
import DataStore from './DataStore';
import { HeaderCell, BodyCell } from './components';

class ReactCohortGraph extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            dataStore: new DataStore({}),
            currentType: ""
        };
    }

    componentWillMount(){
        const { data } = this.props;
        const keys = Object.keys(data);
        if(keys.length > 0) {
            this.setState({
                currentType: Object.keys(data)[0] //taking first key as type by default TODO: give it as option
            });
            this.setState({
                dataStore: new DataStore(data || {})
            });
        }
    }

    componentWillReceiveProps(nextProps) {
        const { data } = nextProps;
        const keys = Object.keys(data);
        if(keys.length > 0) {
            this.setState({
                currentType: Object.keys(data)[0] //taking first key as type by default TODO: give it as option
            });
            this.setState({
                dataStore: new DataStore(data || {})
            });
        }
    }

    componentDidMount(){

    }

    render(){
        const { dataStore, currentType } = this.state;
        const header = dataStore.getHeader(currentType);
        const rows = dataStore.getRows(currentType);
        return(
            <div style={Table}>
                <div style={TableHeading}>
                    {
                        header.map((headerCell, i) =>
                            <HeaderCell key={"header" + i} {...headerCell} valueKey={""} />
                        )
                    }
                </div>
                <div style={TableBody}>
                    {
                        rows.map((row, j) =>
                            <div style={TableRow} key={"row" + j}>
                                {
                                    row.map((cell, k) =>
                                        <BodyCell key={"cell" + k} {...cell} valueKey={""} />
                                    )
                                }
                            </div>
                        )
                    }
                </div>
            </div>
        )
    }

}

ReactCohortGraph.propTypes = {
    data : PropTypes.object.isRequired,
    cellClickEvent : PropTypes.func,
    showEmptyDataMessage : PropTypes.bool,
    customEmptyDataMessage : PropTypes.string,
    columnClickEvent : PropTypes.func,
    maxDays : PropTypes.number,
    maxWeeks : PropTypes.number,
    maxMonths : PropTypes.number,
    //enableTooltip : PropTypes.bool, TODO
    showAbsolute : PropTypes.bool,
    toggleValues : PropTypes.bool,
    showHeaderValues : PropTypes.bool
};

export default ReactCohortGraph;