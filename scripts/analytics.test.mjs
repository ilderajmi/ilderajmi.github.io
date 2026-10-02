import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import {readFileSync} from 'node:fs';
const source=readFileSync(new URL('../assets/analytics.js',import.meta.url),'utf8');
function browser(saved=null,cookies=[]){
 const handlers={}, elements={}, scripts=[], storage=new Map(saved?[['blog.analytics-consent.v1',saved]]:[]);
 const jar=new Map(cookies.map(c=>[`${c.name}|${c.domain||'host'}|${c.path||'/'}`,c.value]));
 const cookieWrites=[];
 for(const id of ['analytics-status','analytics-accept','analytics-reject']) elements[id]={textContent:'',addEventListener:(name,fn)=>handlers[id]=fn};
 const w={location:{hostname:'blog.paymond.me',href:'https://blog.paymond.me/posts/example/?email=secret#private'},URL,Date,
 localStorage:{getItem:k=>storage.get(k),setItem:(k,v)=>storage.set(k,v)},
 document:{referrer:'https://example.com/?token=secret',getElementById:id=>elements[id],addEventListener:(name,fn)=>handlers[name]=fn,createElement:()=>({}),head:{append:s=>scripts.push(s)}}};
 Object.defineProperty(w.document,'cookie',{get:()=>Array.from(jar,([key,value])=>`${key.split('|')[0]}=${value}`).join('; '),set:value=>{
  cookieWrites.push(value);const [pair,...attributes]=value.split(';').map(s=>s.trim());const name=pair.split('=')[0];
  const domain=(attributes.find(s=>/^Domain=/i.test(s))?.slice(7)||'host').replace(/^\./,'');
  const path=attributes.find(s=>/^Path=/i.test(s))?.slice(5)||'/';
  if(attributes.some(s=>/^Max-Age=0$/i.test(s))) jar.delete(`${name}|${domain}|${path}`);
 }});
 w.window=w;vm.runInNewContext(source,w);
 return {w,handlers,scripts,jar,cookieWrites,events:()=>Array.from(w.dataLayer||[],a=>Array.from(a))};
}
test('no Google script before consent or after saved denial',()=>{assert.equal(browser().scripts.length,0);assert.equal(browser('denied').scripts.length,0)});
test('consent uses existing stream and cleans page/referrer URLs',()=>{const b=browser();b.handlers['analytics-accept']();assert.equal(b.scripts.length,1);const config=b.events().find(e=>e[0]==='config');assert.equal(config[1],'G-BQGF026X72');assert.equal(config[2].page_location,'https://blog.paymond.me/posts/example/');assert.equal(config[2].page_referrer,'https://example.com/');b.handlers['analytics-accept']();assert.equal(b.scripts.length,1)});
test('bridge event cleans destination and withdrawal disables tracking',()=>{const b=browser('granted');const click=()=>b.handlers.click({target:{closest:()=>({href:'https://sequre.paymond.me/?email=private'})}});click();assert.equal(b.events().at(-1)[1],'sequre_link_click');assert.equal(b.events().at(-1)[2].link_url,'https://sequre.paymond.me/');b.handlers['analytics-reject']();const n=b.events().length;click();assert.equal(b.events().length,n);assert.equal(b.w['ga-disable-G-BQGF026X72'],true)});
const existingCookies=[
 {name:'_ga',value:'qa-host'},
 {name:'_ga',value:'qa-domain',domain:'blog.paymond.me'},
 {name:'_ga_BQGF026X72',value:'qa-parent',domain:'paymond.me'},
 {name:'preference',value:'keep',domain:'paymond.me'},
 {name:'_ga_other',value:'different-path',domain:'paymond.me',path:'/other/'},
 {name:'_gaevil',value:'keep'},
];
test('withdrawal immediately expires GA root cookies without clearing unrelated cookies',()=>{
 const b=browser('granted',existingCookies);b.handlers['analytics-reject']();
 assert.deepEqual(Array.from(b.jar.keys()).sort(),['preference|paymond.me|/','_ga_other|paymond.me|/other/','_gaevil|host|/'].sort());
 assert.equal(b.w['ga-disable-G-BQGF026X72'],true);
 assert.ok(b.cookieWrites.every(c=>/^_ga(?:=|_)/.test(c)&&c.includes('Max-Age=0; Path=/')));
});
test('saved denial cleans residual GA cookies before any tag is loaded',()=>{
 const b=browser('denied',existingCookies);
 assert.equal(b.scripts.length,0);assert.equal(b.events().length,0);
 assert.equal(b.jar.has('_ga|host|/'),false);assert.equal(b.jar.has('_ga|blog.paymond.me|/'),false);
 assert.equal(b.jar.has('_ga_BQGF026X72|paymond.me|/'),false);assert.equal(b.jar.get('preference|paymond.me|/'),'keep');
});
