import * as MusicLibrary from "expo-media-library";
import { useEffect, useState } from "react";
import { View } from "react-native";
import LibraryFlatlist from "../components/LibraryFlatlist";



const Genres = () => {
    const [genres, setGenres] = useState([]);

    useEffect(() => {
        MusicLibrary.getAlbumsAsync()
            .then((genres) => {
                setGenres(genres);
            })
    }, [])

    return (
        <View style={{ flex: 1 }}>
            <LibraryFlatlist data={genres} dataType={"genres"} />
        </View>
    )
}
export default Genres;