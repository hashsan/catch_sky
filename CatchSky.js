import "//hashsan.github.io/use/use.js"
import {Octo} from "//hashsan.github.io/Octo/Octo.js"


class CatchSky{  
  KEY_TOKEN = 'CatchSky_token'
  DEF_URL = 'https://hashsan.github.io/catch_sky/nikki/index.html'
  isauth = false;
  ///
  constructor(){

    this.site_url = this.getUrl(location.href)
    const {repo_url} = fn.gitpass(this.site_url)
    this.repo_url =repo_url

    //console.log(this.site_url,this.repo_url)

    if(!this.getToken()){
      console.log('need setToken(token)',this.KEY_TOKEN)
    }
        
    this.checkAuth()
  }
  /*
  getAvatorElement(){
    const id ="CatchSkyUser"
    var el = fn.q('#'+id)
    if(!el){
      var img = new Image()
      img.src=''
      img.id = id;
      document.body.prepend(img)
      el = img
    }
    return el    
  }*/
  getUrl(url){
    let d = this.isGithub(url)?url:this.DEF_URL
    return fn.clearurl(d)    
  }
  isGithub(d){
    return /github\.com/.test(d) || /\.github\.io/.test(d)
  }
  
  ///
  checkAuth=async()=>{

    this.img=await new Octo(this.site_url,this.getToken())
      .auth()
    this.isauth = !!this.img
    /*
    if(this.isauth){
      this.getAvatorElement().src=this.img
    }
    */
    return this.img

  }
  ////
  isAuth=()=>{
    return this.isauth
  }
  getSiteUrl=()=>{
    return this.site_url
  }
  getFileUrl=(file)=>{
    if(!file){
      throw new Error('need file')
    }
    return fn.tailchange(this.site_url,file)
  }
  getRepoUrl=()=>{
    return this.repo_url
  }
  setToken=(token)=>{
    localStorage[this.KEY_TOKEN]=token
  }
  getToken=()=>{
    return localStorage[this.KEY_TOKEN];
  }
  ///
}
