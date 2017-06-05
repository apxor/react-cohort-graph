/**
 * Created by jyothi on 30/5/17.
 */
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
    constructor(data, options){
        this.isValid = true;
        this._checkValidity(data);
        this.rawStore = data;
        this.store = {};
        this.headers = {};
        if(this.isValid){
            this._buildStore(data);
        }else{
            throw new Error("Invalid Data for cohort graph..!");
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
                        if(data[key].hasOwnProperty(anotherKey) && Array.isArray(data[key][anotherKey])){
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
                        cellData.value = anotherKey;
                        cellData.valueFor = anotherKey;
                        cellData.total = data[key][anotherKey][0];
                        cellData.percent = 100;
                        cellData.color = "#F1F1F1";
                        this.store[key].push([
                            cellData, ...data[key][anotherKey].map(value => {
                                const percent = this._getPercentage(cellData.total, value);
                                return {
                                    type: type,
                                    value: value,
                                    valueFor: anotherKey,
                                    total: cellData.total,
                                    percent: percent,
                                    color: this._shadeCellWithColor(percent)
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
                this.headers[key] = [];
                this.headers[key].push({
                    value: key //TODO:
                });
                let cellData = {};
                cellData.isHeader = true;
                cellData.index = 0;
                cellData.type = key;
                cellData.value = key;
                cellData.valueFor = key;
                cellData.total = this._sumOfColumnWithIndex(this.store[key], 1);
                cellData.percent = 100;
                cellData.color = "#F1F1F1";
                this.headers[key].push(cellData);
                const largeRow = this.store[key][0];
                largeRow.forEach((el, index) => {
                    if(index < 2) return;
                    const value = this._sumOfColumnWithIndex(this.store[key], index);
                    const percent = this._getPercentage(cellData.total, value);
                    this.headers[key].push({
                        isHeader: true,
                        index: index,
                        type: type,
                        value: value,
                        valueFor: largeRow[0],
                        total: cellData.total,
                        percent: percent,
                        color: this._shadeCellWithColor(percent)
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
                sum += el[index];
            }catch(e){
                sum += 0;
            }
        });
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
            throw new Error(`No Data Found for type => ${type}`);
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
                throw new Error(`No Data Found for cell with type => ${type}, row => ${row}, col => ${col}`);
            }
        }else{
            throw new Error(`No Data Found for cell with type => ${type}, row => ${row}, col => ${col}`);
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
                throw new Error(`No Data Found for cell with type => ${type}, col => ${col}`);
            }
        }else{
            throw new Error(`No Data Found for cell with type => ${type}, col => ${col}`);
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
        return `#
            ${
                (
                    0x1000000 +
                    (Math.round((t - R) * p) + R) * 0x10000 +
                    (Math.round((t - G) * p) + G) * 0x100 +
                    (Math.round((t - B) * p) + B)
                )
            }`.toString(16).slice(1);
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

}