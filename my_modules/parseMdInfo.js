function parse(str) {
    var infoStr = str.match(/^(\/---)[\s\S]*(---\/)$/m);
    if(infoStr) {
        var strArr = [];
        var splitStr = str.replace(infoStr[0], "");
        var parseRes = {};
        strArr = infoStr[0].replace(/(\/---)|(---\/)|\s/g, "").split(";");
        for(var i in strArr) {
            var item = strArr[i].split(":");
            parseRes[item[0]] = item[1];
        }

        return {
            str: splitStr,
            parse: parseRes
        }
    }
    return {
        str: str,
        parse: null
    }
}
module.exports = parse;