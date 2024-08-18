import React, { useEffect, useState } from 'react';
import '../css/Timer.scss';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { setTime } from '../redux/typingSlice';

interface TimerProps {
    isActive: boolean;
}

const Timer: React.FC<TimerProps> = ({ isActive }) => {
    const dispatch = useDispatch();
    const [seconds, setSeconds] = useState<number[]>([30, 60, 120]);
    const [activeSecond, setActiveSecond] = useState<number>(1);
    const navigate = useNavigate();

    useEffect(() => {
        // Sending time in seconds as redux variable
        dispatch(setTime(seconds[activeSecond]));
    }, [activeSecond, dispatch, seconds]);

    useEffect(() => {
        let interval: NodeJS.Timeout | undefined;

        // Countdown
        if (isActive && seconds[activeSecond] > 0) {
            interval = setInterval(() => {
                setSeconds((prevSeconds) => {
                    const newSeconds = [...prevSeconds];
                    newSeconds[activeSecond] = newSeconds[activeSecond] - 1;
                    return newSeconds;
                });
            }, 1000);
        } else if (seconds[activeSecond] === 0) {
            navigate('/results');
        }

        return () => {
            if (interval) {
                clearInterval(interval);
            }
        };
    }, [isActive, seconds, activeSecond, navigate]);

    const handleChange = (index: number) => {
        if (!isActive) {
            setActiveSecond(index);
        }
    };

    return (
        <div className='Timer'>
            {seconds.map((item: number, index: number) => (
                <p
                    key={index}
                    onClick={() => handleChange(index)}
                    className={index === activeSecond ? 'active' : 'seconds'}>
                    {item}
                </p>
            ))}
        </div>
    );
};

export default Timer;