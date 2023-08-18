import { renderFile } from "../deps.js";
import * as shoppingService from "../services/shoppingService.js"
import * as itemsService from "../services/itemsService.js";
import { redirectTo } from "../utils/requestutils.js";

const responseDetails = {
  headers: { "Content-Type": "text/html;charset=UTF-8" },
};

const addItems= async (request) => {
  const formData = await request.formData();
  const name = formData.get("name");
  const url = new URL(request.url);
  const pathname = url.pathname;
  const urlParts = url.pathname.split("/");
  const items_id = urlParts[2]; 
  await itemsService.addItems(items_id, name);

  return redirectTo(pathname);
};

const viewItems = async (request) => {
  const url = new URL(request.url);
  const urlParts = url.pathname.split("/");
  const data = {
    list: await shoppingService.findById(urlParts[2]),
    Uncollecteditems: await itemsService.findUncollectedItems(urlParts[2]),
    Collecteditems: await itemsService.findCollectedItems(urlParts[2]),
  };

  return new Response(await renderFile("items.eta", data), responseDetails);
};

const collectItem = async (request) => {
  const url = new URL(request.url);
  const urlParts = url.pathname.split("/");
  await itemsService.collectById(urlParts[4])
  const pathname = "/" + "lists" + "/" + urlParts[2];
  return redirectTo(pathname);
};


export { addItems, viewItems, collectItem };