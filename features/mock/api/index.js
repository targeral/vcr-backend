module.exports = (router) => {
    router.get('city', (ctx, next) => {
        const { request, response } = ctx;
        response.body  =
        response.status = 200;
        next();
    })
}