function AfterSearch(data) {
  var temp = data.data;
  for (var i in temp) {
    if (temp[i].debt_company_id > 0) {
      temp[i].debt_company = Process(
        "models.company.find",
        temp[i].debt_company_id,
        {}
      );
    } else {
      temp[i].second = {};
    }
  }
  data.data = temp;
  return data;
}
