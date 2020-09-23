var middleware = {};
middleware.isloggedin = function isloggedin(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}
middleware.auth=function auth(req,res,next){
    if(req.isAuthenticated()){
      res.redirect('/files');
    }
    else{
        return next();
    }

}

module.exports = middleware;