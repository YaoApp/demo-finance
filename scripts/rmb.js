/**
 *yao run scripts.rmb.convertCurrency 10038.56
 * @param {} num
 * @returns
 */
function convertCurrency(num) {
  //转成人民币大写金额形式
  var str1 = "零壹贰叁肆伍陆柒捌玖"; //0-9所对应的汉字
  var str2 = "万仟佰拾亿仟佰拾万仟佰拾元角分"; //数字位所对应的汉字
  var str3; //从原num值中取出的值
  var str4; //数字的字符串形式
  var str5 = ""; //人民币大写金额形式
  var i; //循环变量
  var j; //num的值乘以100的字符串长度
  var ch1; //数字的汉语读法
  var ch2; //数字位的汉字读法
  var nzero = 0; //用来计算连续的零值是几个
  num = Math.abs(num).toFixed(2); //将num取绝对值并四舍五入取2位小数
  str4 = (num * 100).toFixed(0).toString(); //将num乘100并转换成字符串形式
  j = str4.length; //找出最高位
  if (j > 15) {
    return "溢出";
  }
  str2 = str2.substr(15 - j); //取出对应位数的str2的值。如：200.55,j为5所以str2=佰拾元角分
  //循环取出每一位需要转换的值
  for (i = 0; i < j; i++) {
    //取出需转换的某一位的值
    str3 = str4.substr(i, 1);
    if (i != j - 3 && i != j - 7 && i != j - 11 && i != j - 15) {
      //当所取位数不为元、万、亿、万亿上的数字时
      if (str3 == "0") {
        ch1 = "";
        ch2 = "";
        nzero = nzero + 1;
      } else {
        if (str3 != "0" && nzero != 0) {
          ch1 = "零" + str1.substr(str3 * 1, 1);
          ch2 = str2.substr(i, 1);
          nzero = 0;
        } else {
          ch1 = str1.substr(str3 * 1, 1);
          ch2 = str2.substr(i, 1);
          nzero = 0;
        }
      }
    } else {
      //该位是万亿，亿，万，元位等关键位
      if (str3 != "0" && nzero != 0) {
        ch1 = "零" + str1.substr(str3 * 1, 1);
        ch2 = str2.substr(i, 1);
        nzero = 0;
      } else {
        if (str3 != "0" && nzero == 0) {
          ch1 = str1.substr(str3 * 1, 1);
          ch2 = str2.substr(i, 1);
          nzero = 0;
        } else {
          if (str3 == "0" && nzero >= 3) {
            ch1 = "";
            ch2 = "";
            nzero = nzero + 1;
          } else {
            if (j >= 11) {
              ch1 = "";
              nzero = nzero + 1;
            } else {
              ch1 = "";
              ch2 = str2.substr(i, 1);
              nzero = nzero + 1;
            }
          }
        }
      }
    }
    if (i == j - 11 || i == j - 3) {
      //如果该位是亿位或元位，则必须写上
      ch2 = str2.substr(i, 1);
    }
    str5 = str5 + ch1 + ch2;
    if (i == j - 1 && str3 == "0") {
      //最后一位（分）为0时，加上“整”
      str5 = str5 + "整";
    }
  }
  if (num == 0) {
    str5 = "零元整";
  }
  if (str5.indexOf("分") == -1) {
    if (str5.indexOf("拾元零") > 0) {
      str5 = str5.replace("拾元零", "拾元");
    }
  }
  return str5;
}

function AfterSearch(data) {
  var temp = data.data;
  for (var i in temp) {
    if (temp[i].audit_id > 0) {
      temp[i].audit = Process("models.contact.user.find", temp[i].audit_id, {});
    } else {
      temp[i].audit = {};
    }
  }
  data.data = temp;
  return data;
}
function BeforeSave(payload) {
  payload.rmb_string = convertCurrency(payload.total_money);
  return [payload];
}
