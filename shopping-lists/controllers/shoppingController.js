import { renderFile } from "../deps.js";
import * as shoppingService from "../services/shoppingService.js";
import { redirectTo } from "../utils/requestutils.js";
const responseDetails = {
  headers: { "Content-Type": "text/html;charset=UTF-8" },
};

const addList= async (request) => {
  const formData = await request.formData();
  const name = formData.get("name");

  await shoppingService.create(name);

  return redirectTo("/lists");
};

const viewLists = async (request) => {
  const data = {
    lists: await shoppingService.findAllactiveList(),
  };

  return new Response(await renderFile("shopping.eta", data), responseDetails);
};

const deactivateList = async (request) => {
    const url = new URL(request.url);
    const urlParts = url.pathname.split("/");
    await shoppingService.deactivateListById(urlParts[2]);
    return redirectTo("/lists");
};

export { addList, viewLists, deactivateList };