import '../css/CommentsNav.css';

export default function CommentsNav({ displayedComments, totalComments, limit, setLimit, isLoading }) {
    if (displayedComments) {
        return (
            <section className="comments-nav">
                <p>
                    Comments <span>1 - {displayedComments}</span> of <span>{totalComments}</span>
                </p>
                <button
                    onClick={() => setLimit(limit + 10)}
                    className={displayedComments === totalComments ? 'hidden' : ''}
                    disabled={isLoading}
                >
                    Load more comments...
                </button>
            </section>
        );
    }
}