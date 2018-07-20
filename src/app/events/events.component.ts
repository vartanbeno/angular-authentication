import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  events: Array<any> = [];

  constructor(private eventService: EventService, private _auth: AuthService) { }

  ngOnInit() {
    this.eventService.addingEvent = false;
    this.getEvents();
  }

  getEvents() {
    this.eventService.getEvents().subscribe(
      res => this.events = res,
      err => console.log(err)
    )
  }

  addEvent() {
    this.eventService.addingEvent = true;
  }

  deleteAllEvents() {
    let deleteAll = confirm('Click on OK to delete all events.');
    if (deleteAll) {
      this.eventService.deleteAllEvents().subscribe(
        res => {
          console.log(res);
          this.getEvents()
        },
        err => console.log(err)
      );
    }
  }

}
