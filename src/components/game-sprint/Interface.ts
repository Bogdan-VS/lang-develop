import { IWord } from "../../utils/api/interfaces";

export interface IGamesController {
  trueArray: IWord[];
  progressArray: IWord[];
  step: number;
  activate(): void
  restartGame(): void;
  closeResultPopup(): void;
  closeResultPopup(): void;
  getScore(): number;
  resultWordOnClick(elem: HTMLElement): void;
  startRound(data: {page: string; category: string}): Promise<void>;
  checkAnswer(target: string): void;
  togglePlay(): void;
  playWord(src: string, target: HTMLElement): void;
  toggleVolume(): void;
}
