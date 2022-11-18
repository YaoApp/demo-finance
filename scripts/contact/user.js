/**
 * 密码处理
 * @param {*} payload
 * @returns
 */
function BeforeSave(payload) {
  if (payload.id && payload.password == "******") {
    delete payload.password;
  }
  return [payload];
}
/**
 * 把密码隐藏
 * @param {*} payload
 * @returns
 */
function AfterFind(payload) {
  payload.password = "******";
  return payload;
}

/**
 * 去除密码
 * @param {*} data
 * @returns
 */
function AfterSearch(data) {
  for (var i in data.data) {
    delete data.data[i].password;
  }
  return data;
}

function GetSelect() {
  var query = new Query();
  var res = query.Get({
    wheres: [{ ":deleted_at": "删除", "=": null }],
    select: ["id as value", "name as label"],
    from: "user",
  });
  return res;
}

function NameGetSelect() {
  var query = new Query();
  var res = query.Get({
    wheres: [{ ":deleted_at": "删除", "=": null }],
    select: ["id as value", "name as label"],
    from: "user",
  });
  return res;
}
function TagSelect() {
  var query = new Query();
  var res = query.Get({
    wheres: [{ ":deleted_at": "删除", "=": null }],
    select: ["name as label"],
    from: "user",
  });
  for (var i in res) {
    res[i].value = res[i].label;
  }
  return res;
}
