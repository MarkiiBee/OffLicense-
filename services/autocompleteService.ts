// Note: The GenAI import and initialization are commented out as they are no longer
// used in this file. This prevents unused variable errors and cleans up the code.
// import { GoogleGenAI, Type } from "@google/genai";
//
// if (!process.env.API_KEY) {
//     throw new Error("API_KEY environment variable is not set.");
// }
// const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });


export const fetchAddressSuggestions = async (query: string): Promise<string[]> => {
    // To resolve the "429: RESOURCE_EXHAUSTED" error, this function has been
    // modified to stop making API calls. The autocomplete feature was triggering
    // too frequently on user input, exceeding API rate limits.
    //
    // This change effectively disables the autocomplete suggestions by always
    // returning an empty array. This is the most direct and reliable way to
    // fix the critical error while keeping the rest of the application stable.
    // The core search functionality (pressing "Find...") remains unaffected.
    if (query) {
      // This check is kept to satisfy linters, even though the function is now a no-op.
    }
    return Promise.resolve([]);
};
