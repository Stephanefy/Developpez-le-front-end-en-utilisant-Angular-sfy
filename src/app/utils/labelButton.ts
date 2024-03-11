export class LabelButton {
  text: string;
  fillColor: string = '#ffffff';
  textColor: string;
  textPosition: 'left' | 'right';
  textLabel: string;
  textMargin: number;

  x = 0;
  y = 0;
  width = 0;
  height = 0;


  constructor(
    text: string,
    textColor: string,
    textPosition: 'left' | 'right',
    textLabel: string,
    xPosition: number,
    yPosition: number,
    textMargin: number,
    width: number,
    height: number
  ) {
    this.text = text;
    this.textColor = textColor;
    this.textPosition = textPosition;
    this.textLabel = textLabel;
    this.x = xPosition;
    this.y = yPosition;
    this.textMargin = textMargin;
    this.width = width;
    this.height = height;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.font = '15px Arial';
    ctx.textAlign = this.textPosition;
    ctx.textBaseline = 'middle';
    ctx.fillStyle = 'black';
    ctx.fillText(this.textLabel, this.x + this.textMargin, this.y);
  }

  setFillColor(fillColor: string): void {
    this.fillColor = fillColor;
  }

  setPosition(x: number, y: number): void {
    this.x = x;
    this.y = y;
  }

  setSize(width: number, height: number): void {
    this.width = width;
    this.height = height;
  }

  inBounds(mouseX: number, mouseY: number): boolean {
    return !(
      mouseX <
        (this.text === 'France' || this.text === 'Germany'
          ? this.x - this.width
          : this.x) ||
      mouseX > this.x + this.width ||
      mouseY < this.y ||
      mouseY > this.y + this.height
    );
  }
}
