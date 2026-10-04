import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import {readFileSync} from 'node:fs';
const source=readFileSync(new URL('../assets/analytics.js',import.meta.url),'utf8');
function browser(saved=null,cookies=[]){
 const handlers={}, elements={}, scripts=[], storage=new Map(saved?[['blog.analytics-consent.v1',saved]]:[]);
 const jar=new Map(cookies.map(c=>[`${c.name}|${c.domain||'host'}|${c.path||'/'}`,c.value]));
 const cookieWrites=[],timers=[];
 for(const id of ['analytics-choice','analytics-label','analytics-initial-actions','analytics-details','analytics-settings','analytics-settings-label','analytics-description','analytics-status']) elements[id]={textContent:'',hidden:false,dataset:{},open:false,attributes:{},focus(){this.focused=true},setAttribute:(name,value)=>elements[id].attributes[name]=value,addEventListener:(name,fn)=>handlers[`${id}:${name}`]=fn};
 const buttons=['analytics-accept','analytics-reject','analytics-accept-details','analytics-reject-details'].map(id=>({dataset:{analyticsConsent:id.includes('accept')?'granted':'denied'},addEventListener:(name,fn)=>handlers[id]=fn}));
 const w={location:{hostname:'blog.paymond.me',href:'https://blog.paymond.me/posts/example/?email=secret#private'},URL,Date,setTimeout:fn=>timers.push(fn),flushTimers:()=>timers.splice(0).forEach(fn=>fn()),
 localStorage:{getItem:k=>storage.get(k),setItem:(k,v)=>storage.set(k,v)},
 document:{referrer:'https://example.com/?token=secret',getElementById:id=>elements[id],querySelector:selector=>selector==='.analytics-label'?elements['analytics-label']:null,querySelectorAll:selector=>selector==='[data-analytics-consent]'?buttons:[],addEventListener:(name,fn)=>handlers[name]=fn,createElement:()=>({}),head:{append:s=>scripts.push(s)}}};
 Object.defineProperty(w.document,'cookie',{get:()=>Array.from(jar,([key,value])=>`${key.split('|')[0]}=${value}`).join('; '),set:value=>{
  cookieWrites.push(value);const [pair,...attributes]=value.split(';').map(s=>s.trim());const name=pair.split('=')[0];
  const domain=(attributes.find(s=>/^Domain=/i.test(s))?.slice(7)||'host').replace(/^\./,'');
  const path=attributes.find(s=>/^Path=/i.test(s))?.slice(5)||'/';
  if(attributes.some(s=>/^Max-Age=0$/i.test(s))) jar.delete(`${name}|${domain}|${path}`);
 }});
 w.window=w;vm.runInNewContext(source,w);
 return {w,handlers,elements,scripts,jar,cookieWrites,events:()=>Array.from(w.dataLayer||[],a=>Array.from(a))};
}
test('first visit keeps details collapsed; choices collapse to accessible settings control',()=>{
 const b=browser();
 assert.equal(b.elements['analytics-details'].open,false);
 assert.equal(b.elements['analytics-initial-actions'].hidden,false);
 assert.equal(b.elements['analytics-description'].hidden,true);
 assert.equal(b.elements['analytics-choice'].dataset.consent,'unset');
 b.handlers['analytics-accept']();
 assert.equal(b.elements['analytics-choice'].dataset.consent,'granted');
 assert.equal(b.elements['analytics-label'].hidden,true);
 assert.equal(b.elements['analytics-initial-actions'].hidden,true);
 assert.equal(b.elements['analytics-settings-label'].textContent,'访问统计');
 assert.equal(b.elements['analytics-details'].open,false);
 assert.equal(b.elements['analytics-settings'].attributes['aria-expanded'],'false');
 assert.equal(b.elements['analytics-settings'].focused,true);
 assert.equal(b.elements['analytics-status'].textContent,'已允许');
});
test('first visit can decline without loading Google Analytics',()=>{
 const b=browser();
 b.handlers['analytics-reject']();
 assert.equal(b.elements['analytics-choice'].dataset.consent,'denied');
 assert.equal(b.w.localStorage.getItem('blog.analytics-consent.v1'),'denied');
 assert.equal(b.scripts.length,0);
 assert.equal(b.events().length,0);
 assert.equal(b.elements['analytics-settings-label'].textContent,'访问统计');
 assert.equal(b.elements['analytics-initial-actions'].hidden,true);
});
test('saved consent collapses the choice row and preserves disclosure controls',()=>{
 const b=browser('granted');
 assert.equal(b.scripts.length,1);
 assert.equal(b.elements['analytics-initial-actions'].hidden,true);
 assert.equal(b.elements['analytics-label'].hidden,true);
 assert.equal(b.elements['analytics-settings-label'].textContent,'访问统计');
 assert.equal(b.elements['analytics-settings'].focused,undefined);
 b.elements['analytics-details'].open=true;
 b.handlers['analytics-details:toggle']();
 assert.equal(b.elements['analytics-settings'].attributes['aria-expanded'],'true');
 assert.equal(b.elements['analytics-description'].hidden,false);
 b.handlers['analytics-settings:click']();
 b.w.flushTimers();
 assert.equal(b.elements['analytics-details'].attributes['aria-expanded'],undefined);
 b.handlers['analytics-reject-details']();
 assert.equal(b.w['ga-disable-G-BQGF026X72'],true);
 assert.equal(Array.from(b.w.dataLayer.at(-1))[2].analytics_storage,'denied');
 assert.equal(b.elements['analytics-details'].open,false);
});
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
