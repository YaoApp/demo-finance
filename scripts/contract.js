function AfterSearch(data) {
  var temp = data.data;
  for (var i in temp) {
    if (temp[i].second_company_id > 0) {
      temp[i].second = Process(
        "models.company.find",
        temp[i].second_company_id,
        {}
      );
    } else {
      temp[i].second = {};
    }
  }
  data.data = temp;
  return data;
}

function ChildFind(payload) {
  //var project = Process("models.project.find", payload, {});
  // 这个id是项目的id
  return {
    id: payload,
  };
}
function FinanceAfterSearch(data) {
  var temp = data.data;
  for (var i in temp) {
    if (temp[i].out_company_id > 0) {
      temp[i].second = Process(
        "models.company.find",
        temp[i].out_company_id,
        {}
      );
    } else {
      temp[i].second = {};
    }
  }
  data.data = temp;
  return data;
}
function GetSelect() {
  var query = new Query();
  var res = query.Get({
    wheres: [{ ":deleted_at": "删除", "=": null }],
    select: ["id as value", "name as label"],
    from: "contract",
  });
  return res;
}
