import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import decoration from '../../resources/img/vision.png';
import FormChar from "../formChar/FormChar";
import { useState } from "react";
import {Helmet} from "react-helmet";
const MainPage = () => {

    const [selectedChar, setChar] = useState(null)

    const onCharSelect = (id) => {
        setChar(id)
    }

    return (
        <>
            <Helmet>
                <meta
                name="description"
                content="Web site created using create-react-app"
                />
                <title>Marvel Information Service</title>
            </Helmet>
            <RandomChar/>
            <div className="char__content">
                <CharList onCharSelect={onCharSelect}/>
                <div>
                    <CharInfo charId = {selectedChar}/>
                    <FormChar/>
                </div>
            </div>
            <img className="bg-decoration" src={decoration} alt="vision"/>
        </>
    )
}

export default MainPage