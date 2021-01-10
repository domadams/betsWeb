/** *************************************************
 * @param title - title we want to render
 * @param content - content we want to pass in
 * @returns {string} of content to render in browser
 ************************************************* */
import serialize from 'serialize-javascript';

const htmlTemplate = (title, content, data, path, nonce) => (
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
                <input type="hidden" id="path" value="${path}"/>
                <script nonce="${nonce}" id="initial-data" type="application/json">${serialize(data)}</script>
                <script type="text/javascript" src="/vendor.js"></script> 
                <script type="text/javascript" src="/main.js"></script>   
            </body>
        </html>`
);

export default htmlTemplate;
