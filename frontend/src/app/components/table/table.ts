import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-table',
  imports: [],
  templateUrl: './table.html',
  styleUrl: './table.scss',
})
export class Table {
  columns = input<{ key: string; title: string }[]>();
  rows = input<any[]>();

  onEditOutput = output<any>();
  onDeleteOutput = output<any>();

  onEditClicked(row: any) {
    this.onEditOutput.emit(row);
  }
  onDeleteClicked(row: any) {
    this.onDeleteOutput.emit(row);
  }
}
