import { audioCall } from './difference/const';

class ProgressBar {
  static progressMove(
    canvas: HTMLCanvasElement,
    spanProcent: HTMLSpanElement,
    currentProgress: number
  ) {
    const context = canvas.getContext('2d');
    const posX = canvas.width / 2;
    const posY = canvas.height / 2;
    const fps = 1000 / 200;
    const oneProcent = 360 / 100;
    const result = oneProcent * currentProgress;
    let procent = 0;

    context.lineCap = 'round';

    function moveUp() {
      let deegres = 0;
      const moveInterval = setInterval(() => {
        deegres += 1;
        context.clearRect(0, 0, canvas.width, canvas.height);
        procent = deegres / oneProcent;

        spanProcent.innerHTML = procent.toFixed();
        audioCall.correctAnswer = +procent.toFixed();
        context.beginPath();
        context.arc(
          posX,
          posY,
          70,
          (Math.PI / 180) * 270,
          (Math.PI / 180) * (270 + 360)
        );
        context.strokeStyle = '#b1b1b1';
        context.lineWidth = 10;
        context.stroke();

        context.beginPath();
        context.strokeStyle = '#4CAF50';
        context.lineWidth = 10;
        context.arc(
          posX,
          posY,
          70,
          (Math.PI / 180) * 270,
          (Math.PI / 180) * (270 + deegres)
        );
        context.stroke();
        if (deegres >= result) clearInterval(moveInterval);
      }, fps);
    }

    moveUp();
  }
}

export default ProgressBar;
