
async function renderKiji(){
  var fu = document.createElement('div')
  //console.log(location.hash)
  var name = location.hash.replace('#','')
  var url = CatchSky.getFileUrl(name)
  var temp =`＃ここは${name}`
  //console.log(url)
  fn.q('.wrap').innerHTML=''
  fu.innerHTML = fujiyama(await getKiji(url)||temp )
  fn.q('.wrap').append(fu)

  if(!CatchSky.isAuth()){
    return // view mode
  }
  console.log('mode editor')
  var ed = await buildEditor(url)
  fn.q('.wrap').append(ed)
  return;

  ////////////////////////
  function getKiji(url){
    return fetch(url).then(okOnly).then(d=>d.text()).catch(d=>'')    
  }
  function okOnly(d){
    if(!d.ok){ throw new Error(d.statusText) }
    return d
  }

  function buildEditor(url){
    return import('https://hashsan.github.io/EditorFrame/EditorFrame.js')
      .then(async mod=>{
      const {EditorFrame,Press} = mod
      const api = new Octo(url,CatchSky.getToken())
      //console.log(mod)
      var ed = new EditorFrame()
      ed.setTitle(url)
      ed.setData(await api.load())

      //ed.remove()
      //

      var press = new Press(ed.editor)
      press.press('ctrl+s',(e)=>{
        e.preventDefault()
        ed.setMessage('saving...')
        api.save(ed.getData()).then(d=>{
          ed.setMessage('saved')
        })
      }).press('*',(e)=>{
        fu.innerHTML = fujiyama(ed.getData() )
        ed.setMessage('needsave')  
      },400)

      return ed.frame
    })}

}
