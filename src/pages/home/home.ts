import {Component} from "@angular/core";
import {NavController, PopoverController} from "ionic-angular";
import {Storage} from '@ionic/storage';

import {NotificationsPage} from "../notifications/notifications";
import {SettingsPage} from "../settings/settings";
import {TripsPage} from "../trips/trips";
import {SearchLocationPage} from "../search-location/search-location";

import { BarcodeScanner , BarcodeScannerOptions } from '@ionic-native/barcode-scanner';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})


export class HomePage {
  // search condition
  public search = {
    name: "Rio de Janeiro, Brazil",
    date: new Date().toISOString()
  }

  options: BarcodeScannerOptions;
  encodText:string='';
  encodedData:any={};
  scannedData:any={};


  constructor(private storage: Storage, public nav: NavController, public popoverCtrl: PopoverController , public scanner:BarcodeScanner) {
  }


  scan(){
  this.options= {
  prompt: 'Scan you barcode'
  }
  this.scanner.scan(this.options).then((data) => {
this.scannedData = data;

  }, (err) => {
    console.log('Error :', err);
  })
  }
  encode(){
  this.scanner.encode(this.scanner.Encode.TEXT_TYPE, this.encodText).then((data) => {
  this.encodedData = data;
  }, (err) => {

  console.log('Error :', err);
  })
  }
  ionViewWillEnter() {
    // this.search.pickup = "Rio de Janeiro, Brazil";
    // this.search.dropOff = "Same as pickup";
    this.storage.get('pickup').then((val) => {
      if (val === null) {
        this.search.name = "Rio de Janeiro, Brazil"
      } else {
        this.search.name = val;
      }
    }).catch((err) => {
      console.log(err)
    });
  }

  // go to result page
  doSearch() {
    this.nav.push(TripsPage);
  }

  // choose place
  choosePlace(from) {
    this.nav.push(SearchLocationPage, from);
  }

  // to go account page
  goToAccount() {
    this.nav.push(SettingsPage);
  }

  presentNotifications(myEvent) {
    console.log(myEvent);
    let popover = this.popoverCtrl.create(NotificationsPage);
    popover.present({
      ev: myEvent
    });
  }

}

//
