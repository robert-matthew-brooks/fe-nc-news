import '../css/ArticlesNav.css';

export default function ArticlesNav({ page, changePage, totalArticles, articlesPerPage }) {
    page = Number(page ? page : 1);
    const totalPages = Math.ceil(totalArticles / articlesPerPage);

    const pageNumbers = [];
    for (let i=1; i<=totalPages; i++) pageNumbers.push(i);

    const to = totalArticles > 0 ?
        1 + (articlesPerPage * (page-1)) : 0;
    const from = Math.min(
        1 + (articlesPerPage * (page)),
        totalArticles
    );

    return (
        <section className="articles-nav">
            <button
                onClick={() => changePage(page - 1)}
                disabled={page === 1}
            >
                &lt;
            </button>

            {pageNumbers.map(pageNumber => {
                return (
                    <button
                        key={pageNumber}
                        onClick={() => changePage(pageNumber)}
                        disabled={pageNumber === page}
                    >
                        {pageNumber}
                    </button>
                );
            })}

            <button
                onClick={() => changePage(page + 1)}
                disabled={(page === totalPages) || (totalPages === 0)}
            >
                &gt;
            </button>

            <p>
                Results {to} - {from} of {totalArticles}
            </p>
        </section>
    );
}