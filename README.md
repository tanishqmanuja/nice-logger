![Logo](https://raw.github.com/tanishqmanuja/static/main/banners/nice-logger.webp?maxAge=2592000)

<p align=center>"Not the nicest, but a pretty nice and sweet logger for Elysia."</p>

<div align=center>

[![Downloads][downloads-shield]][npm-url]
[![NPM Version][npm-shield]][npm-url]
![GitHub Workflow Status][ci-status-shield]
[![License][license-shield]][license-url]

</div>

<!-- Shields -->

[ci-status-shield]: https://img.shields.io/github/actions/workflow/status/tanishqmanuja/nice-logger/release.yaml?branch=main&style=for-the-badge&label=ci
[downloads-shield]: https://img.shields.io/npm/dm/%40tqman%2Fnice-logger?style=for-the-badge
[license-shield]: https://img.shields.io/github/license/tanishqmanuja/apkmirror-downloader?style=for-the-badge
[license-url]: https://github.com/tanishqmanuja/nice-logger/blob/main/LICENSE.md
[npm-shield]: https://img.shields.io/npm/v/@tqman/nice-logger?style=for-the-badge
[npm-url]: https://www.npmjs.com/package/@tqman/nice-logger

## 🚀 Installation

```bash
bun add @tqman/nice-logger
```

## 📃 Usage

```ts
import Elysia from "elysia";
import { logger } from "@tqman/nice-logger";

const app = new Elysia()
  .use(logger({
    mode: "live", // "live" or "combined" (default: "combined")
  }));
  .get("/", "Hello via Elysia!")
  .listen(3000);
```

## 🍰 Showcase

Some projects using `@tqman/nice-logger`

- [**todos-react-elysia**](https://github.com/tanishqmanuja/todos-react-elysia)

  A simple starter fullstack todos app built with [React](https://react.dev) and [Elysia](https://elysiajs.com).

## 🍀 Show your Support

Give a ⭐️ if this project helped you!
