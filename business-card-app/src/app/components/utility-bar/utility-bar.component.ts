import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-utility-bar',
  templateUrl: './utility-bar.component.html',
  styleUrls: ['./utility-bar.component.css']
})
export class UtilityBarComponent implements OnInit {
  
  @Input() contactCount;
  @Output() search: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onSearchChange() {
    const dom = document.getElementById('search-bar');
    this.search.emit(dom.value);
  }
}
