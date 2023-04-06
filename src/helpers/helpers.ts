import format from "date-fns/format"

export const formatToUSD = (amount: number) => {
    if (typeof amount === 'string') {
      amount = parseFloat(amount)
    }
  
    return amount.toLocaleString('en-US', {
      style: 'currency',
      currency: 'usd',
    })
}

export const formatDate = (date: string) =>  format(new Date(date), 'MM/dd/yyyy')