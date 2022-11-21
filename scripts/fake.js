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
  Process(
    "models.company.insert",
    ["id", "name", "kind", "type", "user_name", "mobile"],
    [
      [1, "北京甲方科技大厦", "总包单位", "内部", "王五", "15041258541"],
      [2, "北京内建工程有限公司", "专业分包", "外部", "李三", "15041256038"],
      [3, "北京内金建材有限公司", "专业分包", "外部", "王五", "15041256039"],
      [4, "城东外部商砼有限公司", "专业分包", "外部", "赵六", "15041256040"],
      [5, "北京内石建材有限公司", "专业分包", "外部", "钱七", "15041256041"],
      [6, "北京内机设备有限公司", "专业分包", "外部", "孙八", "15041256042"],
      [7, "北京内工劳务有限公司", "专业分包", "外部", "周久", "15041256043"],
      [8, "北京总包工程有限公司", "总包单位", "内部", "郑十", "15041256044"],
    ]
  );
  Process("models.project.save", {
    address: "北京市海定区",
    introduction: "给城市排水功能",
    mobile: "15041257451",
    name: "城市排水项目",
    project_sn: "XM_001",
    remark: "暂无备注",
    user_id: 1,
  });
  Process("models.project.save", {
    address: "北京市丰台区",
    introduction: "地铁4号线",
    mobile: "15041257452",
    name: "地铁4号线",
    project_sn: "XM_002",
    remark: "暂无备注",
    user_id: 1,
  });
  Process(
    "models.finance_system.account.insert",
    [
      "id",
      "name",
      "bank",
      "account",
      "address",
      "detail",
      "bank_no",
      "total_money",
      "add_time",

      "status",
      "type",
    ],
    [
      [
        1,
        "中国银行",
        "中国银行",
        "624477844864646546",
        "上海徐汇区中国银行",
        "上海徐汇区银行街道中国银行",
        "1512111",
        100,
        "2022-11-18 11:46:03",
        "正常",
        "企业",
      ],
      [
        2,
        "中国建设银行",
        "中国建设银行",
        "624477844864646547",
        "上海徐汇区中国建设银行",
        "上海徐汇区银行街道中国建设银行",
        "1512112",
        100,
        "2022-11-18 11:46:03",
        "正常",
        "企业",
      ],
      [
        3,
        "中国招商银行",
        "中国招商银行",
        "624477844864646548",
        "上海徐汇区中国招商银行",
        "上海徐汇区银行街道中国招商银行",
        "1512113",
        100,
        "2022-11-18 11:46:03",
        "正常",
        "企业",
      ],
      [
        4,
        "中国交通银行",
        "中国交通银行",
        "624477844864646549",
        "上海徐汇区中国交通银行",
        "上海徐汇区银行街道中国交通银行",
        "1512115",
        100,
        "2022-11-18 11:46:03",
        "正常",
        "企业",
      ],
    ]
  );
  Process(
    "models.finance_system.debt.insert",
    [
      "id",
      "project_id",
      "user_id",
      "company_id",
      "debt_company_id",
      "type",
      "total_money",
      "kind",
    ],
    [
      [1, 1, 1, 1, 1, "现金", 1000, "债权"],
      [2, 1, 1, 1, 1, "现金", 1000, "债权"],
      [3, 1, 1, 1, 1, "现金", 1000, "债权"],
      [4, 1, 1, 1, 1, "现金", 1000, "债务"],
      [5, 1, 1, 1, 1, "现金", 1000, "债务"],
      [6, 1, 1, 1, 1, "现金", 1000, "债务"],
    ]
  );
  Process(
    "models.finance_system.salary.insert",
    [
      "id",
      "user_id",
      "department_name",
      "pre_tax",
      "social_money",
      "acc_money",
      "pperson_tax",
      "after_tax",
      "month_award",
      "work_time",
      "subsidy",
      "year_bonus",
      "year_tax",
      "topic_money",
      "leave",
      "other",
      "total_money",
      "days",
      "add_time",
    ],
    [
      [
        1,
        1,
        "行政人事部",
        1000,
        150,
        150,
        200,
        800,
        100,
        0,
        200,
        0,
        0,
        0,
        0,
        0,
        1100,
        22.5,
        "2022-07-18 11:51:36",
      ],
      [
        2,
        1,
        "行政人事部",
        1000,
        150,
        150,
        200,
        800,
        100,
        0,
        200,
        0,
        0,
        0,
        0,
        0,
        1100,
        22.5,
        "2022-07-18 11:51:36",
      ],
      [
        3,
        1,
        "行政人事部",
        1000,
        150,
        150,
        200,
        800,
        100,
        0,
        200,
        0,
        0,
        0,
        0,
        0,
        1100,
        22.5,
        "2022-07-18 11:51:36",
      ],
    ]
  );
  Process(
    "models.finance_system.tax.insert",
    [
      "id",
      "project_id",
      "contract_type",
      "type",
      "pay_way",
      "pre_incr_tax",
      "pre_add_tax",
      "add_time",
    ],
    [
      [1, 1, "销售合同", "主机", "贷款", 15000, 411, "2022-01-20 03:08:14"],
      [2, 1, "销售合同", "主机", "贷款", 15001, 412, "2022-01-20 03:08:14"],
      [3, 1, "销售合同", "主机", "贷款", 15002, 413, "2022-01-20 03:08:14"],
      [4, 1, "销售合同", "主机", "贷款", 15003, 414, "2022-01-20 03:08:14"],
      [5, 1, "采购合同", "主机", "贷款", 15004, 415, "2022-01-20 03:08:14"],
      [6, 1, "采购合同", "主机", "贷款", 15005, 416, "2022-01-20 03:08:14"],
      [7, 1, "采购合同", "主机", "贷款", 15006, 417, "2022-01-20 03:08:14"],
      [8, 1, "采购合同", "主机", "贷款", 15007, 418, "2022-01-20 03:08:14"],
    ]
  );
}
function Data() {
  User();
  Department();
}
