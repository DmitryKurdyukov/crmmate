"use server";

import { ActionParams, ModelName } from "@premieroctet/next-admin";
import {
  SearchPaginatedResourceParams,
  deleteResourceItems,
  searchPaginatedResource,
  submitForm,
} from "@premieroctet/next-admin/dist/actions";


import { options } from "../_options";
import { db } from "~/server/db";

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export const submitFormAction = async (
  params: ActionParams,
  formData: FormData
) => {
  return submitForm({ ...params, options, prisma: db }, formData);
};

export const deleteItem = async (
  model: ModelName,
  ids: string[] | number[]
) => {db
  return deleteResourceItems(db, model, ids);
};

export const searchResource = async (
  actionParams: ActionParams,
  params: SearchPaginatedResourceParams
) => {
  return searchPaginatedResource({ ...actionParams, options, prisma: db }, params);
};