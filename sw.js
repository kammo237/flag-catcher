self.addEventListener("fetch", (event) => {
  event.respondWith(
    fetch(event.request).then((res) => {
      res.clone().text().then((txt) => {
        console.log("BOT LEAK: " + txt);
      });
      return res;
    })
  );
});
