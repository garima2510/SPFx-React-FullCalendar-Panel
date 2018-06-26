## spfx-react-fullcalendar

Solution to demonstrate fullcalendar in a SPFx react webpart. On click of event, it also opens up the Office UI Fabric React Panel (https://developer.microsoft.com/en-us/fabric#/components/panel).

![image](https://user-images.githubusercontent.com/5468867/41894996-6fb5f7e6-793e-11e8-8c4b-8b2f6a665234.png)

On click of an event, it shows event details

![image](https://user-images.githubusercontent.com/5468867/41895044-925d3ca0-793e-11e8-9e7b-03e2e21ce347.png)

This is basically an extension of webpart at https://github.com/SharePoint/sp-dev-fx-webparts/tree/master/tutorials/tutorial-migrate-fullcalendar and is created using this as base.

### Used SharePoint Framework Version
![SPFx v1.4.0](https://img.shields.io/badge/SPFx-1.4.0-green.svg)

### Build and run the tutorials

This webpart uses two custom SharePoint list whose title can be provided in webpart properties. The asset list is the master list where details of asset (in this particular case cars, but could be anything) are stored along with its colour in HEX format (to display in full calendar) and an image of the asset. Then there is a booking list which actually saves the booking details of that particular asset and it uses OOB columns - StartDate and EndDate. There is a lookup to the asset list. The column names used in REST calls are hardcoded so you will have to change them accordingly.

```
The reason for this structure is, I wanted to demonstrate that you can query data from another list (REST calls) on event click of calendar. 
This webpart fetches the image related to the asset from master list, rest all data is from the same list.
```

Master List Columns:

![image](https://user-images.githubusercontent.com/5468867/41895963-fd558c5e-7940-11e8-90b9-8dbd54505ac6.png)

Child List Columns:

![image](https://user-images.githubusercontent.com/5468867/41895987-16909092-7941-11e8-99ae-eeaa34f2e215.png)

Clone this repo by executing the following command in your console:
```
git clone https://github.com/garima2510/SPFx-React-FullCalendar-Panel.git
```

Navigate to the cloned repo folder which should be the same as the repo name:
```
cd SPFx-React-FullCalendar-Panel
```

Now run the following command to install the npm packages:
```
npm install
```

This will install the required npm packages and dependencies to build and run the SharePoint Framework project.

Once the npm packages are installed, run the command to preview your web parts in SharePoint Workbench:
```
gulp serve --nobrowser
```
