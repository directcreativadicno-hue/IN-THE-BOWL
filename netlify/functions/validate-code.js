exports.handler = async function (event) {
  var code = "";
  try {
    code = (event.queryStringParameters && event.queryStringParameters.code || "").trim().toUpperCase();
  } catch (e) {
    code = "";
  }

  var codes = [];
  try {
    codes = JSON.parse(process.env.DISCOUNT_CODES || "[]");
  } catch (e) {
    codes = [];
  }

  var match = codes.find(function (c) {
    return (c.code || "").toString().trim().toUpperCase() === code;
  });

  if (!code || !match) {
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ valid: false })
    };
  }

  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      valid: true,
      type: match.type,
      value: match.value,
      label: match.label || "",
      comboQty: match.comboQty,
      comboPrice: match.comboPrice,
      size: match.size
    })
  };
};
