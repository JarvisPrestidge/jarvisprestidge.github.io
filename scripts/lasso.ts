import * as lasso from "lasso";
import * as path from "path";
import * as fs from "fs";

require("marko/node-require").install();

// Project root
const projectRoot = path.join(__dirname, "..");

// Site source
const sourceDir = path.join(projectRoot, "src");
// Static assets
const outputDir = path.join(projectRoot, "static");

const isProduction = !!process.env.NODE_ENV;

// Configure bundler
lasso.configure({
    outputDir,
    urlPrefix: "./",
    minify: isProduction,
    fingerprintsEnabled: isProduction,
    bundlingEnabled: isProduction,
    plugins: ["lasso-marko"]
});

// Crate static folder
fs.mkdirSync(outputDir);

// Require the root marko template
const template = require(sourceDir);

// Render template output to HTML file
template.render({}, fs.createWriteStream(path.join(outputDir, "index.html"), { encoding: "utf8" }));
