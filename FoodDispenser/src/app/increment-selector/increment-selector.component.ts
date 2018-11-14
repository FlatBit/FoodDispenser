import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-increment-selector',
  templateUrl: './increment-selector.component.html',
  styleUrls: ['./increment-selector.component.css']
})
export class IncrementSelectorComponent implements OnInit {

  public amount = 0;
  private incrementBy = 15;

  constructor() { }

  ngOnInit() {
  }

  clickHandlerMinus() {
    if (this.amount >= this.incrementBy) {
      this.amount -= this.incrementBy;
    }
  }

  clickHandlerPlus() {
    this.amount += this.incrementBy;
  }




}
