export const replaceUrlWidthHeight = (url, width, height) => {
    url = url.replace("{width}", width);
    url = url.replace("{height}", height);
    return url;
};

export const removeUnneccessaryTitle = (title) => {
    let splittedTitle = title.split(".");
    return splittedTitle.length >= 2 ? splittedTitle[1].trim() : title;
};

export const extractStringToArray = (value) => {
    return value.split(",");
};
