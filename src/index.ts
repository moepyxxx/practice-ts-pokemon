import { MainController } from './controller/MainController';
import { EventController } from './controller/EventController';
import { Hero } from './model/human/Hero';
import { Ordinary } from './model/human/Ordinary';

import { Pokemon } from './model/pokemon/Pokemon';
import { POKEMON_CLASS_LIST } from './model/classdata/pokemonClassData';
import { THeroStatus } from './utils/type/THeroStatus';

import { MapField } from './model/field/MapField';
import { House } from './model/field/House';
import { PokemonAppearPlace } from './model/field/PokemonAppearPlace';
import { Trainer } from './model/human/Trainer';

import { TWildPokemons } from './utils/type/TWildPokemons';

console.log('# const mainController = MainController.getInstance()');
const mainController = MainController.getInstance();

console.log('-------------------------');
console.log('# mainController._hero = Hero.getInstance("ぴよ子", "女");')
mainController._hero = Hero.getInstance('ぴよ子', '女');

console.log('# const heroData: THeroStatus = mainController._hero.getHeroData();')
const heroData: THeroStatus = mainController._hero.getHeroData();
mainController.renderSerif(heroData);

console.log('-------------------------');
console.log('# 一気に今回の登場人物・フィールド・場所を設定（フィールド・場所・ポケモン・人）');
const mother = new Ordinary('お母さん', '女');
const odamakiHakase = new Ordinary('オダマキ博士', '男');
const rival = new Trainer('ユウタ', '男');

const kusamuraWildPokemons: TWildPokemons[] = [{
  trigger: 'すすむ',
  pokemon: POKEMON_CLASS_LIST.pochiena,
  appearingRate: 1,
  lebelRange: [2, 3]
},{
  trigger: 'すすむ',
  pokemon: POKEMON_CLASS_LIST.ziguzaguma,
  appearingRate: 1.5,
  lebelRange: [2, 3]
}];

const heroHouse = new House('自分の家', [ mother ]);
const kenkyujo = new House('オダマキ博士の研究所', [ odamakiHakase ]);

const kusamura103 = new PokemonAppearPlace('くさむら', [ odamakiHakase ], kusamuraWildPokemons, '草むら');
const mishiroTown = new MapField('ミシロタウン', [ heroHouse, kenkyujo ]);
const douro103 = new MapField('103番どうろ', [ kusamura103 ], [ mishiroTown ]);
mishiroTown.nearField = [ douro103 ];

console.log('-------------------------');
console.log('# イベントクラスを作成');
console.log('# const eventController = EventController.getInstance();');
const eventController = EventController.getInstance();
console.log(`# eventController.setHumans('add',
{ key: 'mama', human: mother },
{ key: 'hakase', human: odamakiHakase },
{ key: 'rival', human: rival }
);
`);
eventController.setHumans('add',
{ key: 'mama', human: mother },
{ key: 'hakase', human: odamakiHakase },
{ key: 'rival', human: rival }
);

console.log('-------------------------');
console.log('# ゲームスタート時、場所をミシロタウンの家にセット');
console.log('# mainController.field = mishiroTown;');
console.log('# mainController.place = heroHouse;');
mainController.field = mishiroTown;
mainController.place = heroHouse;
mainController.renderSerif(`${mainController._hero.name}は現在、${mishiroTown.name}の${heroHouse._name}にいる`);
console.log('# mainController.heroWalk();');
mainController.heroWalk();
console.log('# イベント発生：eventController.events("1-1");');
eventController.events('1-1');

console.log('-------------------------');
console.log('# 103番道路の草むらへ移動');
console.log('# mainController.field = douro103;');
console.log('# mainController.place = kusamura103;');
mainController.field = douro103;
mainController.place = kusamura103;
mainController.renderSerif(`${mainController._hero.name}は${mainController._field.name}にきた。`);

console.log('-------------------------');
console.log('# イベント発生：eventController.events("1-2");');
eventController.events('1-2');
console.log('# イベント発生：eventController.events("1-3");');
MainController.getInstance().field = mishiroTown;
MainController.getInstance().place = kenkyujo;
eventController.events('1-3');

console.log('-------------------------');
console.log('# 103番道路の草むらへ移動');
mainController.field = douro103;
mainController.place = kusamura103;
mainController.heroWalk(mainController._place);
