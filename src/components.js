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

const renderHeader = props => {
    const {isHeader, headerFormatter, label} = props;
    if(typeof headerFormatter === 'function' && isHeader){
        return headerFormatter(label);
    }
    return label
}

export const HeaderCell = (props) => (
    <div style={{...tableCell(props.tableCellStyles), backgroundColor: props.color, ...props.style}}>
        <p style={headerLabel(props.headerLabelStyles)}>{renderHeader(props)}</p>
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