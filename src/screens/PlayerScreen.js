import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import { Audio } from "expo-av";
import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { formatDuration } from "../algo/FormatDuration";
import { shuffle } from "../algo/shuffle";
import { truncateText, truncateTextHeader } from "../algo/truncate";
import AppHeader from "../components/AppHeader";
import AppText from "../components/AppText";
import ArtWorkImage from "../components/ArtworkImage";
import Screen from "../components/Screen";
import { setAudioState, setCurrentPlayingAudio, setQueue, setShuffleMode, setSound } from "../features/queue/queueSlice";
import { setFavorites, setMostPlayed, setRecentlyPlayed } from "../features/storage/storageSlice";
import { colors } from "../theme/Colors";

import * as Notifications from 'expo-notifications';


import * as TaskManager from "expo-task-manager";

// Définir une tâche en arrière-plan
TaskManager.defineTask("BACKGROUND_AUDIO", async ({ data, error }) => {
    if (error) {
        console.log(error);
        return;
    }

    const { eventName } = data;

    if (eventName === "play") {
        await sound.playAsync();
    } else if (eventName === "pause") {
        await sound.pauseAsync();
    } else if (eventName === "next") {
        skipNext();
    } else if (eventName === "previous") {
        skipPrevious();
    }
});

const PlayerScreen = ({ route }) => {
    const dispatch = useDispatch();

    // Récupération des données de la route
    const { id, uri, artwork, artist, filename, title, duration } = route.params;
    const assets = useSelector((state) => state.queue.assets);
    const queue = useSelector((state) => state.queue.queue);
    const shuffleMode = useSelector((state) => state.queue.shuffleMode);
    const audioState = useSelector((state) => state.queue.audioState);
    const currentPlayingAudio = useSelector((state) => state.queue.currentPlayingAudio);
    const sound = useSelector((state) => state.queue.sound);

    const favorites = useSelector(state => state.storage.favorites);
    const recentlyPlayed = useSelector(state => state.storage.recentlyPlayed);
    const mostPlayed = useSelector(state => state.storage.mostPlayed);

    const [currentSong, setCurrentSong] = useState({
        id, uri, artwork, artist, filename, title, duration,
    });

    const [showMenu, setShowMenu] = useState(false);

    useEffect(() => {
        const setupAudio = async () => {
            if (!currentPlayingAudio || currentPlayingAudio.id !== currentSong.id) {
                await initAudio(); 
                dispatch(setCurrentPlayingAudio(currentSong));
            }
        };

        setupAudio();

        if (currentSong) {
            updateRecentlyPlayed();
            updateMostPlayed();
        }
    }, [currentSong]); 


    useEffect(() => {
        dispatch(setQueue(shuffleMode ? shuffle(queue) : assets));
    }, [shuffleMode]);


    useEffect(() => {
        const askNotificationPermissions = async () => {
            const { status } = await Notifications.requestPermissionsAsync();
            if (status !== 'granted') {
                console.log('Permission de notification refusée');
            }
        };

        askNotificationPermissions();
    }, []);



    const setupBackgroundAudio = async () => {
        await Audio.setAudioModeAsync({
            allowsRecordingIOS: false,
            staysActiveInBackground: true,
            playsInSilentModeIOS: true,
        });

        await Audio.EventEmitter.addListener("playback-status-update", async (status) => {
            if (status.didJustFinish) {
                skipNext();
            }
        });
    };


    // const initAudio = async () => {
    //     try {
    //         if (sound) {
    //             await sound.stopAsync();
    //             await sound.unloadAsync();
    //             dispatch(setAudioState({ state: "paused", isLooping: false, position: 0 }));
    //         }
    //         // Encoder l'URI pour éviter les erreurs dues aux caractères spéciaux
    //         const encodedUri = encodeURI(currentSong.uri);
    //         console.log("Lecture Encoder  de :", encodedUri); // Ajout du log ici

    //         const { sound: newSound } = await Audio.Sound.createAsync(
    //             { uri: encodedUri },  // Utilisation de l'URI encodée
    //             { shouldPlay: true },
    //             (playbackStatus) => {
    //                 if (playbackStatus.isLoaded) {
    //                     dispatch(setAudioState({
    //                         state: playbackStatus.isPlaying ? "playing" : "paused",
    //                         isLooping: playbackStatus.isLooping,
    //                         position: Math.floor(playbackStatus.positionMillis / 1000),
    //                     })
    //                     );
    //                 }

    //                 if (playbackStatus.didJustFinish) {
    //                     if (!playbackStatus.isLooping) {
    //                         skipNext();
    //                     }
    //                 }
    //             }

    //         );

    //         dispatch(setSound(newSound));
    //         dispatch(
    //             setAudioState({
    //                 ...audioState,
    //                 state: "playing",
    //             })
    //         )
    //     } catch (error) {
    //         console.error("Erreur lors de l'initialisation de l'audio :", error);
    //     }
    // };


    // Fonction pour demander la permission
    
    const requestNotificationPermission = async () => {
        const { status } = await Notifications.requestPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert("Permission refusée", "Activez les notifications dans les paramètres.");
            return false;
        }
        return true;
    };

    // Fonction pour envoyer la notification
    const sendSongNotification = async (filename) => {
        const hasPermission = await requestNotificationPermission();
        if (!hasPermission) return;

        await Notifications.scheduleNotificationAsync({
            content: {
                title: "Lecture de la chanson" + sound.filename,
                body: filename,
            },
            trigger: null, 
        });
    };

    const initAudio = async () => {
        try {
            if (sound) {
                await sound.stopAsync();
                await sound.unloadAsync();
                dispatch(setAudioState({ state: "paused", isLooping: false, position: 0 }));
            }

            const encodedUri = encodeURI(currentSong.uri);

            const { sound: newSound } = await Audio.Sound.createAsync(
                { uri: encodedUri },
                { shouldPlay: true },
                (playbackStatus) => {
                    if (playbackStatus.isLoaded) {
                        dispatch(setAudioState({
                            state: playbackStatus.isPlaying ? "playing" : "paused",
                            isLooping: playbackStatus.isLooping,
                            position: Math.floor(playbackStatus.positionMillis / 1000),
                        }));
                    }

                    if (playbackStatus.didJustFinish) {
                        if (!playbackStatus.isLooping) {
                            skipNext();
                        }
                    }
                }
            );

            dispatch(setSound(newSound));

            // Envoyer la notification dès qu'une chanson commence
            sendSongNotification(currentSong.filename);

            dispatch(setAudioState({ ...audioState, state: "playing" }));
        } catch (error) {
            console.log("Erreur lors de l'initialisation de l'audio :", error);
        }
    };


    const updateRecentlyPlayed = () => {
        const newRecentlyPlayed = [...recentlyPlayed];
        const index = newRecentlyPlayed.findIndex((assets) => assets.id === currentSong.id);

        if (index !== -1) {
            newRecentlyPlayed.splice(index, 1);
        }

        newRecentlyPlayed.unshift(currentSong);

        // Dispatch la mise à jour vers Redux
        dispatch(setRecentlyPlayed(newRecentlyPlayed));
    };

    const updateMostPlayed = () => {
        const newMostPlayed = [...mostPlayed];
        const index = newMostPlayed.findIndex(asset => asset.id === currentSong.id);

        if (index !== -1) {
            newMostPlayed[index] = {
                ...newMostPlayed[index],
                count: newMostPlayed[index].count + 1
            };
        } else {
            newMostPlayed.push({
                ...currentSong,
                count: 1,
            });
        }

        newMostPlayed.sort((a, b) => b.count - a.count);

        // Dispatch la mise à jour vers Redux
        dispatch(setMostPlayed(newMostPlayed));
    };


    const changePlaybackRate = async (rate) => {
        if (!sound) return;

        try {
            // Use setRateAsync to change the playback rate
            await sound.setRateAsync(rate);
        } catch (error) {
            console.log("Erreur lors du changement du taux de lecture :", error);
        }
    };


    const toggleMenu = () => {
        setShowMenu(!showMenu);  // Affiche ou masque le menu
    };

    // Liste des vitesses de lecture
    const speeds = [
        { label: 'Normal', rate: 1 },
        { label: '1.5X', rate: 1.5 },
        { label: '0.5X', rate: 0.5 },
    ];



    const togglePlay = async () => {
        if (!sound) return;
        try {
            if (audioState.state === "playing") {
                await sound.pauseAsync();
                dispatch(setAudioState({ ...audioState, state: "paused" }));
            } else {
                await sound.playAsync();
                dispatch(setAudioState({ ...audioState, state: "playing" }));
            }
        } catch (error) {
            console.log("Erreur lors du contrôle de la lecture :", error);
        }
    };

    const seek = async (value) => {
        if (!sound) return;
        try {
            await sound.setPositionAsync(value * 1000);
        } catch (error) {
            console.log("Erreur lors du changement de position :", error);
        }
    };

    const findCurrentSongIndex = () => queue.findIndex((track) => track.id === currentSong.id);

    const skipNext = () => {
        // Si la boucle est activée, recommence la chanson actuelle
        if (audioState.isLooping) {
            sound.setPositionAsync(0); // Remet à zéro la position et redémarre la chanson
            return;
        }

        const index = findCurrentSongIndex();
        if (index !== -1) {
            const nextSong = index === queue.length - 1 ? queue[0] : queue[index + 1];
            console.log("Chanson suivante :", nextSong.uri); // Log la prochaine chanson
            setCurrentSong(nextSong);
        }
    };



    const skipPrevious = () => {
        // Si la boucle est activée, recommence la chanson actuelle
        if (audioState.isLooping) {
            sound.setPositionAsync(0); // Remet à zéro la position et redémarre la chanson
            return;
        }

        const index = findCurrentSongIndex();
        if (index !== -1) {
            const prevSong = index === 0 ? queue[queue.length - 1] : queue[index - 1];
            console.log("Chanson précédente :", prevSong.uri); // Log la chanson précédente
            setCurrentSong(prevSong);
        }
    };


    const toogleLoop = async () => {
        await sound.setIsLoopingAsync(!audioState.isLooping);
    }

    const toogleShuffle = () => {
        dispatch(setShuffleMode(!shuffleMode));
    }

    const toggleFavorites = () => {
        const newFavorites = [...favorites];
        const index = newFavorites.findIndex(
            favorite => favorite.id === currentSong.id
        );

        if (index !== -1) {
            newFavorites.splice(index, 1);
        } else {
            newFavorites.unshift(currentSong);
        }

        dispatch(setFavorites(newFavorites));
    };

    return (
        <Screen>
            <AppHeader title={truncateTextHeader(currentSong.filename || currentSong.title, 25)} playListIcon />
            <View style={styles.imageContainer}>
                <ArtWorkImage artwork={currentSong.artwork} styles={styles.image} />
            </View>

            <View style={styles.songInfo}>
                <View style={styles.songDetails}>
                    <TouchableOpacity onPress={toggleFavorites}>
                        <MaterialCommunityIcons name="heart"
                            color={favorites.some(favorite => favorite.id === currentSong.id) ? colors.danger : colors.white}
                            size={40}
                        />

                    </TouchableOpacity>
                    <View style={styles.songTitleAndArtist}>
                        <AppText
                            text={truncateText((currentSong.filename || currentSong.title).toLowerCase(), 24)}
                            customStyles={styles.songTitle}
                        />

                        <AppText text={currentSong.artist || "<unknown>"} customStyles={styles.songArtist} />
                    </View>
                </View>
                <TouchableOpacity onPress={toggleMenu}>
                    <MaterialCommunityIcons name="dots-vertical" color={colors.white} size={40} />
                </TouchableOpacity>

                {/* Affichage du menu si showMenu est vrai */}
                {showMenu && (
                    <View style={styles.menu}>
                        {speeds.map((speed) => (
                            <TouchableOpacity
                                key={speed.rate}
                                onPress={() => {
                                    changePlaybackRate(speed.rate);
                                    setShowMenu(false);  // Ferme le menu après sélection
                                }}
                            >
                                <AppText text={speed.label} customStyles={styles.menuItem} />
                            </TouchableOpacity>
                        ))}
                    </View>
                )}
            </View>

            <View style={styles.songProgres}>
                <Slider
                    style={styles.Slider}
                    value={audioState.position}
                    minimumValue={0}
                    maximumValue={currentSong.duration}
                    minimumTrackTintColor="#FFFFFF"
                    maximumTrackTintColor="#080808"
                    thumbTintColor={colors.white}
                    onSlidingComplete={seek}
                />
                <View style={styles.durations}>
                    <AppText text={formatDuration(audioState.position)} />
                    <AppText text={formatDuration(currentSong.duration)} />
                </View>
            </View>

            <View style={styles.controls}>
                <TouchableOpacity onPress={toogleShuffle}>

                    <MaterialCommunityIcons name="shuffle-variant"
                        color={shuffleMode ? colors.white : colors.light

                        }
                        size={30}
                    />
                </TouchableOpacity>

                <View style={styles.songControls}>
                    <TouchableOpacity onPress={skipPrevious}>
                        <MaterialCommunityIcons name="skip-previous" color={colors.white} size={30} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={togglePlay}>
                        <MaterialCommunityIcons name={audioState.state === "playing" ? "pause" : "play"} color={colors.white} size={50} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={skipNext}>
                        <MaterialCommunityIcons name="skip-next" color={colors.white} size={30} />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity onPress={toogleLoop}>
                    <MaterialIcons name={audioState.isLooping ? "sync" : "sync-alt"} color={colors.white} size={30} />
                </TouchableOpacity>
            </View>
        </Screen>
    );
};

export default PlayerScreen;

const styles = StyleSheet.create({
    imageContainer: {

    },
    image: {
        width: '50%',
        height: 250,
        alignSelf: 'center',
        borderRadius: 30,
    },
    songInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 4,
        marginVertical: 40,
        marginLeft: 10,


    },
    songDetails: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    songTitleAndArtist: {
        marginLeft: 20,
    },
    songArtist: {
        fontWeight: 'normal',

    },
    songTitle: {
        fontSize: 16,
        fontWeight: 'normal',

    },
    songProgres: {
        paddingHorizontal: 20,
    },
    durations: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    controls: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        justifyContent: 'space-between',
        marginTop: 30,

    },
    songControls: {
        flexDirection: 'row',
        alignItems: "center",
    },
    // Autres styles
    menu: {
        flex: 1,
        position: 'absolute',
        top: -140,
        right: 10,
        backgroundColor: colors.primary,
        borderRadius: 20,
        padding: 10,
        width: 70,
    },
    menuItem: {
        color: colors.white,
        paddingVertical: 10,
        textAlign: 'center',
    },
});