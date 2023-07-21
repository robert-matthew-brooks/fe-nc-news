import SortDescImg from '../img/sort-desc.svg';
import { useState } from 'react';
import SortAscImg from '../img/sort-asc.svg';
import '../css/ArticlesSort.css';

const sortByOptions = [
    {text: 'Date', value: 'date'},
    {text: 'Comments', value: 'comment_count'},
    {text: 'Votes', value: 'votes'}
];


export default function ArticlesSort({ changeSortBy, changeSortOrder }) {
    const [isAsc, setIsAsc] = useState(false)

    const toggleSortOrder = () => {
        const sortImg = document.getElementById('sort-order').children[0];

        if (isAsc) {
            changeSortOrder('desc');
            setIsAsc(false);
            sortImg.src = SortDescImg;
        }
        else {
            changeSortOrder('asc');
            setIsAsc(true);
            sortImg.src = SortAscImg;
        }
    };

    return (
        <section className="articles-sort">
            <form>
                <label htmlFor="sort-by">
                    Sort by:
                </label>
                <select id="sort-by" onChange={event => changeSortBy(event.target.value)}>
                    {sortByOptions.map(sortByOption => {
                        return (
                            <option
                                key={sortByOption.value}
                                value={sortByOption.value}>
                                {sortByOption.text}
                            </option>
                        );	
                    })}
                </select>

                <label htmlFor="sort-order" className="hidden">
                    Ascending/descending:
                </label>
                <button id="sort-order" type="button" onClick={toggleSortOrder}>
                    <img src={SortDescImg} alt="ascending/descending" />
                </button>
            </form>
        </section>
    );
}