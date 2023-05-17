/**
 * Template module
 */
const Template = {
  data: {
    name: "Pet",
    table: { name: "pet" },
    columns: [
      { label: "ID", name: "id", type: "ID" },
      {
        label: "Name",
        name: "name",
        type: "string",
        length: 256,
        index: true,
        nullable: true,
        Searchable: true,
        Component: {
          table: { view: "Text", edit: "Input" },
          form: { view: "Text", edit: "Input" },
        },
      },
    ],
  },
  explain: `
    - The above content is the JSON template.
    - The JSON template is used to generate the module.
    - The field "name" is a module name.
    - The field "table" is a table, the table "name" is used to generate the table in database.
    - The field "columns" is a array, each element is a column of table.
    - The field "label" is a column label, the label is used to display in table and form.
    - The field "name" is a column name, the name is used to generate the column in database.
    - The field "type" is a column type, the type is used to generate the column in database. Should be one of "string", "text", "integer", "date", "datetime", "ID".
    - The field "length" is a column length, the length is used to generate the column in database.
    - The field "index" is a column index, the index is used to generate the column in database.
    - The field "nullable" is a column nullable, the nullable is used to generate the column in database.
    - The field "Searchable" is a column Searchable, the Searchable is used to generate the column in database.
    - The field "Component" is a column Component, the Component is used to generate the column in database.
    - The field "form" is description of the Form interface display.
    - The field "table" is description of the Table interface display.
    - The field "view" is a column view, the view is used to generate the column in database. Should be one of "Text", "Tag".
    - The field "edit" is a column edit, the edit is used to generate the column in database. should be one of "Input", "Select".
  `,
};

/**
 * Command neo.module.create
 * Prepare Hook: Before
 * @param {*} context
 * @param {*} messages
 */
function CreateBefore(context, messages) {
  return { template: Template.data, explain: Template.explain };
}

/**
 * Command neo.module.create
 * Prepare Hook: After
 * @param {*} content
 */
function CreateAfter(content) {
  // console.log("DataAfter:", content);
  const response = JSON.parse(content);
  const columns = response.columns || [];
  console.log(columns);

  if (columns.length > 0) {
    // Print data preview
    ssWrite(`\r\n| label | name | type | Searchable | Table | Form |\n`);
    ssWrite(`| ----- | ---- | ---- | ---------- | ----- | ---- |\n`);
    columns.forEach((item) => {
      console.log(item);
      component = item.Component || {};
      table = component.table || {};
      form = component.form || {};
      message = `| ${item.label} |  ${item.name} |  ${item.type} | ${
        item.Searchable || ""
      } | ${table.view || ""} ${table.edit || ""} | ${form.edit || ""} |\n`;
      ssWrite(message);
    });
    ssWrite(`  \n\n`);
    return { data: response };
  }

  console.log(content);
  throw new Exception("Error: data is empty.", 500);
}

// the following code is used to test generate the module
const testData = {
  columns: [
    { label: "ID", name: "id", type: "ID" },
    {
      Component: {
        form: { edit: "Input", view: "Text" },
        table: { edit: "Input", view: "Text" },
      },
      Searchable: true,
      index: true,
      label: "Customer Name",
      length: 256,
      name: "customer_name",
      nullable: true,
      type: "string",
    },
    {
      Component: {
        form: { edit: "Input", view: "Text" },
        table: { edit: "Input", view: "Text" },
      },
      Searchable: true,
      index: true,
      label: "Product Name",
      length: 256,
      name: "product_name",
      nullable: true,
      type: "string",
    },
    {
      Component: {
        form: { edit: "Input", view: "Text" },
        table: { edit: "Input", view: "Text" },
      },
      Searchable: true,
      index: true,
      label: "Quantity",
      length: 256,
      name: "quantity",
      nullable: true,
      type: "integer",
    },
    {
      Component: {
        form: { edit: "Input", view: "Text" },
        table: { edit: "Input", view: "Text" },
      },
      Searchable: true,
      index: true,
      label: "Price",
      length: 256,
      name: "price",
      nullable: true,
      type: "integer",
    },
  ],
  name: "Order",
  table: { name: "order" },
};

/**
 * Run the command
 * yao studio run module.create
 * @param {*} payload
 */
function Create(payload) {
  // payload = testData;
  validate(payload);
  saveModel(payload);
  saveTable(payload);
  saveForm(payload);

  // Reload
  let id = payload.table.name;
  let ex = load(id);
  if (ex) {
    console.log(ex, ex.message);
    throw new Exception(ex.message, 500);
  }

  // model migrage
  ex = migrateModel(id);
  if (ex) {
    console.log(ex, ex.message);
    // throw new Exception(ex.message, 500);
  }

  return { path: `/x/Table/${payload.table.name}`, name: payload.table.name };
}

/**
 * Validate the payload
 * @param {*} data
 */
function validate(data) {
  if (!data) {
    throw new Exception("Error: data is empty.", 500);
  }

  // @Todo: Validate the data structure
  // ...
}

function saveModel(data) {
  let id = data.table.name;
  let option = { timestamps: true, soft_deletes: true };
  let model = {
    name: data.name,
    table: data.table,
    columns: [],
    option: option,
  };

  data.columns.forEach((item) => {
    model.columns.push({
      name: item.name,
      label: item.label,
      type: item.type,
      length: item.length,
      index: item.index,
      nullable: item.nullable,
    });
  });

  let dsl = new FS("dsl");
  dsl.WriteFile(`/models/${id}.mod.yao`, JSON.stringify(model));
}

function saveTable(data) {
  let id = data.table.name;
  let filterActions = [
    {
      title: `New ${data.name}`,
      icon: "icon-plus",
      action: [
        {
          name: "OpenModal",
          type: "Common.openModal",
          payload: { width: 900, Form: { type: "edit", model: id } },
        },
      ],
    },
  ];

  let operation = {
    actions: [
      {
        title: "View",
        icon: "icon-eye",
        disabled: { bind: "{{id}}", value: ["1", "2"] },
        action: [
          {
            name: "OpenModal",
            type: "Common.openModal",
            payload: { width: 640, Form: { type: "view", model: id } },
          },
        ],
      },
      {
        title: "Edit",
        icon: "icon-edit-2",
        action: [
          {
            name: "OpenModal",
            type: "Common.openModal",
            payload: { width: "50vw", Form: { type: "edit", model: id } },
          },
        ],
      },
      {
        title: "Delete",
        icon: "icon-trash-2",
        action: [
          {
            name: "Confirm",
            type: "Common.confirm",
            payload: {
              title: "Confirm",
              desc: "Please confirm to delete this record.",
            },
          },
          { name: "Delete", type: "Table.delete", payload: {} },
        ],
        style: "danger",
      },
    ],
  };

  let table = {
    name: data.name,
    action: { bind: { model: id, option: {} } },
    layout: {
      primary: "id",
      header: { preset: {} },
      filter: { columns: [], actions: filterActions },
      table: { columns: [], operation: operation, props: {} },
    },
    fields: { filter: {}, table: {} },
  };

  // data foreach
  data.columns.forEach((item) => {
    if (!item.Component || !item.Component.table) {
      return;
    }

    let component = item.Component.table;

    // table columns
    table.layout.table.columns.push({ name: item.label });
    table.fields.table[item.label] = TableComponent(item, component);
    // {
    //   bind: item.name,
    //   view: { type: component.view, props: {} },
    //   edit: { type: component.edit, props: { placeholder: item.label } },
    // };

    // table filter
    if (!item.Searchable) {
      return;
    }
    op = item.type == "string" ? "match" : "eq";
    table.layout.filter.columns.push({ name: item.label, width: 4 });
    table.fields.filter[item.label] = {
      bind: `where.${item.name}.${op}`,
      edit: { type: "Input", props: { placeholder: item.label } },
    };
  });

  let dsl = new FS("dsl");
  dsl.WriteFile(`/tables/${id}.tab.yao`, JSON.stringify(table));
}

function TableComponent(item, component) {
  var default_component = {
    bind: item.name,
    view: { type: component.view, props: {} },
    edit: { type: component.edit, props: { placeholder: item.label } },
  };
  switch (item.type) {
    case "string":
      return default_component;
    case "datetime":
      default_component["edit"]["type"] = "DatePicker";
      return default_component;
    case "date":
      default_component["edit"]["type"] = "DatePicker";
      return default_component;
    case "integer":
      default_component["edit"]["props"]["type"] = "number";
      return default_component;
    case "boolean":
      default_component["view"]["type"] = "Switch";
      default_component["view"]["props"] = {
        checkedValue: 1,
        unCheckedValue: 0,
        checkedChildren: "open",
        unCheckedChildren: "close",
      };
      default_component["edit"]["type"] = "RadioGroup";
      default_component["edit"]["props"] = {
        options: [
          {
            value: 1,
            label: "open",
          },
          {
            value: 0,
            label: "close",
          },
        ],
      };
      return default_component;
    default:
      return default_component;
  }
}

function saveForm(data) {
  let id = data.table.name;
  let actions = [
    {
      title: "Save",
      icon: "icon-check",
      style: "primary",
      showWhenAdd: true,
      action: [
        { name: "Submit", type: "Form.submit", payload: {} },
        { name: "Back", type: "Common.closeModal", payload: {} },
      ],
    },
    {
      title: "Delete",
      icon: "icon-trash-2",
      style: "danger",
      divideLine: true,
      action: [
        {
          name: "Confirm",
          type: "Common.confirm",
          payload: {
            title: "Confirm",
            desc: "Please confirm to delete this record.",
          },
        },
        { name: "Delete", type: "Form.delete", payload: {} },
        { name: "Back", type: "Common.closeModal", payload: {} },
      ],
    },
    {
      title: "Back",
      icon: "icon-arrow-left",
      showWhenAdd: true,
      showWhenView: true,
      action: [{ name: "CloseModal", type: "Common.closeModal", payload: {} }],
    },
  ];

  let form = {
    name: data.name,
    action: { bind: { model: id, option: {} } },
    layout: {
      primary: "id",
      actions: actions,
      form: { props: {}, sections: [{ columns: [] }] },
    },
    fields: { form: {} },
  };

  // data foreach
  data.columns.forEach((item) => {
    if (!item.Component || !item.Component.form) {
      return;
    }

    let component = item.Component.form;

    // form columns
    form.layout.form.sections[0].columns.push({ name: item.label, width: 12 });
    form.fields.form[item.label] = TableComponent(item, component);
    //  {
    //   bind: item.name,
    //   edit: { type: component.edit, props: { placeholder: item.label } },
    // };
  });

  let dsl = new FS("dsl");
  dsl.WriteFile(`/forms/${id}.form.yao`, JSON.stringify(form));
}

/**
 * Reload
 * @param {*} id
 */
function load(id) {
  err = Process(`models.${id}.Load`, `/models/${id}.mod.yao`);
  if (err) {
    return err;
  }

  err = Process(`yao.table.Load`, `/tables/${id}.tab.yao`);
  if (err) {
    return err;
  }

  err = Process(`yao.form.Load`, `/forms/${id}.form.yao`);
  if (err) {
    return err;
  }
}

/**
 * Migrate model
 * @param {*} id
 */
function migrateModel(id) {
  return Process(`models.${id}.migrate`);
}
