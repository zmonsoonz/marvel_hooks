import './comicsList.scss';
import {Link} from "react-router-dom"
import useMarvelService from '../../services/MarvelService';
import { useState, useEffect} from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const setContent = (process, Component, newItemsLoading) => {
    switch(process) {
        case 'waiting':
            return <img 
                    className="spinner" 
                    src='Rolling-1s-200px.gif' 
                    alt="spin"></img>;
        case 'loading':
            return newItemsLoading ? <Component/> : <img 
                                                    className="spinner" 
                                                    src='Rolling-1s-200px.gif' 
                                                    alt="spin"></img>;
        case 'confirmed':
            return <Component/>
        case 'error':
            return <h1 className="spinner">There is no such character</h1>
        default:
            throw new Error('Unexpected process')
    }
}

const ComicsList = () => {

    const {getComics, process, setProcess} = useMarvelService();

    const [chars, setChars] = useState([]);
    const [offset, setOffset] = useState(0);
    const [newItemsLoading, setNewItems] = useState(false);
    const [charEnded, setCharEnded] = useState(false);

    
    const onCharsLoaded = (charsServer) => {
        let ended = false;
        if (charsServer.length < 8) {
            ended = true
        }
        setChars([...chars, ...charsServer]);
        setNewItems(false);
        setOffset(offset + 8);
        setCharEnded(ended);
    }

    function renderComics(chars) {
        const elems = chars.map(((data, i) => {
            const {title, thumbnail, id, price} = data
            return (
                <CSSTransition timeout={500} classNames={"comics__item"} key={i}>
                    <li key={i} className="comics__item">
                        <Link to={`/comics/${id}`}>
                            <img src={thumbnail} alt="ultimate war" className="comics__item-img"/>
                            <div className="comics__item-name">{title}</div>
                            <div className="comics__item-price">{price}</div>
                        </Link>
                    </li>
                </CSSTransition>
            )
        }))
        return (
            <TransitionGroup component={null}>
                {elems}
            </TransitionGroup>
        )
    }

    useEffect(() => {
        onRequest();
        // eslint-disable-next-line
    }, []);
 
    const onRequest = () => {
        getComics(offset)
            .then(onCharsLoaded)
            .then(() => setProcess('confirmed'));
    }
    const style = process === 'loading' && !newItemsLoading ? 'comics__grid-load' : 'comics__grid'
    return (
        <div className="comics__list">
            <ul className={style}>
                {setContent(process, () => renderComics(chars), newItemsLoading)}
            </ul>
            <button disabled={newItemsLoading} style={{'display' : charEnded ? 'none' : 'block'}} 
                    onClick = {() => {onRequest(); setNewItems(true)}} className="button button__main button__long">
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;