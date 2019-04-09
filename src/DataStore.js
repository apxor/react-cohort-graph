/**
 * Created by jyothi on 30/5/17.
 */
import { VALUE_KEYS } from './constants';

const { VALUE, PERCENT } = VALUE_KEYS;

export default class DataStore {

    /**
     *
     * @param data {Object}
     * @param options {Object}
     * options = {
     *  shadeColor: {string} HEX
     *  headerColor
     * }
     */
    constructor(data, options = {}){
        this.isValid = true;
        this._checkValidity(data);
        this.rawStore = data;
        this.store = {};
        this.headers = {};
        this.options = options;
        if(this.isValid){
            this._buildStore(data);
            this._buildHeaders();
        }else{
            console.error("Invalid Data for cohort graph..!");
        }
    }

    /**
     *
     * @param data
     * @private
     */
    _checkValidity = data => {
        if(typeof data === 'object' && !Array.isArray(data)){
            for(let key in data){
                if(data.hasOwnProperty(key) && typeof data[key] === 'object' && !Array.isArray(data[key])){
                    for(let anotherKey in data[key]){
                        if(data[key].hasOwnProperty(anotherKey) && !Array.isArray(data[key][anotherKey])){
                            this.isValid = false;
                            return;
                        }
                    }
                }else{
                    this.isValid = false;
                    return;
                }
            }
        }else{
            this.isValid = false;
        }
    };

    /**
     *
     * @param data
     * @private
     */
    _buildStore = (data) => {
        for(let key in data){
            if(data.hasOwnProperty(key)){
                this.store[key] = [];
                for(let anotherKey in data[key]){
                    if(data[key].hasOwnProperty(anotherKey)){
                        let cellData = {};
                        cellData.type = key;
                        cellData[VALUE] = anotherKey;
                        cellData.valueFor = anotherKey;
                        cellData.total = data[key][anotherKey].length > 0 ? data[key][anotherKey][0] : 0;
                        cellData.color = this.options.keyCellColor;
                        cellData.isDate = true;
                        cellData.index = -1;
                        cellData.isHeader = false;
                        this.store[key].push([
                            cellData, ...data[key][anotherKey].map((value, index) => {
                                const percent = this._getPercentage(cellData.total, value);
                                return {
                                    isHeader: false,
                                    index: index,
                                    type: key,
                                    [VALUE]: value,
                                    valueFor: anotherKey,
                                    total: cellData.total,
                                    isTotal: index === 0,
                                    isCell: index > 0,
                                    [PERCENT]: percent,
                                    color: index === 0 ? this.options.bodyCellColor : this._shadeCellWithColor(percent, this.options.shadeColor)
                                };
                            })
                        ]);
                    }
                }
            }
        }
    };

    /**
     * builds header for table
     * @private
     */
    _buildHeaders = () => { //TODO: can also take custom headers
        for(let key in this.store){
            if(this.store.hasOwnProperty(key)){
                const labelPrefix = this._turnCamelCase(key.slice(0, -1));
                this.headers[key] = [];
                this.headers[key].push({ //first cell (Date)
                    [VALUE]: "",
                    [PERCENT]: "",
                    color: this.options.headerCellColor,
                    isLabel: true,
                    label: this._turnCamelCase(key),
                    index: 0
                });
                let cellData = {};
                cellData.isHeader = true;
                cellData.index = 1;
                cellData.type = key;
                cellData[VALUE] = this._sumOfColumnWithIndex(this.store[key], 1);
                cellData.valueFor = key;
                cellData.total = cellData.value;
                cellData[PERCENT] = 100;
                cellData.color = this.options.headerCellColor;
                cellData.label = labelPrefix + ' ' + 0;
                this.headers[key].push(cellData); //second cell (Initial Count)
                const totalRows = this.store[key].length;
                const largeRow = totalRows > 0 ? this.store[key][0] : [];
                largeRow.forEach((el, index) => {
                    if(index < 2) return;
                    const value = this._sumOfColumnWithIndex(this.store[key], index);
                    const percent = this._getPercentage(this._sumOfFirstColumnUpToIndex(this.store[key], totalRows, index), value);
                    this.headers[key].push({
                        isHeader: true,
                        index: index,
                        type: key,
                        [VALUE]: value,
                        valueFor: largeRow[0],
                        total: cellData.total,
                        [PERCENT]: percent,
                        color: this._shadeCellWithColor(percent, this.options.shadeColor),
                        label: labelPrefix + ' ' + (index - 1)
                    });
                });
            }
        }
    };

    /**
     * Sum of Array Elements
     * @param arr
     * @private
     */
    _sumOfArrayElements = arr => arr.reduce((a, b) => a + b);

    /**
     *
     * @param arr
     * @param index
     * @returns {number}
     * @private
     */
    _sumOfColumnWithIndex = (arr, index) => {
        let sum = 0;
        arr.forEach(el => {
            try{
                sum += el[index].value;
            }catch(e){
                sum += 0;
            }
        });
        return sum;
    };

    /**
     *
     * @param arr
     * @param index
     * @param baseIndex
     * @returns {number}
     * @private
     */
    _sumOfFirstColumnUpToIndex = (arr, index, baseIndex) => {
        let sum = 0;
        for(let i = 0; i <= index; i++){
            try {
                if(arr[i][baseIndex]){ //If value exists upto this index FIXME: need better understanding than this
                    sum += arr[i][1].value;
                }else{
                    break;
                }
            }catch(e){ //if no further index break the loop
                break;
            }
        }
        return sum;
    };

    /**
     *
     * @param type
     * @returns {*}
     */
    getTypeData = (type) => {
        if(this.store.hasOwnProperty(type)){
            return this.store[type]; //returns [][]
        }else{
            console.error(`No Data Found for type => ${type}`);
        }
    };

    /**
     *
     * @param type
     */
    getHighestRowSize = (type) => {
        if(this.store.hasOwnProperty(type)){
            return this.store[type][0].length; //returns [][]
        }else{
            console.error(`No Columns Found for type => ${type}`);
        }
    };

    /**
     *
     * @param type
     * @param row
     * @param col
     * @returns {*}
     */
    getCellData = (type, row, col) => {
        if(this.store.hasOwnProperty(type)){
            try {
                return this.store[type][row][col];
            }catch(e){
                console.error(`No Data Found for cell with type => ${type}, row => ${row}, col => ${col}`);
            }
        }else{
            console.error(`No Data Found for cell with type => ${type}, row => ${row}, col => ${col}`);
        }
    };

    /**
     *
     * @param type
     * @param col
     * @returns {*}
     */
    getHeaderCellData = (type, col) => {
        if(this.headers.hasOwnProperty(type)){
            try {
                return this.headers[type][col];
            }catch(e){
                console.error(`No Data Found for cell with type => ${type}, col => ${col}`);
            }
        }else{
            console.error(`No Data Found for cell with type => ${type}, col => ${col}`);
        }
    };

    /**
     *
     * @param type
     * @returns {*}
     */
    getHeader = (type) => {
        if(this.headers.hasOwnProperty(type)){
            return this.headers[type]; //returns [][]
        }else{
            console.error(`No Headers Found for type => ${type}`);
            return [];
        }
    };

    /**
     *
     * @param type
     * @returns {*}
     */
    getRows = (type) => {
        if(this.store.hasOwnProperty(type)){
            return this.store[type]; //returns [][]
        }else{
            console.error(`No Headers Found for type => ${type}`);
            return [];
        }
    };

    /**
     * Cell Shade color based on percentage
     * @param percent
     * @param color
     * @returns {string}
     */
    _shadeCellWithColor = (percent, color = "#3f83a3") => {
        const rate = 1.0 - Math.ceil(percent / 10) / 10;
        const f = parseInt(color.slice(1), 16),
            t = rate < 0 ? 0 : 255,
            p = rate < 0 ? rate * -1 : rate,
            R = f >> 16,
            G = f >> 8 & 0x00FF,
            B = f & 0x0000FF;
        return `#${
            (
                0x1000000 +
                (Math.round((t - R) * p) + R) * 0x10000 +
                (Math.round((t - G) * p) + G) * 0x100 +
                (Math.round((t - B) * p) + B)
            ).toString(16).slice(1)
        }`;
    };

    /**
     *
     * @param total
     * @param value
     * @returns {number}
     */
    _getPercentage = (total, value) => {
        return total ? Math.round((value / total * 100) * 100) / 100 : total;
    };

    /**
     *
     * @param color
     * @returns {boolean}
     */
    _isValidHex = function(color){
        return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(color);
    };

    _turnCamelCase = (text, defaultReturnValue = "") => {
        if(typeof text === 'string'){
            return text.toLowerCase().replace(/\b\w/g, replaced => replaced.toUpperCase());
        }
    }
}

