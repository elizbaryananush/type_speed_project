import React, { useEffect, useRef, useState } from 'react'
import { quotes } from '../dbs/quotes'
import '../css/TypingTextArea.scss'
import { useDispatch, useSelector } from 'react-redux';
import { setImportedText, setWpm, setWordsArray, setMistakesCount } from '../redux/typingSlice';

function TypingTextArea({ isActive }) {
    const dispatch = useDispatch()
    const { importedText, time, wordsArray } = useSelector(state => state.typing)
    const [currentWordIndex, setCurrentWordIndex] = useState(0);// active word index
    const [result, setResult] = useState([]) // results as span html elements
    const inputRefs = useRef([]);

    //getting the sentence/quote
    useEffect(() => {
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

        dispatch(setWordsArray(randomQuote.split(' ')));

        setResult(Array.from({ length: randomQuote.split(' ').length }, () => []))

        inputRefs.current[0]?.focus();
    }, []);

    //handling all keydowns
    const handleKeyDown = (e) => {

        //handling space key
        if (e.key === ' ') {
            e.preventDefault();

            //changing active word index
            if (importedText.length > 0 && currentWordIndex < wordsArray.length - 1) {
                setCurrentWordIndex(currentWordIndex + 1);
            }

            //adding fake mistake letters , instead of the letters that are missing, if the word is not complete , but space clicked․
            if (importedText[currentWordIndex] && importedText[currentWordIndex].length !== wordsArray[currentWordIndex].length) {
                const difference = wordsArray[currentWordIndex].length - importedText[currentWordIndex].length;

                if (difference > 0) {
                    const newImportedText = [...importedText];
                    newImportedText[currentWordIndex] += '*'.repeat(difference);
                    dispatch(setImportedText(newImportedText));
                }
            }
        }

        //handling delete or backspace key
        else if (e.key === 'Delete' || e.key === 'Backspace') {

            //if there's no imported letters in active word changing the active word
            if (!importedText[currentWordIndex] && currentWordIndex > 0) {
                e.preventDefault()
                setCurrentWordIndex(currentWordIndex - 1)
            } else {
                //deleting span elements and letters in importedText
                let updatedArray = new Array(...result)

                updatedArray[currentWordIndex].pop()

                const newImportedText = [...importedText]
                newImportedText[currentWordIndex].slice(0, -1)
                dispatch(setImportedText(newImportedText))

                console.log(updatedArray[currentWordIndex].pop());// I don't know why , but delete is not working without these , please just leave it there :D

                setResult(updatedArray)
            }
        }

        //prevents enter click
        else if (e.key === 'Enter') {
            e.preventDefault()
        }
    };

    //handling every letter
    const handleChange = (index, e) => {

        const newImportedText = [...importedText];
        newImportedText[index] = e.target.value;

        const text = e.target.value;
        const letterIndex = text.length - 1;

        //making span element for every letter and pushinig it into results array
        const newArray = [...result];

        newArray[index].push(
            <span
                key={[index] + [letterIndex]}
                spellCheck='false'
                className={wordsArray[index][letterIndex] === text[letterIndex] ? 'correct' : 'wrong'}>{wordsArray[index][letterIndex]}
            </span>
        );

        //

        //making fake space , so when people write longer than word active word is changed to the next .
        if (text.length > wordsArray[index].length) {
            setCurrentWordIndex(currentWordIndex + 1)
        } else {
            dispatch(setImportedText(newImportedText));
            dispatch(setMistakesCount({
                importedText,
                wordsArray
            }))
            dispatch(setWpm({
                importedText,
                time
            }))
        }
    };

    //text cursor/blinking cursor settings
    useEffect(() => {
        inputRefs.current[currentWordIndex]?.focus();
    }, [currentWordIndex]);

    useEffect(() => {
        inputRefs.current[0]?.focus();
    }, [isActive]);

    return (
        <div className='TypingTextArea'>
            {/* 
            This is a 3-layer system, where the bottom layer is the sentence, on top of it is the styled text, which is a copy of the sentence with spans, and at the top is the input/textarea, which is invisible.
            */}
            {
                !isActive && <div className='blur'>
                    <div className="text">
                        <p>press</p> <div>space</div> <p>to start</p>
                    </div>
                </div>
            }

            {wordsArray.map((item, index) => (
                <div key={index} className="word">
                    <div readOnly className='quoteText'>
                        {item}
                    </div>
                    <textarea
                        spellCheck='false'
                        className={`importText ${index === currentWordIndex ? 'active' : ''}`}
                        onKeyDown={handleKeyDown}
                        onClick={e => inputRefs.current[0]?.focus()}
                        ref={e => inputRefs.current[index] = e}
                        value={importedText[index]}
                        onChange={(e) => {
                            handleChange(index, e)
                        }}
                    ></textarea>
                    <div className="importText">
                        {
                            result && result[index] && result[index].map((item, index) => {
                                return item
                            })
                        }
                    </div>
                </div>
            ))}


        </div>
    );
}

export default TypingTextArea;
