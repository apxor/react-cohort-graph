//Type definitions
import * as React from 'react';

export interface Props {
    data: object;
    dataType?: string;
    defaultValueType?: "value" | "percent";
    cellClickEvent?: (e: object) => void,
    showEmptyDataMessage?: boolean;
    customEmptyDataMessage?: any,
    columnClickEvent?: (e: object) => void,
    shadeColor?: string;
    headerCellColor?: string;
    bodyCellColor?: string;
    keyCellColor?: string;
    labelFormatter?: (obj: object) => string | any, //function(label){ return formattedLabel;}
    headerFormatter?: (obj: object) => string | any,
    cellFormatter?: (obj: object) => string | any,
    /*maxDays : number,
    maxWeeks : number, //TODO:
    maxMonths : number,*/
    //enableTooltip : bool, TODO
    showAbsolute?: boolean;
    toggleValues?: boolean;
    showHeaderValues?: boolean;
    onStoreUpdate?: (store: object, currentType: string, valueType: string) => void;
    //Styles
    headerCellStyles?: object;
    bodyCellStyles?: object;
    tableCellStyles?: object;
    tableStyles?: object;
    tableRowStyles?: object;
    tableHeadingStyles?: object;
    tableBodyStyles?: object;
    fixedTablePartStyles?: object;
    wrapperStyles?: object;
    scrollableTablePartStyles?: object;
    scrollableTableContentStyles?: object;
    headerValueStyles?: object;
    headerLabelStyles?: object
}

declare const ReactCohortGraph: React.ComponentType<Props>;

export default ReactCohortGraph