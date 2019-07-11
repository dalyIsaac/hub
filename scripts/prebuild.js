/**
 * Courtesy of https://github.com/OfficeDev/office-ui-fabric-react/issues/7110#issuecomment-481490644
 */

const replace = require("replace-in-file");
const fabricOptions = {
  files: "./node_modules/@uifabric/icons/lib/IconNames.d.ts",
  from: /const\s/g,
  to: ""
};

try {
  const changes = replace.sync(fabricOptions);
  if (changes.length > 0) {
    console.log("Modified files: ", changes.join(", "));
    console.log("const Removed! :)");
  } else {
    console.log("const was already removed! :)");
  }
} catch (err) {
  console.error("Error occurred while modifying IconNames, remove manually");
  return console.error(err);
}
