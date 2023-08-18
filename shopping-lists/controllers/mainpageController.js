import { renderFile } from "../deps.js";
import * as mainpageService from "../services/mainpageService.js";
import { redirectTo } from "../utils/requestutils.js";

const responseDetails = {
  headers: { "Content-Type": "text/html;charset=UTF-8" },
};

const mainPage = async (request) => {
    const url = new URL(request.url);
    const urlParts = url.pathname.split("/");
    const data = {
      number_lists: await mainpageService.countLists(),
      number_items: await mainpageService.countItems(),
    };
  
    return new Response(await renderFile("mainpage.eta", data), responseDetails);
  };

export {mainPage};