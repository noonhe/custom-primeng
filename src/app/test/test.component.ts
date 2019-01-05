import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  contents:any[];
  constructor() { }

  ngOnInit() {
    this.contents = [
      {col1:'1' , col2:'2' , col3:'3' , col4:'4' , col5:'5' , col6:'6'}
    ]
  }

}
