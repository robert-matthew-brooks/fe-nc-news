import '../css/CommentsPagination.css';

export default function CommentsPagination({ displayedComments, totalComments, limit, setLimit, isLoading }) {
    if (displayedComments) {
        return (
            <section className="comments-pagination">
                <button
                    onClick={() => setLimit(limit + 10)}
                    className={displayedComments === totalComments ? 'hidden' : ''}
                    disabled={isLoading}
                >
                    Load more comments...
                </button>
                <p>
                    Comments 1 - {displayedComments} of {totalComments}
                </p>
            </section>
        );
    }
}