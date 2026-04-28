exports.handler = async function (event, context) {
  const targetBase = 'https://citybackend-production.up.railway.app';
  const path = event.path
    .replace(/^\/api/, '')
    .replace(/^\/\.netlify\/functions\/proxy/, '') || '/';
  const query = event.queryStringParameters
    ? `?${new URLSearchParams(event.queryStringParameters).toString()}`
    : '';
  const url = `${targetBase}${path}${query}`;

  const headers = { ...event.headers };
  delete headers.host;
  delete headers['content-length'];
  delete headers['x-forwarded-proto'];
  delete headers['x-forwarded-host'];
  delete headers['x-nf-client-request-id'];
  delete headers['x-nf-source-client-ip'];
  delete headers['x-nf-geo-ip-country'];

  const body = ['GET', 'HEAD'].includes(event.httpMethod) ? undefined : event.body;

  const response = await fetch(url, {
    method: event.httpMethod,
    headers,
    body,
  });

  const responseHeaders = {};
  response.headers.forEach((value, key) => {
    if (key !== 'content-length' && key !== 'content-encoding') {
      responseHeaders[key] = value;
    }
  });

  return {
    statusCode: response.status,
    headers: {
      ...responseHeaders,
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
    },
    body: await response.text(),
  };
};
