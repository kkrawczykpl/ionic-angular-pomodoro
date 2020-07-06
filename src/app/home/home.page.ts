import { Component } from '@angular/core';
import { Insomnia } from '@ionic-native/insomnia/ngx';

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
  overallProgress: number = 0;
  overallTimer: any = false;
  elapsed: any = {
    h: '00',
    m: '00',
    s: '00'
  }

  pause: boolean = false;

  constructor(private insomnia: Insomnia) { 
    let autoHide: boolean = true;
  }

  startCounting() {

    if(this.timer) {
      clearInterval(this.timer);
    }

    if(!this.overallTimer) {
      this.progressTimer();
      this.insomnia.keepAwake();
    }

    this.timer = false;
    this.percent = 0;
    this.progress = 0;

    let timeSplit = this.taskTime.split(':');
    this.minutes = parseInt(timeSplit[1]);
    this.seconds = parseInt(timeSplit[2]);

    let totalSeconds: number = Math.floor(this.minutes * 60) + this.seconds;

    let forwardsTimer = () => {
      if (this.percent == 100) clearInterval(this.timer);

      if (!this.pause) {
        this.percent = Math.floor((this.progress / totalSeconds) * 100);
        this.progress++;
      } 

    }

    forwardsTimer();
    this.timer = setInterval(forwardsTimer, 1000);

  }

  stopCounting() {
    clearInterval(this.timer);
    clearInterval(this.overallTimer);
    this.overallTimer = false;
    this.timer = false;    
    this.percent = 0;
    this.progress = 0;
    this.overallProgress = 0;
    this.elapsed = {
      h: '00',
      m: '00',
      s: '00'
    }
    this.insomnia.allowSleepAgain();
  }

  progressTimer() {

    this.overallTimer = setInterval(() => {
      if (!this.pause) {
        this.overallProgress++;

        this.elapsed.h = Math.floor(this.overallProgress / 3600);
        this.elapsed.m = Math.floor( (this.overallProgress % 3600) / 60 );
        this.elapsed.s = Math.floor( (this.overallProgress % 3600) % 60 );
        
        this.elapsed.h = this.pad(this.elapsed.h, 2);
        this.elapsed.s = this.pad(this.elapsed.s, 2);
        this.elapsed.m = this.pad(this.elapsed.m, 2);
        
      }
    }, 1000)
  }

  pad(num, size) {
    let s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
  }

}
