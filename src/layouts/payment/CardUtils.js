import Payment from "payment";

function clearNumber(value = "") {
  if (value != null) {
    return value.replace(/\D+/g, "");
  }
  // return value.replace(/\D+/g, '')
}

export function formatCreditCardNumber(value) {
  if (!value) {
    return value;
  }

  const issuer = Payment.fns.cardType(value);
  const clearValue = clearNumber(value);
  let nextValue;

  switch (issuer) {
    case "amex":
      nextValue = `${clearValue.slice(0, 4)} ${clearValue.slice(
        4,
        10
      )} ${clearValue.slice(10, 15)}`;
      break;
    case "dinersclub":
      nextValue = `${clearValue.slice(0, 4)} ${clearValue.slice(
        4,
        10
      )} ${clearValue.slice(10, 14)}`;
      break;
    default:
      nextValue = `${clearValue.slice(0, 4)} ${clearValue.slice(
        4,
        8
      )} ${clearValue.slice(8, 12)} ${clearValue.slice(12, 19)}`;
      break;
  }

  return nextValue.trim();
}

export function formatCVV(value, prevValue, allValues = {}) {
  const clearValue = clearNumber(value);
  let maxLength = 3;

  if (clearValue != null) {
    if (allValues.cardNumber) {
      const issuer = Payment.fns.cardType(allValues.cardNumber);
      maxLength = issuer === "amex" ? 4 : 3;
      // return clearValue.slice(0, maxLength);
    }
    return clearValue.slice(0, maxLength);
  }

  
}

export function formatExpirationDate(value) {
  const clearValue = clearNumber(value);

  if (clearValue != null) {
    if (clearValue.length == 4) {
      return `${clearValue.slice(0, 2)}/${clearValue.slice(2, 4)}`;
    }
  }

  return clearValue;
}
