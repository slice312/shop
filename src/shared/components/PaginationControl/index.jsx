import React from "react";
import PropTypes from "prop-types";
import cn from "classnames";
import lo from "lodash";
import css from "./styles.module.scss";
import arrowLeftIcon from "src/assets/icons/arrow-left-black.svg";
import arrowRightIcon from "src/assets/icons/arrow-right-black.svg";


const CHUNK_SIZE = 4;

/**
 * Контрол для управления пагинацией.
 * Генерирует кнопки, для переключения страниц, под указанное кол-во элементов и размер страницы.
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
        className: PropTypes.string
    }

    constructor(props) {
        super(props);
        this.prevChunkClick = this.prevChunkClick.bind(this);
        this.nextChunkClick = this.nextChunkClick.bind(this);
        this.state = {
            chunkIndex: this.getChunkIndex(),
            totalPageQty: this.getTotalPageQty()
        };
    }


    componentDidUpdate(prevProps, prevState, snapshot) {
        const index = this.getChunkIndex();
        const totalPageQty = this.getTotalPageQty();

        if (prevState.chunkIndex !== index) {
            this.setState({
                chunkIndex: index,
                totalPageQty
            });
        }
    }


    getChunkIndex() {
        return Math.floor(this.props.activePageIndex / this.props.pageSize);
    }


    getTotalPageQty() {
        return Math.ceil(this.props.totalItemsQty / this.props.pageSize);
    }


    prevChunkClick() {
        const prevPageIndex = lo.clamp(this.state.chunkIndex * this.props.pageSize - CHUNK_SIZE,
            0,
            this.state.totalPageQty - 1);
        this.props.onActivePageChanged(prevPageIndex);
    }


    nextChunkClick() {
        const nextPageIndex = lo.clamp(this.state.chunkIndex * this.props.pageSize + CHUNK_SIZE,
            0,
            this.state.totalPageQty - 1);
        this.props.onActivePageChanged(nextPageIndex);
    }


    getAllButtons() {
        const buttons = [];

        buttons.push(
            <div key="arrowLeft" className={css.item} onClick={this.prevChunkClick}>
                <img src={arrowLeftIcon} alt={arrowLeftIcon}/>
            </div>
        );

        const startIndexInPage = this.state.chunkIndex * this.props.pageSize
        buttons.push(...this.getChunkButtons(startIndexInPage));

        if (startIndexInPage + CHUNK_SIZE < this.state.totalPageQty) {
            buttons.push(
                <div key="3dots" className={cn(css.item, css.dots)}>
                    ...
                </div>,
                <div key="totalPageQty"
                     className={css.item}
                     onClick={() => this.props.onActivePageChanged(this.props.totalItemsQty - 1)}
                >
                    {this.state.totalPageQty}
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
        const pageQtyInChunk = lo.clamp(this.state.totalPageQty - startIndexInPage, 0, CHUNK_SIZE);

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