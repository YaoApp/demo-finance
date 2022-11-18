/**
 * 部门下拉选项
 * @param {*} query
 * @returns
 */
function GetSelect(query) {
  var wheres = [{ ":deleted_at": "删除", "=": null }];
  if (query && query.id) {
    var exists = Process("models.contact.department.find", query.id, {});
    if (exists && exists.id) {
      wheres.push({ ":id": "主键", "<>": query.id });
      wheres.push({ ":parent_id": "父级", "=": exists.parent_id });
    }
  }
  var query = new Query();
  var res = query.Get({
    select: ["id as value", "name as label"],
    wheres: wheres,
    from: "department",
  });
  return res;
}

/**
 * 部门树形列表结构
 * @param {*} data
 * @returns
 */
function Department(data) {
  var wheres = data.wheres;
  var pu = {};
  for (var i in wheres) {
    if (wheres[i].column == "name") {
      pu = {
        ":department.name": "名称",
        like: "%" + wheres[i].value + "%",
      };
    }
  }
  var search = [{ ":department.deleted_at": "删除", "=": null }];
  if (pu && pu != null) {
    search.push(pu);
  }

  var query = new Query();
  var cate = query.Get({
    debug: true,
    select: [
      "department.id",
      "department.order",
      "department.name",
      "department.parent_id",
      "parent.name as parent_name",
    ],
    wheres: search,
    from: "department",
    joins: [
      {
        left: true,
        from: "department as parent",
        key: "parent.id",
        foreign: "department.parent_id",
      },
    ],
    limit: 1000,
  });
  res = Process("xiang.helper.ArrayTree", cate, {
    parent: "parent_id",
    empty: null,
  });
  var data = {
    data: res,
  };
  return data;
}
function Select() {
  var query = new Query();
  var res = query.Get({
    wheres: [{ ":deleted_at": "删除", "=": null }],
    select: ["id as value", "name as label"],
    from: "department",
  });
  return res;
}
function TagSelect() {
  var query = new Query();
  var res = query.Get({
    wheres: [{ ":deleted_at": "删除", "=": null }],
    select: ["name as label"],
    from: "department",
  });
  for (var i in res) {
    res[i].value = res[i].label;
  }
  return res;
}
