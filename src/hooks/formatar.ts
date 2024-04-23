export const useFormatar = (lang: string, currency: string) => {
    const formatador = Intl.NumberFormat(`${lang}`, {style: 'currency', currency: `${currency}`})
    return formatador
}