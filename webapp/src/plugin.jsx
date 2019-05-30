import Manifest from './manifest';

import PostType from './components/post_type';
import reducer from './reducer';
import {websocketHasVoted} from './actions';

export default class MatterPollPlugin {
    initialize(registry, store) {
        registry.registerPostTypeComponent('custom_matterpoll', PostType);
        registry.registerWebSocketEventHandler(
            'custom_' + Manifest.PluginId + '_has_voted',
            (message) => {
                store.dispatch(websocketHasVoted(message.data));
            }
        );
        registry.registerReducer(reducer);
    }

    uninitialize() {
        //eslint-disable-next-line no-console
        console.log(Manifest.PluginId + '::uninitialize()');
    }
}
