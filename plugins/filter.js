import Vue from "vue";

export default ({
  app
}) => {
  Vue.filter("timeFormat", function (val) {
    return val && val.split("T")[1].slice(0, 5);
  });

  Vue.filter("dateFormat", function (val) {
    return (
      val &&
      val
      .split("T")[0]
      .split("-")
      .reverse()
      .join(".")
    );
  });
  Vue.filter("priceFormat", function (val) {
    if (val >= 0) {
      let res = Intl.NumberFormat('en-US').format(val);
      res = res && res.replaceAll(',', ' ');
      return res || ''
    } else return ''
  });
  Vue.filter("status", function (val) {
    let status = val;
    switch (status) {
      case "rejected_minfin":
        status = "Rad etildi"; break;
      case "confirmed":
        status = "Tasdiqlandi"; break;
      case "approved_organizer":
        status = "Ko‘rib chiqilmoqda"; break;
    }
    return val;
  });
};

