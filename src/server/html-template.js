/** *************************************************
 * @param title - title we want to render
 * @param content - content we want to pass in
 * @returns {string} of content to render in browser
 ************************************************* */
const htmlTemplate = (title, content) => (
  `<!doctype html>
        <html lang="en">
            <head>
                <meta http-equiv="X-UA-Compatible" content="IE=EDGE">
                <meta httpEquiv="Content-type" content="text/html;charset=utf-8">
                <meta name="keywords" content="Keywords go here">
                <meta name="description" content="What is this here to do?">
                <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
                <title>${title}</title>
            </head>
            <body>
                <div id="content">${content}</div>
                <script type="text/javascript" src="/app.js"></script>
            </body>
        </html>`
);

module.exports = htmlTemplate;
