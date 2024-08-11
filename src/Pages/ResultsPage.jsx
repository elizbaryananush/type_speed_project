import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setWpm } from '../redux/typingSlice'
import { useNavigate } from 'react-router'
import { TbReload } from "react-icons/tb";

function ResultsPage() {
    const { wpm, mistakesCount } = useSelector(state => state.typing) //words in per minute and mistakes variables from redux typing state

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