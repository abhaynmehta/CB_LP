// Serves the static site. Once a custom domain is live, set CANONICAL_HOST in wrangler.jsonc
// (e.g. "abhaymehta.com") and every request to any other host (the old workers.dev address)
// gets a permanent 301 to the same path on the new domain, so rankings and links carry over.
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (env.CANONICAL_HOST && url.hostname !== env.CANONICAL_HOST) {
      url.hostname = env.CANONICAL_HOST; url.protocol = 'https:'; url.port = '';
      return Response.redirect(url.href, 301);
    }
    return env.ASSETS.fetch(request);
  },
};
