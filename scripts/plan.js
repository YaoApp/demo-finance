/**
 * 部门树形列表结构
 * @param {*} data
 * @returns
 */
function Tree(data) {
  var wheres = data.wheres;

  console.log(wheres);
  var search = [{ ":plan.deleted_at": "删除", "=": null }];
  for (var i in wheres) {
    if (wheres[i].column == "name") {
      search.push({
        ":plan.name": "名称",
        like: "%" + wheres[i].value + "%",
      });
    }
    if (wheres[i].column == "project_id") {
      search.push({
        ":plan.project_id": "项目",
        in: [wheres[i].value],
      });
    }
  }

  var query = new Query();
  var cate = query.Get({
    debug: true,
    select: [
      "plan.id",
      "plan.users",
      "plan.project_id",
      "plan.user_id",
      "plan.order",
      "plan.name",
      "plan.plan_sn",
      "plan.type",
      "plan.total_number",
      "plan.status",
      "plan.total_money",
      "plan.start_time",
      "plan.end_time",
      "plan.actual_time",
      "plan.parent_id",
      "plan.progress",
      "plan.department",
      // "parent.name as parent_name",
      // "user.name as user_name",
      "project.name as project_name",
    ],
    wheres: search,
    from: "plan",
    joins: [
      // {
      //   left: true,
      //   from: "plan as parent",
      //   key: "parent.id",
      //   foreign: "plan.parent_id",
      // },
      // {
      //   left: true,
      //   from: "user as user",
      //   key: "user.id",
      //   foreign: "plan.user_id",
      // },
      {
        left: true,
        from: "project as project",
        key: "project.id",
        foreign: "plan.project_id",
      },
    ],
    limit: 1000,
  });
  for (var j in cate) {
    if (cate[j].users) {
      var temp = JSON.parse(cate[j].users);
      cate[j].users = temp.join(",");
    }
    if (cate[j].department) {
      var temp2 = JSON.parse(cate[j].department);
      cate[j].department = temp2.join(",");
    }
  }
  res = Process("xiang.helper.ArrayTree", cate, {
    parent: "parent_id",
    empty: null,
  });
  var data = {
    data: res,
  };
  return data;
}
function GetSelect() {
  var query = new Query();
  var res = query.Get({
    wheres: [{ ":deleted_at": "删除", "=": null }],
    select: ["id as value", "name as label"],
    from: "plan",
  });
  return res;
}

function Find(payload) {
  // console.log("进入find");
  // console.log(payload);
  var id = parseInt(payload);
  // var data = Process("models.plan.find", id, {});
  //delete data.id
  //data.parent_id =
  return {
    parent_id: id,
  };
}
function BeforeSave(payload) {
  var data = Process("models.plan.find", payload.id, {});
  payload.project_id = data.project_id;

  delete payload.id;
  return [payload];
}

function ShowTableFind(payload) {
  var project_id = payload;
  return {
    id: project_id,
    project_id: project_id,
  };
}
