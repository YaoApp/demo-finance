/**
 * Search personal data in the vendor database
 */

function Match(context, messages) {
  console.log(context, messages);
  return [
    {
      role: "system",
      content: `{"name":"test.pdf", "url":"https://www.google.com"}`,
    },
    {
      role: "system",
      content: `
      - The above content is my knowledge base.
      - Please prioritize answering user questions based on my knowledge base provided to you.
     `,
    },
  ];
}
