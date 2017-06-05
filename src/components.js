/**
 * Created by jyothi on 5/6/17.
 */
import React from 'react';
import { Table, TableRow, TableHeading, TableBody, TableCell } from './styles';

export const BodyCell = (props) => (
    <div style={{...TableCell, ...props.style}}>
        { props.children }
    </div>
);

export const HeaderCell = (props) => (
    <div style={{...TableCell, ...props.style}}>
        { props.children }
    </div>
);