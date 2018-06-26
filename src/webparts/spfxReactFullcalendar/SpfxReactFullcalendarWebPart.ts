import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';

import * as strings from 'SpfxReactFullcalendarWebPartStrings';
import SpfxReactFullcalendar from './components/SpfxReactFullcalendar';
import { ISpfxReactFullcalendarProps } from './components/ISpfxReactFullcalendarProps';

export interface ISpfxReactFullcalendarWebPartProps {
  listName: string;
  assetListName: string;
}

export default class SpfxReactFullcalendarWebPart extends BaseClientSideWebPart<ISpfxReactFullcalendarWebPartProps> {

  public render(): void {
    const element: React.ReactElement<ISpfxReactFullcalendarProps > = React.createElement(
      SpfxReactFullcalendar,
      {
        spHttpClient: this.context.spHttpClient,
        siteUrl: this.context.pageContext.web.absoluteUrl,
        listName: this.properties.listName,
        assetListName: this.properties.assetListName,
        showPanel: false
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('listName', {
                  label: strings.ListNameFieldLabel
                }),
                PropertyPaneTextField('assetListName', {
                  label: strings.AssetListNameFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
