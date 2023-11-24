import { Component, Input } from '@angular/core'

@Component({
  selector: 'gallery-card3',
  templateUrl: 'gallery-card3.component.html',
  styleUrls: ['gallery-card3.component.css'],
})
export class GalleryCard3 {
  @Input()
  rootClassName: string = ''
  @Input()
  image_src: string =
    'https://images.unsplash.com/photo-1523755231516-e43fd2e8dca5?ixid=Mnw5MTMyMXwwfDF8c2VhcmNofDF8fG1pbmltYWxpc20lMjBjb3VjaHxlbnwwfHx8fDE2MjY0NDg1NTk&ixlib=rb-1.2.1&w=1500'
  @Input()
  image_alt: string = 'image'
  constructor() {}
}
