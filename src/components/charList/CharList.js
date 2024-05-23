import './charList.scss';
import useMarvelService from '../../services/MarvelService';
import {useState, useRef, useEffect, useMemo} from 'react';
import PropTypes from 'prop-types';
import React from 'react';
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
    

const CharList = (props) => {
    
    const {getAllCharacters, process, setProcess} = useMarvelService();

    const [chars, setChars] = useState([]);
    const [offset, setOffset] = useState(300);
    const [newItemsLoading, setNewItems] = useState(false);
    const [charEnded, setCharEnded] = useState(false);

    const onCharsLoaded = (charsServer) => {
        let ended = false;
        if (charsServer.length < 9 || offset >= 1555) {
            ended = true
        }
        setChars([...chars, ...charsServer]);
        setNewItems(false);
        setOffset(offset + 9);
        setCharEnded(ended);

    }

    const itemRefs = useRef([]);

    const focusOnRef = (id) => {
        itemRefs.current.forEach(item => item.classList.remove("char__item_selected"));
        itemRefs.current[id].classList.add("char__item_selected");
        itemRefs.current[id].focus();
    }

    function renderItems(chars) {
        const elems = chars.map(((data, i) => {
            const {name, thumbnail, id} = data
            return (
                <CSSTransition timeout={500} classNames={"char__item"} key={id}>
                    <li onClick={() => {props.onCharSelect(id); focusOnRef(i)}}
                        tabIndex={0}
                        ref={el => itemRefs.current[i] = el} 
                        className="char__item" 
                        key={i} 
                        onKeyDown={(e) => {
                            if (e.key === ' ' || e.key === "Enter") {
                                props.onCharSelect(id); 
                                focusOnRef(i);
                            }
                        }}>
                        <img 
                            src={thumbnail} 
                            alt="abyss" 
                            style={{objectFit: thumbnail.endsWith('image_not_available.jpg') ? 'contain' : 'cover'}}/>
                        <div className="char__name">{name}</div>
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
        getAllCharacters(offset)
            .then(onCharsLoaded)
            .then(() => setProcess('confirmed'));
    }

    const content = useMemo(() => {
        return setContent(process, () => renderItems(chars), newItemsLoading);
        // eslint-disable-next-line
    }, [process])
    const style = process === 'loading' && !newItemsLoading ? 'char__grid-load' : 'char__grid'
    return (
        <div className="char__list">
            <ul className={style}>
            {content}   
            </ul>
            <button disabled={newItemsLoading} style={{'display' : charEnded ? 'none' : 'block'}} 
                    onClick = {() => {onRequest(); setNewItems(true)}} className="button button__main button__long">
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

CharList.propTypes = {
    onCharSelect: PropTypes.func
}

export default CharList;