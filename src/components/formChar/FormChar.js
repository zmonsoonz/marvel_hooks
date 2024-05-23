import './FormChar.scss';
import { Formik, Field, Form, ErrorMessage} from "formik";
import * as Yup from "yup";
import useMarvelService from '../../services/MarvelService';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const FormChar = () => {

    const [char, setChar] = useState(null);
    const {getFormCharacter, clearError, process, setProcess} = useMarvelService()

    const updateChar = (name) => {
        clearError();
        getFormCharacter(name)
            .then(onCharLoaded)
            .then(() => setProcess('confirmed'));
    }

    const onCharLoaded = (char) => {
        setChar(char);
    }

    return (
        <div className='char__search-form'>
            <Formik
            initialValues={{
                name: ''
            }}
            validationSchema = {Yup.object({
                name: Yup.string()
                        .required('Required field'),
            })}
            onSubmit = {(values) => updateChar(values.name)}
            >
                <Form>
                    <label className='char__search-label' htmlFor='name'>Or find a character by name:</label>
                    <div className='char__search-wrapper'>
                        <Field placeholder="Enter name" name="name" id="name" type='text'/>
                        <button disabled={process === 'loading'} className="button button__main" type="submit">
                            <div className="inner">find</div>
                        </button>
                    </div>
                    {!char ? null : char.length !== 0 ? <Found name={char.name} id={char.id}/> : <div className='char__search-error'>The character was not found</div>}
                    <ErrorMessage component="div" name="name" className='char__search-error'/>
                </Form>
            </Formik>
            {process === 'error' ? <div className="char__search-critical-error"><ErrorMessage /></div> : null}
        </div>
    )
}

const Found = ({name, id}) => {
    return (
        <div className='char__search-wrapper'>
            <div className='char__search-success'>There is! Visit {name} page?</div>
            <Link to={`/characters/${id}`}>
                <button className="button button__secondary" type="submit">
                    <div className="inner">to page</div>
                </button>
            </Link>
        </div>
    )
}
export default FormChar;


