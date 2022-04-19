import React from "react";
import {Link} from "react-router-dom";
import cn from "classnames";

import {useBreadcrumbs} from "src/shared/components/Breadcrumbs";
import css from "./styles.module.scss"


export const Breadcrumbs = () => {
    const breadcrumbs = useBreadcrumbs();
    const lastIndex = breadcrumbs.crumbs.length - 1;


    return (
        <React.Fragment>
            {
                lastIndex > 0
                    ? (<div className={css.root}>
                            <div className={css.container}>
                                {
                                    breadcrumbs.crumbs.map((crumb, i) => {
                                        return (
                                            <React.Fragment key={i}>
                                                {
                                                    (i > 0) ? <span className={css.delimiter}>/</span> : null
                                                }
                                                <div className={cn(css.crumb, (i === lastIndex) ? css.active : null)}>
                                                    <Link to={crumb.url}>{crumb.title}
                                                    </Link>
                                                </div>
                                            </React.Fragment>
                                        );
                                    })
                                }
                            </div>
                        </div>
                    )
                    : null
            }
        </React.Fragment>
    );
};


