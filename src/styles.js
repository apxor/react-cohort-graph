/**
 * Created by jyothi on 5/6/17.
 */

export const DEFAULT_CELL_COLOR = "#F5F5F5";
export const DEFAULT_KEY_CELL_COLOR = "#EEE";
export const DEFAULT_HEADER_CELL_COLOR = "#DDD";

export const DEFAULT_BORDER = "1px solid #CCC";

export const Table = {
    display: 'table',
    width: "100%",
    borderCollapse: 'collapse',
    textAlign: 'center',
    borderLeft: DEFAULT_BORDER
};

export const TableRow = {
    display: 'table-row'
};

export const TableHeading = {
    display: 'table-header-group',
    backgroundColor: DEFAULT_HEADER_CELL_COLOR,
    fontWeight: 'bold',
    padding: '5px 10px',
    borderBottom: DEFAULT_BORDER,
    borderTop: DEFAULT_BORDER
};

export const TableBody = {
    display: 'table-row-group'
};

export const TableCell = {
    display: 'table-cell',
    backgroundColor: DEFAULT_HEADER_CELL_COLOR,
    padding: '5px 10px',
    borderBottom: '1px solid #DDD',
    borderRight: DEFAULT_BORDER,
    minWidth: '60px',
    whiteSpace: 'nowrap'
};

export const HeaderValue = {
    fontSize: '12px'
};

export const HeaderLabel = {
    fontSize: '16px',
    padding: '0',
    margin: '0'
};

export const FixedTablePart = {
    display: 'table-cell',
    minWidth: '200px'
};

export const ScrollableTableContent = {
    position: 'relative',
    display: 'block'
};

export const ScrollableTablePart = {
    display: 'table-cell',
    overflowX: 'auto',
    whiteSpace: 'nowrap',
    width: "100%",
    minWidth: 60
};