import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { interval, map, pipe } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  private destroy = inject(DestroyRef)
  ngOnInit(): void {
    const subscribe = interval(1000).pipe(map((val) => val * 2)).subscribe({
      next: (val) => { console.log(val) }, //triggered for every new value omitted
      complete: () => { }, //would execute when the observable would not produce any more numbers
      error: () => { } //would execute if an error occures
    })

    //always wanna unsubscrible to avoid memory leaks. 
    this.destroy.onDestroy(() => {
      subscribe.unsubscribe()
    })
  }


}
