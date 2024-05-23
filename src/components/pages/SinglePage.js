import { useParams} from 'react-router-dom';
import useMarvelService from '../../services/MarvelService';
import { useEffect, useState } from 'react';
import AppBanner from '../appBanner/AppBanner';
import setContent from '../../utils/setContent';
import './SinglePageLayouts/singleComic.scss';

const SinglePage = ({Component, dataType}) => {
    const {id} = useParams();
    const [data, setData] = useState(null);
    const {clearError, getCharacter, getComic, process, setProcess} = useMarvelService();

    useEffect(() => {
        updateData();
        // eslint-disable-next-line
    }, [id])

    const updateData = () => {
        if (!id) {
            return;
        }
        clearError();
        switch (dataType) {
            case 'comic':
                getComic(id)
                    .then(onDataLoaded)
                    .then(() => setProcess('confirmed'));
                    break
            case 'character':
                getCharacter(id)
                    .then(onDataLoaded)
                    .then(() => setProcess('confirmed'));
                    break
            default:
                return;
        }
    }

    const onDataLoaded = (data) => {
        setData(data);
    }
    const style = process === 'loading' ? 'single-comic__load' : 'single-comic'
    return (
        <>
            <AppBanner/>
            <div className={style}>
                {setContent(process, Component, data)}   
            </div>
        </>
    )
}

export default SinglePage;