function BeforeSave(payload) {
  var data = payload.material_data.data || [];
  var total_number = 0;
  var total_money = 0;
  for (var i in data) {
    var p = data[i].price || 0;
    var m = data[i].number || 0;
    total_number = total_number + m;
    data[i].total_money = (p * m).toFixed(2);
    total_money = total_money + data[i].total_money;
  }
  payload.material_data.data = data;
  payload.total_money = total_money;
  payload.total_number = total_number;

  return [payload];
}

function GetSelect() {
  var query = new Query();
  var res = query.Get({
    wheres: [{ ":deleted_at": "删除", "=": null }],
    select: ["id as value", "order_sn as label"],
    from: "purchase_order",
  });
  return res;
}

function StockBeforeSave(payload) {
  if (payload.material_data) {
    var data = payload.material_data.data || [];
    var total_number = 0;
    var total_money = 0;
    for (var i in data) {
      if (!data[i].material_id) {
        continue;
      }

      var mat = Process("models.material.find", data[i].material_id, {});
      var p = mat.price || 0;
      var m = data[i].number || 0;
      total_number = total_number + m;
      data[i].total_money = (p * m).toFixed(2);
      data[i].price = p;
      total_money = total_money + data[i].total_money;
    }
    payload.material_data.data = data;
    payload.total_money = total_money;
    payload.total_number = total_number;
  }
  payload.status = "已申请";

  return [payload];
}
function ChildStockBeforeSave(payload) {
  var order = Process("models.purchase_order_stock.find", payload.id, {});

  if (order.status != payload.status) {
    if (payload.status == "已通过") {
      // 加库存
      var data = order.material_data.data || [];
      for (var i in data) {
        if (!data[i].material_id) {
          continue;
        }
        var exists_mat = Process(
          "models.material.find",
          data[i].material_id,
          {}
        );
        var m = data[i].number || 0;
        // 更新库存
        var mat = Process("models.material.save", {
          id: data[i].material_id,
          stock: exists_mat.stock + m,
        });
      }
    } else {
      // 减库存
      var data = order.material_data.data || [];
      for (var i in data) {
        if (!data[i].material_id) {
          continue;
        }
        var exists_mat = Process(
          "models.material.find",
          data[i].material_id,
          {}
        );
        var m = data[i].number || 0;
        // 更新库存
        var mat = Process("models.material.save", {
          id: data[i].material_id,
          stock: exists_mat.stock - m,
        });
      }
    }
  }
  return [payload];
}
