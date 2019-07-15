(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{69:function(e,t,n){e.exports=n(80)},80:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=n(21),i=n.n(o),l=n(64),c=n(19),s=n(124),u=n(3),d=n(12),m=n(125),f=n(115),b=n(119),p=n(114),v=n(120),h=n(110),E=n(112),y=n(4),g=n(53),j=Object(u.o)(),O=Object(u.q)({title:{textAlign:"center",fontSize:g.a.size28,border:"1px solid transparent",outline:"none",borderRadius:0,paddingBottom:4,width:"80%",selectors:{"&:focus":{borderBottom:"1px solid "+j.palette.neutralTertiary,outline:"none"},"&:hover":{borderBottom:"1px solid "+j.palette.neutralTertiary,outline:"none"}}}}),w=function(e){var t=e.value,n=e.className,a=e.onBlur,o=e.onChange;return r.a.createElement("div",{className:n},r.a.createElement("input",{className:O.title,onChange:o,onBlur:a,value:t,defaultValue:"Untitled"}))},S=n(121),C=n(111),T=n(113),k=n(36),x=n(108),B=function(e){return{level:arguments.length>1&&void 0!==arguments[1]?arguments[1]:1,subjectId:e,type:"COMPLETE_SUBJECT"}},N=function(e,t){!function e(t,n,a){var r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:new Date;if(void 0===t[n].completed&&(t[n].completed=r,a>1)){var o=!0,i=!1,l=void 0;try{for(var c,s=t[n].children[Symbol.iterator]();!(o=(c=s.next()).done);o=!0)e(t,c.value,a-1,r)}catch(u){i=!0,l=u}finally{try{o||null==s.return||s.return()}finally{if(i)throw l}}}}(e,t.subjectId,t.level)},D=function(e){return{subjectId:e,type:"UNCOMPLETE_SUBJECT"}},I=n(54),M=function(e){return{subjectId:e,type:"DELETE_SUBJECT"}},_=Object(u.o)(),R="1px solid "+_.palette.neutralTertiary,U=Object(u.q)({wrapper:{display:"flex",flexDirection:"row",border:R,borderRadius:2,marginTop:1,marginBottom:1},checkbox:{margin:8},content:{display:"flex",flexGrow:2,paddingLeft:8,paddingRight:8},open:{color:_.palette.white,background:_.palette.themePrimary,fontSize:18,cursor:"pointer",border:"none",outline:"none",margin:-1,height:40,selectors:{"&:hover":{filter:"brightness(90%)"},"&:active":{filter:"brightness(80%)"}}}});function J(e){var t=e.id,n=e.subject,o=Object(d.b)(),i=Object(a.useRef)(Object(k.c)(t)),l=Object(a.useRef)(null),s=Object(a.useState)(!1),u=Object(c.a)(s,2),m=u[0],f=u[1];function b(e){e.preventDefault(),f(!m)}var p=function(e,n,a){o(!0===n?B(t,a):D(t))},v=[{key:"complete-1-level",text:"Mark as complete",onClick:function(e,t){t&&p(0,!t.checked,1)}},{key:"complete-2-level",text:"Mark this and its children as complete",onClick:function(e,t){t&&p(0,!t.checked,2)}},{key:"delete",text:"Delete this",onClick:function(){return o(M(t))}}];return r.a.createElement("div",{"data-is-focusable":!0,onContextMenu:b,ref:l,key:t},r.a.createElement("div",{className:U.wrapper},r.a.createElement(S.a,{checked:!!n.completed,label:n.name,className:U.checkbox,onChange:p}),r.a.createElement("div",{className:U.content}),r.a.createElement(C.a,{content:"Open "+n.name,id:i.current},r.a.createElement("button",{className:U.open,"aria-labelledby":i.current},r.a.createElement(T.a,{iconName:"OpenFile"})))),m?r.a.createElement(x.a,{isBeakVisible:!1,onDismiss:b,target:l,directionalHint:y.a.bottomRightEdge,items:v}):null)}function L(e){if(e){var t=e.id,n=e.subject;return r.a.createElement(J,{id:t,subject:n})}}var P="1px solid "+Object(u.o)().palette.neutralTertiary,A=Object(u.q)({list:{overflow:"auto",height:300,borderTop:P,borderBottom:P}}),q=function(e){var t=e.id,n=Object(d.c)(function(e){return e.subjects}),a=n[t].children,o=[],i=!0,l=!1,c=void 0;try{for(var u,f=a[Symbol.iterator]();!(i=(u=f.next()).done);i=!0){var b=u.value;o.push({id:b,subject:n[b]})}}catch(p){l=!0,c=p}finally{try{i||null==f.return||f.return()}finally{if(l)throw c}}return r.a.createElement(m.a,null,r.a.createElement(s.a,{items:o,onRenderCell:L,className:A.list}))},z=Object(u.o)(),W=Object(u.q)({header:{backgroundColor:z.palette.themePrimary,color:z.palette.neutralLight,padding:5,selectors:{"&:focus":{outline:"none",border:"none"}}},body:{padding:10},title:{paddingTop:10,paddingBottom:5},description:{paddingTop:10,paddingBottom:10},date:{display:"flex",justifyContent:"space-between"},daysLeft:{display:"flex",justifyContent:"flex-end"}}),H=function(e){var t=e.subject,n=e.id,o=Object(d.b)(),i=Object(a.useState)(t.name),l=Object(c.a)(i,2),s=l[0],u=l[1],g=Object(a.useState)(t.description||""),j=Object(c.a)(g,2),O=j[0],S=j[1],C=t.dueDate?(new Date).getDate()-t.dueDate.getDate():"\u221e";return r.a.createElement(m.a,null,r.a.createElement(f.a,{verticalAlign:"center"},r.a.createElement(b.a,{className:W.header},"Created ",t.created.toLocaleString()),r.a.createElement("div",{className:W.body},r.a.createElement(w,{className:W.title,value:s,onChange:function(e){u(e.target.value)},onBlur:function(){t.name!==s&&o(function(e,t){return{name:t,subjectId:e,type:"SET_SUBJECT_NAME"}}(n,s))}}),r.a.createElement(p.a,{multiline:!0,rows:3,value:O,onChange:function(e,t){S(t||"")},onBlur:function(){t.description!==O&&o(function(e,t){return{description:t,subjectId:e,type:"SET_SUBJECT_DESCRIPTION"}}(n,O))},className:W.description}),r.a.createElement("div",{className:W.date},r.a.createElement(v.a,null,"Due date:"),r.a.createElement(h.a,{value:t.dueDate})),r.a.createElement("div",{className:W.daysLeft},r.a.createElement(v.a,null,"".concat(C," days left"))),r.a.createElement(q,{id:n}),r.a.createElement(E.a,{primary:!0,text:"Mark as complete",style:{marginTop:10},menuProps:{directionalHint:y.a.bottomCenter,isBeakVisible:!1,items:[{key:"complete-2-level",text:"Mark this and its children as complete"},{key:"delete",text:"Delete this"}]}}))))},V=Object(u.o)(),F=Object(u.q)({list:{overflow:"hidden",position:"relative"},tile:{textAlign:"center",position:"relative",float:"left"},sizer:{paddingBottom:"100%"},padder:{position:"absolute",left:4,top:4,right:4,bottom:4},contents:{position:"absolute",top:0,left:0,outline:"1px solid "+V.palette.neutralTertiary}}),G=function(){var e=Object(a.useRef)(0),t=Object(a.useRef)(0),n=Object(d.c)(function(e){return e.subjects});return r.a.createElement(s.a,{className:F.list,items:Object(l.a)(Object.entries(n)),getItemCountForPage:function(n,a){return 0===n&&a&&(e.current=Math.ceil(a.width/400),t.current=Math.floor(a.width/e.current)),3*e.current},getPageHeight:function(){return 1800},renderedWindowsAhead:4,onRenderCell:function(t){if(t){var n=Object(c.a)(t,2),a=n[0],o=n[1];return r.a.createElement("div",{className:F.tile,"data-is-focusable":!0,key:a,style:{width:100/e.current+"%",height:600}},r.a.createElement("div",{className:F.sizer},r.a.createElement("div",{className:F.padder},r.a.createElement("div",{className:F.contents},r.a.createElement(H,{subject:o,id:a})))))}}})},$=function(){return r.a.createElement("div",null,r.a.createElement(G,null))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var K=n(18),Q=n(61),X=n(63),Y=n(62);var Z=function(){for(var e,t=[],n=0;n<12;n++)t.push((e=23,Math.floor(Math.random()*Math.floor(e))).toString());return t},ee=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:function(e){for(var t={},n=0;n<e;n++)t[n.toString()]={type:"BaseSubject",name:"Name".concat(n),created:new Date,description:"Description".concat(n),dueDate:new Date,children:Z(),parents:new Set};for(var a=0;a<e;a++){var r=!0,o=!1,i=void 0;try{for(var l,c=t[a.toString()].children[Symbol.iterator]();!(r=(l=c.next()).done);r=!0)t[l.value].parents.add(a.toString())}catch(s){o=!0,i=s}finally{try{r||null==c.return||c.return()}finally{if(o)throw i}}}return t}(23),t=arguments.length>1?arguments[1]:void 0;return Object(Y.a)(e,function(e){switch(t.type){case"SET_SUBJECT_NAME":!function(e,t){var n=t.subjectId,a=t.name;e[n].name=a}(e,t);break;case"SET_SUBJECT_DESCRIPTION":!function(e,t){var n=t.subjectId,a=t.description;e[n].description=a}(e,t);break;case"COMPLETE_SUBJECT":N(e,t);break;case"UNCOMPLETE_SUBJECT":e[t.subjectId].completed=void 0;break;case"DELETE_SUBJECT":!function(e,t){var n=t.subjectId,a=!0,r=!1,o=void 0;try{for(var i,l=e[n].parents[Symbol.iterator]();!(a=(i=l.next()).done);a=!0){var c=i.value;Object(I.remove)(e[c].children,function(e){return e===n})}}catch(b){r=!0,o=b}finally{try{a||null==l.return||l.return()}finally{if(r)throw o}}var s=!0,u=!1,d=void 0;try{for(var m,f=e[n].children[Symbol.iterator]();!(s=(m=f.next()).done);s=!0)e[m.value].parents.delete(n)}catch(b){u=!0,d=b}finally{try{s||null==f.return||f.return()}finally{if(u)throw d}}delete e[n]}(e,t)}return e})},te=Object(K.combineReducers)({subjects:ee}),ne=Object(K.createStore)(te,Object(Q.composeWithDevTools)());Object(X.a)(),i.a.render(r.a.createElement(d.a,{store:ne},r.a.createElement($,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[69,1,2]]]);
//# sourceMappingURL=main.7bbeb78a.chunk.js.map