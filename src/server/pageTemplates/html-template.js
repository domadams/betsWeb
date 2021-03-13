/** *************************************************
 * @param title - title we want to render
 * @param content - content we want to pass in
 * @param data - data to make available for react app
 * @param path - current url path
 * @param nonce - nonce value for CSP
 * @param css - injected css for styling
 * @returns {string} of content to render in browser
 ************************************************* */
import serialize from 'serialize-javascript';

const htmlTemplate = (title, content, data, path, nonce, css) => (
  `<!doctype html>
        <html lang="en">
            <head>
                <meta http-equiv="X-UA-Compatible" content="IE=EDGE">
                <meta http-equiv="Content-type" content="text/html;charset=utf-8">
                <meta name="keywords" content="Keywords go here">
                <meta name="description" content="What is this here to do?">
                <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
                <meta property="csp-nonce" content="${nonce}">
                <link rel="preconnect" href="https://fonts.gstatic.com">
                <link rel="preconnect" href="https://assets.b365api.com">
                <style nonce="${nonce}">
                    /* latin */
                    @font-face {
                      font-family: 'Titillium Web';
                      font-style: normal;
                      font-weight: 400;
                      font-display: swap;
                      src: url(https://fonts.gstatic.com/s/titilliumweb/v9/NaPecZTIAOhVxoMyOr9n_E7fdMPmDaZRbrw.woff2) format('woff2');
                      unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
                    }
                    /* latin */
                   @font-face {
                      font-family: 'Titillium Web';
                      font-style: normal;
                      font-weight: 600;
                      font-display: swap;
                      src: url(https://fonts.gstatic.com/s/titilliumweb/v9/NaPDcZTIAOhVxoMyOr9n_E7ffBzCGItzY5abuWI.woff2) format('woff2');
                      unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
                  }
                </style>
                <style nonce="${nonce}" id="jss-server-side">${css}</style>
                <title>${title}</title>
            </head>
            <body>
                <div id="content">${content}</div>
                <input type="hidden" id="path" value="${path}"/>
                <script nonce="${nonce}" id="initial-data" type="application/json">${serialize(data)}</script>
                <script type="text/javascript" src="/vendor.js"></script> 
                <script type="text/javascript" src="/main.js"></script>   
            </body>
        </html>`
);

export default htmlTemplate;
