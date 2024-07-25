import { useHttp } from "../hooks/http.hook";
const useMarvelService = () => {

    const {request, clearError, process, setProcess} = useHttp();

    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    const _apiKey = "apikey=b05c834936cf7a1f465993be62ef8eee";

    const getAllCharacters = async (offset = 300) => {
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`)
        return res.data.results.map(_transformCharacter)
    }

    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
        if (!res) {
            throw new Error();
        }
        return _transformCharacter(res.data.results[0]);
    }

    const _transformCharacter = (res) => {
        return {
            name: res.name,
            description: res.description ? res.description.slice(0, 210) + "..." : "There is no description for this character",
            thumbnail: res.thumbnail.path + "." + res.thumbnail.extension,
            homepage: res.urls[0].url,
            wiki: res.urls[1].url,
            id: res.id,
            comics: res.comics.items.length === 0 ? "There is no comics with this character" : res.comics.items.slice(0,10),
        }
    }

    const getComics = async (offset = 20) => {
        const res = await request(`${_apiBase}comics?limit=8&offset=${offset}&${_apiKey}`)
        return res.data.results.map(_transformComics)
    }

    const getComic = async (id) => {
        const res = await request(`${_apiBase}comics/${id}?${_apiKey}`)
        return _transformComics(res.data.results[0]);
    }

    const _transformComics = (res) => {
        return {
            title: res.title,
            id: res.id,
            thumbnail: res.thumbnail.path + "." + res.thumbnail.extension,
            price: res.prices[0].price ? res.prices[0].price + "$" : "Not available",
            description: res.description || "There is no description for this comic",
            pages: res.pageCount ? res.pageCount + " pages" : "No information about number of pages",
            language: "Language: " + res.textObjects[0]?.language || "en-us",
        }
    }

    const getFormCharacter = async (name) => {
        const res = await request(`${_apiBase}characters?name=${name}&${_apiKey}`);
        return res.data.results.length !== 0 ? _transformCharacter(res.data.results[0]) : []
    }
    
    return {getAllCharacters, getCharacter, clearError, getComics, getComic, getFormCharacter, process, setProcess}
}

export default useMarvelService;