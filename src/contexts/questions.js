import { createContext, useState } from "react";
import usePersistState from '../hooks/usePersistState'

export const Questions_data = createContext(null);

function Context({ children }) {
    let [questions, setQuestions] = useState([]);
    let [results, setResults] = useState({ correctAnswers: 0 });

    return (
        <Questions_data.Provider value={{
            questions,
            setQuestions,
            results,
            setResults
        }}>
            {children}
        </Questions_data.Provider>
    );
}

export default Context;