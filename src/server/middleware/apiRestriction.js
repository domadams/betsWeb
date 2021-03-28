export default function apiRestrictionHeader(req, res, next) {
  if (req.headers['akamai-x-serial-no']) {
    next();
  } else {
    res.sendStatus(403);
  }
}
