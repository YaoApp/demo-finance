function User() {
  Process("models.contact.user.save", {
    email: "xiang@iqka.com",
    name: "xiang@iqka.com",
    mobile: "15011111111",
    department_id: 1,
    en_name: "xiang@iqka.com",
    gender: "未知",
    password: "A123456p+",
    status: "启用",
  });
}
function Department() {
  Process(
    "models.contact.department.insert",
    ["id", "name"],
    [
      ["1", "行政人事部"],
      ["2", "计划财务部"],
      ["3", "商务合约部"],
      ["4", "工程项目部"],
      ["5", "工程质安部"],
      ["6", "工程物资部"],
    ]
  );
}
