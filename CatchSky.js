/*
v1 luched
v2 refactor so less
*/

import "//hashsan.github.io/use/use.js"
import {Octo} from "//hashsan.github.io/Octo/Octo.js"


/*
function makeDay(){
  const diff = 9*60*60*1000
  const now = new Date(Date.now()+diff).toISOString()
  .split('T').at(0).split('-').join('')
  return now
}
*/


class CatchSky{  
  KEY_TOKEN = 'CatchSky_token'
  DEF_URL = 'https://hashsan.github.io/catch_sky/nikki/index.html'
  CLS_AUTH = 'CatchSky_auth'
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
  getUrl(url){
    let d = this.isGithub(url)?url:this.DEF_URL
    return fn.clearurl(d)    
  }
  isGithub(d){
    return /github\.com/.test(d) || /\.github\.io/.test(d)
  }
  
  ///
  checkAuth=async()=>{
    this.img=await new Octo(this.site_url,this.getToken()).auth()
    this.isauth = !!this.img
    if(this.isauth){
      document.body.classList.add(this.CLS_AUTH) //on off the editor
    }
    return this.img
  }
  isAuth=()=>{ return this.isauth }
  getSiteUrl=()=>{ return this.site_url }
  getFileUrl=(file)=>{
    if(!file){
      throw new Error('need file')
    }
    return fn.tailchange(this.site_url,file)
  }
  getRepoUrl=()=>{ return this.repo_url }
  setToken=(token)=>{ localStorage[this.KEY_TOKEN]=token }
  getToken=()=>{ return localStorage[this.KEY_TOKEN]; }
  
}



CatchSky = new CatchSky()
export {CatchSky}



