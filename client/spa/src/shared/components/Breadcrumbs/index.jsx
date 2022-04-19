import React from "react";
import {useLocation} from "react-router-dom";
import {BreadCrumbsContext} from "./context";


const pages = {
    "collections": "Коллекции",
    "favorites": "Избранное",
    "search": "Результаты поиска",
    "basket": "Корзина",
    "news": "Новости",
    "help": "Помощь",
    "about": "О нас",
    "public-offer": "Публичная оферта"
};


export const BreadcrumbsProvider = ({children}) => {
    const [path, setPath] = React.useState([]);

    return (
        <BreadCrumbsContext.Provider value={{path, setPath}}>
            {children}
        </BreadCrumbsContext.Provider>
    );
};


export const useBreadcrumbs = () => {
    const {path, setPath} = React.useContext(BreadCrumbsContext);
    const location = useLocation();

    const getCrumbs = () => {
        const maps = location.pathname.split("/")
            .filter(x => x)
            .map(x => ({title: pages[x], url: x}))
            .filter(x => x.title);

        maps.unshift({title: "Главная", url: "/"});
        return maps
    }

    const setCrumbs = (...crumbs) => {
        setPath([...getCrumbs(), ...crumbs]);
    };

    React.useEffect(() => {
        setPath(getCrumbs());
    }, [location])


    return {
        crumbs: path,
        setCrumbs
    };
}