import * as React from 'react';
import styles from './SpfxReactFullcalendar.module.scss';
import { ISpfxReactFullcalendarProps } from './ISpfxReactFullcalendarProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';
import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel';
import { Image } from 'office-ui-fabric-react/lib/Image';
import { Label } from 'office-ui-fabric-react/lib/Label';
import {IPanelState} from './IPanelState';
import {ITask} from './ITask';
import {IImage} from './IImage';

import * as $ from 'jquery';
import * as moment from 'moment';
import 'fullcalendar';
import * as FC from 'fullcalendar';

require('../../../../node_modules/fullcalendar/dist/fullcalendar.min.css');

export default class SpfxReactFullcalendar extends React.Component<ISpfxReactFullcalendarProps, IPanelState> {

  constructor(props: ISpfxReactFullcalendarProps, state: IPanelState){
    super(props);
    this.state = { 
      showPanel: false,
      Title: "",
      StartDate: "",
      EndDate: "",
      AssetName: "",
      ImageUrl: ""
    };
  }

  public componentDidMount(): void {
    this.displayTasks();
  }

  public componentDidUpdate(): void {
    this.displayTasks();
  }

  public render(): React.ReactElement<ISpfxReactFullcalendarProps> {
    return (
      <div className={ styles.spfxReactFullcalendar}>
        
        <div className="ms-Grid">
          <div style={{marginBottom: '20px'}}></div>
          <div className="ms-Grid-row">
          <div id="calendar"></div>
          </div>
        </div>
        <Panel isBlocking={false} isOpen={this.state.showPanel} onDismiss={this.onPanelClosed.bind(this)} type={PanelType.custom}
          customWidth="500px" closeButtonAriaLabel="Close">
          <Label style={{fontWeight: "bolder", textAlign: "center", marginBottom: "30px"}}>Booking Details</Label>
          <Label style={{fontWeight: "bold"}}>Vehicle Details</Label>
          <Label>{this.state.AssetName}</Label>
          <Label style={{fontWeight: "bold"}}>Start Date and Time</Label>
          <Label>{this.state.StartDate}</Label>
          <Label style={{fontWeight: "bold"}}>End Date and Time</Label>
          <Label>{this.state.EndDate}</Label>
          <Image src={this.state.ImageUrl} width={300}></Image>
        </Panel>
      </div>
    );
  }

  private setShowPanel(showPanel: boolean) {
    this.setState({
      showPanel: showPanel
    });
  }

  private onPanelClosed() {
    this.setState({
      showPanel: false
    });
  }

  private displayTasks(): void {
    $('#calendar').fullCalendar('destroy');
    $('#calendar').fullCalendar({
      weekends: true,
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,basicWeek,basicDay'
      },
      displayEventTime: true,
      displayEventEnd: true,
      // open up the display form when a user clicks on an event
      eventClick: (calEvent: FC.EventObjectInput, jsEvent: MouseEvent, view: FC.View) => {

        const restQuery: string = `/_api/Web/Lists/GetByTitle('${escape(this.props.assetListName)}')/items(${calEvent.CarID})?$select=BookingImage`;
        this.props.spHttpClient.get(this.props.siteUrl + restQuery, SPHttpClient.configurations.v1, {
          headers: {
            'Accept': "application/json;odata.metadata=none"
          }
        })
        .then((response: SPHttpClientResponse): Promise<IImage> => {
          return response.json();
        })
        .then((item: IImage): void => {
          
          let imageUrl: string = "";
          if (item.BookingImage)
            imageUrl = item.BookingImage.Url;
          this.setState({
            Title: calEvent.title,
            StartDate: calEvent.CustomStartDate,
            EndDate: calEvent.CustomEndDate,
            AssetName: calEvent.AssetName,
            ImageUrl: imageUrl
          });
          
          this.setShowPanel(true);
        });
        return false;
      },
      // put the events on the calendar 
      events: (start: moment.Moment, end: moment.Moment, timezone: string, callback: Function): void => {
        let startDate: string = start.format('YYYY-MM-DD');
        startDate += 'T00:00:00.0000000Z';
        let endDate: string = end.format('YYYY-MM-DD');
        endDate += 'T00:00:00.0000000Z';
        
        const restQuery: string = `/_api/Web/Lists/GetByTitle('${escape(this.props.listName)}')/items?$select=ID,Title,StartDate,OData__EndDate,Car/Title,Car/Colour,Car/ID&$expand=Car`;

        this.props.spHttpClient.get(this.props.siteUrl + restQuery, SPHttpClient.configurations.v1, {
          headers: {
            'Accept': "application/json;odata.metadata=none"
          }
        })
        .then((response: SPHttpClientResponse): Promise<{ value: ITask[] }> => {
          return response.json();
        })
        .then((data: { value: ITask[] }): void => {
          const events: FC.EventObjectInput[] = data.value.map((task: ITask): FC.EventObjectInput => {
                        
            return {
              title: task.Car.Title,
              id: task.ID,
              color: task.Car.Colour, // specify the background color and border color can also create a class and use className parameter. 
              start: moment.utc(task.StartDate).local().format('YYYY-MM-DD HH:mm:ss'),
              end: moment.utc(task.OData__EndDate).local().format('YYYY-MM-DD HH:mm:ss'),
              AssetName: task.Car.Title,
              CarID: task.Car.ID,
              CustomStartDate: moment(task.StartDate).format('MMMM Do YYYY, h:mm:ss a'),
              CustomEndDate: moment(task.OData__EndDate).format('MMMM Do YYYY, h:mm:ss a')
            };
          });
          callback(events);
        });
      }
    });
  }

}
