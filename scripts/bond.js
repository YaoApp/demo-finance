function BackBeforeSave(payload) {
  payload.status = "已退还";
  payload.left_money = payload.total_money - payload.back_money;
  if (!payload.back_date) {
    payload.back_date = GetNow();
  }
  return [payload];
}
function GetNow() {
  const yy = new Date().getFullYear();
  const MM =
    new Date().getMonth() + 1 < 10
      ? "0" + (new Date().getMonth() + 1)
      : new Date().getMonth() + 1;
  const dd =
    new Date().getDate() < 10
      ? "0" + new Date().getDate()
      : new Date().getDate();
  const HH =
    new Date().getHours() < 10
      ? "0" + new Date().getHours()
      : new Date().getHours();
  const mm =
    new Date().getMinutes() < 10
      ? "0" + new Date().getMinutes()
      : new Date().getMinutes();
  const ss =
    new Date().getSeconds() < 10
      ? "0" + new Date().getSeconds()
      : new Date().getSeconds();
  return yy + "-" + MM + "-" + dd + " " + HH + ":" + mm + ":" + ss;
}
