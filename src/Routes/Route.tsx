import {serverConfig} from "@/config/serverConfig"
export const Route = {
  fetchTokens: serverConfig.apiURL + "/api/v1/tokens/",
  // fetchTokenPrice: "http://localhost:5000/api/v1/tokens/",
};