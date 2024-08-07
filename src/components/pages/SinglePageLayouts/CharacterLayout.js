import { Helmet } from "react-helmet";
import './singleComic.scss';
import { Link } from "react-router-dom";
const Char = ({data}) => {
    const {name, thumbnail, description} = data;
    return (
        <>
            <Helmet>
                <meta
                name="description"
                content={`${name} character page`}
                />
                <title>{name}</title>
            </Helmet>
            <img style={{objectFit : 'contain'}} src={thumbnail} alt="x-men" className="single-comic__char-img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{name}</h2>
                <p className="single-comic__descr">{description}</p>
            </div>
            <Link to="/" className="single-comic__back">Back to main</Link>
        </>
    )
}

export default Char