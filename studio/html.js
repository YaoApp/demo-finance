/**
 * Table model
 */
const Template = {
  data: {
    name: "cat",
    html: `
    <html lang="en">
    <head>
      <title>Title</title>
      <meta charset="utf-8" />
      <link rel="Product stylesheet" href="css/{{ name }}.css" as="style">
      <script type="javascript" src="js/{{ name }}.js"></script>
    </head>
    <body>
      <div class="header">Some Page</div>
      <div class="page">
        <div class="content">
          <div>
            It works! <a href="/admin/login/admin" target="_blank">Login</a>
          </div>
        </div>
        <div class="footer">
          <a href="https://yaoapps.com" target="_blank">YaoApps.com</a>
        </div>
      </div>
    </body>
  </html>  
    `,
    css: `
    body {
        font-family: Outfit, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
          Helvetica Neue, Arial, Noto Sans, sans-serif, Apple Color Emoji,
          Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji;
        color: #111;
        background: #f0f0f0;
        font-size: 18px;
        text-align: center;
        overflow: hidden;
        padding-top: 100px;
      }
      .page {
        display: flex;
        justify-content: space-between;
        flex-direction: column;
        height: 30vh;
      }
      .header {
        font-size: 24px;
        font-weight: 400;
        margin-bottom: 0.5em;
      }
      .content div {
        margin-bottom: 0.5em;
        font-size: 16px;
      }
      a {
        color: #999;
        text-decoration: none;
        font-size: 16px;
      }
      a:hover {
        color: #3371fc;
      }

      .content a {
        color: #3371fc;
      }
    `,
    js: `
    console.log("Hello, world!");
    `,
  },
  explain: `
      - The above content is the reply JSON template.
      - Please generate a webpage code based on my description and reply to me in the format of the template I provided you.
      - Add the code to disable browser caching in the <head> section.
      - The "name" field is the name of the web page file, generated based on my description, consisting of lowercase alphabetical characters only, and should not include the file extension.
      - The "html" field is the HTML code of the webpage. Please replace '{{ name }}' with the name I mentioned in my description."
      - The "css" field is the webpage's stylesheet and should not include any references to external stylesheets.
      - The "js" field is the webpage's script and should not have any dependencies on external scripts.
      - Please generate the contents within the <body> tag of the 'html' field based on my description.
      - Please do not use any third-party libraries.
      - Please do not use any CSS frameworks.
      `,
};

/**
 * Command neo.html.Page
 * Prepare Hook: Before
 * @param {*} context
 * @param {*} messages
 */
function PageBefore(context, messages) {
  return { template: Template.data, explain: Template.explain };
}

/**
 * Command neo.html.Page
 * Prepare Hook: After
 * @param {*} context
 * @param {*} messages
 */
function PageAfter(content) {
  const response = JSON.parse(content);
  if (response.html && response.name) {
    return response;
  }
  throw new Exception("Error: data is empty.", 500);
}

/**
 * Run the command
 * yao studio run html.Page 'test' '<h1>hello</h1>' '.body{ color:"red"}' 'console.log("hello")'
 * @param {*} payload
 */
function Page(name, html, css, js) {
  const fs = new FS("dsl");
  const tmp = `${name}-${new Date().getTime()}`;
  console.log(name, tmp);

  fs.WriteFile(`/public/iframe/details/${tmp}.html`, html);
  fs.WriteFile(`/public/iframe/details/css/${tmp}.css`, css);
  fs.WriteFile(`/public/iframe/details/js/${tmp}.js`, js);

  ssWrite(`\n\n[点击查看详情 ${name}.html](/details/${tmp}.html)`);

  return {
    url: `http://localhost:5099/details/${tmp}.html`,
    path: `/details/${tmp}.html`,
    iframe: `/iframe?src=/iframe/details/${tmp}.html`,
  };
}
