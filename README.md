## spfx-react-fullcalendar

Solution to demonstrate fullcalendar in a SPFx react webpart. On click of event, it also opens up the [Office UI Fabric React Panel] (https://developer.microsoft.com/en-us/fabric#/components/panel).

![image](https://user-images.githubusercontent.com/5468867/41894996-6fb5f7e6-793e-11e8-8c4b-8b2f6a665234.png)

On click of an event, it shows event details

![image](https://user-images.githubusercontent.com/5468867/41895044-925d3ca0-793e-11e8-9e7b-03e2e21ce347.png)

### Building the code

```bash
git clone the repo
npm i
npm i -g gulp
gulp
```

This package produces the following:

* lib/* - intermediate-stage commonjs build artifacts
* dist/* - the bundled script, along with other resources
* deploy/* - all resources which should be uploaded to a CDN.

### Build options

gulp clean - TODO
gulp test - TODO
gulp serve - TODO
gulp bundle - TODO
gulp package-solution - TODO
