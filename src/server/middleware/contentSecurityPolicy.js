import helmet from 'helmet';

const trusted = [
  "'self'",
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
      styleSrc: trusted,
      frameSrc: trusted,
      fontSrc: trusted,
      imgSrc: trusted,
    },
  });
}
