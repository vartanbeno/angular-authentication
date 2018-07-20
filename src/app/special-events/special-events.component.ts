import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-special-events',
  templateUrl: './special-events.component.html',
  styleUrls: ['./special-events.component.css']
})
export class SpecialEventsComponent implements OnInit {

  specialEvents: Array<any> = [];

  constructor(private eventService: EventService, private router: Router, private _auth: AuthService) { }

  ngOnInit() {
    this.eventService.addingEvent = false;
    this.getSpecialEvents();
  }

  getSpecialEvents() {
    this.eventService.getSpecialEvents().subscribe(
      res => this.specialEvents = res,
      err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            this.router.navigate(['/login']);
          }
        }
      }
    )
  }

  addSpecialEvent() {
    this.eventService.addingEvent = true;
  }

  deleteAllSpecialEvents() {
    let deleteAllSpecial = confirm('Click on OK to delete all special events.');
    if (deleteAllSpecial) {
      this.eventService.deleteAllSpecialEvents().subscribe(
        res => {
          console.log(res);
          this.getSpecialEvents()
        },
        err => console.log(err)
      );
    }
  }

}
