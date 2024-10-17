import { $ } from "bun";

import { version } from "../package.json";

const WORKFLOW_ID = "release.yaml";

const bump = process.argv[2] ?? "patch";

if (!bump) {
  console.error("Missing bump");
  process.exit(1);
}

if (!["patch", "minor", "major"].includes(bump)) {
  console.error("Invalid bump");
  process.exit(1);
}

const { owner, repo } = await $`git config --get remote.origin.url`
  .quiet()
  .text()
  .then(url => {
    const [owner, repo] = url.split("/").slice(-2);
    if (!owner || !repo) {
      throw new Error("Cannot find owner or repo");
    }
    return {
      owner,
      repo: repo.replace(".git", "").trim(),
    };
  });

console.log(`Current Version: ${version}`);
console.log(`Bump Type: ${bump}`);
console.log(`Repo: ${owner}/${repo}`);

console.log("\nDispatching workflow...");

await $`gh api --method POST -H "Accept: application/vnd.github+json" -H "X-GitHub-Api-Version: 2022-11-28" \
  /repos/${owner}/${repo}/actions/workflows/${WORKFLOW_ID}/dispatches -f "ref=main" -f "inputs[bump]=${bump}"`
  .quiet()
  .then(() => {
    console.log("Dispatched!");
    process.exit(0);
  })
  .catch(e => {
    console.log(e);
    process.exit(1);
  });
