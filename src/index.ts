import { MainController } from './controller/MainController';
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

const pochiena: Pokemon = POKEMON_CLASS_LIST.pochiena;
const kusamuraWildPokemons: TWildPokemons[] = [{
  trigger: 'イベント',
  pokemon: pochiena,
  appearingRate: 1,
  lebelRange: [2]
}];

const heroHouse = new House('自分の家', [ mother ]);

const kusamura103 = new PokemonAppearPlace('くさむら', [ odamakiHakase ], kusamuraWildPokemons, '草むら');
const mishiroTown = new MapField('ミシロタウン', [ heroHouse ]);
const douro103 = new MapField('103番どうろ', [ kusamura103 ], [ mishiroTown ]);
mishiroTown.nearField = [ douro103 ];

console.log('-------------------------');
console.log('# ゲームスタート時、場所をミシロタウンの家にセット');
console.log('# mainController.field = mishiroTown;');
console.log('# mainController.place = heroHouse;');
mainController.field = mishiroTown;
mainController.place = heroHouse;
mainController.renderSerif(`${mainController._hero.name}は現在、${mishiroTown.name}の${heroHouse._name}にいる`);