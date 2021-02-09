import { MainController } from './controller/MainController';
import { Hero } from './model/human/Hero';
import { THeroStatus } from './utils/type/THeroStatus';

console.log('# const mainController = MainController.getInstance()');
const mainController = MainController.getInstance();

console.log('-------------------------');
console.log('# mainController._hero = Hero.getInstance("ぴよ子", "女");')
mainController._hero = Hero.getInstance('ぴよ子', '女');

console.log('# const heroData: THeroStatus = mainController._hero.getHeroData();')
const heroData: THeroStatus = mainController._hero.getHeroData();
mainController.renderSerif(heroData);

console.log('-------------------------');
