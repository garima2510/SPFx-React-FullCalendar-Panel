import { SPHttpClient } from '@microsoft/sp-http';

export interface ISpfxReactFullcalendarProps {
  listName: string;
  spHttpClient: SPHttpClient;
  siteUrl: string;
  assetListName: string;
  showPanel: boolean;
}
