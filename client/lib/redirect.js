import Router from "next/router";

export default ({ res }, target) => {
  if (res) {
    res.writeHead(303, { location: target });
    res.end();
  } else {
    Router.replace(target);
  }
};
