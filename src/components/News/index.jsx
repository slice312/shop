import React from "react";
import InfiniteScroll from "react-infinite-scroller";
import {useDispatch, useSelector} from "react-redux";
import {newsReset, pushNews} from "src/shared/state/news/actions";
import {NewsCard} from "./NewsCard";
import css from "./styles.module.scss";


const NEWS_BATCH_SIZE = 8;


// TODO: Надо в мобильное версии добавить что-топи Accordion, чтобы показыать часть текста, а полный текст по нажатию
export const News = () => {
    const news = useSelector(state => state.news.news);
    const dispatch = useDispatch();

    React.useEffect(() => {
        return () => void dispatch(newsReset());
    }, [dispatch]);


    const loadMore = () => dispatch(pushNews(NEWS_BATCH_SIZE));

    return (
        <div className={css.root}>
            <div className={css.title}>
                Новости
            </div>
            <div className={css.news}>
                <InfiniteScroll
                    pageStart={0}
                    loadMore={loadMore}
                    hasMore={true}
                    loader={<div className="loader" key={0}>Loading ...</div>}
                >
                    {
                        news.map((x, i) =>
                            <NewsCard key={i} title={x.title} image={x.image} text={x.text}/>)
                    }
                </InfiniteScroll>
            </div>
        </div>
    );
};