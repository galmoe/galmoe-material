const formatNumber = input => {
  if (input) {
    return Number(input).toLocaleString('en-US')
  }
  return 0
}

export {
  formatNumber
}
