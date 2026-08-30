"use strict";

const assert = require("node:assert/strict");
const {formatJst} = require("../assets/ri5-public-telemetry.js");
const fs = require("node:fs");
const path = require("node:path");

for (const value of [null, undefined, "", "not-a-date"]){
  assert.equal(formatJst(value), "NOT AVAILABLE");
}
assert.notEqual(formatJst("2026-08-30T16:20:55.214492+00:00"), "NOT AVAILABLE");
assert.match(fs.readFileSync(path.join(__dirname, "..", "index.html"), "utf8"), /ri5-public-telemetry\.js\?build=20260831\.2/);
console.log("ri5 public telemetry null-time regression: PASS");
