// 模糊查询
module.exports.fuzzySearchHandler = (key, value) => {
   if (value === undefined) return {};
   return { [key]: { $regex: value, $options: 'i' } };
};

/***
 * 将比较字符串转为可用对象
 * @param {object} numeric 查询参数，"price>10,rank>5"
 * @returns {object} 格式化后的对象，{ price: { $gt: 10 }, rank: { $gt: 5 }
 */
module.exports.numericHandler = (numeric) => {
   if (numeric === undefined) return {};
   const regEx = /\b(<|>|>=|=|<=)\b/g;
   const operatorMap = {
      '<': '$lt',
      '>': '$gt',
      '<=': '$lte',
      '>=': '$gte',
      '=': '$eq',
      '!=': '$ne',
   };
   const rules = numeric
      .replace(regEx, (match) => `-${operatorMap[match]}-`)
      .split(',');
   const obj = {};
   rules.forEach((rule) => {
      const [key, operator, value] = rule.split('-');
      obj[key] = { [operator]: Number(value) };
   });
   return obj;
};

/***
 * 格式化query参数
 * @param {string} values 参数值 "one,two"
 * @returns {string} "one two"
 */
module.exports.splitHandler = (values, _default = '') =>
   values ? values.split(',').join(' ') : _default;

/***
 * 格式化 find 的参数
 * @param {object} query 原始查询参数（精准匹配）
 * @param {object} overideOption 覆写选项（包括模糊查询，比较等）
 * @param {Array<string>} reduce 需要被排除的参数(不参与精准匹配的字段)
 * @returns {object} 格式化后的参数
 */
module.exports.extendQuery = (
   query,
   overideOption = {},
   reduce = ['sort', 'fields', 'page', 'pageSize', 'numeric']
) => {
   const obj = {};
   const overideKeys = Object.keys(overideOption);
   Object.keys(query).forEach((key) => {
      // 排除reduce中参数
      if (reduce.includes(key)) {
         return;
      }

      // 默认赋值
      obj[key] = query[key];
   });

   // 覆写参数
   overideKeys.forEach((key) => {
      obj[key] = overideOption[key];
   });

   return obj;
};
