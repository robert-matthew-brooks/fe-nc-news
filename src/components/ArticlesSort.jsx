import SortDescImg from '../img/sort-desc.svg';
import SortAscImg from '../img/sort-asc.svg';
import '../css/ArticlesSort.css';

const sortByOptions = [
    {text: 'Date', value: 'date'},
    {text: 'Comments', value: 'comment_count'},
    {text: 'Votes', value: 'votes'}
];


export default function ArticlesSort({ changeSortBy, sortOrder, changeSortOrder }) {
    
    const toggleSortOrder = () => {
        const sortImg = document.getElementById('sort-order').children[0];

        if (sortOrder === 'asc') {
            changeSortOrder('desc');
            sortImg.src = SortDescImg;
        }
        else {
            changeSortOrder('asc');
            sortImg.src = SortAscImg;
        }

        console.log();
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