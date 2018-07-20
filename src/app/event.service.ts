import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Event } from './event';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  addingEvent: boolean = false;

  private _eventsUrl = 'http://localhost:3000/api/events';
  private _createEventUrl = 'http://localhost:3000/api/events/createEvent';
  private _deleteEventsUrl = 'http://localhost:3000/api/events/deleteAll';

  private _specialEventsUrl = 'http://localhost:3000/api/special';
  private _createSpecialEventUrl = 'http://localhost:3000/api/special/createSpecialEvent';
  private _deleteSpecialEventsUrl = 'http://localhost:3000/api/special/deleteAll';

  constructor(private http: HttpClient) { }

  getEvents() {
    return this.http.get<any>(this._eventsUrl);
  }

  getSpecialEvents() {
    return this.http.get<any>(this._specialEventsUrl);
  }

  addEvent(event: Event) {
    return this.http.post<any>(this._createEventUrl, event);
  }

  addSpecialEvent(event: Event) {
    return this.http.post<any>(this._createSpecialEventUrl, event);
  }

  deleteAllEvents() {
    return this.http.delete<any>(this._deleteEventsUrl);
  }

  deleteAllSpecialEvents() {
    return this.http.delete<any>(this._deleteSpecialEventsUrl);
  }

}
