import { testRandomWord } from "./randomWord.test.js";
import { testTar } from "./tar.test.js";
import { testVenusRoot } from "./venusRoot.test.js";

const tests = [
  { name: "randomWord", fn: testRandomWord },
  { name: "tar", fn: testTar },
  { name: "venusRoot", fn: testVenusRoot },
];
let allPassed = true;

for (const { name, fn } of tests) {
  const result = fn();
  console.log(`${name}: ${result ? "PASS" : "FAIL"}`);
  if (!result) {allPassed = false}
}

if (allPassed) {
    console.log("all unit tests pass")
}