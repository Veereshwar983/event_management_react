import * as httpConfig from "./api.config.json";

const baseUrl = `${httpConfig.scheme}://${httpConfig.host}${
  httpConfig.port != "" ? ":" + httpConfig.port : ""
}`;

export const loginUser = () => {
  return `${baseUrl}/login`;
};

export const registerUser = () => {
  return `${baseUrl}/register`;
};

export const saveEvents = () => {
  return `${baseUrl}/events`;
};

export const getEvents = () => {
  return `${baseUrl}/events`;
};

export const getOrganizerEvents = (organizerId) => {
  return `${baseUrl}/events?organizerId=${organizerId}`;
};

export const saveEventRegistration = () => {
    return `${baseUrl}/eventRegistration`;
  };
