export interface ITask {
    ID: number;
    Title: string;
    StartDate: string;
    OData__EndDate: string;
    Car: {Title: string, Colour: string, ID: number};
  }