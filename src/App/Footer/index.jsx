import React from "react";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
import lo from "lodash"
import css from "./styles.module.scss";

import telephoneIcon from "src/assets/icons/telephone-outlined.svg"
import emailIcon from "src/assets/icons/email.svg";
import telegramIcon from "src/assets/icons/telegram.svg";
import instagramIcon from "src/assets/icons/instagram.svg";
import whatsappIcon from "src/assets/icons/whatsapp.svg";


export const Footer = () => {
    const info = useSelector(state => state.commonSiteInfo);

    return (
        <div className={css.root}>
            <div className={css.container}>
                <div className={css.blocks}>
                    <div className={css.logo}>
                        <img src={info.footerLogo} alt={info.footerLogo}/>
                    </div>
                    <div className={css.links}>
                        <div className={css.blockTitle}>Компания</div>
                        <Link to="/about" className={css.blockItem}>О нас</Link>
                        <Link to="/news" className={css.blockItem}>Новости</Link>
                        <Link to="/help" className={css.blockItem}>Помощь</Link>
                    </div>
                    <div className={css.contacts}>
                        <div className={css.blockTitle}>Контакты</div>
                        {
                            lo.take(info.extraPhoneNumbers, 2)
                                .map((x, i) => {
                                        return (
                                            <div key={i} className={css.blockItem}>
                                                <img src={telephoneIcon} alt={telephoneIcon}/>
                                                <span>{x}</span>
                                            </div>
                                        );
                                    }
                                )
                        }

                        <div className={css.blockItem}>
                            <img src={emailIcon} alt={emailIcon}/>
                            <span>{info.email}</span>
                        </div>
                    </div>
                    <div className={css.social}>
                        <div className={css.blockTitle}>Мы в социальных сетях</div>
                        <div>
                            <div>
                                <a href={info.instagramUrl}
                                   className={css.blockItem}
                                   target="_blank" rel="noopener noreferrer">
                                    <img src={instagramIcon} alt={instagramIcon}/>
                                    <span>Instagram</span>
                                </a>
                            </div>
                            <div>
                                <a href={info.telegramUrl}
                                   className={css.blockItem}
                                   target="_blank" rel="noopener noreferrer">
                                    <img src={telegramIcon} alt={telegramIcon}/>
                                    <span>Telegram</span>
                                </a>
                            </div>
                            <div>
                                <a href={info.telegramUrl}
                                   className={css.blockItem}
                                   target="_blank" rel="noopener noreferrer">
                                    <img src={whatsappIcon} alt={whatsappIcon}/>
                                    <span>Whatsapp</span>
                                </a>
                            </div>
                        </div>

                    </div>
                </div>
                <hr className={css.horizontalLine}/>
                <div className={css.companyLabel}>
                    <span>{info.companyName}</span>
                </div>
            </div>
        </div>
    );
};