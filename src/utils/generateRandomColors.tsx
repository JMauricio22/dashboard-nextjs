export function generateRandomColor() {
  let randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
  return randomColor;
}

export function generateRandomColors(size: number) {
  let randomColors: string[] = [];
  for (let i = 0; i < size; i++) {
    randomColors.push(generateRandomColor());
  }
  return randomColors;
}
