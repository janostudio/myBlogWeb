/*
 * Record reader's INFO.
 */
var dao = require('../dao/logs');

exports.baseInfo = function (req, res) {
    var ipAddress;
    var headers = req.headers;

    //公网IP
    var forwardedIpsStr = headers['x-real-ip'] || headers['x-forwarded-for'];
    forwardedIpsStr ? ipAddress = forwardedIpsStr : ipAddress = null;
    if (!ipAddress) {
        ipAddress = req.connection.remoteAddress;
    }
    var servinfo = {};
    servinfo.cip = ipAddress;
    servinfo.cookie = headers.cookie;
    servinfo.uagent = headers['user-agent'];
    servinfo.lang = headers['accept-language'];
    servinfo.aurl = req.originalUrl;
    servinfo.method = req.method;
    dao.insertLog(servinfo,req.body);
}
