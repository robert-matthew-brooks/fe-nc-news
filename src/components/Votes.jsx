import { useEffect, useState } from 'react';
import { apiRequest } from '../util/api';

export default function Votes({ votes, patchUrl }) {
    const [localVote, setLocalVote] = useState(0);
    const [isError, setIsError] = useState(false);

    async function handleVote() {
        let inc_votes;

        if (!localVote) inc_votes = 1;
        else inc_votes = -1;

        setLocalVote(localVote + inc_votes);

        try {
            await apiRequest(patchUrl, {
                method: 'PATCH',
                body: JSON.stringify({ inc_votes: 'a' })
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
                <button onClick={handleVote}>
                    {!localVote ? 'Vote' : 'Unvote'}
                </button>
                
                {votes + localVote} {votes + localVote === 1 ? 'vote' : 'votes'}
            </div>
        );
    }
}