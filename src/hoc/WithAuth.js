
import {UseAuth} from '../CustomHooks';



const WithAuth = props => UseAuth(props) && props.children;

export default WithAuth;