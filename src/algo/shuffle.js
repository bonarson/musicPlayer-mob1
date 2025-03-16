export const shuffle = (queue) => {
    const newQueue = [...queue];
    newQueue.sort(() => Math.random() - 0.5);
    return newQueue;
};

// export const shuffle = (queue) => {
//     const newQueue = [...queue];
//     for (let i = newQueue.length - 1; i > 0; i--) {
//         const j = Math.floor(Math.random() * (i + 1));
//         [newQueue[i], newQueue[j]] = [newQueue[j], newQueue[i]];  // Echange
//     }
//     return newQueue;
// };
