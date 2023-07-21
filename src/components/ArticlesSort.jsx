import { useState } from 'react';
import SortDescImg from '../img/sort-desc.svg';
import SortAscImg from '../img/sort-asc.svg';
import '../css/ArticlesSort.css';

const sortByOptions = [
    {text: 'Date', value: 'date'},
    {text: 'Comments', value: 'comment_count'},
    {text: 'Votes', value: 'votes'}
];

export default function ArticlesSort({ sortBy: sortByFromURL, addSortByToURL, sortOrder: sortOrderFromURL, addSortOrderToURL }) {
    const [sortBy, setSortBy] = useState(sortByFromURL);
    const [sortOrder, setSortOrder] = useState(sortOrderFromURL || 'desc');

    const changeSortBy = event => {
        setSortBy(event.target.value);
        addSortByToURL(event.target.value)
    }
    
    const toggleSortOrder = () => {
        if (sortOrder === 'asc') {
            setSortOrder('desc');
            addSortOrderToURL('desc');
        }
        else {
            setSortOrder('asc');
            addSortOrderToURL('asc');
        }
    };

    return (
        <section className="articles-sort">
            <form>
                <label htmlFor="sort-by">
                    Sort by:
                </label>
                <select
                    id="sort-by"
                    onChange={event => changeSortBy(event)}
                    value={sortBy}
                >
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
                    <img
                        src={
                            [SortDescImg, SortAscImg][
                                ['desc', 'asc'].indexOf(sortOrder)
                            ]
                        }
                        alt="ascending/descending" />
                </button>
            </form>
        </section>
    );
}