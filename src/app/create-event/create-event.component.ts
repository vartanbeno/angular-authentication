import { Component, OnInit, Input } from '@angular/core';
import { Event } from '../event';
import { EventService } from '../event.service';
import { EventsComponent } from '../events/events.component';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent implements OnInit {

  event = new Event('', '', '');
  @Input() events: EventsComponent;

  constructor(private eventService: EventService) { }

  ngOnInit() {
  }

  addEvent() {
    this.eventService.addEvent(this.event).subscribe(
      res => {
        this.eventService.addingEvent = false;
        this.events.getEvents();
      },
      err => console.log(err)
    )
  }

  cancel() {
    this.eventService.addingEvent = false;
  }

}
