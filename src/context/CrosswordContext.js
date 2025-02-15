import createDataContext from "./createDataContext";
import axiosInstance from "../api/axiosInstance";

const crosswordReducer = (state, action) => {
    switch (action.type) {
        case "get_crossword":
            return { crosswordData: action.payload };
        case "update_crossword":
            return { crosswordData: action.payload };
        case "clear_crossword":
            return { crosswordData: {} };
        case "reveal_letter":
            return { crosswordData: action.payload };
        case "update_crossword_help":
            return { crosswordData: action.payload };
        default:
            return state;
    }
};

const getCrossword = (dispatch) => async () => {
    try {
        const response = await axiosInstance.post("/createCrossword");
        dispatch({ type: "get_crossword", payload: response.data });
    } catch (err) {
        console.error("Error fetching crossword data:", err);
        dispatch({
            type: "add_error",
            payload: "Something went wrong with fetching crossword data",
        });
    }
};

const updateCrossword = (dispatch) => async (crossword) => {
    try {
        const response = await axiosInstance.post("/updateCrossword", { data: crossword });
        dispatch({ type: "update_crossword", payload: crossword });
        return response.data;
    } catch (err) {
        console.error("Failed to notify server:", err);
        return null;
    }
};

const updateCrosswordHelp = (dispatch) => async (crossword) => {
    try {
        const response = await axiosInstance.post("/updateCrosswordHelp", { data: crossword });
        dispatch({ type: "update_crossword_help", payload: crossword });
        return response.data;
    } catch (err) {
        console.error("Failed to notify server:", err);
        return null;
    }
};

const clearCrossword = (dispatch) => () => {
    dispatch({ type: "clear_crossword" });
};

const revealLetter = (dispatch) => async (crossword) => {
    let result = findRandomLetter(dispatch, crossword);
    while (!result.helped) {
        result = findRandomLetter(dispatch, result.crossword);
    }
    let response = await getHelp(dispatch)(result.crossword);
    // console.log(`response is ${JSON.stringify(response.data)}`);
    if (!response.data) return false;
    crossword.help = [...crossword.help, { wordIndex: result.wordIndex, letterIndex: result.letterIndex }];
    dispatch({ type: "reveal_letter", payload: crossword });
    return result;
};

const getHelp = (dispatch) => async (crossword) => {
    try {
        let response = await axiosInstance.post("/getHelp", { data: crossword });
        console.log(`get help response points is ${JSON.stringify(response.data.points)}`);
        dispatch({ type: "get_help", payload: { crossword } });
        return response;
    } catch (err) {
        console.error("Failed to notify server:", err);
    }
};

const findRandomLetter = (dispatch, crossword) => {
    let placedWords = crossword.words.filter(word => word.placed && word.found === false);
    let placedWordIndex = Math.floor(Math.random() * placedWords.length);
    let word = placedWords[placedWordIndex];
    let wordIndex = crossword.words.findIndex(w => w === word);
    let letterIndex = Math.floor(Math.random() * word.text.length);
    if (!checkIfHelped(crossword, wordIndex, letterIndex)) {
        return { helped: true, crossword, letter: word.text[letterIndex], letterIndex, wordIndex };
    } else {
        return { helped: false, crossword };
    }
}

const checkIfHelped = (crossword, wordIndex, letterIndex) => {
    return crossword.help.some(help => help.wordIndex === wordIndex && help.letterIndex === letterIndex);
};

export const { Provider, Context } = createDataContext(
    crosswordReducer,
    { getCrossword, updateCrossword, clearCrossword, revealLetter, updateCrosswordHelp },
    { crosswordData: {} }
);