import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import {readFileSync} from 'node:fs';
const source=readFileSync(new URL('../static/analytics.js',import.meta.url),'utf8');
function browser(saved=null){
 const handlers={}, elements={}, scripts=[], storage=new Map(saved?[['blog.analytics-consent.v1',saved]]:[]);
 for(const id of ['analytics-status','analytics-accept','analytics-reject']) elements[id]={textContent:'',addEventListener:(name,fn)=>handlers[id]=fn};
 const w={location:{hostname:'blog.paymond.me',href:'https://blog.paymond.me/posts/example/?email=secret#private'},URL,Date,
 localStorage:{getItem:k=>storage.get(k),setItem:(k,v)=>storage.set(k,v)},
 document:{referrer:'https://example.com/?token=secret',getElementById:id=>elements[id],addEventListener:(name,fn)=>handlers[name]=fn,createElement:()=>({}),head:{append:s=>scripts.push(s)}}};
 w.window=w;vm.runInNewContext(source,w);
 return {w,handlers,scripts,events:()=>Array.from(w.dataLayer||[],a=>Array.from(a))};
}
test('no Google script before consent or after saved denial',()=>{assert.equal(browser().scripts.length,0);assert.equal(browser('denied').scripts.length,0)});
test('consent uses existing stream and cleans page/referrer URLs',()=>{const b=browser();b.handlers['analytics-accept']();assert.equal(b.scripts.length,1);const config=b.events().find(e=>e[0]==='config');assert.equal(config[1],'G-BQGF026X72');assert.equal(config[2].page_location,'https://blog.paymond.me/posts/example/');assert.equal(config[2].page_referrer,'https://example.com/');b.handlers['analytics-accept']();assert.equal(b.scripts.length,1)});
test('bridge event cleans destination and withdrawal disables tracking',()=>{const b=browser('granted');const click=()=>b.handlers.click({target:{closest:()=>({href:'https://sequre.paymond.me/?email=private'})}});click();assert.equal(b.events().at(-1)[1],'sequre_link_click');assert.equal(b.events().at(-1)[2].link_url,'https://sequre.paymond.me/');b.handlers['analytics-reject']();const n=b.events().length;click();assert.equal(b.events().length,n);assert.equal(b.w['ga-disable-G-BQGF026X72'],true)});
