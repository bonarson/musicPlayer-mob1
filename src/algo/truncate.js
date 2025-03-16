
export const truncateText = (text, maxLength = 30) => {
    if (!text) return '';

    const extension = text.slice(-4); 
    const baseText = text.slice(0, maxLength - 4); 

    return text.length > maxLength ? `${baseText }...${""} ${ extension }` : text;
};

export const truncateTextHeader = (text, maxLength = 30) => {
    if (!text) return '';

    const extension = text.slice(-4); 
    const baseText = text.slice(0, maxLength - 4); 

    return text.length > maxLength ? `${baseText }...${""} ` : text;
};
