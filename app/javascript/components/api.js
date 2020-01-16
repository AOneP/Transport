const headers = {
  'Content-Type': 'application/json',
}

const api = {
  get: (payload, path) => {
    const queryString = Object
    .keys(payload)
    .map(key => `${key}=${payload[key]}`)
    .join('&')

    return fetch(`${path}?${queryString}`, { headers })
      .then(response => response.json())
      .catch(ex => console.error('parsing failed', ex))
  },

  post: (payload, path, method = 'POST') => {
    const options = { method, headers, body: JSON.stringify(payload) }

    return fetch(path, options)
      .then(response => response.json)
      .catch(ex => console.error('parsing failed', ex))
  },
}

export default api
