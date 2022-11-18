function BeforeSave(payload) {
  var user = Process("models.contact.user.find", payload.user_id, {
    withs: { departments: {} },
  });
  if (user && user.id) {
    payload.department_name = user.departments.name || "";
  }
  //payload.add_time = payload.add_time.slice(0, 10);
  //payload.add_time = payload.add_time + " :00:00:00";
  return [payload];
}
