import { execSync } from "node:child_process";
import { existsSync, readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
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

const walkFiles = (dir) => {
  const entries = readdirSync(dir);

  return entries.flatMap((entry) => {
    const filePath = join(dir, entry);
    const stats = statSync(filePath);

    if (stats.isDirectory()) {
      return walkFiles(filePath);
    }

    return filePath;
  });
};

const rewriteFile = (filePath, replacements) => {
  const current = readFileSync(filePath, "utf8");
  let next = current;

  for (const [searchValue, replaceValue] of replacements) {
    next = next.split(searchValue).join(replaceValue);
  }

  if (next !== current) {
    writeFileSync(filePath, next);
  }
};

const rewriteExportArtifacts = () => {
  const repoPrefix = `/${repositoryName}`;

  for (const filePath of walkFiles(outputDir)) {
    if (filePath.endsWith(".html")) {
      rewriteFile(filePath, [
        [`${repoPrefix}/_next/`, "./_next/"],
        [`${repoPrefix}/product-fallback.js`, "./product-fallback.js"],
        [`\"assetPrefix\":\"${repoPrefix}\"`, '\"assetPrefix\":\".\"'],
      ]);
      continue;
    }

    if (filePath.endsWith(".webmanifest")) {
      rewriteFile(filePath, [
        [`\"start_url\": \"${repoPrefix}/\"`, '\"start_url\": \"./\"'],
        [`\"scope\": \"${repoPrefix}/\"`, '\"scope\": \"./\"'],
        ['\"src\": \"/icons/', '\"src\": \"icons/'],
      ]);
      continue;
    }

    if (filePath.endsWith(".js")) {
      rewriteFile(filePath, [
        [`${repoPrefix}/_next/`, "./_next/"],
      ]);
    }
  }
};

writeFileSync(join(outputDir, ".nojekyll"), "");
rewriteExportArtifacts();

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

      resolve(undefined);
    },
  );
});

console.log(`Publicado en la rama gh-pages con basePath /${repositoryName}.`);