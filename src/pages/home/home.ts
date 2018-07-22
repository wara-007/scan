import { Component } from '@angular/core';
import { NavController, PopoverController } from 'ionic-angular';
import { BarcodeScanner , BarcodeScannerOptions } from '@ionic-native/barcode-scanner';
import { NgForm } from '@angular/forms/src/directives';

import { utils, write, WorkBook  } from 'xlsx';

import { saveAs } from 'file-saver';
// import { ModalController, NavParams } from 'ionic-angular';
import {AboutPage} from "../about/about";
 // กำหนดรูปแบบของชนิดข้อมูลผ่าน interface
interface UserLogin{
  scan:string,
  name:string
}


// interface UserScan{
//   scannedData:string,
 
// }



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public user:UserLogin; // กำหนดตัวแปร
 
  // public scanner:UserScan; // กำหนดตัวแปร
  
  options: BarcodeScannerOptions;
  encodText:string='';
  encodedData:any={};
  scannedData:any={};


 


  constructor(
    public navCtrl: NavController,  
    private scanner: BarcodeScanner,
    public popoverCtrl: PopoverController
    // public modalCtrl: ModalController
    ) {

    // public navCtrl: NavController, public navParams: NavParams,private barcodeScanner: BarcodeScanner
    this.user = {
      scan:'',
      name:''
    }



  }


 // share(slidingItem: ItemSliding) {
 //    slidingItem.close();
 //  }


    task = {
      note: '-',
      code: '',
      order: '',
      id: 0
    };
    tasks = [];


tables = [];

 table ={
   
      ลำดับ: '',
      note:'',
      รหัสทรัพย์สิน: '',
      }



    onClick(){
      
      if(this.task.id == 0){
        this.tasks.push({id: (new Date()).getTime(), note: this.task.note, code: this.task.code, order: this.task.code });
         this.tables.push({ note: this.task.note, รหัสทรัพย์สิน: this.task.code});
      }
      


      this.task = {
        note: '',
        code: '',
        order: '',
        id: 0
      };


   
    }
    
    onEdit(item){
      this.task = item;
    }

    onDelete(item){
      for(var i = 0;i < this.tasks.length; i++){
        if(item.id == this.tasks[i].id){
          this.tasks.splice(i,1);
          break;
        }
      }

      console.log(this.tasks);
    }

    onStrike(item){
      for(var i = 0;i < this.tasks.length; i++){

        console.log(i)
        if(item.id == this.tasks[i].id){
          if(this.tasks[i].strike){
            this.tasks[i].strike = false;
          }
          else{
            this.tasks[i].strike = true;
          }
          break;
        }
      }
    }

scan(){
  this.options= {
    prompt: 'Scan you barcode'
  }

    this.task.code =  this.scannedData.text;

    this.scanner.scan(this.options).then((data) => {
    this.scannedData = data;

    
     console.log(data);

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



ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
   

submitted = false;


  doLogin(){
     this.submitted = true;


     console.log(this.user.scan);
    console.log(this.scannedData);

   
  }  

onSubmit(form: NgForm) {
    console.log(form);
}



title = 'app';
  

// this.table.push({ลำดับ: (new Date()).getTime(),note: this.task.name, รหัสทรัพย์สิน: this.task.code});   
  
xls() { 

    
// var wb: WorkBook;
// wb = readFile('../../assets/filename.xls');

    const ws_name = 'SomeSheet';
    const wb: WorkBook = { SheetNames: [], Sheets: {} };
    const ws: any = utils.json_to_sheet(this.tables);
    wb.SheetNames.push(ws_name);
    wb.Sheets[ws_name] = ws;
    const wbout = write(wb, { bookType: 'xlsx', bookSST: true, type: 
'binary' });

function s2ab(s) {
  const buf = new ArrayBuffer(s.length);
  const view = new Uint8Array(buf);
  for (let i = 0; i !== s.length; ++i) {
    view[i] = s.charCodeAt(i) & 0xFF;
  };
  return buf;
}


saveAs(new Blob([s2ab(wbout)], { type: 'application/octet-stream' }), 'xlsx.xlsx');
 // console.log(buf);
 
 }


 // to go account page
  goToAccount() {
    this.navCtrl.push(AboutPage);
  }


// end

}



