// src/utils/youtube.js
export const getYoutubeVideoId = (url) => {
    if (!url || typeof url !== "string") return "";
    const youtubeRegex =
        /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?|shorts|live)\/|watch\?v=)|youtu\.be\/)([A-Za-z0-9_-]{11})/i;
    const match = url.match(youtubeRegex);
    return match ? match[1] : "";
};

export const getYoutubeEmbedUrl = (url) => {
    const videoId = getYoutubeVideoId(url);
    return videoId ? `https://www.youtube.com/embed/${videoId}` : "";
};

export const getYoutubeThumbnail = (url) => {
    const videoId = getYoutubeVideoId(url);
    if (!videoId) return "";

    const maxResUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
    return maxResUrl;
};
