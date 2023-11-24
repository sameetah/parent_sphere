import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'

import { FeatureCard } from './feature-card/feature-card.component'
import { Question } from './question/question.component'
import { Hero } from './hero/hero.component'
import { GalleryCard3 } from './gallery-card3/gallery-card3.component'

@NgModule({
  declarations: [FeatureCard, Question, Hero, GalleryCard3],
  imports: [CommonModule, RouterModule],
  exports: [FeatureCard, Question, Hero, GalleryCard3],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ComponentsModule {}
