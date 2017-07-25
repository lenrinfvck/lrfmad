var process = require('child_process');

module.exports = function(req, res, next) {
    console.log('print', req.body);
    console.info(req.body["token"]);
    if('ntr' === req.body['token']&&req.body["ref"] === "master"){
        //console.info(process);
        process.exec('git pull origin master:master', {'cwd':'/www/'}, 
            function (error, stdout, stderr) {
                process.exec('restart mynode');
                console.log('stdout========================\n' + stdout);
                console.log('stderr========================\n' + stderr);
                if (error !== null) {
                    res.send('<pre>fail!!!\n' + stdout + error + '</pre>');
                } else {
                    res.send('<pre>done!!!\n' + stdout + '</pre>');
                }
            });
    } else {
        console.log(' failed token ')
        res.send('<pre>token不正确?</pre>');
    }
}