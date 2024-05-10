import shortid from "shortid";
import { URL } from "../models/url.model.js";

async function handleGenerateShortURL(req, res) {
  const body = req.body;

  if (!body.url) return res.status(400).json({ error: "url required" });
  const sId = shortid();
  await URL.create({
    shortId: sId,
    redirectURL: body.url,
  });
  // this is for ssr
  return res.render("home", {
    shortId: sId,
  });
  // return res.json({ msg: "success", id: sId }); for json response
}

async function handleRedirectUrl(req, res) {
  try {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
      {
        shortId,
      },
      {
        $inc: { clickHistory: 1 },
      }
    );
    console.log(entry);
    // if (!entry) return res.status(404).json({ msg: "url not found" });
    return res.redirect(entry.redirectURL);
  } catch (error) {
    console.log("Mongo Inbuilt Error ", error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
}

function handleRenderHTMLTemplate(req, res) {
  return res.render("home");
}

export { handleGenerateShortURL, handleRedirectUrl, handleRenderHTMLTemplate };
