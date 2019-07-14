import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  fnm: string;
  lnm: string;
  phn: number;
  emid: string;
  msg: string;


  constructor(private myhttp: HttpClient) { }

  ngOnInit() {
  }


  ons2click() {


    // tslint:disable-next-line: prefer-const
    let vals = {fn: this.fnm, ln: this.lnm, pn: this.phn, em: this.emid};

    this.myhttp.post("http://localhost:3000/api/add", vals, {responseType: "text"}).subscribe(
      (response) =>
      {
        this.msg = response;
      },
      (error) =>
      {
        this.msg = error;
      }
    );
  }
}
