(async()=>{
 const cat=document.body.dataset.cat;
 const list=document.getElementById('list');
 let items=[];try{items=await (await fetch('items.json?'+Date.now())).json()}catch(e){}
 const now=new Date();
 items=items.filter(i=>(cat==='all'||i.cat===cat)&&new Date(i.show+':00+09:00')<=now).sort((a,b)=>(a.past?1:0)-(b.past?1:0)||b.show.localeCompare(a.show));
 if(!items.length){list.innerHTML='<p class="empty">まだありません。リールが出たら、ここに順番に増えていきます🐱</p>';return}
 for(const i of items){const d=new Date(i.show+':00+09:00');
  const el=document.createElement('details');if(list.children.length===0)el.open=true;
  el.innerHTML=`<summary><span class="d">${i.past?'これまで':(d.getMonth()+1)+'/'+d.getDate()}</span><b>${i.title}</b><small>${i.sub}</small></summary><img loading="lazy" src="${i.no}.jpg" alt="${i.title}の手続き表">`;
  list.appendChild(el)}
})();
