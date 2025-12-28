<a href="https://merylldindin.com">
  <img src="https://cdn.merylldindin.com/github/helix.webp" alt="helix" width="100%">
</a>

<div align="center">
  <a href="https://github.com/merylldindin/helix/graphs/contributors" target="_blank">
    <img src="https://img.shields.io/github/contributors/merylldindin/helix.svg?style=for-the-badge" alt="contributors"/>
  </a>

  <a href="https://github.com/merylldindin/helix/stargazers" target="_blank">
    <img src="https://img.shields.io/github/stars/merylldindin/helix.svg?style=for-the-badge" alt="stars"/>
  </a>

  <a href="https://github.com/merylldindin/helix/issues" target="_blank">
    <img src="https://img.shields.io/github/issues/merylldindin/helix.svg?style=for-the-badge" alt="issues"/>
  </a>

  <a href="https://github.com/merylldindin/helix/blob/main/LICENSE.txt" target="_blank">
    <img src="https://img.shields.io/github/license/merylldindin/helix.svg?style=for-the-badge" alt="license"/>
  </a>
</div>

<div align="center">
  <p align="center">
    <h2> Nuxt SSG Template </h2>
    <a href="https://merylldindin.com">
        View Demo
    </a>
    ·
    <a href="https://github.com/merylldindin/helix/issues">
        Report Bug
    </a>
  </p>
</div>

## <summary>Table of Contents</summary>

<ol>
    <li><a href="#about-helix">About Helix</a></li>
    <li><a href="#built-with">Built With</a></li>
    <li><a href="#get-started">Get Started</a></li>
    <li><a href="#ide-recommendations">IDE Recommendations</a></li>
    <li><a href="#code-quality">Code quality</a></li>
    <li><a href="#git-conventions">Git Conventions</a></li>
</ol>

## About Helix

Helix, from my set of `BioForge` initiatives, is a project born out of my frustration with LinkTree's limitations. Helix is a visually appealing and customizable way to showcase your journey, projects, and objectives all in one place.

## Built With

- [NuxtJS](https://nuxtjs.org/)
- [Vuetify](https://vuetifyjs.com/en/)
- [TypeScript](https://www.typescriptlang.org/)
- [SwiperJS](https://swiperjs.com/)
- [LottieJS](https://airbnb.io/lottie/#/)

## Get Started

```bash
# install dev experience
make setup
# install dependencies
make install
# launch Nuxt instance
make start
```

## IDE Recommendations

I recommend working with VSCode, an IDE that does not need to be presented. Internally, I use a set of code extensions enabling a minimum of code standardization, making the life of many developers more enjoyable. Those extensions are given in `.vscode/extensions.json`, and can be downloaded directly via the VSCode extension store. This goes hand and hand with properly configured VSCode workspace settings, available in `.vscode/settings.json`.

## Code Quality

### Husky:

Many of our internal toolings are enforced via [husky](https://typicode.github.io/husky/#/), a wrapper for Git hooks. I currently enforce two hooks:

- `commit-msg` relying on [commitlint](https://commitlint.js.org/) to make sure that our commit conventions are respected
- `pre-push` relying on a `yarn` command to run locally a majority of our CI scripts

Make sure those hooks are correctly configured via

```bash
yarn setup
```

### Prettier:

To maintain some minimal standards within our codebase, I rely on [prettier](https://prettier.io/) that is configured through `.prettierrc`. I use `.prettierignore` to avoid conflicts with some configuration files that would otherwise be broken by using prettier. Make sure prettier is correctly used in VSCode by installing the [VSCode extension](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode).

### Helpers:

I use [nvm](https://github.com/nvm-sh/nvm) for Node version management (see `.nvmrc`), [yarn](https://yarnpkg.com/) for package management, and [uv](https://docs.astral.sh/uv/) for Python dependency management (see `.python-version`). Alongside that environment, I use the following tools to maintain high code standards:

- [prettier](https://prettier.io/) configured in `.prettierrc`
- [eslint](https://eslint.org/) configured in `.eslintrc`
- [stylelint](https://stylelint.io/) configured in `.stylelint.config.js`
- [typescript](https://typescript.nuxtjs.org/) configured in `tsconfig.json`

### Naming Conventions:

"There are only two hard things in Computer Science: cache invalidation and naming things." - Phil Karlton

That is exactly why it is important everyone follow guidelines regarding naming conventions, especially when moving quickly as a team. Here are a set of rules that will most likely guide you through any problem you would face:

1. Do not use abbreviations
2. Use at least 2 words for function names
3. Boolean variables should be infered from their name (e.g. start with `is_` or `has_`)

<b>Typescript</b>

1. Use `PascalCase` for component registration and name
2. Use `PascalCase` for component folders
3. Use `camelCase` for pure JS/TS files and functions
4. Use `SCREAMING_SNAKE_CASE` for constants
5. Use [BEM](http://getbem.com/introduction/) conventions for SCSS
6. Use 2 to 3 words for component naming
7. Name your colors using [this](https://chir.ag/projects/name-that-color) project

<b>Configure Vuetify for BEM</b>

I use [Vuetify](https://vuetifyjs.com/en/) as our material design framework. It provides us with a set of components and themes. It is core to our frontend endeavors, and requires a bit of configuration. Vuetify relies on composition function on top of our configuration to provide helpers available throughout the codebase, and colors are a part of it. To abide by our conventions, I need to configure Vuetify to use BEM for its classes via `src/plugins/vuetify.client`.

That way, you will now be able to use `var(--v-theme-steel-gray)` or `text-steel-gray` in your codebase. I also expose the `enum` of our colors through our `@/types` for conveniency.

### Typing:

Typing is key to maintainability. It will increase the readability of the code, but will also passively document your code. Finally, type checking will help to find some obvious bugs.

TypeScript is fully integrated into our CI pipeline via GitHub Actions. In addition to that, you'll be warned by Nuxt about any type errors when developing locally. I expose the command `yarn types` to run the type checker manually.

I aim to make our types as specific as possible. The use `any` is strongly discouraged in favor of `unknown`.

## Git Conventions

### Branches:

I have a simple convention for branch naming: `{initials}/{descriptive-kebab-case}`. Keep them all lowercase. For John Doe working on a feature A, that would be `jd/feature-a`.

### Commits:

The Conventional Commits specification is a lightweight convention on top of commit messages. It provides an easy set of rules for creating an explicit commit history; which makes it easier to write automated tools on top of. This convention dovetails with SemVer, by describing the features, fixes, and breaking changes made in commit messages. Learn more [here](https://www.conventionalcommits.org/en/v1.0.0/).

### Pull requests:

There are simple rules in regards to our PR management:

- Link your PRs to their related Notion tickets;
- Use prefixes for your PR titles among [FIX], [FEAT], [REFACTOR], [RELEASE], [HOTFIX], [TEST];
- If your code affects the application build, be sure to update the `README.md`;
- Do not merge a PR until all comments are resolved;
- Remove your branch after merging;
