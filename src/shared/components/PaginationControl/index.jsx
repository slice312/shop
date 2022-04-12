import React from "react";
import PropTypes from "prop-types";
import cn from "classnames";
import lo from "lodash";
import css from "./styles.module.scss";
import arrowLeftIcon from "src/assets/icons/arrow-left-black.svg";
import arrowRightIcon from "src/assets/icons/arrow-right-black.svg";


// TODO: я тут ошибся с индексами страни и последней страницей и в clamp ошибки
export class PaginationControl extends React.Component {
    static propTypes = {
        pageSize: PropTypes.number.isRequired,
        totalItemsQty:  PropTypes.number.isRequired,
        activeItemIndex:  PropTypes.number.isRequired,
        onActiveItemChanged:  PropTypes.func.isRequired,
    }

    constructor(props) {
        super(props);
        this.prevPageClick = this.prevPageClick.bind(this);
        this.nextPageClick = this.nextPageClick.bind(this);
        // TODO: дублирование логики убрать
        this.pageIndex = Math.floor(this.props.activeItemIndex / this.props.pageSize);
    }


    componentDidUpdate(prevProps, prevState, snapshot) {
        this.pageIndex = Math.floor(this.props.activeItemIndex / this.props.pageSize);
    }


    prevPageClick() {
        const itemIndex = lo.clamp(this.pageIndex * this.props.pageSize - 4, 0, this.props.totalItemsQty - 1); // TODO: почему 4 в константу
        this.props.onActiveItemChanged(itemIndex);
    }


    nextPageClick() {
        const itemIndex = lo.clamp(this.pageIndex * this.props.pageSize + 4, 0, this.props.totalItemsQty - 1);
        this.props.onActiveItemChanged(itemIndex);
    }


    getButtons ()  {
        const buttons = [];

        buttons.push(
            <div key="arrowLeft" className={css.item} onClick={this.prevPageClick}>
                <img src={arrowLeftIcon} alt={arrowLeftIcon}/>
            </div>
        );

        const startIndexInPage = this.pageIndex * this.props.pageSize
        const itemsQtyInPage = lo.clamp(this.props.totalItemsQty - startIndexInPage, 0, 4);

        const elements = lo.range(itemsQtyInPage)
            .map((_, i) => {
                const num = startIndexInPage + i;
                return (
                    <div key={num}
                         className={cn(css.item, (num === this.props.activeItemIndex) ? css.active : null)}
                         onClick={() => this.props.onActiveItemChanged(num)}
                    >
                        {num + 1}
                    </div>
                );
            });

        buttons.push(...elements);


        if (startIndexInPage + this.props.pageSize < this.props.totalItemsQty) {
            buttons.push(
                <div key="3dots" className={cn(css.item, css.dots)}>
                    ...
                </div>,
                <div key="totalPageQty" className={css.item} onClick={() => this.props.onActiveItemChanged(this.props.totalItemsQty - 1)}>
                    {Math.ceil(this.props.totalItemsQty / this.props.pageSize)}
                </div>
            );
        }

        buttons.push(
            <div key="arrowRight" className={css.item} onClick={this.nextPageClick}>
                <img src={arrowRightIcon} alt="arrowRightIcon"/>
            </div>
        );

        return buttons;
    };


    render () {
        const buttons = this.getButtons()

        return (
            <div className={css.pagesContainer}>
                {
                    buttons
                }
            </div>
        );
    }
}