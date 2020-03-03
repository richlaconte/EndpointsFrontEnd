export const addRecent = (url, content) => {
    return {
        type: 'ADD_RECENT',
        url: url,
        content: content
    }
}