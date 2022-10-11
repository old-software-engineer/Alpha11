const jwt = require("jsonwebtoken");

function handleResponse(res, code, statusMsg) {
  res.status(code).json({ status: statusMsg });
}

function handleResponseWithData (res, code, data) {
  res.status(code).json(data);
}

function jwtTokenCreation(payload) {
  return jwt.sign(payload, "random string");
}

module.exports = {
  handleResponse,
  handleResponseWithData,
  jwtTokenCreation
};
