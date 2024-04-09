export const useCriarToken = () => {
    return(token:string) => {
        sessionStorage.setItem('token', token)
    }
}

export const useObterToken = () => {
    return sessionStorage.getItem('token')
}

export const useDellToken = () => {
    return sessionStorage.removeItem('token')
}