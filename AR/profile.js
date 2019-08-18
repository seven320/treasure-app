let datas = window.location.search
let words = datas.split("---")

const username = words[0].split("=")[1]
const belong = words[1]
const tel = words[2]
const email = words[3]
const twitterID = words[4]
const githubID = words[5]

console.log("success load page")
console.log(username,belong,tel,email,twitterID,githubID)

let boxname = document.querySelector(`#name`)
boxname.setAttribute("value", "NAME:" + username)

let formbox = document.querySelector(`#other`)

let form_text = `belong:${belong}\nTEL:${tel}\ne-mail:${email}`
if(twitterID.length > 3){
    form_text += `\nTwitter:${twitterID}`
}
if(githubID.length > 0){
    form_text += `\ngithub:${githubID}`
}

formbox.setAttribute("value", form_text)