/**
 * Created by jyothi on 5/6/17.
 */
import React from 'react';
import { Table, TableRow, TableHeading, TableBody, TableCell } from './styles';

export const BodyCell = (props) => (
    <div style={{...TableCell, backgroundColor: props.color}}>
        { props.children }
    </div>
);

export const HeaderCell = (props) => (
    <div style={{...TableCell, backgroundColor: props.color}} title={`Out of ${props.total} on ${props.valueFor}` }>
        { props.children }
    </div>
);