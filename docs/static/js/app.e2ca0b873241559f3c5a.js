webpackJsonp([1],{"7Otq":function(e,t,s){e.exports=s.p+"static/img/logo.7d35946.png"},NHnr:function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=s("7+uW"),r=s("mvHQ"),n=s.n(r),a={name:"Session",methods:{setSession:function(e){localStorage.setItem("session",n()(e))},setAuthor:function(e){var t=this.getSession();t.author=e,this.setSession(t)},setInspirers:function(e){var t=this.getSession();t.inspirers=e,this.setSession(t)},setTheme:function(e){document.body.className=e;var t=this.getSession();t.theme=e,this.setSession(t)},getAuthor:function(){return this.getSession().author},getInspirers:function(){return this.getSession().inspirers},getTheme:function(){return this.getSession().theme},getSession:function(){return JSON.parse(localStorage.getItem("session"))}}},o=s("VU/8")(a,null,!1,null,null,null).exports,l=s("mtWM"),c=s.n(l),h={name:"Feed",props:{inspirer:{required:!0}},data:function(){return{mutableInspirer:[],errors:[]}},methods:{fixRepoAction:function(e){return"started"===e?"starred":"ForkEvent"===e?"forked":"CreateEvent"===e?"created":"PublicEvent"===e?"published":void 0},generateRepoLink:function(e){return"https://github.com/"+e},generateUserLink:function(e){return e.replace("api.","").replace("users/","")}},beforeMount:function(){var e=this;c.a.get(this.inspirer.received_events_url).then(function(t){e.mutableInspirer=t.data.filter(function(e){return"CreateEvent"===e.type||"ForkEvent"===e.type||"WatchEvent"===e.type||"PublicEvent"===e.type})}).catch(function(t){e.errors.push(t),console.log(e.errors)})}},u={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"col-6"},[s("div",{staticClass:"row"},[s("div",{staticClass:"col-2 inspirer-avatar"},[s("img",{staticClass:"inspirer-avatar",attrs:{src:e.inspirer.avatar_url,alt:""}})]),e._v(" "),s("div",{staticClass:"col-10 right"},[s("span",{staticClass:"inspirer-name"},[e._v(e._s(e.inspirer.login)+"'s Feed")])])]),e._v(" "),s("div",{staticClass:"feed"},e._l(e.mutableInspirer,function(t){return s("div",{key:t.id,staticClass:"event row"},[s("div",{staticClass:"col-1"},[s("a",{attrs:{href:e.generateUserLink(t.actor.url),target:"_blank"}},[s("img",{staticClass:"feed-avatar",attrs:{src:t.actor.avatar_url,alt:t.actor.login}})])]),e._v(" "),s("div",{staticClass:"col-11"},[s("span",{staticClass:"action"},[e._v("\n            "+e._s(t.actor.login)+"\n            "+e._s(e.fixRepoAction(t.payload.action)||e.fixRepoAction(t.type))+" this repo\n            "),s("a",{attrs:{href:e.generateRepoLink(t.repo.name),target:"_blank"}},[e._v(" "+e._s(t.repo.name)+" ")])])])])}))])},staticRenderFns:[]},p=s("VU/8")(h,u,!1,null,null,null).exports,d=1,g={name:"inspirers",props:{author:{required:!0}},components:{Feed:p,Session:o},data:function(){return{selected:[],inspirers:[],pagination:!1,search:"",errors:[]}},watch:{selected:function(e){e.length>8&&(alert("You can select max 8 user"),this.selected.splice(-1,1)),o.methods.setInspirers(this.selected)},author:function(e){e!==this.author.login&&(this.getInspirers(),this.removeFollowingInspirers())}},computed:{filtredInspirers:function(){var e=this;return this.inspirers.filter(function(t){return t.login.toLowerCase().includes(e.search.toLowerCase())})}},beforeMount:function(){this.selected=o.methods.getInspirers(),this.getInspirers()},methods:{removeFollowingInspirers:function(){this.selected=[],o.methods.setInspirers(this.selected)},toPage:function(e){d=e,this.getInspirers()},isPagination:function(){this.author.following>100?(this.pagination=!0,this.pagination_size=Math.ceil(this.author.following/100)):this.pagination=!1},getInspirers:function(){var e=this,t="https://api.github.com/users/:author/following?page=:CURRENT_PAGE&per_page=100".replace(":author",this.author.login).replace(":CURRENT_PAGE",d);c.a.get(t).then(function(t){e.inspirers=t.data,e.isPagination()}).catch(function(t){e.errors.push(t),alert(e.errors)})}}},v={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"row"},[s("div",{staticClass:"col-10"},[e._l(e.selected,function(e){return s("feed",{key:e.id,attrs:{inspirer:e}})}),e._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:0==e.selected.length,expression:"selected.length == 0"}]},[s("h3",[e._v("Please select some of the people you are inspired by.")]),e._v(" "),e._m(0),e._v(" "),e._m(1)])],2),e._v(" "),0!==e.author.length?s("div",{staticClass:"col-2 center"},[s("h4",[s("a",{attrs:{href:this.author.html_url,target:"_blank"}},[e._v(e._s(this.author.login))])]),e._v(" "),s("img",{staticClass:"user-avatar",attrs:{src:this.author.avatar_url,alt:"Github profile picture"}}),e._v(" "),s("h4",[s("u",[e._v("Inspirers "+e._s(this.author.following))])]),e._v(" "),e.pagination?s("div",{staticClass:"pagination"},[s("span",[e._v("Page:")]),e._v(" "),e._l(e.pagination_size,function(t){return s("a",{key:t,staticClass:"hand",on:{click:function(s){e.toPage(t)}}},[e._v(" "+e._s(t))])})],2):e._e(),e._v(" "),s("div",{staticClass:"inspirer-search-wrapper"},[s("input",{directives:[{name:"model",rawName:"v-model",value:e.search,expression:"search"}],staticClass:"inspirer-search",attrs:{type:"text",placeholder:"Search Inspirer"},domProps:{value:e.search},on:{input:function(t){t.target.composing||(e.search=t.target.value)}}})]),e._v(" "),s("ul",{staticClass:"inspirers left"},e._l(e.filtredInspirers,function(t){return s("li",{key:t.id,staticClass:"left"},[s("input",{directives:[{name:"model",rawName:"v-model",value:e.selected,expression:"selected"}],attrs:{type:"checkbox",id:t.id},domProps:{value:t,checked:Array.isArray(e.selected)?e._i(e.selected,t)>-1:e.selected},on:{change:function(s){var i=e.selected,r=s.target,n=!!r.checked;if(Array.isArray(i)){var a=t,o=e._i(i,a);r.checked?o<0&&(e.selected=i.concat([a])):o>-1&&(e.selected=i.slice(0,o).concat(i.slice(o+1)))}else e.selected=n}}}),e._v(" - "+e._s(t.login)+"\n        ")])}))]):e._e()])},staticRenderFns:[function(){var e=this.$createElement,t=this._self._c||e;return t("h4",[this._v("\n        Why do we decide to follow people other than our friends? "),t("br"),this._v("\n        Because these people inspire our mind. so, who are these people following? "),t("br"),this._v("\n        Who are they inspired by? Poliwag shows the feed of the people you follow ( only the last 20 activities ). "),t("br"),this._v("\n        and automatically saves  your inspiring people in your local storage "),t("br")])},function(){var e=this.$createElement,t=this._self._c||e;return t("h4",[this._v("You can see this repository on github | "),t("a",{attrs:{href:"https://github.com/livacengiz/poliwag",target:"_blank"}},[this._v("Link")])])}]},m=s("VU/8")(g,v,!1,null,null,null).exports,f={name:"App",data:function(){return{session:{author:[],inspirers:[],theme:"poliwag-night"},authorName:"",themes:["poliwag-day","poliwag-night"],errors:[]}},components:{Inspirers:m,Session:o},beforeMount:function(){null!==o.methods.getSession()&&(this.session=o.methods.getSession(),document.body.className=o.methods.getTheme())},created:function(){null===o.methods.getSession()&&o.methods.setSession(this.session)},computed:{nextTheme:function(){var e=this;return this.themes.filter(function(t){return t!==e.session.theme})[0].replace("-"," ").toUpperCase()}},methods:{getAuthor:function(){var e=this,t="https://api.github.com/users/:author".replace(":author",this.authorName);c.a.get(t).then(function(t){o.methods.setAuthor(t.data),e.session=o.methods.getSession()}).catch(function(t){e.errors.push(t),alert(e.errors)})},toggleTheme:function(){var e=this,t=this.themes.filter(function(t){return t!==e.session.theme})[0];this.session.theme=t,o.methods.setTheme(t)}}},_={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",[s("header",{staticClass:"col-12"},[s("div",{staticClass:"row"},[e._m(0),e._v(" "),s("div",{staticClass:"col-8"},[s("div",{staticClass:"main-search-wrapper"},[s("input",{directives:[{name:"model",rawName:"v-model",value:e.authorName,expression:"authorName"}],staticClass:"main-search",attrs:{type:"text",placeholder:"search github user.."},domProps:{value:e.authorName},on:{keyup:function(t){if(!("button"in t)&&e._k(t.keyCode,"enter",13,t.key))return null;e.getAuthor()},input:function(t){t.target.composing||(e.authorName=t.target.value)}}})])]),e._v(" "),s("div",{staticClass:"col-2 right"},[s("span",{staticClass:"toggle-btn hand",on:{click:function(t){e.toggleTheme()}}},[e._v("[ "+e._s(e.nextTheme)+" ]")])])])]),e._v(" "),s("div",{staticClass:"row"},[s("inspirers",{attrs:{author:e.session.author}})],1)])},staticRenderFns:[function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"col-2 heading"},[t("img",{staticClass:"logo",attrs:{src:"static/img/logo.png",alt:""}}),this._v(" "),t("br"),this._v(" "),t("span",{staticClass:"app-name"},[this._v("Poliwag")])])}]},C=s("VU/8")(f,_,!1,null,null,null).exports;s("Q0/0"),s("7Otq");i.a.config.productionTip=!1,new i.a({el:"#app",components:{App:C},template:"<App/>"})},"Q0/0":function(e,t){}},["NHnr"]);
//# sourceMappingURL=app.e2ca0b873241559f3c5a.js.map