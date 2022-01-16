export const formatPrice = (num) => {
  return new Intl.NumberFormat("zh-Hans-CN", {
    style: "currency",
    currency: "CNY",
  }).format((num / 100) * 6);
};

export const getUniqueValues = (data, type) => {
  let result = data.map((item) => item[type]);
  if (type === "colors") {
    result = result.flat();
  }
  return ["all", ...new Set(result)];
};
