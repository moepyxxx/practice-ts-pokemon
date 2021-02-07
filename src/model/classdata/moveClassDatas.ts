import { DenkiShock } from '../move/DenkiShock';
import { Nakigoe } from '../move/Nakigoe';
import { Niramitsukeru } from '../move/Niramitsukeru';
import { Taiatari } from '../move/Taiatari';
import { Hataku } from '../move/Hataku';
import { Hikkaku } from '../move/Hikkaku';
import { Konoha } from '../move/Konoha';
import { Hinoko } from '../move/Hinoko';
import { MizuDeppou } from '../move/MizuDeppou';
import { Denjiha } from '../move/Denjiha';
import { Move } from '../move//Move';

export const MOVE_CLASS_LIST: {
  [key: string]: Move;
} = {
  "denkiShock": new DenkiShock(),
  "nakigoe": new Nakigoe(),
  "hikkaku": new Hikkaku(),
  "jumanBoruto": new Nakigoe(),
  "shippoWoFuru": new Nakigoe(),
  "kaminari": new Nakigoe(),
  "denkouSekka": new Nakigoe(),
  "aianTeru": new Nakigoe(),
  "taiatari": new Taiatari(),
  "denjiha": new Denjiha(),
  "speedStar": new Nakigoe(),
  "yadorigiNoTane": new Nakigoe(),
  "tsuruNoMuchi": new Nakigoe(),
  "dokuNoKona": new Nakigoe(),
  "happaCutter": new Nakigoe(),
  "seichou": new Nakigoe(),
  "nemurigona": new Nakigoe(),
  "solarBeam": new Nakigoe(),
  "mizudeppou": new MizuDeppou(),
  "iwakudaki": new Nakigoe(),
  "iwaotoshi": new Nakigoe(),
  "mamoru": new Nakigoe(),
  "choonpa": new Nakigoe(),
  "mizuNoHadou": new Nakigoe(),
  "iwanadare": new Nakigoe(),
  "tosshin": new Nakigoe(),
  "dowasure": new Nakigoe(),
  "narminori": new Nakigoe(),
  "iyaNaOto": new Nakigoe(),
  "gamusyara": new Nakigoe(),
  "hydroPump": new Nakigoe(),
  "madShot": new Nakigoe(),
  "armHammer": new Nakigoe(),
  "jishin": new Nakigoe(),
  "hataku": new Hataku(),
  "niramitsukeru": new Niramitsukeru(),
  "mikiri": new Nakigoe(),
  "konoha": new Konoha(),
  "gigadorain": new Nakigoe(),
  "megadorain": new Nakigoe(),
  "fastGuard": new Nakigoe(),
  "dameoshi": new Nakigoe(),
  "tatakitsukeru": new Nakigoe(),
  "kagebunshin": new Nakigoe(),
  "leafStorm": new Nakigoe(),
  "enegyBall": new Nakigoe(),
  "renzokugiri": new Nakigoe(),
  "mineuchi": new Nakigoe(),
  "scissorCross": new Nakigoe(),
  "leafblade": new Nakigoe(),
  "doubleChop": new Nakigoe(),
  "nitroCharge": new Nakigoe(),
  "hinoko": new Hinoko(),
  "kaenhousya": new Nakigoe(),
  "sunakake": new Nakigoe(),
  "tsubamegaeshi": new Nakigoe(),
  "kirisaku": new Nakigoe(),
  "kiaidame": new Nakigoe(),
  "tobihaneru": new Nakigoe(),
  "featherDance": new Nakigoe(),
  "kishikaisei": new Nakigoe(),
  "flareDrive": new Nakigoe(),
  "nidogeri": new Nakigoe(),
  "blazeKick": new Nakigoe(),
  "honooNoPunchi": new Nakigoe(),
  "buildUp": new Nakigoe(),
}