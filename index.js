const  mask = require("./dist/mask").mask;

module.export = function compare(baseline, changed) {
    return mask.createMask(baseline,changed);
}