import {serverConfig} from "@/config/serverConfig"
export const route = {
  fetchToken: serverConfig.API_URL + "tokens/",
  getQuote:serverConfig.API_URL+"get-quote/"
};