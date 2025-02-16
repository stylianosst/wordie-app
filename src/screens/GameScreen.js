import React, { useContext, useEffect, useState, useRef } from 'react';
import { View, ImageBackground, TouchableOpacity, AppState, Text, StyleSheet, Animated, Easing, Alert, Platform } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import CircleKeyboard from '../components/CircleKeyboard';
import { Context as KeyboardContext } from '../context/KeyBoardContext';
import { Context as CrosswordContext } from '../context/CrosswordContext';
import { Context as AuthContext } from '../context/AuthContext';
import CircleIcon from '../components/CircleIcon';
import PointsLayout from '../components/PointsLayout';
import styles from '../styles/GameScreenStyles';
import { levels } from '../services/lettersService';

const image = { uri: 'https://www.planetware.com/wpimages/2020/02/greece-in-pictures-beautfiul-places-to-photograph-santorini-oia.jpg' };

const GameScreen = ({ navigation }) => {
    const isDesktop = Platform.OS === 'web';
    const { state, clearKeyboardData } = useContext(KeyboardContext);
    const { state: authState, updateUserInfo, getPlayerInfo } = useContext(AuthContext);
    const { state: crosswordState, getCrossword, updateCrossword, updateCrosswordHelp, clearCrossword, revealLetter } = useContext(CrosswordContext);
    let { keyboardData } = state;
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [refresh, setRefresh] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [timer, setTimer] = useState(0);
    const [isModalVisible, setModalVisible] = useState(false);
    const [levelInfo, setLevelInfo] = useState(null);
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const [playerInfoRefresh, setPlayerInfoRefresh] = useState(false);

    useEffect(() => {
        console.log('useEffect called in GameScreen');
        getPlayerInfo();
    }, [playerInfoRefresh]);

    const triggerPlayerInfoRefresh = () => {
        setPlayerInfoRefresh(prev => !prev);
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                await getCrossword();
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch crossword data');
                setLoading(false);
            }
        };
        fetchData();
    }, [refresh]);

    useEffect(() => {
        const startTimer = () => {
            const startTime = Date.now() - (crosswordState.crosswordData.info.time * 1000);
            setTimer(setInterval(() => {
                setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
            }, 1000));
        };

        const stopTimer = () => {
            if (timer) {
                clearInterval(timer);
                setTimer(null);
            }
        };

        if (crosswordState.crosswordData && crosswordState.crosswordData.info) {
            setElapsedTime(crosswordState.crosswordData.info.time);
            startTimer();
        }

        return () => {
            stopTimer();
        };
    }, [crosswordState.crosswordData]);

    useEffect(() => {
        const handleAppStateChange = (nextAppState) => {
            if (nextAppState.match(/inactive|background/)) {
                if (crosswordState.crosswordData && crosswordState.crosswordData.info) {
                    crosswordState.crosswordData.info.time = elapsedTime;
                    updateCrossword(crosswordState.crosswordData);
                }
                if (timer) {
                    clearInterval(timer);
                    setTimer(null);
                }
            } else if (nextAppState === 'active') {
                const startTime = Date.now() - (crosswordState.crosswordData.info.time * 1000);
                setTimer(setInterval(() => {
                    setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
                }, 1000));
            }
        };

        const subscription = AppState.addEventListener('change', handleAppStateChange);

        return () => {
            subscription.remove();
        };
    }, [elapsedTime, crosswordState.crosswordData, timer]);

    const resetTimer = () => {
        if (timer) {
            clearInterval(timer);
            setTimer(null);
        }
        setElapsedTime(0);
    };

    const triggerRefresh = () => {
        setLoading(true);
        clearCrossword();
        setTimeout(() => {
            console.log('triggerRefresh called');
            setRefresh(prev => !prev);
        }, 200);
    };

    const triggerRevealLetter = async (crosswordData) => {
        try {
            if (Platform.OS === 'web') {
                const confirm = window.confirm('Θα χρησιμοποιήσεις 100 πόντους για την αποκάλυψη ενός γράμματος. ΝΑΙ ή ΟΧΙ');
                if (confirm) {
                    let result = await revealLetter(crosswordData);
                    console.log(`triggerRevealLetter result is ${JSON.stringify(result)}`);
                    if (!result.helped) {
                        alert('Χρειάζεστε 100 πόντους');
                    } else {
                        await updateUserInfo();
                        if (authState.info) {
                            await updateCrosswordHelp(crosswordData);
                        }
                        console.log(`Updated authState is ${JSON.stringify(authState)}`);
                    }
                }
            } else {
                Alert.alert(
                    'Αποκάλυψη Γράμματος',
                    'Θα χρησιμοποιήσεις 100 πόντους για την αποκάλυψη ενός γράμματος. ΝΑΙ ή ΟΧΙ',
                    [
                        { text: 'ΟΧΙ', onPress: () => { }, style: 'cancel' },
                        {
                            text: 'ΝΑΙ', onPress: async () => {
                                let result = await revealLetter(crosswordData);
                                console.log(`triggerRevealLetter result is ${JSON.stringify(result)}`);
                                if (!result.helped) {
                                    alert('Χρειάζεστε 100 πόντους');
                                } else {
                                    await updateUserInfo();
                                    if (authState.info) {
                                        await updateCrosswordHelp(crosswordData);
                                    }
                                    console.log(`Updated authState is ${JSON.stringify(authState)}`);
                                }
                            }
                        },
                    ],
                    { cancelable: false }
                );
            }
        } catch (error) {
            console.error('Error revealing letter:', error);
        }
    };
    const showModal = () => {
        setModalVisible(true);
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            easing: Easing.ease,
            useNativeDriver: true,
        }).start();
    };

    const hideModal = () => {
        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 1000,
            easing: Easing.ease,
            useNativeDriver: true,
        }).start(() => {
            setModalVisible(false);
        });
    };

    const checkWordMatch = async () => {
        for (const word of crosswordState.crosswordData.words) {
            let update = false;
            if (word.text === keyboardData && (!word.found && word.placed)) {
                if (word.placed == true) {
                    word.found = true;
                    update = true;
                }
            }
            if (word.text === keyboardData && !word.extraFound && !word.placed) {
                alert('Επιπλέον λέξη βρέθηκε: ' + keyboardData);
                word.extraFound = true;
                update = true;
            }
            if (update) {
                crosswordState.crosswordData.info.time = elapsedTime;
                let response = await updateCrossword(crosswordState.crosswordData);
                console.log(`updateCrossword response is ${JSON.stringify(response)}`);
                if (response && response.levelInfo) {
                    crosswordState.crosswordData.info.time = response.crossword.info.time;
                    setLevelInfo(response.levelInfo);
                }
                if (crosswordState.crosswordData.words.filter(word => word.placed).every(word => word.found)) {
                    console.log('All words found');
                    showModal();
                    console.log('Modal shown');
                    resetTimer();
                    console.log('Timer reset');
                    updateUserInfo();
                    console.log('User info updated');
                    triggerRefresh();
                    console.log('Refresh triggered');
                }
                triggerPlayerInfoRefresh();
                clearKeyboardData();
            }
        }
    };
    const getNextLevelElo = (currentElo) => {
        const currentLevel = levels.find(level => currentElo >= level.minElo && currentElo <= level.maxElo);
        const nextLevel = levels.find(level => level.level === currentLevel.level + 1);
        return nextLevel ? parseInt(nextLevel.minElo) : null;
    };
    const getProgress = (currentElo, nextLevelElo) => {
        return parseInt((currentElo / nextLevelElo) * 100);
    };
    if (loading) {
        return (
            <SafeAreaProvider forceInset={{ top: 'always' }}>
                <ImageBackground
                    source={isDesktop ? require('../../assets/santorini2.png') : require('../../assets/santorini.png')}
                    style={styles.image}>
                    <View style={styles.wordContainer}>
                        <Text style={styles.loading}>Παρακαλώ περιμένετε, φτιάχνουμε ένα σταυρόλεξο ακριβώς στα μέτρα σας</Text>
                    </View>
                </ImageBackground>
            </SafeAreaProvider>);
    }

    if (error) {
        return <View><Text>{error}</Text></View>;
    }

    const { grid, words, keys, help } = crosswordState.crosswordData || {};
    if (grid && words && help) {
        initializeGrid(grid, words, help);
        updateGridWithFoundWords(grid, words);
    }

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes} λεπτά και ${remainingSeconds} δευτερόλεπτα`;
    };

    const formatTime2 = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes} min ${remainingSeconds} sec`;
    };

    return (
        <SafeAreaProvider forceInset={{ top: 'always' }}>
            <ImageBackground
                source={isDesktop ? require('../../assets/santorini2.png') : require('../../assets/santorini.png')}
                style={styles.image}>
                {authState.info && (
                    <PointsLayout style={styles.points} icon="star" points={authState.info.points} />
                )}
                <CircleIcon style={styles.settings} icon="settings" onPress={() => navigation.navigate('Settings')} />
                <View style={styles.wordContainer}>
                    {grid && grid.map((rowData, index) => (
                        <View key={index} style={styles.wordRow}>
                            {rowData.map((cellData, cellIndex) => {
                                const borderStyle = cellData ? { borderWidth: 2, borderColor: 'white', borderRadius: 5, opacity: 0.9 } : { opacity: 0.9 };
                                return (
                                    <View key={cellIndex} style={[styles.cell, borderStyle]}>
                                        <Text style={styles.text}>{cellData}</Text>
                                    </View>
                                );
                            })}
                        </View>
                    ))}
                </View>
                <View style={styles.circleView}>
                    <View style={styles.deleteContainer}>
                        <View style={styles.textContainer}>
                            <Text style={styles.text}>
                                {keyboardData ? keyboardData : "Επιλέξτε γράμμα"}
                            </Text>
                        </View>
                        {state.keyboardData && state.keyboardData.length >= 3 && (
                            <CircleIcon style={styles.delete} icon="search" onPress={checkWordMatch} />
                        )}
                        <CircleIcon style={styles.delete} icon="delete" onPress={clearKeyboardData} />
                    </View>
                    <CircleIcon style={styles.lightbulb} icon="lightbulb" onPress={() => triggerRevealLetter(crosswordState.crosswordData)} />
                    <CircleKeyboard keys={keys}>
                    </CircleKeyboard>
                </View>
                {isModalVisible && (
                    <Animated.View style={[styles.modal, { opacity: fadeAnim }]}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalText}>Συγχαρητήρια! Βρήκατε όλες τις λέξεις!!</Text>
                            <Text style={styles.modalText}>Σε ένα σταυρόλεξο με σκορ {levelInfo.score} σε χρόνο {formatTime(levelInfo.time)}</Text>
                            {levelInfo && <Text style={styles.modalText}>Από elo: {parseInt(levelInfo.oldElo)} σε elo: {parseInt(levelInfo.newElo)}</Text>}
                            {levelInfo && <Text style={styles.modalText}>Από επίπεδο: {levelInfo.oldLevel} σε επίπεδο: {levelInfo.newLevel}</Text>}
                            {levelInfo && <Text style={styles.modalText}>Χρειάζεστε {parseInt(getNextLevelElo(levelInfo.newElo) - levelInfo.newElo + 1)} ELO για το επόμενο επίπεδο</Text>}
                            {levelInfo && (
                                <View style={styles.progressBarContainer}>
                                    <View style={[styles.progressBar, { width: `${getProgress(levelInfo.newElo, getNextLevelElo(levelInfo.newElo))}%` }]} />
                                    <Text style={styles.progressText}>{parseInt(levelInfo.newElo)} / {getNextLevelElo(levelInfo.newElo)}</Text>
                                </View>
                            )}
                            <TouchableOpacity onPress={hideModal}>
                                <Text style={styles.modalButton}>OK</Text>
                            </TouchableOpacity>
                        </View>
                    </Animated.View>
                )}
                <View style={styles.timerContainer}>
                    <Text style={styles.timerText}>{formatTime2(elapsedTime)}</Text>
                </View>
            </ImageBackground>
        </SafeAreaProvider>
    );
};

const initializeGrid = (grid, words, help) => {
    words.forEach(word => {
        if (!word.placed) return;
        const { start, orientation, text: wordText } = word;
        let wordIndex = words.findIndex(w => w === word);
        let [col, row] = start;
        for (let i = 0; i < wordText.length; i++) {
            if (orientation === "horizontal") {
                if (!grid[row]) {
                    grid[row] = [];
                }
                if (!grid[row][col + i]) {
                    grid[row][col + i] = " ";
                }
            } else if (orientation === "vertical") {
                if (!grid[row + i]) {
                    grid[row + i] = [];
                }
                if (!grid[row + i][col]) {
                    grid[row + i][col] = " ";
                }
            }
            if (help.some(help => help.wordIndex === wordIndex && help.letterIndex === i)) {
                if (orientation === "horizontal") {
                    grid[row][col + i] = wordText[i];
                } else if (orientation === "vertical") {
                    grid[row + i][col] = wordText[i];
                }
            }
        }
    });
};

const updateGridWithFoundWords = (grid, words) => {
    words.forEach(word => {
        const { start, orientation, text: wordText, found, placed } = word;
        if (!found) return;
        if (!placed) return;
        let [col, row] = start;
        for (let i = 0; i < wordText.length; i++) {
            if (orientation === "horizontal") {
                grid[row][col + i] = wordText[i];
            } else if (orientation === "vertical") {
                grid[row + i][col] = wordText[i];
            }
        }
    });
};

export default GameScreen;