import React, { useEffect, useState } from 'react'
import '../css/Timer.scss'
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { setTime } from '../redux/typingSlice';

function Timer({ isActive }) {
    const dispatch = useDispatch()
    const [seconds, setSeconds] = useState([30, 60, 120])
    const [activeSecond, setActiveSecond] = useState(1)
    const navigate = useNavigate()

    useEffect(() => {
        //sending time in seconds as redux variable
        dispatch(setTime(seconds[activeSecond]))
    }, [activeSecond])

    useEffect(() => {
        let interval;

        //countdown
        if (isActive && seconds[activeSecond] > 0) {
            interval = setInterval(() => {
                setSeconds(prevSeconds => {
                    const newSeconds = [...prevSeconds];
                    // newSeconds[activeSecond] = newSeconds[activeSecond] - 1;
                    return newSeconds;
                });
            }, 1000);

        } else if (seconds[activeSecond] === 0) {
            navigate('/results')
        }

        return () => clearInterval(interval);
    }, [isActive, seconds]);

    const handleChange = (index) => {
        if (!isActive) {
            setActiveSecond(index)
        }
    }

    return (
        <div
            className='Timer'>
            {
                seconds.map((item, index) => {
                    return <p
                        key={index}
                        onClick={() => handleChange(index)}
                        className={index === activeSecond ? 'active' : 'seconds'}>
                        {item}
                    </p>
                })
            }
        </div>
    )
}

export default Timer