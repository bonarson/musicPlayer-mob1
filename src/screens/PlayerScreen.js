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



const PlayerScreen = ({ route }) => {
    const dispatch = useDispatch();

    // Récupération des données de la route
    const { id, uri, artwork, artist, filename, title, duration } = route.params;

    const assets = useSelector((state) => state.queue.assets);
    const queue = useSelector((state) => state.queue.queue);
    const shuffleMode = useSelector((state) => state.queue.shuffleMode);
    const audioState = useSelector((state) => state.queue.audioState);
    const currentPlayingAudio = useSelector(
        (state) => state.queue.currentPlayingAudio
    )
    const sound = useSelector((state) => state.queue.sound);

    const favorites = useSelector(state => state.storage.favorites);
    const recentlyPlayed = useSelector(state => state.storage.recentlyPlayed);
    const mostPlayed = useSelector(state => state.storage.mostPlayed);


    // État local pour la chanson en cours
    const [currentSong, setCurrentSong] = useState({
        id, uri, artwork, artist, filename, title, duration,
    });

    useEffect(() => {
        if (!currentPlayingAudio || currentPlayingAudio.id !== currentSong.id) {
            initAudio();
        }

        dispatch(setCurrentPlayingAudio(currentSong));

        if (currentSong) {
            updateRecentlyPlayed(); // Met à jour les chansons récemment écoutées
            updateMostPlayed();     // Met à jour les chansons les plus écoutées
        }
    }, [currentSong, currentPlayingAudio]); // Dépendance pour la mise à jour lorsque `currentSong` ou `currentPlayingAudio` change




    useEffect(() => {
        dispatch(setQueue(shuffleMode ? shuffle(queue) : assets));

    }, [shuffleMode]);




    const initAudio = async () => {
        try {
            if (sound) {
                await sound.stopAsync();
                await sound.unloadAsync();
                dispatch(setAudioState({ state: "paused", isLooping: false, position: 0 }));
            }
            // Encoder l'URI pour éviter les erreurs dues aux caractères spéciaux
            const encodedUri = encodeURI(currentSong.uri);
            console.log("Lecture Encoder  de :", encodedUri); // Ajout du log ici

            const { sound: newSound } = await Audio.Sound.createAsync(
                { uri: encodedUri },  // Utilisation de l'URI encodée
                { shouldPlay: true },
                (playbackStatus) => {
                    if (playbackStatus.isLoaded) {
                        dispatch(setAudioState({
                            state: playbackStatus.isPlaying ? "playing" : "paused",
                            isLooping: playbackStatus.isLooping,
                            position: Math.floor(playbackStatus.positionMillis / 1000),
                        })
                        );
                    }

                    if (playbackStatus.didJustFinish) {
                        if (!playbackStatus.isLooping) {
                            skipNext();
                        }
                    }
                }

            );

            dispatch(setSound(newSound));
            dispatch(
                setAudioState({
                    ...audioState,
                    state: "playing",
                })
            )
        } catch (error) {
            console.error("Erreur lors de l'initialisation de l'audio :", error);
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
            console.error("Erreur lors du contrôle de la lecture :", error);
        }
    };

    const seek = async (value) => {
        if (!sound) return;
        try {
            await sound.setPositionAsync(value * 1000);
        } catch (error) {
            console.error("Erreur lors du changement de position :", error);
        }
    };

    const findCurrentSongIndex = () => queue.findIndex((track) => track.id === currentSong.id);

    const skipNext = () => {
        const index = findCurrentSongIndex();
        if (index !== -1) {
            const nextSong = index === queue.length - 1 ? queue[0] : queue[index + 1];
            console.log("Chanson suivante :", nextSong.uri); // Log la prochaine chanson
            setCurrentSong(nextSong);
        }
    };

    const skipPrevious = () => {
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
                <TouchableOpacity>
                    <MaterialCommunityIcons name="dots-vertical" color={colors.white} size={40} />
                </TouchableOpacity>
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
        width: '80%',
        height: 300,
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
});