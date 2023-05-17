/**
 * Table model
 */
const Templates = {
  "/x/Table/pet": {
    data: [
      {
        name: "Cookie",
        type: "cat",
        status: "checked",
        mode: "enabled",
        stay: 200,
        cost: 100,
        doctor_id: 1,
      },
    ],
    explain: `
    - The above content is the JSON template.
    - The JSON template is used to generate the table data.
    - The JSON template is an array, each element is a row of data.
    - The field "name" of the template is a pet name.
    - The field "type" of the template is the type of pet, should be one of "cat", "dog", "others".
    - The field "status" of the template is the status of pet, should be one of "checked", "curing", "cured".
    - The field "mode" of the template is the mode of pet, should be one of "enabled", "disabled".
    - The field "stay" of the template is the stay time of pet, should be a integer, the unit is second.
    - The field "cost" of the template is the cost of pet, should be a integer, the unit is dollar.
    - The field "doctor_id" of the template is the doctor id of pet, should be 1 always.
    `,
  },
};

/**
 * Command neo.table.data
 * Prepare Hook: Before
 * @param {*} context
 * @param {*} messages
 */
function DataBefore(context, messages) {
  console.log("DataBefore:", context, messages);
  context = context || { stack: "-", path: "-" };
  messages = messages || [];
  const { path } = context;
  if (path === undefined) {
    done("Error: path not found.\n");
    return false;
  }

  const tpl = Templates[path];
  if (tpl === undefined) {
    done(`Error: ${path} template not found.\n`);
    return false;
  }

  ssWrite(`Found the ${path} generate rules\n`);
  return { template: tpl.data, explain: tpl.explain };
}

/**
 * Command neo.table.data
 * Prepare Hook: After
 * @param {*} content
 */
function DataAfter(content, context) {
  console.log("DataAfter:", content, context);
  const response = JSON.parse(content);
  const data = response.data || [];
  if (data.length > 0) {
    // Print data preview
    ssWrite(`\n`);
    ssWrite(`| name | type | status | mode | stay | cost | doctor_id |\n`);
    ssWrite(`| ---- | ---- | ------ | ---- | ---- | ---- | --------- |\n`);
    data.forEach((item) => {
      message = `| ${item.name} |  ${item.type} |  ${item.status} | ${item.mode} | ${item.stay} | ${item.cost} | ${item.doctor_id}|\n`;
      ssWrite(message);
    });
    ssWrite(`  \n\n`);

    return response;
  }

  throw new Exception("Error: data is empty.", 500);
}

/**
 * Run the command
 * @param {*} payload
 */
function Data(payload, context) {
  console.log(payload, context);
  payload.forEach((item) => {
    Process("models.pet.Save", item);
  });
  return true;
}
