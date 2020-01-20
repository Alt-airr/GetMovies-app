import React from 'react';
import s from '../MoviesList/css/Pages.module.css'




const Pages = (props) => {
    let pages = [];
    for (let i=1; i <= 100; i++) {
        pages.push(i);
    }
    return (
            <div className={s.pages}>
                {pages.map(p => {
                    return <span className={ `${props.currentPage === p ?  s.selectedPage : null} ${s.pageNumber}`}
                                 onClick={() => {
                                     props.fetchMoviePage(p);
                                 }}>{p}</span>
                })}
            </div>
    )
}

export default Pages;
