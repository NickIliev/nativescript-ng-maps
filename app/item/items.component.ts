import { Component, OnInit } from "@angular/core";
import { MapView, Marker, Position } from 'nativescript-google-maps-sdk';
import { registerElement } from 'nativescript-angular/element-registry';

// Important - must register MapView plugin in order to use in Angular templates
registerElement('MapView', () => MapView);

@Component({
    selector: "ns-items",
    moduleId: __filename,
    templateUrl: "./items.component.html",
})
export class ItemsComponent  {
    latitude = 25.379843;
    longitude = 51.531874;
    zoom = 8;
    bearing = 0;
    tilt = 0;
    padding = [40, 40, 40, 40];
    mapView: MapView;
    lastCamera: String;

    //Map events
    onMapReady(event) {
        this.mapView = event.object;
        var marker = new Marker();
        marker.position = Position.positionFromLatLng(25.379843, 51.531874);
        marker.title = "Ritz-Carlton";
        marker.snippet = "Doha";
        marker.userData = {index: 1};
        this.mapView.addMarker(marker);
    }

    onCoordinateTapped(args) {
        console.log("Coordinate Tapped, Lat: " + args.position.latitude + ", Lon: " + args.position.longitude, args);
    }

    onMarkerEvent(args) {
        console.log("Marker Event: '" + args.eventName
            + "' triggered on: " + args.marker.title
            + ", Lat: " + args.marker.position.latitude + ", Lon: " + args.marker.position.longitude, args);
    }

    onCameraChanged(args) {
        console.log("Camera changed: " + JSON.stringify(args.camera), JSON.stringify(args.camera) === this.lastCamera);
        this.lastCamera = JSON.stringify(args.camera);
    }
}