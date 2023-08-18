import { serve } from "./deps.js";
import { configure, renderFile } from "./deps.js";
import * as shoppingController from "./controllers/shoppingController.js";
import * as itemsController from "./controllers/itemsController.js";
import * as mainpageController from "./controllers/mainpageController.js";

configure({
  views: `${Deno.cwd()}/views/`,
});

const handleRequest = async (request) => {
  const url = new URL(request.url);
  const path = url.pathname;
  const method = request.method;
  if (method === "GET" && path === "/lists") {
    return await shoppingController.viewLists(request);
  } else if (method === "POST" && path === "/lists") {
    return await shoppingController.addList(request);
  } else if (method === "POST" && path.match("/lists/[0-9]+/items/[0-9]+/collect")) {
    return await itemsController.collectItem(request);
  } else if (method === "POST" && path.match("/lists/[0-9]+/deactivate")) {
    return await shoppingController.deactivateList(request);
  } else if (method === "POST" && path.match("/lists/[0-9]+/items")) {
    return await itemsController.addItems(request);
  } else if (method === "GET" && path.match("/lists/[0-9]+")) {
    return await itemsController.viewItems(request);
  } else if (method === "GET" && path === "/") {
    return await mainpageController.mainPage(request);
  } else {
    return new Response("Not found", { status: 404 });
  }
};

serve(handleRequest, { port: 7777 });
