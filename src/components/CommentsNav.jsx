import '../css/CommentsNav.css';

export default function CommentsNav({ activeComments, totalComments, setIsCommentsRequested, isLoading }) {
    if (totalComments) {
        return (
            <section className="comments-nav">
                <p>
                    Comments <span>{activeComments ? 1 : 0} - {activeComments}</span> of <span>{totalComments}</span>
                </p>
                <button
                    onClick={() => setIsCommentsRequested(true)}
                    className={activeComments === totalComments ? 'hidden' : undefined}
                    disabled={isLoading}
                >
                    Load more comments...
                </button>
            </section>
        );
    }
}