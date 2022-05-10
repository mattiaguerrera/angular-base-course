import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';
import { filter, tap } from 'rxjs/operators';

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.css']
  //  `
})

export class ClockComponent implements OnInit, OnDestroy {


  secondsToAlarm: number | undefined;
  timeArr: string[] = [];
  sub: Subscription = new Subscription;
  private interval: any | undefined;
  intervals: any = {};


  clock$ = new Observable<string>(t => {
    this.intervals["clock"] = setInterval(() => {
      console.log(this.secondsToAlarm);
      if (this.secondsToAlarm == null || this.secondsToAlarm == 0) {
        t.next("beep!");
        t.complete();
        clearInterval(this.interval);
      }
      else {
        t.next(new Date().toString());
        this.secondsToAlarm--;
      }
    }, 1000
    )
  });

  constructor() { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  setAlarm() {
    clearInterval(this.intervals["clock"]);
    this.timeArr = [];
    this.sub = this.clock$.pipe(tap(
      t => console.log(t)
    )
      // , filter(y => {
      //   if (y == 'beep!')
      //      return true;

      //   return false;
      // }
      // )
      // .subscribe(t =>
      //   this.time = t
      // );
    ).subscribe({
      next: (t: any) => {
        this.timeArr.push(t);
      },
      error: (error: any) => {
        this.timeArr.push(error);
      }
    }
    );
  }

  stopClock() {
    this.secondsToAlarm = 0;
    this.timeArr = [];
    clearInterval(this.intervals["clock"]);
  }

}
