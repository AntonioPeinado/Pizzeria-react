import { bus } from "./bus";
import authService from "../auth/auth-service";
class HTTPService {
  constructor(url) {
    this._url = url;
  }
  getAll(options = {}) {
    const { include, ...fetchOptions } = options;
    return this._request(this._setInclude(this._url, include), {
      method: "GET",
      ...fetchOptions,
    });
  }
  get(id, options = {}) {
    const { include, ...fetchOptions } = options;
    return this._request(this._setInclude(this._url + "/" + id, include), {
      method: "GET",
      ...fetchOptions,
    });
  }
  post(data, options = {}) {
    const body = data instanceof FormData ? data : JSON.stringify(data)
    return this._request(this._url, {
      body,
      method: "POST",
      ...options,
    });
  }
  put(id, data, options = {}) {
    return this._request(this._url + "/" + id, {
      body: JSON.stringify(data),
      method: "PUT",
      ...options,
    });
  }
  patch(id, data, options = {}) {
    return this._request(this._url + "/" + id, {
      body: JSON.stringify(data),
      method: "PATCH",
      ...options,
    });
  }
  delete(id, options = {}) {
    return this._request(this.url + "/" + id, {
      method: "DELETE",
      ...options,
    });
  }
  _setInclude(url, include) {
    if (!include || !include.length) {
      return url;
    }
    return `${url}?include=${include.join(",")} `;
  }
  _request(url, options) {
    this._setAuthorization(options);
    bus.emit("http:request-start");
    return fetch(url, options)
      .then(this._handleUnauthorized.bind(this, url, options))
      .then(this._handleResponse)
      .finally(() => {
        bus.emit("http:request-end");
      });
  }
  async _handleUnauthorized(url, options, res) {
    if (res.status !== 401) {
      return res;
    }
    try {
      await authService.refresh();
    } catch (err) {
      window.location.replace("/login");
      return;
    }
    this._setAuthorization(options);
    return fetch(url, options);
  }
  async _handleResponse(res) {
    if (res.status >= 400) {
      throw res;
    }
    return res.json();
  }
  _setAuthorization(options) {
    options.headers = options.headers || {};
    options.headers.Authorization = `Bearer ${authService.token}`;
  }
}
export default HTTPService;
