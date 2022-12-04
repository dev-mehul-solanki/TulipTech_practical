import { selector } from "recoil";
import axios from "axios";

const url = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=DEMO_KEY`;
export const fetchUserData = selector({
  key: "userSelector",
  get: async ({ get }) => {
    try {
      const response = await axios.get(url);
      return response;
    } catch (error) {
      throw error;
    }
  }
});