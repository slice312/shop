import {Link} from "react-router-dom";
import css from "./styles.module.scss";
import developersLogo from "src/assets/icons/developers-logo.svg";


export const Footer = () => {
    return (
        <div className={css.root}>
            <div className={css.container}>
                <div className={css.blocks}>
                    <div className={css.logo}>
                        <img src={developersLogo} alt={developersLogo}/>
                    </div>
                    <div className={css.links}>
                        <p>Компания</p>
                        <Link to="/about">О нас</Link>
                        <Link to="/news">Новости</Link>
                        <Link to="/help">Помощь</Link>
                    </div>
                    <div className={css.contacts}>

                    </div>
                    <div className={css.social}>

                    </div>
                </div>
                <div className={css.createdBy}>

                </div>

            </div>

        </div>
    );
};