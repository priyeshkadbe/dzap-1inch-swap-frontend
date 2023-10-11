import {serverConfig} from "@/config/serverConfig"
export const Route = {
  fetchToken: serverConfig.API_URL + "tokens/",
  getQuote:serverConfig.API_URL+"get-quote/"
};