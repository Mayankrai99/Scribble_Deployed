import { Component, Input } from '@angular/core';
import { IPropertyBase, IArticleBase } from '../../../common/IPropertyBase';

@Component({
  selector: 'app-property-card',
  templateUrl: './property-card.component.html',
  styleUrl: './property-card.component.css',
})
export class PropertyCardComponent {
  @Input() article: IArticleBase | undefined;
  @Input()
  hideIcons: boolean = false;
}
