
export const formatDuration = (durationInSeconds) => {
    const hours = Math.floor(durationInSeconds / 3600); 
    const minutes = Math.floor((durationInSeconds % 3600) / 60); 
    const seconds = Math.floor(durationInSeconds % 60); 

    return `${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};
