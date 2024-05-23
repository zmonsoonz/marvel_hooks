import './singleComic.scss';
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

const Comic = ({data}) => {
    const {title, thumbnail, description, pages, language, price} = data;
    return (
        <>
            <Helmet>
                <meta
                name="description"
                content={`${title} comics book`}
                />
                <title>{title}</title>
            </Helmet>
            <img src={thumbnail} alt="x-men" className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{pages}</p>
                <p className="single-comic__descr">{language}</p>
                <div className="single-comic__price">{price}</div>
            </div>
            <Link to="/comics" className="single-comic__back">Back to all</Link>
        </>
    )
}

export default Comic