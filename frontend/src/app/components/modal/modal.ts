import { Component, output, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'modal',
  imports: [],
  templateUrl: './modal.html',
  styleUrl: './modal.scss',
})
export class Modal {
  @ViewChild('modalContainer', { read: ViewContainerRef }) vcr!: ViewContainerRef;

  onCloseOutput = output<boolean>();

  onClose() {
    this.onCloseOutput.emit(true);
  }
}
