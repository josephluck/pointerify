/**
 * Returns a function which calls the provided function
 * only after the specified interval has elapsed between
 * function calls. An optional `immediate` boolean will
 * cause the provided function to be called once immediately
 * before waiting.
 */
declare function debounce(fn: (e) => any, interval: number, immediate?: boolean): () => any;
export default debounce;
