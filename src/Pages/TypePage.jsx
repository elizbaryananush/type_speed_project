import React, { useEffect, useState } from 'react'
import TypingTextArea from '../Components/TypingTextArea'
import Timer from '../Components/Timer'
import { TbPlayerPause, TbPlayerPlayFilled, TbReload } from "react-icons/tb";

function TypePage() {
    const [isActive, setIsActive] = useState(false)

    //handling space key down
    const handlekeydown = (e) => {
        if (e.key === ' ') {
            e.preventDefault()
            setIsActive(true)
        }
    }

    //handling pause click
    const handlePause = () => {
        setIsActive(!isActive)
    }

    useEffect(() => {
        window.addEventListener('keydown', handlekeydown);
    }, []);

    return (
        <div className='TypePage'>
            <div className="top">
                <TbReload onClick={() => window.location.href = '/'} />
                <Timer isActive={isActive} setIsActive={setIsActive} />
                {isActive ? <TbPlayerPause onClick={handlePause} /> :
                    <TbPlayerPlayFilled onClick={handlePause} />}
            </div>
            <TypingTextArea isActive={isActive} setIsActive={setIsActive} />
        </div>
    )
}

export default TypePage