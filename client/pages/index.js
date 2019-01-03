import Router from "next/router";

const Index = () => {
  return <div>Index</div>;
};

Index.getInitialProps = async ({ res }) => {
  if (res) {
    res.writeHead(302, {
      Location: "http://localhost:3000/welcome"
    });
    res.end();
  } else {
    Router.push("http://localhost:3000/welcome");
  }
  return {};
};
export default Index;
