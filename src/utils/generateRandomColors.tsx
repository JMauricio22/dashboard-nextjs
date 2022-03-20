export function generateRandomColor() {
  const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  return randomColor;
}

export function generateRandomColors(size: number) {
  const randomColors: string[] = [];
  for (let i = 0; i < size; i++) {
    randomColors.push(generateRandomColor());
  }
  return randomColors;
}
