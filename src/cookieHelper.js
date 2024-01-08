const getCookie = (key) => {
  try {
    const match = document.cookie.match(`(^|;)\\s*${encodeURIComponent(key)}\\s*=\\s*([^;]+)`);
    return match ? decodeURIComponent(match.pop()) : undefined;
  } catch (e) {
    console.error(`Error getting cookie: ${e}`);
    return undefined;
  }
};

const setCookie = (key, value, { expires, path = '/' } = {}) => {
  let cookie = `${encodeURIComponent(key)}=${encodeURIComponent(value)};`;
  if (expires) {
    cookie += `expires=${expires.toUTCString()};`;
  }
  cookie += `path=${path};`;
  document.cookie = cookie;
};

const removeCookie = (key) => {
  setCookie(key, '', { expires: new Date(0) });
};

export default {
  getCookie,
  setCookie,
  removeCookie,
};
