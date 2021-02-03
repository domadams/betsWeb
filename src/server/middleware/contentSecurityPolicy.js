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
      ].concat(trusted),
      frameSrc: trusted,
      fontSrc: trusted,
      imgSrc: [
        'assets.b365api.com',
      ].concat(trusted),
      connectSrc: trusted,
    },
  });
}
