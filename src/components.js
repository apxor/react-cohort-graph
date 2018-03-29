/**
 * Created by jyothi on 5/6/17.
 */
import React from 'react';
import {
    tableCell, headerValue, headerLabel,
    scrollableTableContent
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
    <div style={{...tableCell(props.tableCellStyles), backgroundColor: props.color, ...props.style}}>
        <p style={headerLabel(props.headerLabelStyles)}>{props.label}</p>
        <span style={headerValue({})}>{renderValue(props)}</span>
    </div>
);

export const BodyCell = (props) => (
    <div style={{...tableCell(props.tableCellStyles), backgroundColor: props.color, ...props.style}} title={`Out of ${props.total} on ${props.valueFor}`}>
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
        const { scrollableTableContentStyles } = this.props;
        return(
            <div ref={x => this.ref = x} style={{...scrollableTableContent(scrollableTableContentStyles), width: this.state.width}}>
                {this.props.children}
            </div>
        )
    }
}