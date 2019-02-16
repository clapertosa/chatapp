if (process.env.NODE_ENV === "development") {
  module.exports = moduleExists();
} else {
  module.exports = require("./prod.js");
}

function moduleExists() {
  try {
    return require("./dev.js");
  } catch {
    return require("./publicDev.js");
  }
}
