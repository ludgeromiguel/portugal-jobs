const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const USERNAME_REGEX = /^[a-z][a-z0-9_]{2,29}$/;
const CAPITALIZE_CASE_REGEX = /(^\w{1})|(\s+\w{1})/g;
const BEARRER_REGEX = /^Bearer$/;

export {
  EMAIL_REGEX, BEARRER_REGEX, CAPITALIZE_CASE_REGEX, USERNAME_REGEX,
};
