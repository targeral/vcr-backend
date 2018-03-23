const Github = require('../controller/blog').github;

const api = router => {
    router.get('getBranchList', async (ctx, next) => {
        let { request: req, response: res } = ctx;
        let { query: { githubSource } } = req;
        // res.body = query;
        res.body = await Github.getGithubBranchs(githubSource);
        res.status = 200;
        next();
    });
    router.post('relevanceGithub', (ctx, next) => {
        let { request: req, response: res } = ctx;
        let { query: { gitSource, branch } } = req;
        Github.relevanceGithub(gitSource, branch);
        res.body = { errno: 0 };
        res.status = 200;
        next();
    });
    router.get('getGithubContent', async (ctx, next) => {
        let { request: req, response: res } = ctx;
        res.body = await Github.getGithubContent();
        res.status = 200;
        next();
    });
}

module.exports = api;