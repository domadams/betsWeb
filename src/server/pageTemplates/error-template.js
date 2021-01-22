/** *************************************************
 * @param title - title we want to render
 * @param content - content we want to pass in
 * @param nonce - nonce value for CSP
 * @param css - injected css for styling
 * @returns {string} of content to render in browser
 ************************************************* */
const errorTemplate = (title, content, nonce, css) => (
  `<!doctype html>
        <html lang="en">
            <head>
                <meta http-equiv="X-UA-Compatible" content="IE=EDGE">
                <meta http-equiv="Content-type" content="text/html;charset=utf-8">
                <meta name="keywords" content="Keywords go here">
                <meta name="description" content="What is this here to do?">
                <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
                <meta property="csp-nonce" content="${nonce}">
                <style nonce="${nonce}" id="jss-server-side">${css}</style>
                <title>${title}</title>
            </head>
            <body>
                <div id="content">${content}</div>
            </body>
        </html>`
);

export default errorTemplate;
