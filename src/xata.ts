// src/xata.ts
import 'dotenv/config';
import { buildClient } from "@xata.io/client";
import type {
  BaseClientOptions,
  SchemaInference,
  XataRecord
} from "@xata.io/client";

const tables = [] as const;

export type SchemaTables = typeof tables;
export type InferredTypes = SchemaInference<SchemaTables>;
export type DatabaseSchema = {};

const defaultOptions = {
  databaseURL: `https://LivingQuotient-s-workspace-7am94v.us-east-1.xata.sh/db/Living-Quotient`,
  apiKey: process.env.XATA_API_KEY,
  branch: process.env.XATA_BRANCH ?? "main"
};

const DatabaseClient = buildClient();

export class XataClient extends DatabaseClient<DatabaseSchema> {
  constructor(options?: BaseClientOptions) {
    super({ ...defaultOptions, ...options }, tables);
  }
}

let instance: XataClient;

export const getXataClient = (): XataClient => {
  if (!instance) instance = new XataClient();
  return instance;
};