import { Component, Input } from '@angular/core'

@Component({
  selector: 'app-hero',
  templateUrl: 'hero.component.html',
  styleUrls: ['hero.component.css'],
})
export class Hero {
  @Input()
  HeroHeading: string = 'Welcome to our Parental Portal App'
  @Input()
  HeroButton2: string = 'Learn More →'
  @Input()
  HeroButton1: string = 'Get Started'
  @Input()
  HeroSubHeading: string =
    'Empowering parents to keep their children safe online'
  constructor() {}
}
