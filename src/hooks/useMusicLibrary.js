
import * as MediaLibrary from "expo-media-library";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAssets, setQueue } from "../features/queue/queueSlice";

const useMusicLibrary = (sortBy = MediaLibrary.SortBy.default) => {
    const [lastMusicAsset, setLastMusicAsset] = useState({});
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const assets = useSelector((state) => state.queue.assets);
    const dispatch = useDispatch();


    useEffect(() => {
        getAudios()
    }, [])

    const getAudios = async () => {
        const results = await MediaLibrary.getAssetsAsync({
            first: 20,
            mediaType: MediaLibrary.MediaType.audio,
            sortBy: sortBy,
        });

        dispatch(setAssets(results.assets));
        dispatch(setQueue(results.assets));
        setLastMusicAsset(results.endCursor);
    };
    const loadMore = async () => {
        setIsLoadingMore(true);
        const results = await MediaLibrary.getAssetsAsync({
            first: 20,
            mediaType: MediaLibrary.MediaType.audio,
            sortBy: sortBy,
            after: lastMusicAsset,

        });

        const newAssets = [...assets, ...results.assets];
        dispatch(setAssets(newAssets));
        dispatch(setQueue(newAssets));
        setLastMusicAsset(results.endCursor);
        setIsLoadingMore(false);
    };
    return { assets, isLoadingMore, loadMore };
};

export default useMusicLibrary;