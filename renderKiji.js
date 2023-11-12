/*
v1 lunched
v2 dynamic import
v3 cut out the renderKiji.js
v4 ctrl+v -> render
v5 Enter is 30sec maid save
*/


async function renderKiji(){
  await import("//hashsan.github.io/fujiyama/fujiyama.js")
  await import("//hashsan.github.io/use/use.js?v=35")
  const {CatchSky} = await import("https://hashsan.github.io/catch_sky/CatchSky.js?v3")

  
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

  async function buildEditor(url){      
      const {EditorFrame,Press} = await import('https://hashsan.github.io/EditorFrame/EditorFrame.js')
      const {Octo} = await import("https://hashsan.github.io/Octo/Octo.js")

      const api = new Octo(url,CatchSky.getToken())
      //console.log(mod)
      var ed = new EditorFrame()
      ed.setTitle(url)
      ed.setData(await api.load())

      //ed.remove()
      //

      var press = new Press(ed.editor)
      press
        .press('ctrl+s',(e)=>{
        e.preventDefault()
        ed.setMessage('saving...')
        api.save(ed.getData()).then(d=>{
          ed.setMessage('saved')
        })
      })
       .press('Enter',(e)=>{
         //v5
        ed.setMessage('auto saving...')
        api.save(ed.getData()).then(d=>{
          ed.setMessage('auto saved')
        })
      },30*1000)        
        .press('ctrl+v',(e)=>{
          //v4
        fu.innerHTML = fujiyama(ed.getData() )
        ed.setMessage('needsave')            
        })
        .press('*',(e)=>{
        fu.innerHTML = fujiyama(ed.getData() )
        ed.setMessage('needsave')  
      },400)

      return ed.frame
    }

}



window.renderKiji = renderKiji
