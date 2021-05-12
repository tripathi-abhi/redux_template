import { createAction } from "@reduxjs/toolkit";

export const apicallBegan = createAction("api/callBegan");
export const apicallSuccess = createAction("api/callSuccess");
export const apicallFailed = createAction("api/callFailed");
