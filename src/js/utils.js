const _normalizeArray = (arr) => {
    // Helper function to check if a single cell is considered empty
    const isEmpty = el => Array.isArray(el) ? _normalizeArray(el) : el === null || el === undefined;

    // Check if every cell in the array is empty
    return Array.isArray(arr) && arr.every(isEmpty);
}

export const normalizeArray = (arr) => {
    // If the array is empty, return an empty array
    let nArray = [];
    try {
        nArray = _normalizeArray(arr) ? [] : arr;
    } catch(e) {
        console.warn("normalizing array function failed with errors: ", e)
    }

    return nArray;
}