# Redis website

This project is a [Docsy][], which is a [Hugo theme][], that's adapted for Redis' documentation website.

When cloning, make sure to bring in the submodules:

```bash
git clone --recurse-submodules --depth 1 https://github.com/redis/redis-website.git
```

Note: if you want to do SCSS edits and want to publish these, you need to install `PostCSS`

```bash
npm install postcss
```

## Running the website locally

Building and running the site locally requires a recent `extended` version of [Hugo](https://gohugo.io).

You can find out more about how to install Hugo for your environment in Docsy's
[Getting started](https://www.docsy.dev/docs/getting-started/#prerequisites-and-installation) guide.

**IMPORTANT**: you'll also need the [`redis-doc/new-structure`](https://github.com/redis/redis-doc/tree/new-structure) branch for this to work.

Once you've made your working copy of the site repo, from the repo root folder, run:

```bash
REDIS_DOC=/home/you/redis-doc make
hugo server --disableFastRender
```

The website should be up and running on http://localhost:1313/ now.

[Docsy]: https://github.com/google/docsy
[Hugo theme]: https://gohugo.io/themes/installing-and-using-themes/
