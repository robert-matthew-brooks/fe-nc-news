import { useState, useEffect } from 'react';
import { apiPatchVotes } from '../util/api';
import { getFormattedNumber } from '../util/format';
import VoteImg from '../img/arrow.png';
import '../css/Votes.css';

export default function Votes({ patchUrl, votes }) {
    const [upVote, setUpVote] = useState(false);
    const [downVote, setDownVote] = useState(false);
    const [optimisticVotes, setOptimisticVotes] = useState(0);
    const [isError, setIsError] = useState(false);

    const submitVote = async type => {
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
            await apiPatchVotes(patchUrl, incVotes);
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
            <figure className={`votes ${optimisticVotes < 0 && 'votes--negative'}`}>
                <button
                    className={`votes__button--up ${upVote && 'votes__button--up-active'}`}
                    onClick={() => submitVote('up')}
                >
                    <img src={VoteImg} alt="vote up" />
                </button>
                
                <span>
                    {getFormattedNumber(optimisticVotes)}
                </span>

                <button
                    className={`votes__button--down ${downVote && 'votes__button--down-active'}`}
                    onClick={() => submitVote('down')}
                >
                    <img src={VoteImg} alt="vote down" />
                </button>
            </figure>
        );
    }
}