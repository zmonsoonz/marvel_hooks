import {useState, useEffect} from 'react';
import './charInfo.scss';
import PropTypes from 'prop-types';
import useMarvelService from '../../services/MarvelService';
import setContent from '../../utils/setContent';

const CharInfo = (props) => {
    
    const [char, setChar] = useState(null);

    const {getCharacter, clearError, process, setProcess} = useMarvelService();

    useEffect(() => {
        updateChar();
        // eslint-disable-next-line
    }, [props.charId]) 

    const updateChar = () => {
        const {charId} = props;
        if (!charId) {
            return;
        }
        
        clearError();

        getCharacter(charId)
            .then(onCharLoaded)
            .then(() => setProcess('confirmed'));
    }

    const onCharLoaded = (char) => {
        setChar(char);
    }
    const style = process === 'loading' ? 'char__info-load' : 'char__info'
    return (
        <div className={style}>
            {setContent(process, View, char)}
        </div>
    )
}

const View = ({data}) => {
    const {name, thumbnail, homepage, wiki, description, comics, id} = data;
    return (
        <div key={id}>
            <div className="char__basics">
                <img 
                style = {{objectFit: thumbnail.endsWith('image_not_available.jpg') ? 'contain' : 'cover'}} 
                src={thumbnail} 
                alt="abyss"/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
            {
                typeof comics === "string" ? 
                comics : 
                comics.map((item,i) => {
                    return (
                        <li><a key = {i} href={item.resourceURI} className="char__comics-item">
                            {item.name}
                        </a></li>
                    )
                })
            }
            </ul>
        </div>
    )
}

CharInfo.propTypes = {
    charId: PropTypes.number
}

export default CharInfo;