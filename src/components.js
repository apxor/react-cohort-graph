/**
 * Created by jyothi on 5/6/17.
 */
import React from 'react';
import {
    Table, TableRow, TableHeading,
    TableBody, TableCell, HeaderValue,
    HeaderLabel, ScrollableTableContent
} from './styles';
import { VALUE_KEYS } from './constants';

const { VALUE, PERCENT } = VALUE_KEYS;

const renderValue = (props) => {
    const {isTotal, isLabel, valueType, labelFormatter} = props;
    if(typeof labelFormatter === 'function' && isLabel){
        return labelFormatter(props[VALUE]);
    }
    return (isTotal || isLabel) ? props[VALUE] : (props.valueType === PERCENT ? `${props[PERCENT]} %` : props[VALUE]);
};

export const HeaderCell = (props) => (
    <div style={{...TableCell, backgroundColor: props.color}}>
        <p style={HeaderLabel}>{props.label}</p>
        <span style={HeaderValue}>{renderValue(props)}</span>
    </div>
);

export const BodyCell = (props) => (
    <div style={{...TableCell, backgroundColor: props.color}} title={`Out of ${props.total} on ${props.valueFor}`}>
        {renderValue(props)}
    </div>
);

export class ScrollableContent extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            width: 0
        };
        this.ref = null;
    }

    componentDidMount(){
        this.setState({width: this.ref.parentNode.clientWidth - 1});
        window.addEventListener('resize', () => {
            this.setState({width: this.ref.parentNode.clientWidth - 1});
        });
    }

    render(){
        return(
            <div ref={x => this.ref = x} style={{...ScrollableTableContent, width: this.state.width}}>
                {this.props.children}
            </div>
        )
    }
}