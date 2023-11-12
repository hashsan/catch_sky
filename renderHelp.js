//import {CatchSky} from "https://hashsan.github.io/catch_sky/CatchSky.js?v2";
//import "//hashsan.github.io/fujiyama/fujiyama.js"
//import "//hashsan.github.io/use/use.js"
/*
  import {Octo} from "//hashsan.github.io/Octo/Octo.js"
  import "//hashsan.github.io/hashsan.js/hashsan.js"
*/


//console.log(CatchSky)

/*
hashsan.add("#help",renderHelp)
hashsan.start('#help')
*/

async function renderHelp(){
  const {CatchSky} = await import("https://hashsan.github.io/catch_sky/CatchSky.js?v2")
  const {fujiyama} = await import("https://hashsan.github.io/fujiyama/fujiyama.js")
  const {fn} = await import("https://hashsan.github.io/use/use.js")

  
  var fu = document.createElement('div')
var temp=`
＃キャッチスカイに関して。
キャッチスカイは、HTMLを一本おけば、サイトを生成できるようにする。
テキストでもいいが、HTMLでもいい。
出力データは、最終的にHTMLでもいいが、簡単にするためには、まずテキストでいい。
ページのURLに「＃ファイル名」を加えるとエディタ画面に飛ぶ。この時点でまだファイルはないが、エディタからセーブをすると、セーブされる。
この機能はハッシュサンがやってくれるので、それでいい。

＃この画面は認証も行う。
認証にはジットハブのトークンが必要で、しかもジットハブのトークンは、有効期限が切れやすいので、頻繁に帰る必要がある。無制限のもあるが。
今の所は三〇日間のものを想定して、インプット画面を作る。
というか、これ↓↓
<input id="sky_token" placeholder="ghp_">
認証が成功したかどうかは画像で表示できるといいか。
<img id="ok_token" class="c">
`
  fn.q('.wrap').innerHTML= '';
  fu.innerHTML=fujiyama(temp)
  fn.q('.wrap').append(fu)
  var input = fn.q('#sky_token')
  input.value = CatchSky.getToken()
  var img = fn.q('#ok_token')
  checkAuth()
  input.onblur = checkAuth
  
  
  function checkAuth(){
    CatchSky.setToken(input.value)
    CatchSky.checkAuth().then(d=>{
      if(!d){
        return 
      }
      input.disabled=true;
      img.src = d
    }) 
  }
  
}

window.renderHelp = renderHelp




//var u =CatchSky.getFileUrl('xyz.txt')
//console.log(u)

/*
CatchSky.setToken( localStorage["test_ghp"] )
CatchSky.checkAuth().then(d=>{
  console.log(d)
})
*/
