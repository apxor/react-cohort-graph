/**
 * Created by jyothi on 5/6/17.
 */
import React from 'react';
import { Table, TableRow, TableHeading, TableBody, TableCell, HeaderValue, HeaderLabel } from './styles';
import { VALUE_KEYS } from './constants';

const { VALUE, PERCENT } = VALUE_KEYS;

const renderValue = (props) => {
    const {isTotal, isLabel, valueType} = props;
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