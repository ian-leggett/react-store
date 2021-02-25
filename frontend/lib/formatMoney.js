const formatMoney = (amount = 0) => {
  const formatter = new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    minumumFractionDigits: 2,
  })
  return formatter.format(amount / 100)
}

export default formatMoney
