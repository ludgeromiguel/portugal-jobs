function encodeQueryData(data: { [key: string]: string }) {
    const queryStrings = [];
    for (let query in data) {
        if (!data[query]) continue;
        queryStrings.push(encodeURIComponent(query) + '=' + encodeURIComponent(data[query]));
    }
    return `?${queryStrings.join('&')}`
}

export default encodeQueryData;