function GetSelect() {
  var query = new Query();
  var res = query.Get({
    wheres: [{ ":deleted_at": "删除", "=": null }],
    select: ["id as value", "name as label"],
    from: "company",
  });
  return res;
}

/**
 * 供应商
 * @returns
 */
function GetSupplier() {
  var query = new Query();
  var res = query.Get({
    wheres: [
      { ":deleted_at": "删除", "=": null },
      { ":type": "类型", "=": "外部" },
    ],
    select: ["id as value", "name as label"],
    from: "company",
  });
  return res;
}
