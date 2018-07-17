import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service';

@Component({
  selector: 'app-special-events',
  templateUrl: './special-events.component.html',
  styleUrls: ['./special-events.component.css']
})
export class SpecialEventsComponent implements OnInit {

  specialEvents: Array<any> = [];

  constructor(private eventService: EventService) { }

  ngOnInit() {
    this.getSpecialEvents();
  }

  getSpecialEvents() {
    this.eventService.getSpecialEvents().subscribe(
      res => this.specialEvents = res,
      err => console.log(err)
    )
  }

}
