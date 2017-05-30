/**
 * Created by jyothi on 30/5/17.
 */
/**
 * Cell Shade color based on percentage
 * @param percent
 * @param color
 * @returns {string}
 */
export const shadeCellWithColor = (percent, color = "#3f83a3") => {
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
export const getPercentage = (total, value) => {
    return total ? Math.round((value / total * 100) * 100) / 100 : total;
};

/**
 *
 * @param color
 * @returns {boolean}
 */
export const isValidHex = function(color){
    return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(color);
};

/**
 *
 * @returns {string}
 */
export const camelCased = function(text = ""){
    return text.toLowerCase().replace( /\b\w/g, replaced => {
        return replaced.toUpperCase();
    });
};