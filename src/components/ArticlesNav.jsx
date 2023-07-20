import '../css/ArticlesNav.css';

export default function ArticlesNav({ currentPage, setCurrentPage, totalArticles, articlesPerPage }) {
    const totalPages = Math.ceil(totalArticles / articlesPerPage);

    const pageNumbers = [];
    for (let i=1; i<=totalPages; i++) pageNumbers.push(i);

    const to = totalArticles > 0 ?
        1 + (articlesPerPage * (currentPage-1)) : 0;
    const from = Math.min(
        1 + (articlesPerPage * (currentPage)),
        totalArticles
    );

    return (
        <section className="articles-nav">
            <button
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
            >
                &lt;
            </button>

            {pageNumbers.map(pageNumber => {
                return (
                    <button
                        key={pageNumber}
                        onClick={() => setCurrentPage(pageNumber)}
                        disabled={pageNumber === currentPage}
                    >
                        {pageNumber}
                    </button>
                );
            })}

            <button
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={(currentPage === totalPages) || (totalPages === 0)}
            >
                &gt;
            </button>

            <p>
                Results {to} - {from} of {totalArticles}
            </p>
        </section>
    );
}