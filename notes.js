export default async function handler(req, res) {
  const response = await fetch("http://fnotes-web.ctf-chal.idek.team/notes", {
    headers: {
      Cookie: req.headers.cookie || "",
    }
  });

  const body = await response.text();
  res.status(200).send(body);
}
