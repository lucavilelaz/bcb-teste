export default async function handler(req, res) {
  const { endpoint, ...query } = req.query;

  const base = "https://olinda.bcb.gov.br/olinda/servico/SICOR/versao/v2/odata";

  const qs = new URLSearchParams({
    "$format": "json",
    ...query
  });

  const url = `${base}/${endpoint}?${qs.toString()}`;

  try {
    const r = await fetch(url);
    const text = await r.text();

    res.status(r.status);
    res.setHeader("Content-Type", "application/json");
    res.send(text);

  } catch (e) {
    res.status(500).json({ error: String(e), url });
  }
}
