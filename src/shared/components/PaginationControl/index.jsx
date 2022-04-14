import React from "react";
import PropTypes from "prop-types";
import cn from "classnames";
import lo from "lodash";

import css from "./styles.module.scss";
import arrowLeftIcon from "src/assets/icons/arrow-left-black.svg";
import arrowRightIcon from "src/assets/icons/arrow-right-black.svg";


const DEFAULT_CHUNK_SIZE = 4;

/**
 * Контрол для управления пагинацией.
 * Генерирует кнопки, для переключения страниц, под указанное кол-во элементов и размер страницы.
 * Кнопки с номерами переключаю на выбранную страницу.
 * Стрелки вправо/влево переключают на страницы вперед/назад на {@link chunkSize}.
 */
export class PaginationControl extends React.Component {
    static propTypes = {
        /** Размер страницы, кол-во элементов на одной странице */
        pageSize: PropTypes.number.isRequired,
        /** Общее кол-во элементов, которое нужно распределить по страницам */
        totalItemsQty: PropTypes.number.isRequired,
        /** Индекс выбранной страницы */
        activePageIndex: PropTypes.number.isRequired,
        /** Колбек при выборе страницы */
        onActivePageChanged: PropTypes.func.isRequired,
        /** Имя классс, используется в самом верхнем контейнере контрола */
        className: PropTypes.string,
        /** Кол-во одновременно видимых кнопок (страниц) */
        chunkSize : PropTypes.number
    }

    constructor(props) {
        super(props);
        this.prevChunkClick = this.prevChunkClick.bind(this);
        this.nextChunkClick = this.nextChunkClick.bind(this);
        this.chunkSize = (props.chunkSize) ? props.chunkSize : DEFAULT_CHUNK_SIZE;
    }


    getChunkIndex() {
        return Math.floor(this.props.activePageIndex / this.props.pageSize);
    }


    getTotalPageQty() {
        return Math.ceil(this.props.totalItemsQty / this.props.pageSize);
    }


    prevChunkClick() {
        const prevPageIndex = lo.clamp(this.getChunkIndex() * this.props.pageSize - this.chunkSize,
            0,
            this.getTotalPageQty() - 1);
        this.props.onActivePageChanged(prevPageIndex);
    }


    nextChunkClick() {
        const nextPageIndex = lo.clamp(this.getChunkIndex() * this.props.pageSize + this.chunkSize,
            0,
            this.getTotalPageQty() - 1);
        this.props.onActivePageChanged(nextPageIndex);
    }


    getAllButtons() {
        const buttons = [];

        buttons.push(
            <div key="arrowLeft" className={css.item} onClick={this.prevChunkClick}>
                <img src={arrowLeftIcon} alt={arrowLeftIcon}/>
            </div>
        );

        const startIndexInPage = this.getChunkIndex() * this.props.pageSize
        buttons.push(...this.getChunkButtons(startIndexInPage));

        if (startIndexInPage + this.chunkSize < this.getTotalPageQty()) {
            buttons.push(
                <div key="3dots" className={cn(css.item, css.dots)}>
                    ...
                </div>,
                <div key="totalPageQty"
                     className={css.item}
                     onClick={() => this.props.onActivePageChanged(this.props.totalItemsQty - 1)}
                >
                    {this.getTotalPageQty()}
                </div>
            );
        }

        buttons.push(
            <div key="arrowRight" className={css.item} onClick={this.nextChunkClick}>
                <img src={arrowRightIcon} alt="arrowRightIcon"/>
            </div>
        );

        return buttons;
    };


    getChunkButtons(startIndexInPage) {
        const pageQtyInChunk = lo.clamp(this.getTotalPageQty() - startIndexInPage, 0, this.chunkSize);
        return lo.range(pageQtyInChunk)
            .map((_, i) => {
                const num = startIndexInPage + i;
                return (
                    <div key={num}
                         className={cn(css.item, (num === this.props.activePageIndex) ? css.active : null)}
                         onClick={() => this.props.onActivePageChanged(num)}
                    >
                        {num + 1}
                    </div>
                );
            });
    }


    render() {
        return (
            <div className={cn(css.root, this.props.className)}>
                {
                    this.getAllButtons()
                }
            </div>
        );
    }
}