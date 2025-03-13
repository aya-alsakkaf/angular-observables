import { Component, computed, DestroyRef, effect, inject, OnInit, signal } from '@angular/core';
import { interval, map, pipe } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  clickCount = signal(0)
  private destroy = inject(DestroyRef)
  interval = signal(0)
  doubleInterval = computed(() => this.interval() * 2)

  constructor() {
    effect(() => {
      console.log("Clicked Button " + this.clickCount())
    })
  }
  ngOnInit(): void {
    // const subscribe = interval(1000).pipe(map((val) => val * 2)).subscribe({
    //   next: (val) => { console.log(val) }, //triggered for every new value omitted
    //   complete: () => { }, //would execute when the observable would not produce any more numbers
    //   error: () => { } //would execute if an error occures
    // })

    // //always wanna unsubscrible to avoid memory leaks. 
    // this.destroy.onDestroy(() => {
    //   subscribe.unsubscribe()
    // })


    //-----signals

    setInterval(() => {
      this.interval.update((prevIntervalNumber) => prevIntervalNumber + 1)
      console.log(this.doubleInterval())
    }, 1000)
  }


  onClick() {
    this.clickCount.update((prev) => prev + 1)
  }

}
