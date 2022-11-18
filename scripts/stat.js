/**
 * before:data hook
 * @param {*} params
 * @returns
 */
function BeforeData(params) {
  log.Info("[chart] before data hook: %s", JSON.stringify(params));
  return [params];
}

/**
 * after:data hook
 * @param {*} data
 * @returns
 */
function AfterData(data) {
  log.Info("[chart] after data hook: %s", JSON.stringify(data));
  return data;
}

/**
 * Get Data
 * @param {*} params
 */
function Data(params) {
  var query = new Query();
  var project = query.Get({
    wheres: [{ ":deleted_at": "删除", "=": null }],
    select: [":COUNT(id) as num"],
    from: "project",
  });
  var p_num = 0;
  if (project && project.length) {
    p_num = project[0].num;
  }

  // 合同数量
  var contract = query.Get({
    wheres: [{ ":deleted_at": "删除", "=": null }],
    select: [":COUNT(id) as num"],
    from: "contract",
  });
  var c_num = 0;
  if (contract && contract.length) {
    c_num = contract[0].num;
  }
  // 员工数量
  var user = query.Get({
    wheres: [{ ":deleted_at": "删除", "=": null }],
    select: [":COUNT(id) as num"],
    from: "user",
  });
  var u_num = 0;
  if (user && user.length) {
    u_num = user[0].num;
  }
  // 部门数量
  var depart = query.Get({
    wheres: [{ ":deleted_at": "删除", "=": null }],
    select: [":COUNT(id) as num"],
    from: "department",
  });
  var d_num = 0;
  if (depart && depart.length) {
    d_num = depart[0].num;
  }
  // 预算产值,累计产值,累计收款,累计欠款
  var money = query.Get({
    wheres: [{ ":deleted_at": "删除", "=": null }],
    select: [
      ":SUM(budget_money) as budget_money",
      ":SUM(acu_money) as acu_money",
      ":SUM(collect_money) as collect_money",
      ":SUM(owe_money) as owe_money",
      ":date_format(created_at, '%Y-%m-%d') as times",
    ],
    from: "contract_finance",
    groups: "times",
  });
  // console.log(money);
  var budget_money = [];
  var acu_money = [];
  var collect_money = [];
  var owe_money = [];
  if (money && money.length) {
    for (var i in money) {
      budget_money.push({
        value: (money[i]["budget_money"] / 10000).toFixed(2),
        date: money[i]["times"],
      });
      acu_money.push({
        value: (money[i]["acu_money"] / 10000).toFixed(2),
        date: money[i]["times"],
      });
      collect_money.push({
        value: (money[i]["collect_money"] / 10000).toFixed(2),
        date: money[i]["times"],
      });
      owe_money.push({
        value: (money[i]["owe_money"] / 10000).toFixed(2),
        date: money[i]["times"],
      });
    }
  } else {
    budget_money.push({
      value: 0,
      date: "2022-11-01",
    });
    acu_money.push({
      value: 0,
      date: "2022-11-01",
    });
    collect_money.push({
      value: 0,
      date: "2022-11-01",
    });
    owe_money.push({
      value: 0,
      date: "2022-11-01",
    });
  }

  // 合同金额

  var c_money = query.Get({
    wheres: [{ ":deleted_at": "删除", "=": null }],
    select: ["name as status", "total_money as count"],
    from: "contract",
  });
  //console.log(c_money);
  // 项目状态
  var p_ststus = query.Get({
    wheres: [{ ":deleted_at": "删除", "=": null }],
    select: [":COUNT(id) as count", "status as status"],
    groups: "status",
    from: "project",
    limit: 10,
  });
  console.log(p_ststus);

  //==============================================================
  log.Info("[chart] process data query: %s", JSON.stringify(params));
  return {
    income: [
      { value: 40300, date: "2022-1-1" },
      { value: 50800, date: "2022-2-1" },
      { value: 31300, date: "2022-3-1" },
      { value: 48800, date: "2022-4-1" },
      { value: 69900, date: "2022-5-1" },
      { value: 37800, date: "2022-6-1" },
    ],
    cost: [
      { value: 28100, date: "2022-1-1" },
      { value: 23000, date: "2022-2-1" },
      { value: 29300, date: "2022-3-1" },
      { value: 26700, date: "2022-4-1" },
      { value: 26400, date: "2022-5-1" },
      { value: 31200, date: "2022-6-1" },
    ],
    rate: [
      { value: 8.0, date: "2022-1-1" },
      { value: 7.6, date: "2022-2-1" },
      { value: 9.1, date: "2022-3-1" },
      { value: 8.4, date: "2022-4-1" },
      { value: 6.9, date: "2022-5-1" },
      { value: 9.0, date: "2022-6-1" },
    ],
    pet_count: 54,
    pet_type: 8,
    income_monthly: 68900,
    doctor_count: 23,
    prev_pet_count: { current: 54, prev: 45 },
    prev_pet_type: { current: 8, prev: 13 },
    prev_income_monthly: { current: 68900, prev: 92000 },
    prev_doctor_count: { current: 23, prev: 27 },
    datasource_type: [
      { type: "猫猫", count: 18 },
      { type: "狗狗", count: 6 },
      { type: "其他", count: 3 },
    ],
    datasource_status: [
      { status: "已查看", count: 3 },
      { status: "治疗中", count: 12 },
      { status: "已治愈", count: 9 },
    ],
    datasource_cost: [
      { name: "毛毛", stay: 3, cost: 2000 },
      { name: "阿布", stay: 6, cost: 4200 },
      { name: "咪咪", stay: 7, cost: 6000 },
      { name: "狗蛋", stay: 1, cost: 1000 },
    ],

    // 项目数量
    project_count: p_num,
    // 合同数量
    contract_count: c_num,

    // 用户
    user_count: u_num,
    //部门数量
    department_count: d_num,
    // 累计产值
    budget_money: budget_money,
    acu_money: acu_money,
    collect_money: collect_money,
    owe_money: owe_money,
    contract_money: c_money,
    project_status: p_ststus,
  };
}

/**
 * Compute out
 * @param {*} field
 * @param {*} value
 * @param {*} data
 * @returns
 */
function Income(field, value, data) {
  log.Info(
    "[chart] Income Compute: %s",
    JSON.stringify({ field: field, value: value, data: data })
  );
  return value;
}

function Finance(params) {
  // 现有资金money_count
  var query = new Query();
  var money_count = query.Get({
    wheres: [{ ":deleted_at": "删除", "=": null }],
    select: [":SUM(total_money) as num"],
    from: "account",
  });
  var p_num = 0;
  if (money_count && money_count.length) {
    p_num = money_count[0].num;
  }

  // 债权/债务未回款金额debt_count
  var debt_count = query.Get({
    wheres: [{ ":deleted_at": "删除", "=": null }],
    select: [":SUM(total_money) as num"],
    from: "debt",
  });
  var c_num = 0;
  if (debt_count && debt_count.length) {
    c_num = debt_count[0].num;
  }
  // 工资
  var salary_count = query.Get({
    wheres: [{ ":deleted_at": "删除", "=": null }],
    select: [":SUM(total_money) as num"],
    from: "salary",
  });
  var u_num = 0;
  if (salary_count && salary_count.length) {
    u_num = salary_count[0].num;
  }

  // 资金流水fund_turnover_count
  var depart = query.Get({
    wheres: [{ ":deleted_at": "删除", "=": null }],
    select: [":SUM(total_money) as num"],
    from: "fund_turnover",
  });
  var d_num = 0;
  if (depart && depart.length) {
    d_num = depart[0].num;
  }
  // 预计增值税incr_tax
  var pre_incr_tax = query.Get({
    wheres: [{ ":deleted_at": "删除", "=": null }],
    select: [":SUM(pre_incr_tax) as num"],
    from: "tax",
  });
  var pre_incr_tax_num = 0;
  if (pre_incr_tax && pre_incr_tax.length) {
    pre_incr_tax_num = pre_incr_tax[0].num;
  }

  // 预计附加税额
  var add_tax = query.Get({
    wheres: [{ ":deleted_at": "删除", "=": null }],
    select: [":SUM(pre_add_tax) as num"],
    from: "tax",
  });
  var add_tax_num = 0;
  if (add_tax && add_tax.length) {
    add_tax_num = add_tax[0].num;
  }

  return {
    money_count: Number(p_num),
    debt_count: Number(c_num),
    salary_count: Number(u_num),
    fund_turnover_count: Number(d_num),
    incr_tax: Number(pre_incr_tax_num),
    add_tax: Number(add_tax_num),
  };
}
