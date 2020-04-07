/* Loadable插件使用Loading */
import Loadable from "react-loadable";
import Loading from "../components/Loading";

//定义路由

global.Recording = Loadable({
    loader:()=>
        import('../views/pages/recording'),
    loading:Loading
});

global.Advance = Loadable({
    loader:()=>
        import('../views/pages/advance'),
    loading:Loading
});

global.User = Loadable({
    loader:()=>
        import('../views/pages/user'),
    loading:Loading
});

global.Error_404 = Loadable({
    loader: () =>
        import('../views/pages/error_404'),
    loading: Loading,
});