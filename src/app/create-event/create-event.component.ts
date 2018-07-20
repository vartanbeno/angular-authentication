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
  @Input() events;
  @Input() special: boolean;

  constructor(private eventService: EventService) { }

  ngOnInit() {
  }

  addEvent() {
    this.eventService.addEvent(this.event).subscribe(
      res => {
        this.eventService.addingEvent = false;
        this.events.getEvents();
      },
      err => {
        console.log(err);
        if (err.error.name === 'ValidationError') {
          alert('Please input an acceptable format for the date.');
        }
      }
    )
  }
  
  addSpecialEvent() {
    this.eventService.addSpecialEvent(this.event).subscribe(
      res => {
        this.eventService.addingEvent = false;
        this.events.getSpecialEvents();
      },
      err => {
        console.log(err);
        if (err.error.name === 'ValidationError') {
          alert('Please input an acceptable format for the date.');
        }
      }
    )
  }

  cancel() {
    this.eventService.addingEvent = false;
  }

}
