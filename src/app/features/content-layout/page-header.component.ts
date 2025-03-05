import { CommonModule } from "@angular/common";
import { Component, ContentChild, TemplateRef } from "@angular/core";

@Component(
  {
    selector: "ect-page-header",
    standalone: true,
    imports: [CommonModule],
    template: `<ng-container *ngTemplateOutlet="template"></ng-container>  `
  }
)

export class PageHeaderComponent {
  @ContentChild(TemplateRef) template!: TemplateRef<any>;
}
