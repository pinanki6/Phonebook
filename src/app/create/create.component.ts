import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  msg: string;
  fnm: string;
  lmn: string;
  phn: number;
  emid: string;
  userlist: any[];
  visibility = false;
  nfnm: string;
  nlnm:string;
  nphn: number;
  nemid: string;

  constructor(private myhttp: HttpClient) { }

  ngOnInit() {
	 this.fetchmembers();

   }


   fetchmembers() {
    this.myhttp.get('http://localhost:3000/api/memlist', {responseType:'json'}).subscribe(
      (response: any[]) => {
        if (response.length > 0) {
          this.userlist = response;
        } else {
          this.msg = "No records found";
        }
      },
      (error) => {
        this.msg = error;
      }
    );
  }

  onedit() {
this.visibility = true;
let vals={newfnm:this.nfnm,newlnm:this.nlnm,newphn:this.nphn,newemid:this.nemid};
    this.myhttp.put("http://localhost:3000/api/edit", vals, {responseType:"text"}).subscribe(
      (response)=>
      {
          this.msg=response;
      },
      (error)=>
      {
        this.msg=error;
      }
    )
  }


  ondel(id)
  {
    //alert(id);
    this.myhttp.delete("http://localhost:3000/api/deluser?id=" +id ,{responseType:"text"}).subscribe(
      (response)=>
      {
          alert(response);
          this. fetchmembers();
      },
      (error)=>
      {
        this.msg=error;
      }
    )
  }

  }
