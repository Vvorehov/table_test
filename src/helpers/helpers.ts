import format from "date-fns/format"
import camelCase from "lodash/camelCase"

export const formatToUSD = (amount: number | string) => {
    if (!amount) return
    if (typeof amount === 'string') {
      amount = parseFloat(amount)
    }
  
    return amount.toLocaleString('en-US', {
      style: 'currency',
      currency: 'usd',
    })
}

export const camelCaseKeys = (obj: Record<string, any>) => {
  return Object.keys(obj).reduce((accumulator: Record<string, any>, key: string) => {
    accumulator[camelCase(key)] = obj[key];
    return accumulator;
  }, {});
}

export const formatCampaignList = (campaigns: Record<string, any>[]): Record<string, any>[] => {
  return (campaigns.map((campaign: Record<string, any>) => camelCaseKeys(campaign)))
}

export const formatDate = (date: string) =>  format(new Date(date), 'MM/dd/yyyy')