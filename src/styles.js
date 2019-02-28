/**
 * Created by jyothi on 5/6/17.
 */

export const DEFAULT_BODY_CELL_COLOR = "#F5F5F5";
export const DEFAULT_KEY_CELL_COLOR = "#F6F6F6";
export const DEFAULT_HEADER_CELL_COLOR = "#F5F5F5";
export const DEFAULT_SHADE_COLOR = "#3f83a3";

export const DEFAULT_BORDER = "1px solid #F1F1F1";

export const wrapper = (custom = {}) => ({
    width: "100%",
    padding: 0,
    margin: 0,
    ...custom
});

export const table = (custom = {}) => ({
    display: 'table',
    width: "100%",
    borderCollapse: 'collapse',
    textAlign: 'center',
    borderLeft: DEFAULT_BORDER,
    ...custom
});

export const tableRow = (custom = {}) => ({
    display: 'table-row',
    ...custom
});

export const tableHeading = (custom = {}) => ({
    display: 'table-header-group',
    fontWeight: 'bold',
    padding: '15px 30px',
    borderBottom: DEFAULT_BORDER,
    borderTop: DEFAULT_BORDER,
    ...custom
});

export const tableBody = (custom = {}) => ({
    display: 'table-row-group',
    ...custom
});

export const tableCell = (custom = {}) => ({
    display: 'table-cell',
    padding: '5px 10px',
    borderBottom: '1px solid #DDD',
    borderRight: DEFAULT_BORDER,
    minWidth: '60px',
    whiteSpace: 'nowrap',
    ...custom
});

export const headerValue = (custom = {}) => ({
    fontSize: '12px',
    ...custom
});

export const headerLabel = (custom = {}) => ({
    fontSize: '16px',
    padding: '0',
    margin: '0',
    ...custom
});

export const fixedTablePart = (custom = {}) => ({
    display: 'table-cell',
    minWidth: '200px',
    ...custom
});

export const scrollableTableContent = (custom = {}) => ({
    position: 'relative',
    display: 'block',
    ...custom
});

export const scrollableTablePart = (custom = {}) => ({
    display: 'table-cell',
    overflowX: 'auto',
    whiteSpace: 'nowrap',
    width: "100%",
    minWidth: 60,
    custom
});