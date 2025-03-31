import { Component, OnDestroy, OnInit } from '@angular/core';
import { from, interval, Observable, of, Subscription } from 'rxjs';
import { filter, take, tap } from 'rxjs/operators';

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
      // console.log(this.secondsToAlarm);
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

  clock2$ = new Observable<string>(t => {
    setInterval(() => {
      t.next(new Date().toString());
    }, 1000
    )
  });

  constructor() {
  }

  ngOnInit(): void {
    this.clock2$.subscribe();

    //test Of - From - Interval
    this.testOf();
    this.testFrom();
    this.testInterval();

  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  setAlarm() {
    clearInterval(this.intervals["clock"]);
    this.timeArr = [];

    //Example clock$
    this.sub = this.clock$.pipe(tap(
      // t => console.log(t)
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


  testOf() {
    of(10, 20, 30).subscribe({
      next: value => console.log(value),
      error: err => console.log(err),
      complete: () => console.log('the end')
    });

    of([1, 2, 3]).subscribe({
      next: value => console.log(value),
      error: err => console.log(err),
      complete: () => console.log('the end')
    });
  };

  testFrom() {
    const array = [100, 200, 300, 400, 500];
    const result = from(array);
    result.subscribe(x => console.log(x));
  };

  testInterval() {
    const numbers = interval(100);
    const takeFourNumbers = numbers.pipe(take(4));
    takeFourNumbers.subscribe(x => console.log('Next: ', x));
  };

}
