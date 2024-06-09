import { CalendarEventI } from "./interfaces";

export interface ICalendarAdmin {
  registerEvent(event: CalendarEventI): Promise<any>;
  updateEvent(event: CalendarEventI): Promise<any>;
  deleteEvent(eventId: string): Promise<any>;
  getEvent(eventId: string): Promise<any>;
  getEvents(): Promise<any>;
  overlaps(event: CalendarEventI): Promise<any>;
}
