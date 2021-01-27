import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  source = [];
  columns = [];
  
  ngOnInit() {
    const data = { ...generateFakeDataObject(100, 5)};
    this.source = data.source;
    this.columns = data.headers;
  }
}


function generateHeader(index) {
  const asciiFirstLetter = 65;
  const lettersCount = 26;
  let div = index + 1;
  let label = '';
  let pos = 0;
  while (div > 0) {
    pos = (div - 1) % lettersCount;
    label = String.fromCharCode(asciiFirstLetter + pos) + label;
    div = parseInt(((div - pos) / lettersCount).toString(), 10);
  }
  return label.toLowerCase();
}

function generateFakeDataObject(rowsNumber, colsNumber) {
  const result = [];
  const columns = {};
  const all = colsNumber * rowsNumber;
  for (let j = 0; j < all; j++) {
    let col = j%colsNumber;
    let row = j/colsNumber|0;
    if (!result[row]) {
      result[row] = {};
    }
    if (!columns[col]) {
      columns[col] = {
        name: generateHeader(col),
        prop: col,
      };
    }
    result[row][col] = row + ':' + col;
  }
  let headers = Object.keys(columns).map((k) => columns[parseInt(k, 10)]);
  return {
    source: result,
    headers
  };
}