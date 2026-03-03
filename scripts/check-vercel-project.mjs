const expectedRootDirectory = process.env.VERCEL_EXPECTED_ROOT_DIR || "apps/docs";
const token = process.env.VERCEL_TOKEN;
const projectId = process.env.VERCEL_PROJECT_ID;
const teamId = process.env.VERCEL_TEAM_ID || process.env.VERCEL_ORG_ID;

if (!token || !projectId) {
  console.log(
    "Skipping Vercel project check (missing VERCEL_TOKEN or VERCEL_PROJECT_ID)."
  );
  process.exit(0);
}

const normalize = (value) =>
  String(value || "")
    .trim()
    .replace(/^\/+|\/+$/g, "");

const url = new URL(`https://api.vercel.com/v9/projects/${projectId}`);
if (teamId) url.searchParams.set("teamId", teamId);

const response = await fetch(url, {
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  },
});

if (!response.ok) {
  const body = await response.text();
  console.error(`Failed to fetch Vercel project (${response.status}).`);
  console.error(body);
  process.exit(1);
}

const payload = await response.json();
const rootDirectoryCandidates = [
  payload?.rootDirectory,
  payload?.projectSettings?.rootDirectory,
  payload?.link?.rootDirectory,
  payload?.link?.repo?.rootDirectory,
];

const actualRootDirectory =
  rootDirectoryCandidates.find(
    (value) => typeof value === "string" && value.trim().length > 0
  ) || "";

if (!actualRootDirectory) {
  console.error(
    "Could not determine project rootDirectory from Vercel API response."
  );
  console.error(
    "Set it manually in Vercel Project Settings -> General -> Root Directory."
  );
  process.exit(1);
}

if (normalize(actualRootDirectory) !== normalize(expectedRootDirectory)) {
  console.error("Vercel rootDirectory mismatch.");
  console.error(`Expected: ${expectedRootDirectory}`);
  console.error(`Actual:   ${actualRootDirectory}`);
  process.exit(1);
}

console.log(`Vercel rootDirectory OK: ${actualRootDirectory}`);
