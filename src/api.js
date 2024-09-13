import mockData from "./mock-data";

//takes events data and processes it for further use
export const extractLocations = (events) => {
    const extractedLocations = events.map((event) => event.location);
    const locations = [...new Set(extractedLocations)];
    return locations;
};


//fetches all events data
export const getEvents = async () => {
    return mockData
}