import SortDescImg from '../img/sort-desc.svg';
import SortAscImg from '../img/sort-asc.svg';
import '../css/ArticlesSort.css';

const sortByOptions = [
    {text: 'Date', value: 'date'},
    {text: 'Comments', value: 'comment_count'},
    {text: 'Votes', value: 'votes'}
];


export default function ArticlesSort({ setSortBy, sortOrder, setSortOrder }) {
    
    const toggleSortOrder = () => {
        const sortImg = document.getElementById('sort-order').children[0];

        if (sortOrder === 'asc') {
            setSortOrder('desc');
            sortImg.src = SortDescImg;
        }
        else {
            setSortOrder('asc');
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
                <select id="sort-by" onChange={event => setSortBy(event.target.value)}>
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