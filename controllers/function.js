// exports.wr = function(str) {
//     console.log('[-] '+str);
//     return;
// }

// exports.views = function(link) {
//     return __dirname+settings.links.views+link;
// }

// exports.assets = function(type, link) {
//     if(type == 'public')
//         return __dirname+settings.links.assets.public+link;
//     else(type == 'private')
//         return __dirname+settings.links.assets.private+link;
// }


exports.Times = function() {
    var d = new Date()
    return d.getTime()
}

exports.SessionIsConnect = function (req, res, auth, url) {
    if(auth === 1){
        if(req.session.connect != 1) {
            res.redirect(url+'/signup')
        }
        else {

        }
    } else if(auth === 0) {
        res.redirect(url+'/profile')
    }
}
