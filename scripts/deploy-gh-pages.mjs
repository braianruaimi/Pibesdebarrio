import { execSync } from "node:child_process";
import { existsSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { publish } from "gh-pages";

const repositoryName =
  process.env.GITHUB_PAGES_REPOSITORY || process.env.npm_package_name || "pibesdebarrio";

process.env.GITHUB_PAGES = "true";
process.env.GITHUB_PAGES_REPOSITORY = repositoryName;

execSync("npx next build", {
  stdio: "inherit",
  env: process.env,
});

const outputDir = join(process.cwd(), "out");

if (!existsSync(outputDir)) {
  throw new Error("No se genero la carpeta out. La exportacion para GitHub Pages fallo.");
}

writeFileSync(join(outputDir, ".nojekyll"), "");

await new Promise((resolve, reject) => {
  publish(
    "out",
    {
      branch: "gh-pages",
      dotfiles: true,
      message: "Deploy to GitHub Pages",
    },
    (error) => {
      if (error) {
        reject(error);
        return;
      }

      resolve();
    },
  );
});

console.log(`Publicado en la rama gh-pages con basePath ${`/${repositoryName}`}.`);
