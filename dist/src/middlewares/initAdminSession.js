function initUserSession(req, res, _next) {
    let user = null;
    if (req.session?.user) {
        user = req.session.user;
    }
    res.locals.user = user;
    _next();
}
export default initUserSession;
