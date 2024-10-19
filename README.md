# 𝒯𝒾𝑔𝑒𝓇𝒮𝓉𝓊𝒹𝓎 𝟤

This project is the 2nd version of [TigerStudy](https://study.tigerapps.org), a web application that helps Princeton students find study groups for their classes. This version is a complete rewrite of the original project with a new design and features.

## Getting Started

This project uses [Bun](https://bun.sh/). To get started, make sure Bun is installed on your machine. Then, clone the repo and run `bun install` and `bun --bun run dev`.

To format the code with Prettier, run `bun format`. To lint the code with ESLint, run `bun lint`.

### Important Note

You _must_ use Bun to run the project since it uses Bun-specific APIs like the SQLite driver. Additionally, this project cannot be deployed to serverless because of the SQLite dependency. Using the `--bun` flag is necessary to run the project with the correct configuration.

### Technologies

Frontend:

-   [Svelte](https://svelte.dev/)
-   [Tailwind CSS](https://tailwindcss.com/)
-   [ShadCN Svelte](https://www.shadcn-svelte.com/)

Backend:

-   [Bun](https://bun.sh/)
-   [SvelteKit](https://kit.svelte.dev/)
-   [SQLite](https://www.sqlite.org/index.html)

Dev Tools:

-   [Prettier](https://prettier.io/)
-   [ESLint](https://eslint.org/)

## Contributing

If you would like to contribute to this project, please message the TigerApps board on Discord (if you are a TigerApps member) or via email at [it.admin@tigerapps.org](mailto:it.admin@tigerapps.org).

Please make sure to add file comments that specify authorship. Also, make sure to run `bun format` and `bun lint` before committing your changes.

## Acknowledgments

This version of TigerStudy was made by [Joshua Lau '26](https://github.com/joshuamotoaki) with support from the [McGraw Center](https://mcgraw.princeton.edu/) and [TigerApps](https://tigerapps.org/).

The original [TigerStudy](https://github.com/TigerAppsOrg/TigerStudy) project was made by Caroline di Vittorio '22 and Kasey McFadden '22 with implementation support by Shannon Heh '23 and Nick Padmanabhan '23.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
