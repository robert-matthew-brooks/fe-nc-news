import { useState, useEffect } from 'react';
import { patchVotes } from '../util/api';
import { getFormattedNumber } from '../util/format';
import VoteImg from '../img/arrow.png';
import '../css/Votes.css';

export default function Votes({ patchUrl, votes }) {
    const [upVote, setUpVote] = useState(false);
    const [downVote, setDownVote] = useState(false);
    const [optimisticVotes, setOptimisticVotes] = useState(0);
    const [isError, setIsError] = useState(false);

    async function handleVote(type) {
        let incVotes = 0;

        if (type === 'up') {
            incVotes += (!upVote ? 1 : -1);
            setUpVote(!upVote);

            if (downVote) {
                incVotes += 1;
                setDownVote(false);
            }
        }

        else if (type === 'down') {
            incVotes += (!downVote ? -1 : 1);
            setDownVote(!downVote);

            if (upVote) {
                incVotes -= 1;
                setUpVote(false);
            }
        }
    
        try {
            await patchVotes(patchUrl, incVotes);
        }
        catch(err) {
            setIsError(true);
        }
    }

    useEffect(() => {
        if (!isNaN(votes)) setOptimisticVotes(votes + (upVote ? 1 : 0) + (downVote ? -1 : 0))
    }, [votes, upVote, downVote]);

    if (isError) {
        return <div className="error">Unable to update votes</div>;
    }
    else if (!isNaN(votes)) {
        return (
            <figure className={`votes ${optimisticVotes < 0 ? 'negative' : ''}`}>
                <button
                    className={`up ${upVote ? 'up-active' : ''}`}
                    onClick={() => handleVote('up')}
                >
                    <img src={VoteImg} alt="vote up" />
                </button>
                
                <span>
                    {getFormattedNumber(optimisticVotes)}
                </span>

                <button
                    className={`down ${downVote ? 'down-active' : ''}`}
                    onClick={() => handleVote('down')}
                >
                    <img src={VoteImg} alt="vote down" />
                </button>
            </figure>
        );
    }
}