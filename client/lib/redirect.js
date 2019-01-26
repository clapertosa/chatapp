import Router from "next/router";

export default ({ res }, target) => {
  if (res) {
    res.writeHead(303, { Location: target });
    res.end();
    return {};
  } else {
    Router.replace(target);
    return {};
  }
};
