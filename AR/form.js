//display urlは名刺を表示するためのページ
const display_url = "https://seven320.github.io/AR/profile.html"
const local_url = `file:///Users/kenkato/html_css/AR/profile.html`

//base url　はQRのコードを手に入れるローカルサーバーにアクセス
const base_url = "https://00ea0ebe.ngrok.io" // use ngrok and connect local server to public server


var app = new Vue({
  el:'#app',
  vuetify: new Vuetify(),
  data: () => ({
    valid: false,
    name: "name",
    belong: "university",
    tel: "xx-xxxx-xxxx",
    email: "xxxxxxxx@google.co.jp",
    twitterID: "@",
    githubID: "",
    description: "",
    debug_QRurl: "",
    QRurl:"",
    get_encode_QRurl:"",
    QRimagebase64:"",
    nameRules:[
      v => !!v || "Name is required",
      v => v.length <= 30 || "Name must be less than 30 characters",
    ],
    belongRules:[
      v => !!v || "belongs is required",
      v => v.length <= 255 || "Name must be less than 255 characters",
    ],
    telRules:[
      v => !!v || "TEL is required",
      v => v.length <= 20 || "TEL must be less than 20 characters"
    ],
    emailRules:[
      v => !!v || "e-mail is required",
      v => v.length <= 255 || "e-mail must be less than 255 characters"
    ]
  }),
  created: function(){
    this.displayConsole();

  },
  methods:{
    displayConsole: function(){
      console.log("successs load")
    },
    getForm: function(){
      if (this.name.length==0){
        alert("name is required")
      } else if(this.belong.length==0){
        alert("belong is required")
      } else if(this.tel.length==0){
        alert("TEL is required")
      } else if(this.email.length==0){
        alert("e-mail is required")
      }
      this.debug_QRurl = `${local_url}?query=${this.name}---${this.belong}---${this.tel}---${this.email}---${this.twitterID}---${this.githubID}---${this.description}`
      this.QRurl = `${display_url}?query=${this.name}---${this.belong}---${this.tel}---${this.email}---${this.twitterID}---${this.githubID}---${this.description}`
      this.get_encode_QRurl = encodeURIComponent(`${display_url}?query=${this.name}---${this.belong}---${this.tel}---${this.email}---${this.twitterID}---${this.githubID}---${this.description}`)
      },
    getQRcode: async function(){
      console.log(this.getQRurl)
      let requesturl = `${base_url}/qr/${this.get_encode_QRurl}` // for public server


      console.log("requesturl",requesturl)
      let response = await fetch(requesturl, {
        method:"GET",
      })
      let hoge = await console.log(response)
      let base64 = await response.text()
      // this.QRimagebase64 = "data:image/png;base64," + base64
      this.QRimagebase64 = base64
      console.log("base64",base64)
    }
  }
})