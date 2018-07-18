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

}
