const crumbs={throwError:function(r){console.error(r)},set:function(r,e,t,o){try{if(Array.isArray(r)){var a=r;return a.forEach(r=>{if(!r.hasOwnProperty("name")||!r.hasOwnProperty("value"))throw"Mass cookie set failed, on or more object properties are incorrect."}),a.map(r=>!!this.set(r.name,r.value,r.expires,r.domain)&&r).filter(r=>r)}var s,n="";if(null!=t){var c=new Date,i=864e5;if("object"==typeof t){switch(t.type.toLowerCase()){case"minute":i=6e4;break;case"hour":i=36e5;break;case"day":i=864e5;break;case"week":i=6048e5;break;case"month":i=24192e5;break;default:throw"Not a valid time type format (use minute, hour, day, week or month only)"}t=t.value}c.setTime(c.getTime()+t*i),c.toUTCString(),n=`expires=${c};`}return s=null!=o?`path=${o};`:o,document.cookie=`${r}=${e};${n};${s}`,!0}catch(r){return this.throwError(`An error has occurred: ${r}`),!1}},get:function(r){try{var e=decodeURIComponent(document.cookie),t=(e=e.split("; ")).filter(e=>(e=e.split("="))[0]===r?1:0);return t.length>0&&t[0].split("=")[1]}catch(r){return this.throwError(`An error has occurred: ${r}`),!1}},getAll:function(){try{var r=decodeURIComponent(document.cookie);return!!(r=r.split("; "))[0]&&r.map(r=>({name:(r=r.split("="))[0],value:r[1]}))}catch(r){return this.throwError(`An error has occurred: ${r}`),!1}},delete:function(r){try{return Array.isArray(r)?(r.forEach(r=>{this.delete(r)}),!0):(document.cookie=`${r}=''; expires=Thu, 01 Jan 1970 00:00:01 GMT`,!0)}catch(r){this.throwError(`An error has occurred: ${r}`)}},deleteAll:function(){try{var r=decodeURIComponent(document.cookie);return r=r.split("; ").map(r=>(r=r.split("="),this.delete(r[0]))),!0}catch(r){this.throwError(`An error has occurred: ${r}`)}},ls:{throwError:r=>{crumbs.throwError(r)},ls:window.localStorage,set:function(r,e){try{return Array.isArray(r)?(r.forEach(r=>{if(!r.hasOwnProperty("key")||!r.hasOwnProperty("value"))throw"Mass key-value pair set failed, on or more object properties are incorrect."}),r.map(r=>{this.set(r.key,r.value)}).filter(r=>r)):(this.ls.setItem(r,JSON.stringify(e)),!0)}catch(r){return this.throwError(`An error has occurred: ${r}`),!1}},get:function(r,e=!0){try{return Array.isArray(r)?r.map(r=>({key:r,value:this.get(r)})).filter(r=>r):e?JSON.parse(this.ls.getItem(r)):this.ls.getItem(r)}catch(r){return this.throwError(`An error has occurred: ${r}`),!1}},getAll:function(r=!0){try{let e=[];for(let t in this.ls)"key"!=t&&"getItem"!=t&&"setItem"!=t&&"removeItem"!=t&&"clear"!=t&&"length"!=t&&e.push({key:t,value:r?JSON.parse(this.ls[t]):this.ls[t]});return e}catch(r){return this.throwError(`An error has occurred: ${r}`),!1}},deleteAll:function(){try{return this.ls.clear(),!0}catch(r){return this.throwError(`An error has occurred: ${r}`),!1}}}};