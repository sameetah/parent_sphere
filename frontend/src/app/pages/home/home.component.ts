import { Component } from '@angular/core'
import { Title, Meta } from '@angular/platform-browser'

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css'],
})
export class Home {
  raw5c8v: string = ' '
  rawa051: string = ' '
  rawza6a: string = ' '
  raw19dl: string = ' '
  rawdv3d: string = ' '
  rawq2kt: string = ' '
  rawr7rb: string = ' '
  rawewud: string = ' '
  constructor(private title: Title, private meta: Meta) {
    this.title.setTitle('Muddy Idolized Dunlin')
    this.meta.addTags([
      {
        property: 'og:title',
        content: 'Muddy Idolized Dunlin',
      },
    ])
  }
}
