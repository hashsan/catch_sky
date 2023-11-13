/*
v1 lunched
v2 double load
*/

async function renderIndex(){
  await import("//hashsan.github.io/use/use.js?v=35")
  await import("//hashsan.github.io/fujiyama/fujiyama.js")  
  const  {CatchSky} = await import("https://hashsan.github.io/catch_sky/CatchSky.js?v3")
  var fu = document.createElement('div')
  var temp=`
＃ここはキャッチャーインザースカイのサイトです。
このキャッチャーインザースカイは、フジヤマパーサーで書かれております。
フジヤマパーサーとは、日本語の文章を保持したまま、ある程度のマークアップ、強調とかですね、HTMLに変換するものです。マークダウンを知ってる方は、それです。その日本語版。
さて。
＃記事一覧です。
  `
  fn.q('.wrap').innerHTML=''
  fu.innerHTML = fujiyama(temp)
  fn.q('.wrap').append(fu)


  const listid ='indexlist'
  var el= await makeindex()
  if(!fn.q('#'+listid)){
    //v2
    fn.q('.wrap').append(el)
  }
  //console.log(el)
  async function makeindex(){
    var el = document.createElement('div')
    el.id = listid  //v2
    var url = CatchSky.getRepoUrl()
    //console.log(url)
    var ary =await fetch(url)
    .then(d=>d.json());
    //console.log(ary)
    var html = ary.filter(d=>/\.txt$/.test(d.name))
    .map(d=>`<a href="#${d.name}">${d.name}</a>`).join('\n')
    el.innerHTML = html
    return el
  }

}

window.renderIndex = renderIndex;
