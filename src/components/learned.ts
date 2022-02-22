import Api from '../server/api';
import WorkBook from './workBook';
import { IWord } from '../utils/api/interfaces';

class Learned {
    private api: Api;

    constructor() {
        this.api = new Api()
    }

    isLearned (word: IWord) {
        return WorkBook.learnedArr.filter(i => i.id === word.id).length
    }

    isHard (word: IWord) {
        return WorkBook.hardArr.filter(i => i.id === word.id).length
    }
}

export default Learned
