export default function authChecker(req, res, next) {
    if (!req.session || !req.session.auth) {


        res.redirect("/");
    } else {
        next();
    }
}