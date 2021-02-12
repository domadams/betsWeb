import helmet from 'helmet';

const trusted = [
  "'self'",
  'http://0.0.0.0:8080/',
  'https://statosphere-303317.nw.r.appspot.com/',
];

if (process.env.NODE_ENV !== 'production') {
  trusted.push('http://localhost:*', 'ws://localhost:*');
}

export default function contentSecurityPolicy(nonce) {
  return helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: trusted,
      scriptSrc: [
        `'nonce-${nonce}'`,
      ].concat(trusted),
      styleSrc: [
        `'nonce-${nonce}'`,
        'fonts.googleapis.com',
        'fonts.gstatic.com',
      ].concat(trusted),
      frameSrc: trusted,
      fontSrc: [
        'fonts.googleapis.com',
        'fonts.gstatic.com',
      ].concat(trusted),
      imgSrc: [
        'assets.b365api.com',
        'data:',
      ].concat(trusted),
      connectSrc: trusted,
    },
  });
}
