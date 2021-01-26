import {createStore} from 'redux';
import { sessionService } from 'redux-react-session';

//"redirect path" must contain the name of thecomponent that loaded by default when the app starts, in format "/<start_component_name>". In case of just slash "/" no component will be loaded, just the app start page
const options = { refreshOnCheckAuth: true, redirectPath: '/', driver: 'COOKIES'};

const universalStore = (reducer) => {

    const store = createStore(reducer);
    sessionService.initSessionService(store, options);
    return store;
}

export default  universalStore;