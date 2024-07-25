
import Skeleton from "../components/skeleton/Skeleton";
import spinner from './Rolling-1s-200px.gif';

const setContent = (process, Component, data) => {
    switch(process) {
        case 'waiting':
            return <Skeleton/>;
        case 'loading':
            return <img 
                    className="spinner" 
                    src={spinner}
                    alt="spin"></img>
        case 'confirmed':
            return <Component data={data}/>
        case 'error':
            return <h1 className="spinner">No character found<br/>Try again</h1>
        default:
            throw new Error('Unexpected process')
    }
}

export default setContent