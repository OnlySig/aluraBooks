import axios from "axios";
import { useObterToken } from "../hooks/token";
import { ICategoria } from "../interfaces/ICategoria";
import { ILivro } from "../interfaces/ILivro";
import { IOpcaoAutor } from "../interfaces/IOpcaoAutor";

const http = axios.create({
    baseURL: 'http://localhost:8000',
    headers: {
        Accept: 'application/json',
        Content: 'application/json'
    }
})

http.interceptors.request.use(function (config) {
    // Do something before request is sent (ou "fazer alguma coisa antes que a requisição seja enviada")
    const token = useObterToken()
    if(token && config.headers){
        config.headers.Authorization = `Bearer ${token}`
    }
    return config;
}, function (error) {
    // Do something with request error (ou "fazer alguma coisa com o erro da requisição")
    console.log('!!!Erro no interceptor do axios!!!')
    return Promise.reject(error);
});

export default http

export const getCategoriaPorSlug = async (slug: string) => {
    const resp = await http.get<ICategoria[]>('categorias', {
        params: {
            slug
        }
    })
    return resp.data[0]
}

export const getLivrosDestaque = async (valor: string) => {
    const resp = await http.get<ILivro[]>(`public/${valor}`)
    return resp.data
}

export const getLivros = async (valor: number) => {
    const resp = await http.get<ILivro[]>(`livros?categoria=${valor}`)
    return resp.data
}

export const getLivrosComSlug = async (slug: string) => {
    const resp = await http.get<ILivro[]>(`livros?slug=${slug}`)
    if(resp.data.length === 0) {
        return null
    }
    return resp.data[0]
}

export const getAutoresPorId = async (id: number) => {
    const resp = await http.get<IOpcaoAutor[]>(`autores?id=${id}`)
    return resp.data
}