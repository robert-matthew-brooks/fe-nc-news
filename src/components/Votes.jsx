import { useState } from 'react';
import { apiRequest } from '../util/api';

export default function Votes({ votes, patchUrl }) {
    const [upVote, setUpVote] = useState(false);
    const [downVote, setDownVote] = useState(false);
    const [isError, setIsError] = useState(false);

    async function handleVote(type) {
        let inc_votes = 0;

        if (type === 'up') {
            inc_votes += (!upVote ? 1 : -1);
            setUpVote(!upVote);

            if (downVote) {
                inc_votes += 1;
                setDownVote(false);
            }
        }

        else if (type === 'down') {
            inc_votes += (!downVote ? -1 : 1);
            setDownVote(!downVote);

            if (upVote) {
                inc_votes -= 1;
                setUpVote(false);
            }
        }
    
        try {
            await apiRequest(patchUrl, {
                method: 'PATCH',
                body: JSON.stringify({ inc_votes })
            });
        }

        catch(err) {
            setIsError(true);
        }
    }

    if (isError) {
        return (
            <div>Unable to load votes</div>
        );
    }
    else if (!isNaN(votes)) {
        return (
            <div>
                <button onClick={() => handleVote('up')}>
                    {!upVote ? 'upvote' : 'undo'}
                </button>
                
                {votes + (upVote ? 1 : 0) + (downVote ? -1 : 0)}

                <button onClick={() => handleVote('down')}>
                    {!downVote ? 'downvote' : 'undo'}
                </button>
            </div>
        );
    }
}