function AfterSearch(data) {
  for (var i in data.data) {
    if (data.data[i].department && data.data[i].department.length) {
      data.data[i].department = data.data[i].department.join("，");
    }
  }
  return data;
}
