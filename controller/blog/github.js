const baseURL = 'https://api.github.com/repos/';
const githubRepertory = {
    gitSource: '',
    branch: ''
};
const axios = require('axios');
const to = require('./to');
const github = axios.create({
    baseURL
});

/**
 * @param {String} gitSource 
 */
const parseGitSource = (gitSource) => {
    const hosts = ['git@github.com:', 'https://github.com/'];
    let parmas = '';
    hosts.some(host => {
        if (!gitSource.includes(host)) return false;

        let start = host.length;
        let end = gitSource.indexOf('.git');

        if (end === -1) {
            console.error('gitSoure is Wrong');
            return false;
        }

        parmas = gitSource.slice(start, end);
        return true;
    });
    return parmas;
}

/**
 * 
 * @param {String} gitSource 
 */
const getGithubBranchs = async (gitSource) => {
    let params = parseGitSource(gitSource);
    let api = `${params}/branches`;
    let [err, res] = await to(github.get(api));
    if (err) {
        console.log('have some error', err);
        return 404;
    }
    console.log(res);
    return res.data.map(branch => branch.name);
}

const relevanceGithub = (gitSource, branch) => {
    githubRepertory.gitSource = parseGitSource(gitSource);
    githubRepertory.branch = branch;
}

class Blog {
    constructor(host, prefix, name, path) {
        this.host = host;
        this.name = name;
        this.imgUrl = `${host}${prefix}/${path}/index.png`;
        this.mdUrl = `${host}${prefix}/${path}/readme.md`;
    }
}

class BlogTime {
    constructor(time, blogs = []) {
        this.time = time;
        this.blogs = blogs;
    }
    add(blogs) {
        this.blogs.push(blogs);
    }
    toArray() {
        return [this.time, this.blogs];
    }
}


const getGithubContent = async () => {
    let { gitSource, branch } = githubRepertory;
    let api = `${gitSource}/contents/blog?ref=${branch}`;
    console.log(api)
    let [err, res] = await to(github.get(api));
    let { data } = res;
    if (err) {
        console.log('have some error ', err);
    }
    let promises = data.map(time => new Promise((resolve, reject) => {
            let api = `${gitSource}/contents/${time.path}?ref=${branch}`;
            let blogtime = new BlogTime(time.name);
            github.get(api).then(res => {
                let { data } = res;
                data.forEach(blog => blogtime.add(new Blog(
                    'https://github.com/',
                    `${githubRepertory.gitSource}/blob/${githubRepertory.branch}`, 
                    blog.name, 
                    blog.path
                )));
                resolve(blogtime);
            }).catch(err => {
                reject(err);
            })
        })
    );
    let timeblogs = await Promise.all(promises);
    console.log(timeblogs)
    // let map = new Map(timeblogs.map(timeblog => timeblog.toArray()));
    // console.log(map)
    return timeblogs;
}

module.exports = {
    getGithubBranchs,
    relevanceGithub,
    getGithubContent
}