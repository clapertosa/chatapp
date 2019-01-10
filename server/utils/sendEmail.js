const sgMail = require("@sendgrid/mail");
const keys = require("../config/keys");

sgMail.setApiKey(keys.SENDGRID);

const send = async (to, from, subject, body, path, token, req) => {
  const msg = {
    to,
    from,
    templateId: "d-d3c6bd2e713245b796afbd2ed1be4840",
    dynamic_template_data: {
      subject,
      body,
      url: `${req.get("origin")}/${path}?token=${token}`
    }
  };

  await sgMail.send(msg);
};

module.exports = send;
