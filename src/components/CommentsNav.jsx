import '../css/CommentsNav.css';

export default function CommentsNav({ displayedComments, totalComments, page, setPage, isLoading }) {
    if (displayedComments) {
        return (
            <section className="comments-nav">
                <p>
                    Comments <span>1 - {displayedComments}</span> of <span>{totalComments}</span>
                </p>
                <button
                    onClick={() => setPage(page + 1)}
                    className={displayedComments === totalComments ? 'hidden' : ''}
                    disabled={isLoading}
                >
                    Load more comments...
                </button>
            </section>
        );
    }
}