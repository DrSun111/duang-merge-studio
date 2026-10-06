export const effects=['弹弹回弹','磁力相吸','闪电','爱心氛围','星光爆发','无特效'];
export type Tier={id:string;name:string;image:string;emoji:string;effect:string;radius:number};
export type GameConfig={title:string;duang:number;tiers:Tier[]};
export const initialConfig:GameConfig={title:'Duang 合成工坊',duang:1,tiers:['🍒','🍓','🍊','🍋','🥝','🍎','🍑','🍍','🍉'].map((emoji,i)=>({id:'tier-'+i,name:['小樱桃','小草莓','小橘子','小柠檬','猕猴桃','大苹果','蜜桃','菠萝','大西瓜'][i],emoji,image:'',effect:effects[i%5],radius:19+i*5.5}))};
export function validate(v:GameConfig){if(!v||typeof v.title!=='string'||v.title.length>40||typeof v.duang!=='number'||v.duang<0||v.duang>2||!Array.isArray(v.tiers)||v.tiers.length<2||v.tiers.length>16)throw Error('请设置 2–16 级，标题不超过 40 字');const ids=new Set();for(const t of v.tiers){if(typeof t.id!=='string'||ids.has(t.id)||typeof t.name!=='string'||!t.name||t.name.length>30||typeof t.image!=='string'||!/^($|\/api\/image\/[a-zA-Z0-9.-]+$)/.test(t.image)||typeof t.emoji!=='string'||t.emoji.length>16||!effects.includes(t.effect)||typeof t.radius!=='number'||t.radius<15||t.radius>85)throw Error('合成层级配置无效');ids.add(t.id)}return v}

export function assetUrl(path:string){return path&&typeof window!=='undefined'&&window.location.hostname==='drsun111.github.io'?'https://duang-merge-studio.kasun11.chatgpt.site'+path:path}
