(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{100:function(e,t,n){e.exports=n(116)},116:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),c=n(35),i=n.n(c),o=n(16),l=n(41),d=n(137),s=n(3),u=n(10),m=n(11);function p(e,t,n){var a=[],r=n?n.parent:void 0,c=!0,i=!1,o=void 0;try{for(var l,d=t[Symbol.iterator]();!(c=(l=d.next()).done);c=!0){var s=l.value,u={id:s,subject:e[s],parent:r};(Object(m.isUndefined)(n)||Object(m.isUndefined)(n.condition)||n.condition(u))&&a.push(u)}}catch(p){i=!0,o=p}finally{try{c||null==d.return||d.return()}finally{if(i)throw o}}return a}var b=n(157),f=n(158),h=n(5),v=n(160),E=n(154),g=n(153),j=n(156),y=n(146),C=n(161),x=n(85),O=Object(s.v)(),k=Object(s.x)({title:{textAlign:"center",fontSize:x.a.size28,border:"1px solid transparent",outline:"none",borderRadius:0,paddingBottom:4,width:"80%",selectors:{"&:focus":{borderBottom:"1px solid "+O.palette.neutralTertiary,outline:"none"},"&:hover":{borderBottom:"1px solid "+O.palette.neutralTertiary,outline:"none"}}}}),w=function(e){var t=e.value,n=e.className,a=e.onBlur,c=e.onChange;return r.a.createElement("div",{className:n},r.a.createElement("input",{className:k.title,onChange:c,onBlur:a,value:t}))},T=Object(s.x)({list:{overflow:"auto"}}),S=function(e){var t,n=e.subjectId,a=e.maxHeight,c=e.onRenderCell,i=e.getChildren,o=Object(u.c)(function(e){return e.subjects}),l=o.dict,s=o.order;if(i)t=p(l,l[n].children.order,{parent:n});else{var m=new Set(l[n].children.order);t=p(l,s.order,{condition:function(e){return!m.has(e.id)&&e.id!==n},parent:n})}return r.a.createElement(v.a,{className:T.list,style:{maxHeight:a}},r.a.createElement(d.a,{items:t,onRenderCell:c}))},N=function(e,t){return{name:t,subjectId:e,type:"SET_SUBJECT_NAME"}},B=function(e){return{level:arguments.length>1&&void 0!==arguments[1]?arguments[1]:1,subjectId:e,type:"COMPLETE_SUBJECT"}},D=function(e,t){var n=t.subjectId,a=t.level;!function e(t,n,a){var r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:new Date;if(void 0===t[n].completed&&(t[n].completed=r,a>1)){var c=!0,i=!1,o=void 0;try{for(var l,d=t[n].children.order[Symbol.iterator]();!(c=(l=d.next()).done);c=!0)e(t,l.value,a-1,r)}catch(s){i=!0,o=s}finally{try{c||null==d.return||d.return()}finally{if(i)throw o}}}}(e.dict,n,a)},I=function(e){return{subjectId:e,type:"UNCOMPLETE_SUBJECT"}},R=function(e){return{subjectId:e,type:"DELETE_SUBJECT"}},U=n(150),_=n(152),L=n(145),P=function(e,t){return{subjectId:e,child:t,type:"APPEND_CHILD_SUBJECT"}},J=n(155),M="1px solid "+Object(s.v)().palette.neutralTertiary,A=Object(s.x)({wrapper:{display:"grid",gridTemplateColumns:"auto 32px",gridTemplateRows:"auto auto",flexDirection:"row",border:M,borderRadius:2,marginBottom:2},checkboxWrapper:{display:"flex",flexDirection:"row",alignItems:"center"},checkbox:{margin:8},button:{gridColumn:"2"},content:{gridRow:"2",gridColumn:"1 / 2",paddingLeft:8,paddingRight:8}}),H=function(e){var t=e.onCheckboxChange,n=e.key,c=e.children,i=e.contextMenuItems,l=e.button,d=e.checked,s=e.label,u=e.editable,m=e.onEditableBlur,p=Object(a.useRef)(null),b=Object(a.useState)(s),f=Object(o.a)(b,2),v=f[0],E=f[1],j=Object(a.useState)(!1),y=Object(o.a)(j,2),C=y[0],x=y[1];function O(e){e.preventDefault(),x(!C)}Object(a.useEffect)(function(){E(s)},[s]);return r.a.createElement("div",{"data-is-focusable":!0,onContextMenu:O,ref:p,key:n},r.a.createElement("div",{className:A.wrapper},r.a.createElement("div",{className:A.checkboxWrapper},r.a.createElement(J.a,{checked:d,label:u?void 0:s,className:A.checkbox,onChange:t}),u?r.a.createElement(g.a,{value:v,borderless:!0,onChange:m?function(e,t){t&&E(t)}:void 0,onBlur:function(){return m(v)}}):null),r.a.createElement("div",{className:A.content},c),r.a.createElement("div",{className:A.button},l||null)),i&&C?r.a.createElement(L.a,{isBeakVisible:!1,onDismiss:O,target:p,directionalHint:h.a.bottomRightEdge,items:i}):null)};function V(e){var t=e.id,n=e.parent,a=e.subject,c=Object(u.b)();return r.a.createElement(H,{checked:!1,label:a.name,onCheckboxChange:function(e,a){!0===a&&c(P(n,t))}})}var W=function(e){if(e&&!Object(m.isUndefined)(e.parent))return r.a.createElement(V,e)},z=n(33),F=n(88);function G(e,t){var n=t.order,a=t.options,r=a.fields,c=a.separateCompletedItems,i=[],o=[],l=!0,d=!1,s=void 0;try{for(var u,p=n[Symbol.iterator]();!(l=(u=p.next()).done);l=!0){var b=u.value;e[b].completed&&c?o.push(b):i.push(b)}}catch(h){d=!0,s=h}finally{try{l||null==p.return||p.return()}finally{if(d)throw s}}var f=function(e,t){function n(e,t,n){var a=!Object(m.isUndefined)(e),r=!Object(m.isUndefined)(t),c=n?-1:1;return a||r?a&&r?1*c:!a&&r?-1*c:e<t?-1*c:e>t?1*c:0:0}return function(a,r){var c=!0,i=!1,o=void 0;try{for(var l,d=e[Symbol.iterator]();!(c=(l=d.next()).done);c=!0){var s=l.value,u=s.key,m=s.desc,p=n(t[a][u],t[r][u],m);if(0!==p)return p}}catch(h){i=!0,o=h}finally{try{c||null==d.return||d.return()}finally{if(i)throw o}}return 0}}(r,e);return i.sort(f),o.sort(f),i.concat(o)}var Q=function(e){return Object(z.a)({type:"CREATE_SUBJECT",subjectId:Object(F.v4)()},e)},$=Object(s.v)(),q=Object(s.x)({wrapper:{display:"grid",gridTemplateColumns:"auto 1px 32px",border:"1px solid "+$.palette.neutralTertiary,borderRadius:2,marginTop:1,marginBottom:1},button:{display:"flex",flexDirection:"row",alignItems:"center",border:"none",background:$.palette.white,padding:0,height:32,cursor:"pointer",outline:"none",selectors:{"&:hover":{filter:"brightness(90%)",outline:"none"},"&:active":{filter:"brightness(80%)",outline:"none"}}},divider:{gridColumn:"2",background:$.palette.neutralTertiary,width:1,marginTop:8,marginBottom:8},icon:{paddingLeft:4,margin:8,fontSize:12,textAlign:"center"},text:{display:"flex",flexGrow:2,paddingLeft:4,paddingRight:8}}),K=function(e){var t=e.parent,n=Object(a.useRef)(null),c=Object(u.b)(),i=Object(a.useState)(!1),l=Object(o.a)(i,2),d=l[0],s=l[1],m=Object(a.useState)(!1),p=Object(o.a)(m,2),f=p[0],v=p[1],E=[{key:"appendChildren",iconProps:{iconName:"ChildOf"},text:"Append child subject",onClick:function(){return s(!0)}}];return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:q.wrapper},r.a.createElement("button",{className:q.button,style:{gridColumn:1},onClick:function(){c(Q({parent:t}))}},r.a.createElement(U.a,{iconName:"Add",className:q.icon}),r.a.createElement(b.a,{className:q.text},"Add child")),r.a.createElement("span",{className:q.divider}),r.a.createElement("button",{className:q.button,onClick:function(){return v(!f)},ref:n,style:{gridColumn:3}},r.a.createElement(U.a,{iconName:"ChevronDown",style:{width:"100%"}}))),r.a.createElement(_.a,{isOpen:d,isLightDismiss:!0,headerText:"Append Children",onDismiss:function(){return s(!1)}},r.a.createElement(S,{subjectId:t,maxHeight:"calc(100vh-".concat(115,")"),onRenderCell:W})),f?r.a.createElement(L.a,{isBeakVisible:!1,onDismiss:function(){return v(!1)},target:n,directionalHint:h.a.bottomRightEdge,items:E}):null)},X=n(47),Y=n(148),Z=n(39),ee=function(e,t){return{subjectId:e,parent:t,type:"REMOVE_CHILD_SUBJECT"}},te=Object(s.v)(),ne=Object(s.x)({open:{color:te.palette.white,background:te.palette.themePrimary,cursor:"pointer",border:"none",borderRadius:2,outline:"none",margin:-1,marginBottom:-2,marginRight:-3,height:40,width:32,selectors:{"&:hover":{filter:"brightness(90%)"},"&:active":{filter:"brightness(80%)"}}}});function ae(e){var t=e.id,n=e.parent,c=e.subject,i=Object(u.b)(),o=Object(a.useRef)(Object(X.c)(t)),l=function(e,n,a){i(!0===n?B(t,a):I(t))},d=[{key:"complete-1-level",text:"Mark as complete",onClick:function(e,t){t&&l(0,!t.checked,1)}},{key:"complete-2-level",text:"Mark this and its children as complete",onClick:function(e,t){t&&l(0,!t.checked,2)}},{key:"remove",text:"Remove this as a child",onClick:function(){return i(ee(t,n))}},{key:"delete",text:"Delete this",onClick:function(){return i(R(t))}}],s=r.a.createElement(Y.a,{content:"Open "+c.name,id:o.current},r.a.createElement(Z.b,{to:"/".concat(t)},r.a.createElement("button",{className:ne.open,"aria-labelledby":o.current},r.a.createElement(U.a,{iconName:"OpenFile"}))));return r.a.createElement(H,{editable:!0,onEditableBlur:function(e){return i(N(t,e))},checked:!!c.completed,label:c.name,onCheckboxChange:l,contextMenuItems:d,button:s})}function re(e){if(e&&!Object(m.isUndefined)(e.parent))return r.a.createElement(ae,Object.assign({},e,{key:e.id}))}var ce=Object(s.v)(),ie=Object(s.x)({header:{color:ce.palette.neutralLight,padding:5,display:"flex",flexDirection:"column",alignItems:"center",selectors:{"&:focus":{outline:"none",border:"none"}}},body:{padding:10},title:{paddingTop:10,paddingBottom:5,display:"flex",flexDirection:"column",alignItems:"center"},description:{paddingTop:10,paddingBottom:10},date:{display:"flex",justifyContent:"space-between"},datePicker:{display:"flex",flexDirection:"row"},daysLeft:{display:"flex",justifyContent:"flex-end"},appendChildren:{background:ce.palette.white,border:"1px solid "+ce.palette.neutralTertiary,width:"100%"},heroButton:{marginTop:10,display:"flex",flexDirection:"column",alignItems:"center"}});var oe=function(e){var t=e.subject,n=e.id,c=e.listHeight,i=Object(u.b)(),l=Object(a.useState)(t.name),d=Object(o.a)(l,2),s=d[0],m=d[1],p=Object(a.useState)(t.description||""),x=Object(o.a)(p,2),O=x[0],k=x[1];Object(a.useEffect)(function(){m(t.name)},[t.name]),Object(a.useEffect)(function(){k(t.description)},[t.description]);var T,D,U,_,L=function(e){i(function(e,t){return{date:t,subjectId:e,type:"SET_SUBJECT_DUE_DATE"}}(n,e||void 0))},P={key:"complete-2-level",text:"Mark this and its children as complete",onClick:function(){i(B(n,2))}},J={key:"delete",text:"Delete this",onClick:function(){i(R(n))}},M=t.dueDate?(T=new Date,D=t.dueDate,Math.ceil((D.valueOf()-T.valueOf())/864e5)):"\u221e";return t.completed?(U=r.a.createElement(b.a,{className:ie.header,style:{backgroundColor:ce.palette.red}},"Completed ",t.completed.toLocaleString()),_=r.a.createElement(f.a,{text:"Mark as uncomplete",split:!0,onClick:function(){return i(I(n))},menuProps:{directionalHint:h.a.bottomCenter,isBeakVisible:!1,items:[J]},style:{background:ce.palette.white}})):(U=r.a.createElement(b.a,{className:ie.header,style:{backgroundColor:ce.palette.green}},"Created ",t.created.toLocaleString()),_=r.a.createElement(f.a,{primary:!0,text:"Mark as complete",split:!0,onClick:function(){return i(B(n,1))},menuProps:{directionalHint:h.a.bottomCenter,isBeakVisible:!1,items:[P,J]}})),r.a.createElement(v.a,null,r.a.createElement(E.a,{verticalAlign:"center"},U,r.a.createElement("div",{className:ie.body},r.a.createElement(w,{className:ie.title,value:s,onChange:function(e){m(e.target.value||"Untitled")},onBlur:function(){t.name!==s&&i(N(n,s))}}),r.a.createElement(g.a,{multiline:!0,rows:3,value:O,onChange:function(e,t){k(t||"")},onBlur:function(){t.description!==O&&i(function(e,t){return{description:t,subjectId:e,type:"SET_SUBJECT_DESCRIPTION"}}(n,O))},className:ie.description}),r.a.createElement("div",{className:ie.date},r.a.createElement(j.a,null,"Due date:"),r.a.createElement("div",{className:ie.datePicker},r.a.createElement(y.a,{value:t.dueDate,onSelectDate:L}),t.dueDate?r.a.createElement(C.a,{iconProps:{iconName:"cancel"},title:"Clear date",onClick:function(){L()}}):null)),r.a.createElement("div",{className:ie.daysLeft},r.a.createElement(j.a,null,"".concat(M," days left"))),r.a.createElement("div",{style:{minHeight:"string"===typeof c?c+"".concat(32,"px"):c+32}},r.a.createElement(S,{subjectId:n,maxHeight:c,onRenderCell:re,getChildren:!0}),r.a.createElement(K,{parent:n})),r.a.createElement("div",{className:ie.heroButton},_))))},le=n(17),de=Object(s.v)(),se=Object(s.x)({appBar:{backgroundColor:de.palette.themePrimary,boxShadow:"0 6px 20px 0 rgba(0, 0, 0, 0.19)",height:48,display:"grid",alignItems:"center"},link:{color:de.palette.black,textDecoration:"none",selectors:{"&:hover":{textDecoration:"none",color:de.palette.neutralLighter}}},title:{paddingLeft:24}}),ue=function(){return r.a.createElement("div",{className:se.appBar},r.a.createElement(Z.b,{to:"/",className:se.link},r.a.createElement(b.a,{className:se.title,variant:"xLarge"},"hub")))},me=n(147),pe=Object(s.v)(),be=Object(s.x)({appCommandBar:{borderBottom:"1px solid "+pe.palette.neutralQuaternary,boxShadow:"0 6px 20px 0 rgba(0, 0, 0, 0.19)"}}),fe=function(e,t){var n=[];return void 0!==t?n.push({key:"createChildSubject",name:"Create child subject",iconProps:{iconName:"Childof"},ariaLabel:"Create child subject",onClick:function(){e(Q({parent:t}))}}):n.push({key:"createSubject",name:"Create subject",iconProps:{iconName:"Add"},ariaLabel:"Create subject",onClick:function(){e(Q())}}),n},he=function(e){var t=e.match.params.id,n=Object(u.b)();return r.a.createElement(me.a,{items:fe(n,t),className:be.appCommandBar})},ve=Object(s.v)(),Ee="calc(100vh-".concat(48,"px-303px-").concat(45,"px)"),ge=Object(s.x)({wrapper:{display:"grid",gridTemplateColumns:"auto ".concat(400,"px")},grid:{height:"calc(100vh - ".concat(48,"px - ").concat(45,"px)"),overflow:"auto",position:"relative"},tile:{textAlign:"center",position:"relative",float:"left"},padding:{padding:5},contents:{border:"1px solid "+ve.palette.neutralTertiary,borderRadius:4,boxShadow:"0 2px 4px 0 rgba(0, 0, 0, 0.2)"},sidebar:{gridColumn:"2",padding:5,boxShadow:"0 6px 20px 0 rgba(0, 0, 0, 0.19)"}}),je=function(){return 1809},ye=function(e){var t=e.match,n=Object(a.useRef)(0),c=Object(a.useRef)(0),i=Object(a.useRef)(null),s=Object(u.c)(function(e){return e.subjects}),b=s.dict,f=Object(m.isUndefined)(t.params.id)?s.order.order:b[t.params.id].children.order,h=Object(a.useState)(f),v=Object(o.a)(h,2),E=v[0],g=v[1];Object(a.useEffect)(function(){if(i.current&&E!==f){var e=function(e,t){for(var n=0;n<t.length;n++)if(t[n]!==e[n])return n;return 0}(E,f),n=b[f[e]];(0===n.parents.size||n.parents.has(t.params.id))&&i.current.scrollToIndex(e,function(){return 603},l.a.top),g(f)}},[f,E,t.params.id,b]);var j;try{j=p(b,f,{parent:t.params.id})}catch(x){return r.a.createElement(le.a,{to:"/"})}var y=null;void 0!==t.params.id&&(y=r.a.createElement("div",{className:ge.sidebar},r.a.createElement(oe,{subject:b[t.params.id],id:t.params.id,listHeight:Ee})));var C=r.a.createElement(d.a,{ref:i,className:ge.grid,items:j,getItemCountForPage:function(e,t){return 0===e&&t&&(n.current=Math.ceil(t.width/400),c.current=Math.floor(t.width/n.current)),3*n.current},getPageHeight:je,renderedWindowsAhead:4,onRenderCell:function(e){if(e){var t=e.id,a=e.subject;return r.a.createElement("div",{className:ge.tile,"data-is-focusable":!0,key:t,style:{width:100/n.current+"%",height:603}},r.a.createElement("div",{className:ge.padding},r.a.createElement("div",{className:ge.contents},r.a.createElement(oe,{subject:a,id:t,listHeight:260}))))}}});return y?r.a.createElement("div",{className:ge.wrapper},C,y):C},Ce=function(){return r.a.createElement("div",null,r.a.createElement(ue,null),r.a.createElement(le.b,{path:"/:id?",component:he}),r.a.createElement(le.b,{path:"/:id?",component:ye}))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var xe=n(22),Oe=n(91),ke=n(95),we=n(50),Te=n(92),Se=n.n(Te),Ne=n(93),Be=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{dict:{},order:{order:[],options:{fields:[{key:"created",desc:!1}],separateCompletedItems:!0}}},t=arguments.length>1?arguments[1]:void 0;return Object(Ne.a)(e,function(e){switch(t.type){case"SET_SUBJECT_NAME":!function(e,t){var n=t.subjectId,a=t.name;e.dict[n].name=a}(e,t);break;case"SET_SUBJECT_DESCRIPTION":!function(e,t){var n=t.subjectId,a=t.description;e.dict[n].description=a}(e,t);break;case"COMPLETE_SUBJECT":D(e,t);break;case"UNCOMPLETE_SUBJECT":!function(e,t){var n=t.subjectId;e.dict[n].completed=void 0}(e,t);break;case"DELETE_SUBJECT":!function(e,t){var n=t.subjectId,a=!0,r=!1,c=void 0;try{for(var i,o=e.dict[n].parents[Symbol.iterator]();!(a=(i=o.next()).done);a=!0){var l=i.value;Object(m.remove)(e.dict[l].children.order,function(e){return e===n})}}catch(h){r=!0,c=h}finally{try{a||null==o.return||o.return()}finally{if(r)throw c}}var d=!0,s=!1,u=void 0;try{for(var p,b=e.dict[n].children.order[Symbol.iterator]();!(d=(p=b.next()).done);d=!0){var f=p.value;e.dict[f].parents.delete(n)}}catch(h){s=!0,u=h}finally{try{d||null==b.return||b.return()}finally{if(s)throw u}}delete e.dict[n]}(e,t);break;case"SET_SUBJECT_DUE_DATE":!function(e,t){var n=t.subjectId,a=t.date;e.dict[n].dueDate=a}(e,t);break;case"CREATE_SUBJECT":!function(e,t){var n=t.subjectType,a=t.parent,r=t.subjectId,c={type:n||"BaseSubject",name:"Untitled",created:new Date,description:"",children:{order:[],options:{fields:[{key:"created",desc:!1}],separateCompletedItems:!0}},parents:new Set};if(e.dict[r]=c,void 0!==a){c.parents.add(a);var i=e.dict[a];i.children.order.push(r),G(e.dict,i.children)}else e.order.order.push(r),G(e.dict,e.order)}(e,t);break;case"REMOVE_CHILD_SUBJECT":!function(e,t){var n=t.subjectId,a=t.parent;Object(m.remove)(e.dict[a].children.order,function(e){return e===n}),e.dict[n].parents.delete(a)}(e,t);break;case"APPEND_CHILD_SUBJECT":!function(e,t){var n=t.subjectId,a=t.child;e.dict[n].children.order.push(a),e.dict[a].parents.add(n)}(e,t)}return e})},De=Object(xe.combineReducers)({subjects:Be}),Ie=n(94),Re=n(96),Ue=n(62),_e=Object(we.a)(function(e,t){for(var n=e.dict,a=Object(Ue.a)(e,["dict"]),r={},c=0,i=Object.entries(n);c<i.length;c++){var l=i[c],d=Object(o.a)(l,2),s=d[0],u=d[1];r[s]=Object(z.a)({},u,{parents:Object(Re.a)(u.parents)})}return Object(z.a)({dict:r},a)},function(e,t){for(var n=e.dict,a=Object(Ue.a)(e,["dict"]),r={},c=0,i=Object.entries(n);c<i.length;c++){var l=i[c],d=Object(o.a)(l,2),s=d[0],u=d[1],m=u.created,p=u.completed,b=u.dueDate,f=u.parents,h=Object(Ue.a)(u,["created","completed","dueDate","parents"]),v=p?new Date(p):void 0,E=b?new Date(b):void 0;r[s]=Object(z.a)({},h,{parents:new Set(f),created:new Date(m),completed:v,dueDate:E})}return Object(z.a)({dict:r},a)},{whitelist:["subjects"]}),Le={key:"root",storage:Se.a,transforms:[_e]},Pe=Object(we.b)(Le,De),Je=Object(xe.createStore)(Pe,Object(Oe.composeWithDevTools)()),Me=Object(we.c)(Je);Object(ke.a)(),i.a.render(r.a.createElement(u.a,{store:Je},r.a.createElement(Ie.a,{loading:null,persistor:Me},r.a.createElement(Z.a,null,r.a.createElement(Ce,null)))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[100,1,2]]]);
//# sourceMappingURL=main.3d98bb12.chunk.js.map