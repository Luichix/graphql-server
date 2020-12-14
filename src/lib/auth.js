module.exports = {
    isLoggedIn(req, res, next){
        if (req.isAuthenticated()) {
            return next();
        }
        return console.log("Is not Logged in") 
        // res.redirect('/signin')
    },
    isNotLoggedIn(req, res, next){
        if (!req.isAuthenticated()){
            return next();
        }
        return console.log("Is Logged in") 
        // res.redirect('/profile')
    }
};