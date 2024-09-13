import mockData from "./mock-data";

//takes events data and processes it for further use
export const extractLocations = (events) => {
    const extractedLocations = events.map((event) => event.location);
    const locations = [...new Set(extractedLocations)];
    return locations;
};

export const checkToken = async (accessToken) => {
  const response = await fetch(
    `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`
  );
  const result = await response.json();
  return result;
};


export const getAccessToken = async () => {             
  const accessToken = localStorage.getItem("access_token");
  const tokenCheck = accessToken && (await checkToken(accessToken));

  if (!accessToken || tokenCheck.error) {
    localStorage.removeItem("access_token");
    const searchParams = new URLSearchParams(window.location.search);
    const code = await searchParams.get("code");
    if (!code) {
      const response = await fetch(
        "https://go95ldn5h7.execute-api.eu-west-2.amazonaws.com/dev/api/get-auth-url"
      );
      const result = await response.json();
      const { authUrl } = result;
      return (window.location.href = authUrl);
    }
    return code && getToken(code);
  }
  return accessToken;
};

const getToken = async (code) => {
  try {
    const encodeCode = encodeURIComponent(code);
 
    const response = await fetch( 'https://go95ldn5h7.execute-api.eu-west-2.amazonaws.com/dev/api/token/{code}' + '/' + encodeCode);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const { access_token } = await response.json();
    access_token && localStorage.setItem("access_token", access_token);
    return access_token;
  } catch (error) {
    error.json();
  }
 }

export const getEvents = async () => {
  NProgress.start();
  if (window.location.href.startsWith("http://localhost")) {
    NProgress.done();
    return mockData;
  }

  if (!navigator.onLine) {
    const events = localStorage.getItem("lastEvents");
    NProgress.done();
    return events?JSON.parse(events):[];
  }






/////look here for problem august 19th


  const token = await getAccessToken();
  const url =  "https://go95ldn5h7.execute-api.eu-west-2.amazonaws.com/dev/api/getCalendarEvents";

  if (token) {
    // removeQuery();
    const eventsURL = url + "/" + token;
    const response = await fetch(eventsURL)
      .then((response) => response.json())
      .then((data) => {
        if (!data) return [];
        localStorage.setItem("lastEvents", JSON.stringify(data));
        //access data directly instead not data.events
        const result = data;
        return result;
      }
    ).catch((error) => {
      if (error) {
        throw new Error(`HTTP error! status: ${error.status}`);
      }
      console.log(error);
    });
    
    return response;
  }
};

const removeQuery = () => {
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