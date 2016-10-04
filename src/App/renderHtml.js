export default (props = {}) => {
  return `
    <!doctype html>
    <html className="no-js" lang="${props.lang || ''}">
      <head>
        <title>${props.title}</title>
        <meta charset="utf-8">
        <meta http-equiv="x-ua-compatible" content="ie=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="apple-touch-icon" href="apple-touch-icon.png" />
        ${props.fontFamily && `<link rel="stylesheet" href="//fonts.googleapis.com/css?family=${props.fontFamily}" />` || ''}
        <style id="css">${props.style || ''}</style>
        ${props.headerHtml || ''}
      </head>
      <body>
        <div id="app"/>
          ${props.children || ''}
        </div>
        ${props.assets && props.assets.js && (
          `<script
            id="js"
            src="${props.assets.js}"
            data-initial-state="${JSON.stringify(props.initialState) || '{}'}"
          ></script>`
        ) || ''}
        ${props.footerHtml || ''}
      </body>
    </html>
  `
}
