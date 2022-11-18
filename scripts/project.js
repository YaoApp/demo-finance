function GetSelect() {
  var query = new Query();
  var res = query.Get({
    wheres: [{ ":deleted_at": "删除", "=": null }],
    select: ["id as value", "name as label"],
    from: "project",
  });
  return res;
}
function BeforeSave(payload) {
  if (payload.user_id) {
    var user = Process("models.contact.user.find", payload.user_id, {
      withs: { departments: {} },
    });
    if (user && user.id) {
      payload.department_nanme = user.departments.name || "";
    }
  }
  return [payload];
}

function InitSelect() {
  var query = new Query();
  var res = query.Get({
    wheres: [{ ":deleted_at": "删除", "=": null }],
    select: ["id as value", "name as label"],
    from: "project",
  });
  return res;
}

function EstablishBeforeSave(payload) {
  var project_id = payload.project_id;
  Process("models.project.save", {
    id: project_id,
    status: "已立项",
  });
  payload.type = "立项";
  return [payload];
}
function Bid(payload) {
  if (payload.status == "已中标") {
    Process("models.project.save", {
      id: payload.project_id,
      status: "已中标",
    });
  }
  return [payload];
}

function ChildEstablishFind(payload) {
  var project_id = payload;
  var data = Process("models.project_establish.get", {
    wheres: [{ column: "project_id", value: project_id }],
  });
  if (data && data.length) {
    return data[0];
  }
  project_id = parseInt(project_id);
  return { project_id: project_id };
}
