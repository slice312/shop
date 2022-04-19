import React from "react";
import {useDispatch, useSelector} from "react-redux";
import InfiniteScroll from "react-infinite-scroller";

import {newsReset, pushNews} from "src/shared/state/news/actions";
import {NewsCard} from "./NewsCard";
import css from "./styles.module.scss";


const NEWS_PAGE_SIZE = 8;


export const News = () => {
    const news = useSelector(state => state.news.news);
    const dispatch = useDispatch();

    React.useEffect(() => {
        return () => void dispatch(newsReset());
    }, []);


    const loadMore = () => dispatch(pushNews(NEWS_PAGE_SIZE));

    return (
        <div className={css.root}>
            <div className={css.title}>
                Новости
            </div>
            <InfiniteScroll
                pageStart={0}
                loadMore={loadMore}
                hasMore={true}
                loader={null}
            >
                <div className={css.news}>

                    {
                        news.map((x, i) =>
                            <NewsCard key={i} title={x.title} image={x.image} text={x.text}/>)
                    }
                </div>
            </InfiniteScroll>
        </div>
    );
};