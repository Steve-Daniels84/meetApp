import mockData from "./mock-data";

//takes events data and processes it for further use
export const extractLocations = (events) => {
  const extractedLocations = events.map((event) => event.location);
  const locations = [...new Set(extractedLocations)];
  return locations;
};

export const checkToken = async (accessToken) => {
  const response = await fetch(
    "https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}"
  );
  const result = await response.json();
  return result;
};

export const removeQuery = () => {
  let newurl;
  if (window.history.pushState && window.location.pathname) {
    newurl =
      window.location.protocol +
      "//" +
      window.location.host +
      window.location.pathname;
    window.history.pushState("", "", newurl);
  } else {
    newurl = window.location.protocol + "//" + window.location.host;
    window.history.pushState("", "", newurl);
  }
};

//fetches all events data
export const getEvents = async () => {
  if (window.location.href.startsWith("http://localhost")) {
    return mockData;
  }

  const token = await getToken();

  console.log(token)

  if (token) {
    removeQuery();
    const url =
      "https://go95ldn5h7.execute-api.eu-west-2.amazonaws.com/dev/api/getCalendarEvents" +
      "/" +
      token;
    const response = await fetch(url);
    const result = await response.json();
    if (result) {
      return result.events;
    } else return null;
  }
};


const getToken = async (code) => {
    try {
      const encodeCode = encodeURIComponent(code);
   
      const url = "https://go95ldn5h7.execute-api.eu-west-2.amazonaws.com/dev/api/get-auth-url";
      // eslint-disable-next-line no-useless-concat
  
      const getUrl = `${url}` + "/" + `${encodeCode}`;
      const response = await fetch(getUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const { access_token } = await response.json();
      access_token && localStorage.setItem("access_token", access_token);
      return access_token;
    } catch (error) {
      return error;
    }
  }; 