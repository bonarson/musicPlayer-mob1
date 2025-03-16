import { FlatList } from "react-native";
import Song from "./Song";

const SongsList = ({ songs,...otherProps }) => {
    return (
        <FlatList
            data={songs}
            extraData={songs}
            renderItem={({ item }) => <Song {...item} />}
            keyExtractor={(_,index) => index.toString()}
            showsVerticalScrollIndicator={false}
            {...otherProps}
        />
    )
}
export default SongsList;