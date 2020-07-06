import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  percent: number = 0;
  taskTime: any = '00:01:00';

  timer: any = false;
  progress: any = 0;
  minutes: number = 1;
  seconds: number = 0;
  overallProgress:any = 0;
  overallTimer: any = false;
  countDownTimer: any = false;
  elapsed: any = {
    h: '00',
    m: '00',
    s: '00'
  }

  startCounting() {

    if(this.timer) {
      clearInterval(this.timer);
      clearInterval(this.countDownTimer);
    }

    if(!this.overallTimer) {
      this.progressTimer();
    }

    this.timer = false;
    this.percent = 0;
    this.progress = 0;

    let timeSplit = this.taskTime.split(':');
    this.minutes = parseInt(timeSplit[1]);
    this.seconds = parseInt(timeSplit[2]);


    let totalSeconds: number = Math.floor(this.minutes * 60) + this.seconds;

    this.timer = setInterval(() => {

      if(this.percent == 100) {
        clearInterval(this.timer);
      }

      this.percent = Math.floor( (this.progress / totalSeconds) * 100);
      this.progress = this.progress + 1;
    }, 1000)
  }


  progressTimer() {
    let countDownDate = new Date();

    this.overallTimer = setInterval(() => {
      let now = new Date().getTime();

      var distance = now - countDownDate.getTime();

      this.elapsed.h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      this.elapsed.m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      this.elapsed.s = Math.floor((distance % (1000 * 60)) / 1000);
      
      this.elapsed.h = this.pad(this.elapsed.h, 2);
      this.elapsed.m = this.pad(this.elapsed.m, 2);
      this.elapsed.s = this.pad(this.elapsed.s, 2);

    }, 1000)
  }

  pad(num, size) {
    let s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
  }

}
