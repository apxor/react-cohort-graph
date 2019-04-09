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

const renderValue = (props) => { //label and cell formatters
    const {isTotal, isLabel, isDate, valueType, formatter} = props;
    if(typeof formatter === 'function'){
        const { formatter, ...rest } = props;
        return formatter(rest);
    }
    return (isTotal || isLabel || isDate) ? props[VALUE] : (valueType === PERCENT ? `${props[PERCENT]} %` : props[VALUE]);
};

const renderHeader = props => { //header formatter
    const { formatter, label} = props;
    if(typeof formatter === 'function'){
        const { formatter, ...rest } = props;
        return formatter(rest);
    }
    return label;
};

export const HeaderCell = (props) => (
    <div style={{...tableCell(props.tableCellStyles), backgroundColor: props.color, ...props.style}}>
        <p style={headerLabel(props.headerLabelStyles)}>{renderHeader(props)}</p>
        {props.showHeaderValues ? (<span style={headerValue({})}>{renderValue({...props, isHeaderValue: true})}</span>) : null}
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

    setWidth = () => {
        if(this.ref && this.ref.parentNode){
            try{
                this.setState({width: this.ref.parentNode.clientWidth - 1});
            }catch (e) {
                //console.error(e);
            }
        }
    };

    componentDidMount(){
        this.setWidth();
        window.addEventListener('resize', () => {
            this.setWidth();
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