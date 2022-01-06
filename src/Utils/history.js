import { createBrowserHistory } from 'history';
import { useNavigate,generatePath } from "react-router-dom";
const history = createBrowserHistory();
const useNavigateParams = () => {
    const navigate = useNavigate();

    return (url, params) => {
        const path = generatePath(":url?:queryString", {
            url,
            queryString: params
        });
        navigate(path);
    };
};
export { history, useNavigateParams };