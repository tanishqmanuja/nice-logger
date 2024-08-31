![Logo](https://raw.github.com/tanishqmanuja/static/main/banners/nice-logger.webp?maxAge=2592000)

<p align=center>"Not the nicest, but a pretty nice and sweet logger for Elysia."</p>

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

## 🍀 Show your Support

Give a ⭐️ if this project helped you!
