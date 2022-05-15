import fetch from 'node-fetch';
import * as vscode from 'vscode';

const API_ENDPOINT = "https://api.deno.land/";

export interface DenoModuleInfo {
    name: string;
    description: string;
    star_count: string;
  }
  
export interface SearchResult extends DenoModuleInfo {
    search_score: string;
}
  

export class DenoModuleSearchService {

}

type ModulesResponseData = { results: SearchResult[]; totalCount: number };


// See https://github.com/denoland/dotland/blob/main/util/registry_utils.ts
export async function fetchModules(
    page: number,
    limit: number,
    query: string,
  ): Promise<ModulesResponseData> {
    const url = `${API_ENDPOINT}modules?page=${page}&limit=${limit}&query=${
      encodeURIComponent(
        query,
      )
    }`;
    const response = await fetch(url, {
      headers: {
        accept: "application/json",
      },
    });
    if (response.status !== 200) {
      throw Error(
        `Error querying Deno module list`,
      );
    }
    const data = await response.json() as {success: any, data: { results: SearchResult[]; total_count: number }};
    if (!data.success) {
      throw Error(
        `Error querying Deno module list`,
      );
    }
  
    return {
      totalCount: data.data?.total_count,
      results: data.data!.results,
    };
  }

  export function genModuleLink(name: string) {
    return vscode.Uri.parse(`https://deno.land/x/${name}`);
  }