import Config from "https://hashsan.github.io/catch_sky/Config.js";

async function renderLogin(){
 var view = fn.q('#left .view')
 var temp=`
＃こちらはログイン画面です。
ログインをすると、エディタを起動することが出来ます。それ以外はリードオンリーです。インデックスから日記の閲覧のみとなります。
ログインをするためには、ジットハブのアクセストークンが必要となります。
取得して、こちらに入力して下さい。↓↓
<input id="login">
既に入力し、ログイン可能な場合は、変更不可になっています。アクセストークンには、有効期限がある場合がありますので、その場合は、再度入力できます。
またアクセストークンは、基本自分のジットハブのリポジトリのみの対象となっていますので、他人のサイトへの認証は、正しいアクセストークンであってもできません。
では。
https://i.pinimg.com/564x/14/99/3f/14993fba3af61fa74927224ecd133dd8.jpg
「レッツエンジョイ」

 `
 view.innerHTML= fujiyama(temp) 
  
  const {GHP_KEY,geturl} = Config 
  var login = fn.q('#login')
  login.value = localStorage[GHP_KEY];
  check(localStorage[GHP_KEY])
  login.onblur =()=>{
    check(login.value)
  }
  //console.log(login)
  
  async function check(ghp){
    var u = geturl()
    var d = await new Octo(u,ghp).auth()
    if(!d){
      login.value =''
      localStorage[GHP_KEY] =''
      return
    }
    login.setAttribute('disabled','')
    localStorage[GHP_KEY] =ghp 
  } 
}

window.renderLogin = renderLogin
 
