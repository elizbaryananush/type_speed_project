import React from 'react'
import { useSelector } from 'react-redux'
import { TbReload } from "react-icons/tb";
import { RootState } from '../redux/store';

function ResultsPage() {
    const { wpm, mistakesCount } = useSelector((state: RootState) => state.typing) //words in per minute and mistakes variables from redux typing state

    const handleReload = () => {
        window.location.href = '/'
    }

    return (
        <div className='ResultsPage'>
            <div className="box">
                <div className="content">
                    <p>wpm : </p><span>{wpm}</span>
                </div>
                <div className="content">
                    <p>mistakes : </p><span>{mistakesCount}</span>
                </div>
                <TbReload onClick={handleReload} />
            </div>
        </div>
    )
}

export default ResultsPage