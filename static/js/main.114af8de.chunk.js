(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{115:function(e,t,a){e.exports=a(142)},142:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(18),i=a.n(c),o=a(14),l=a(3),s=a(188),d=a(28),u=a(8),m=a(180),p=a(191),b=a(74),f=a.n(b),h=a(98),g="/subjects",j=function(e,t){var a=t||"";return"".concat(g,"/").concat(a,"?").concat(f.a.stringify({display:e}))},y=function(e){var t=f.a.parse(e.search),a=Object(h.isUndefined)(t.display)||Array.isArray(t.display)?"grid":t.display;return"list"===a?a:"grid"},v=function(e,t){return"".concat(e.pathname,"?display=").concat(t)},O="/search",E=function(e,t){return"".concat(O,"/").concat(e,"/").concat(t)},k=function(e){try{return[e.params.param.toLowerCase(),e.params.query.toLowerCase()]}catch(t){throw Error("This isn't a search path.")}},C={base:"/",search:O+"/:param/:query",subject:g+"/:id?"},x=[C.search,C.subject,C.base],w=Object(l.B)({search:{display:"flex",flexDirection:"row"},searchBox:{flexGrow:1},searchDropdown:{width:150}}),S=[{key:"name",text:"Name"},{key:"description",text:"Description"},{key:"childname",text:"Child name"},{key:"childdescription",text:"Child description"}];function D(e){var t=e.history,a=e.match,c=Object(n.useState)("name"),i=Object(u.a)(c,2),o=i[0],l=i[1],s=Object(n.useState)(""),d=Object(u.a)(s,2),b=d[0],f=d[1];Object(n.useEffect)(function(){try{var e=k(a),t=Object(u.a)(e,2),n=t[0],r=t[1];l(n),f(r)}catch(c){l("name"),f("")}},[a]);var h=Object(n.useCallback)(function(e,t){var a=t?t.key:void 0;"string"===typeof a&&l(a)},[]),g=Object(n.useCallback)(function(e){t.push(E(o,e))},[t,o]);return r.a.createElement("div",{className:w.search},r.a.createElement(m.a,{options:S,selectedKey:o,className:w.searchDropdown,onChange:h}),r.a.createElement(p.a,{className:w.searchBox,value:b,placeholder:"Search",onSearch:g}))}var T=Object(l.y)(),N=Object(l.B)({appBar:{alignItems:"center",backgroundColor:T.palette.themePrimary,boxShadow:"0 6px 20px 0 rgba(0, 0, 0, 0.19)",display:"grid",gridTemplateColumns:"150px minmax(200px, auto) 150px",height:48},link:{color:T.palette.black,textDecoration:"none",selectors:{"&:hover":{color:T.palette.neutralLighter,textDecoration:"none"}}},searchDropdown:{width:150},title:{paddingLeft:24}});function B(e){return r.a.createElement("div",{className:N.appBar},r.a.createElement(d.b,{to:C.base,className:N.link},r.a.createElement(s.a,{className:N.title,variant:"xLarge"},"hub")),r.a.createElement(D,e),r.a.createElement("div",null))}var I=a(195),L=a(189),R=a(7),_=a(31),U=a(103),P=a(10);function A(e,t){var a=t.order,n=t.options,r=n.fields,c=n.separateCompletedItems,i=[],o=[],l=!0,s=!1,d=void 0;try{for(var u,m=a[Symbol.iterator]();!(l=(u=m.next()).done);l=!0){var p=u.value;e[p].completed&&c?o.push(p):i.push(p)}}catch(f){s=!0,d=f}finally{try{l||null==m.return||m.return()}finally{if(s)throw d}}var b=function(e,t){function a(e,t,a,n){n&&(Array.isArray(e)&&Array.isArray(t)||"string"===typeof e&&"string"===typeof t?(e=e.length,t=t.length):e instanceof Set&&t instanceof Set&&(e=e.size,t=t.size));var r=!Object(P.isUndefined)(e),c=!Object(P.isUndefined)(t),i=a?-1:1;return r||c?r&&!c?1*i:!r&&c?-1*i:e<t?-1*i:e>t?1*i:0:0}return function(n,r){var c=!0,i=!1,o=void 0;try{for(var l,s=e[Symbol.iterator]();!(c=(l=s.next()).done);c=!0){var d=l.value,u=d.key,m=d.desc,p=d.compareLength,b=t[n][u],h=t[r][u];"children"===u&&(b=b.order,h=h.order);var g=a(b,h,m,p);if(0!==g)return g}}catch(f){i=!0,o=f}finally{try{c||null==s.return||s.return()}finally{if(i)throw o}}return 0}}(r,e);return i.sort(b),o.sort(b),i.concat(o)}function M(e,t){if(t in e){var a=!0,n=!1,r=void 0;try{for(var c,i=e[t].parents[Symbol.iterator]();!(a=(c=i.next()).done);a=!0){var o=e[c.value].children;o.order=A(e,o)}}catch(l){n=!0,r=l}finally{try{a||null==i.return||i.return()}finally{if(n)throw r}}}}var W=function(e){return Object(_.a)({subjectId:Object(U.v4)(),type:"CREATE_SUBJECT"},e)},H=function(e,t){return{parameters:t,separateCompletedItems:e,type:"SET_SEPARATE_COMPLETE"}},J=44,z=a(62),F=a(174),V=a(181),G=a(184),q=a(6),Y=a(177),K=a(25),Q=function(e,t){return{fields:e,parameters:t,type:"SET_FIELDS_ARRAY"}},$=function(e,t,a){return{desc:t,key:e,parameters:a,type:"SET_FIELDS_DESC"}},X=Object(l.y)(),Z=Object(l.B)({dragEnterClass:{backgroundColor:X.palette.neutralLight},gripperWrapper:{alignItems:"center",display:"flex",flexDirection:"row",height:"100%",justifyContent:"center",width:"100%",selectors:{"&:hover":{cursor:"pointer"}}},wrapper:{alignItems:"center",display:"flex",flexDirection:"row",height:"100%",paddingLeft:2,width:"100%"}});function ee(e){var t=e.subjectId,a=e.setSearchOptions,c=e.fields,i=Object(n.useRef)(-1),o=Object(n.useRef)(null),l=Object(n.useRef)(new F.a),d=Object(n.useRef)(null),m=Object(n.useState)(!1),p=Object(u.a)(m,2),b=p[0],f=p[1],h=Object(n.useCallback)(function(){f(!1)},[]),g=Object(n.useCallback)(function(){f(!0)},[]),j=Object(R.b)(),y=Object(n.useCallback)(function(e){var n=l.current.isIndexSelected(i.current)?l.current.getSelection():[o.current],r=c.filter(function(e){return-1===n.indexOf(e)}),s=r.indexOf(e);-1===s&&(s=0),r.splice.apply(r,[s,0].concat(Object(z.a)(n))),j(Q(r,{setSearchOptions:a,subjectId:t}))},[j,c,t,a]),v=Object(n.useCallback)(function(e,t){return!0},[]),O=Object(n.useCallback)(function(e){return!0},[]),E=Object(n.useCallback)(function(e,t){return Z.dragEnterClass},[]),k=Object(n.useCallback)(function(e,t){},[]),C=Object(n.useCallback)(function(e,t){o.current&&y(e)},[y]),x=Object(n.useCallback)(function(e,t,a,n){o.current=e,i.current=t},[]),w={canDrag:O,canDrop:v,onDragEnd:Object(n.useCallback)(function(e,t){o.current=null,i.current=-1},[]),onDragEnter:E,onDragLeave:k,onDragStart:x,onDrop:C},S=Object(n.useCallback)(function(e,n,r){j($(r,n,{setSearchOptions:a,subjectId:t}))},[j,t,a]),D=[{key:"gripper",minWidth:20,name:"",onRender:Object(n.useCallback)(function(){return r.a.createElement("div",{className:Z.gripperWrapper},r.a.createElement(V.a,{iconName:"GripperBarHorizontal"}))},[])},{fieldName:"name",key:"param",minWidth:150,name:"Parameter",onRender:Object(n.useCallback)(function(e){return r.a.createElement("div",{className:Z.wrapper},r.a.createElement(s.a,null,e.name))},[])},{fieldName:"desc",key:"direction",minWidth:150,name:"Direction",onRender:Object(n.useCallback)(function(e){return r.a.createElement("div",{className:Z.wrapper},r.a.createElement(L.a,{styles:{root:{margin:0}},key:e.key,defaultChecked:e.desc,offText:"Ascending",onText:"Descending",onChange:function(t,a){return S(t,a,e.key)}}))},[S])}];return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{ref:d},r.a.createElement(I.a,{text:"Sort",iconProps:{iconName:"Sortlines"},ariaLabel:"Sort",onClick:g,styles:{root:{height:J}}})),r.a.createElement(G.a,{target:d.current,onDismiss:h,hidden:!b,directionalHint:q.a.bottomCenter,isBeakVisible:!1},r.a.createElement("div",{onBlur:h},r.a.createElement(Y.a,{selection:l.current,columns:D,items:c,selectionMode:K.b.none,dragDropEvents:w}))))}var te=Object(l.y)(),ae=Object(l.B)({leftWrapper:{alignItems:"center",display:"flex",flexDirection:"row"},rightWrapper:{alignItems:"center",display:"flex",flexDirection:"row-reverse"},wrapper:{alignItems:"center",backgroundColor:te.palette.white,borderBottom:"1px solid "+te.palette.neutralQuaternary,boxShadow:"0 6px 20px 0 rgba(0, 0, 0, 0.19)",display:"flex",flexDirection:"row",height:J,justifyContent:"space-between",paddingLeft:24,paddingRight:24}});function ne(e){var t=e.match,a=e.location,c=e.history,i=t.params.id,o=Object(R.b)(),l=y(a),s=Object(R.c)(function(e){return e.subjects}),d=s.dict,u=s.order,m=s.searchSortOptions,p=Object(n.useCallback)(function(){o(W({parent:i}))},[o,i]),b=Object(n.useCallback)(function(){o(W())},[o]),f=Object(n.useCallback)(function(e,t){o(H(t,{subjectId:i}))},[o,i]),h=Object(n.useCallback)(function(e,t){o(H(t,{setSearchOptions:!0}))},[o]),j=Object(n.useCallback)(function(){c.push(v(a,"grid"===l?"list":"grid"))},[l,c,a]),E=[],k=[];if(t.path===C.subject||t.path===g){var x=i&&i in d?d[i].children.options:u.options,w=i?r.a.createElement(I.a,{text:"Create child subject",iconProps:{iconName:"Childof"},ariaLabel:"Create child subject",onClick:p,styles:{root:{height:J}}}):r.a.createElement(I.a,{text:"Create subject",iconProps:{iconName:"Add"},ariaLabel:"Create subject",onClick:b,styles:{root:{height:J}}});E.push(r.a.createElement("div",{key:"createSubject"},w)),"grid"===l&&E.push(r.a.createElement(ee,{key:"sort",subjectId:i,fields:x.fields})),E.push(r.a.createElement(L.a,{key:"separateComplete",checked:x.separateCompletedItems,offText:"Don't separate completed items",onText:"Separate completed items",onChange:f,styles:{root:{marginBottom:0,marginLeft:4,marginRight:4}}}))}else t.path!==C.search&&t.path!==O||("grid"===l&&E.push(r.a.createElement(ee,{key:"sort",setSearchOptions:!0,fields:m.fields})),E.push(r.a.createElement(L.a,{key:"separateComplete",checked:m.separateCompletedItems,offText:"Don't separate completed items",onText:"Separate completed items",onChange:h,styles:{root:{marginBottom:0,marginLeft:4,marginRight:4}}})));return k.push(r.a.createElement(I.a,{key:"toggleView",ariaLabel:"Toggle view",iconProps:{iconName:"list"===l?"BulletedListText":"GridViewMedium"},text:"list"===l?"List":"Grid",styles:{root:{background:te.palette.white,height:J}},menuProps:{directionalHintFixed:!0,items:["list"===l?{iconProps:{iconName:"GridViewMedium"},key:"gridButton",onClick:j,text:"Grid"}:{iconProps:{iconName:"BulletedListText"},key:"listButton",onClick:j,text:"List"}]}})),r.a.createElement("div",{className:ae.wrapper},r.a.createElement("div",{className:ae.leftWrapper},E),r.a.createElement("div",{className:ae.rightWrapper},k))}var re=a(44),ce=a(176);function ie(e,t,a){var n=[],r=a?a.parent:void 0,c=!0,i=!1,o=void 0;try{for(var l,s=t[Symbol.iterator]();!(c=(l=s.next()).done);c=!0){var d=l.value,u={id:d,parent:r,subject:e[d]};(Object(P.isUndefined)(a)||Object(P.isUndefined)(a.condition)||a.condition(u))&&n.push(u)}}catch(m){i=!0,o=m}finally{try{c||null==s.return||s.return()}finally{if(i)throw o}}return n}var oe=a(190),le=a(196),se=a(185),de=a(197),ue=a(186),me=a(192),pe=a(179),be=a(104),fe=Object(l.y)(),he=Object(l.B)({title:{border:"1px solid transparent",borderRadius:0,fontSize:be.a.size28,outline:"none",paddingBottom:4,textAlign:"center",width:"80%",selectors:{"&:focus":{borderBottom:"1px solid "+fe.palette.neutralTertiary,outline:"none"},"&:hover":{borderBottom:"1px solid "+fe.palette.neutralTertiary,outline:"none"}}}});function ge(e){var t=e.value,a=e.className,n=e.onBlur,c=e.onChange;return r.a.createElement("div",{className:a},r.a.createElement("input",{className:he.title,onChange:c,onBlur:n,value:t}))}var je=Object(l.B)({list:{overflow:"auto"}});function ye(e){var t,a=e.subjectId,n=e.maxHeight,c=e.onRenderCell,i=e.getChildren,o=e.notifyNoChildren,l=Object(R.c)(function(e){return e.subjects}),d=l.dict,u=l.order;if(i)t=ie(d,d[a].children.order,{parent:a});else{var m=new Set(d[a].children.order);t=ie(d,u.order,{condition:function(e){return!m.has(e.id)&&e.id!==a},parent:a})}return r.a.createElement(le.a,{className:je.list,style:{maxHeight:n}},0===t.length&&o?r.a.createElement(s.a,null,"There's nothing here"," ",r.a.createElement("span",{role:"img","aria-label":"Gust of Wind emoji"},"\ud83d\udca8")):r.a.createElement(ce.a,{items:t,onRenderCell:c}))}var ve=function(e,t){return{name:t,subjectId:e,type:"SET_SUBJECT_NAME"}},Oe=function(e,t){return{description:t,subjectId:e,type:"SET_SUBJECT_DESCRIPTION"}},Ee=function(e){return{level:arguments.length>1&&void 0!==arguments[1]?arguments[1]:1,subjectId:e,type:"COMPLETE_SUBJECT"}},ke=function(e,t){var a=t.subjectId,n=t.level;!function e(t,a,n){var r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:new Date;if(void 0===t[a].completed&&(t[a].completed=r,M(t,a),n>1)){var c=!0,i=!1,o=void 0;try{for(var l,s=t[a].children.order[Symbol.iterator]();!(c=(l=s.next()).done);c=!0)e(t,l.value,n-1,r)}catch(d){i=!0,o=d}finally{try{c||null==s.return||s.return()}finally{if(i)throw o}}}}(e.dict,a,n)},Ce=function(e){return{subjectId:e,type:"UNCOMPLETE_SUBJECT"}},xe=function(e){return{subjectId:e,type:"DELETE_SUBJECT"}},we=function(e,t){return{date:t,subjectId:e,type:"SET_SUBJECT_DUE_DATE"}},Se=a(183),De=a(178),Te=function(e,t){return{child:t,subjectId:e,type:"APPEND_CHILD_SUBJECT"}},Ne=a(193),Be=Object(l.y)(),Ie="1px solid "+Be.palette.neutralTertiary,Le=Object(l.B)({wrapper:{border:Ie,borderRadius:2,display:"grid",gridTemplateColumns:"auto 1px 32px",gridTemplateRows:"auto auto",marginBottom:2},checkboxWrapper:{alignItems:"center",display:"flex",flexDirection:"row"},checkbox:{margin:8},divider:{background:Be.palette.neutralTertiary,gridColumn:"2",marginBottom:8,marginTop:8,width:1},button:{gridColumn:"3"},content:{gridColumn:"1 / 3",gridRow:"2",paddingLeft:8,paddingRight:8}});function Re(e){var t=e.button,a=e.checked,c=e.children,i=e.contextMenuItems,o=e.editable,l=e.key,s=e.label,d=e.onCheckboxChange,m=e.onEditableBlur,p=Object(n.useRef)(null),b=Object(n.useState)(s),f=Object(u.a)(b,2),h=f[0],g=f[1],j=Object(n.useState)(!1),y=Object(u.a)(j,2),v=y[0],O=y[1];Object(n.useEffect)(function(){g(s)},[s]);var E=Object(n.useCallback)(function(e){e.preventDefault(),O(!v)},[v]),k=Object(n.useCallback)(function(e,t){g(t||"")},[]),C=Object(n.useCallback)(function(){if(m){var e=h||"Untitled";m(e),g(e)}},[h,m]);return r.a.createElement("div",{"data-is-focusable":!0,onContextMenu:E,ref:p,key:l},r.a.createElement("div",{className:Le.wrapper},r.a.createElement("div",{className:Le.checkboxWrapper},r.a.createElement(Ne.a,{checked:a,label:o?void 0:s,className:Le.checkbox,onChange:d}),o?r.a.createElement(ue.a,{value:h,borderless:!0,onChange:m?k:void 0,onBlur:C}):null),r.a.createElement("div",{className:Le.content},c),t?r.a.createElement("span",{className:Le.divider}):null,r.a.createElement("div",{className:Le.button},t||null)),r.a.createElement(De.a,{hidden:!(i&&v),isBeakVisible:!1,onDismiss:E,target:p,directionalHint:q.a.bottomRightEdge,items:i}))}function _e(e){var t=e.id,a=e.parent,c=e.subject,i=Object(R.b)(),o=Object(n.useCallback)(function(e,n){!0===n&&i(Te(a,t))},[i,t,a]);return r.a.createElement(Re,{checked:!1,label:c.name,onCheckboxChange:o})}function Ue(e){if(e&&!Object(P.isUndefined)(e.parent))return r.a.createElement(_e,e)}var Pe=32,Ae=Object(l.y)(),Me=Object(l.B)({wrapper:{border:Ie,borderRadius:2,display:"grid",gridTemplateColumns:"auto 1px 32px",marginBottom:1,marginTop:1},button:{alignItems:"center",background:Ae.palette.white,border:"none",cursor:"pointer",display:"flex",flexDirection:"row",height:Pe,outline:"none",padding:0,selectors:{"&:active":{filter:"brightness(80%)",outline:"none"},"&:hover":{filter:"brightness(90%)",outline:"none"}}},divider:{background:Ae.palette.neutralTertiary,gridColumn:"2",marginBottom:8,marginTop:8,width:1},icon:{fontSize:12,margin:8,paddingLeft:4,textAlign:"center"},text:{display:"flex",flexGrow:2,paddingLeft:4,paddingRight:8}}),We=function(e){var t=e.parent,a=Object(n.useRef)(null),c=Object(R.b)(),i=Object(n.useState)(!1),o=Object(u.a)(i,2),l=o[0],d=o[1],m=Object(n.useState)(!1),p=Object(u.a)(m,2),b=p[0],f=p[1],h=Object(n.useCallback)(function(){return d(!1)},[]),g=Object(n.useCallback)(function(){return d(!0)},[]),j=Object(n.useCallback)(function(){return f(!b)},[b]),y=Object(n.useCallback)(function(){return f(!1)},[]),v=Object(n.useCallback)(function(){c(W({parent:t}))},[c,t]),O=[{iconProps:{iconName:"ChildOf"},key:"appendChildren",onClick:g,text:"Append child subject"}];return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:Me.wrapper},r.a.createElement("button",{className:Me.button,style:{gridColumn:1},onClick:v},r.a.createElement(V.a,{iconName:"Add",className:Me.icon}),r.a.createElement(s.a,{className:Me.text},"Add child")),r.a.createElement("span",{className:Me.divider}),r.a.createElement("button",{className:Me.button,onClick:j,ref:a,style:{gridColumn:3}},r.a.createElement(V.a,{iconName:"ChevronDown",style:{width:"100%"}}))),r.a.createElement(Se.a,{isOpen:l,isLightDismiss:!0,headerText:"Append Children",onDismiss:h},r.a.createElement(ye,{subjectId:t,notifyNoChildren:!0,maxHeight:"calc(100vh-".concat(115,")"),onRenderCell:Ue})),b?r.a.createElement(De.a,{isBeakVisible:!1,onDismiss:y,target:a,directionalHint:q.a.bottomRightEdge,items:O}):null)},He=function(e,t){return{parent:t,subjectId:e,type:"REMOVE_CHILD_SUBJECT"}},Je=Object(l.B)({open:{height:40,width:"100%"}});function ze(e){var t=e.id,a=e.parent,c=e.subject,i=Object(R.b)(),o=Object(n.useCallback)(function(e,a,n){i(!0===a?Ee(t,n):Ce(t))},[i,t]),l=Object(n.useCallback)(function(e){i(ve(t,e||"Untitled"))},[i,t]),s=[{key:"complete-1-level",text:"Mark as complete",onClick:Object(n.useCallback)(function(e,t){t&&o(e,!t.checked,1)},[o])},{key:"complete-2-level",text:"Mark this and its children as complete",onClick:Object(n.useCallback)(function(e,t){t&&o(e,!t.checked,2)},[o])},{key:"remove",text:"Remove this as a child",onClick:Object(n.useCallback)(function(){i(He(t,a))},[i,t,a])},{key:"delete",text:"Delete this",onClick:Object(n.useCallback)(function(){i(xe(t))},[i,t])}],u="Open "+c.name,m=r.a.createElement(d.b,{to:j("grid",t)},r.a.createElement(de.a,{className:Je.open,iconProps:{iconName:"OpenFile"},ariaLabel:u,title:u}));return r.a.createElement(Re,{editable:!0,onEditableBlur:l,checked:!!c.completed,label:c.name,onCheckboxChange:o,contextMenuItems:s,button:m})}function Fe(e){if(e&&!Object(P.isUndefined)(e.parent))return r.a.createElement(ze,Object.assign({},e,{key:e.id}))}var Ve=Object(l.y)(),Ge="1px solid "+Ve.palette.neutralTertiary,qe=Object(l.B)({headerWrapper:{display:"grid",gridTemplateColumns:"auto 32px"},header:{alignItems:"center",borderTopLeftRadius:4,borderTopRightRadius:4,color:Ve.palette.neutralLight,display:"flex",flexDirection:"column",gridColumn:"1 / 3",gridRow:"1",margin:-1,padding:5,zIndex:1,selectors:{"&:focus":{border:"none",outline:"none"}}},headerButton:{background:Ve.palette.white,borderBottomLeftRadius:0,borderBottomRightRadius:0,borderRight:Ge,borderTop:Ge,borderTopLeftRadius:0,borderTopRightRadius:4,marginBottom:-1,marginLeft:0,marginRight:-1,marginTop:-1,zIndex:2},headerLink:{gridColumn:"2",gridRow:"1"},body:{padding:10},title:{alignItems:"center",display:"flex",flexDirection:"column",paddingBottom:5,paddingTop:10},description:{paddingBottom:10,paddingTop:10},date:{display:"flex",justifyContent:"space-between"},datePicker:{display:"flex",flexDirection:"row"},daysLeft:{display:"flex",justifyContent:"flex-end"},appendChildren:{background:Ve.palette.white,border:Ge,width:"100%"},heroButton:{alignItems:"center",display:"flex",flexDirection:"column",marginTop:10}});function Ye(e){var t=e.subject,a=e.id,c=e.listHeight,i=e.showOpenButton,o=Object(R.b)(),l=Object(n.useState)(t.name),m=Object(u.a)(l,2),p=m[0],b=m[1],f=Object(n.useState)(t.description),h=Object(u.a)(f,2),g=h[0],y=h[1];Object(n.useEffect)(function(){b(t.name)},[t.name]),Object(n.useEffect)(function(){y(t.description)},[t.description]);var v,O,E,k,C=Object(n.useCallback)(function(e){b(e.target.value)},[]),x=Object(n.useCallback)(function(){var e=p||"Untitled";t.name!==e&&o(ve(a,e)),b(e)},[o,a,p,t.name]),w=Object(n.useCallback)(function(e,t){y(t||"")},[]),S=Object(n.useCallback)(function(){t.description!==g&&o(Oe(a,g))},[o,a,g,t.description]),D=Object(n.useCallback)(function(e){o(we(a,e||void 0))},[o,a]),T=Object(n.useCallback)(function(){o(Ee(a,1))},[o,a]),N=Object(n.useCallback)(function(){o(Ce(a))},[o,a]),B=Object(n.useCallback)(function(){return D()},[D]),I={key:"complete-2-level",text:"Mark this and its children as complete",onClick:Object(n.useCallback)(function(){o(Ee(a,2))},[o,a])},L={key:"delete",text:"Delete this",onClick:Object(n.useCallback)(function(){o(xe(a))},[o,a])},_=t.dueDate?(v=new Date,O=t.dueDate,Math.ceil((O.valueOf()-v.valueOf())/864e5)):"\u221e";t.completed?(E=r.a.createElement(s.a,{className:qe.header,style:{backgroundColor:Ve.palette.red}},"Completed ",t.completed.toLocaleString()),k=r.a.createElement(oe.a,{text:"Mark as uncomplete",split:!0,onClick:N,menuProps:{directionalHint:q.a.bottomCenter,isBeakVisible:!1,items:[L]},style:{background:Ve.palette.white}})):(E=r.a.createElement(s.a,{className:qe.header,style:{backgroundColor:Ve.palette.green}},"Created ",t.created.toLocaleString()),k=r.a.createElement(oe.a,{primary:!0,text:"Mark as complete",split:!0,onClick:T,menuProps:{directionalHint:q.a.bottomCenter,isBeakVisible:!1,items:[I,L]}}));var U="Open "+t.name;return r.a.createElement(le.a,null,r.a.createElement(se.a,{verticalAlign:"center"},r.a.createElement("div",{className:qe.headerWrapper},E,i?r.a.createElement(d.b,{to:j("grid",a),className:qe.headerLink},r.a.createElement(de.a,{styles:{root:{width:""}},className:qe.headerButton,iconProps:{iconName:"OpenFile"},title:U,ariaLabel:U})):null),r.a.createElement("div",{className:qe.body},r.a.createElement(ge,{className:qe.title,value:p,onChange:C,onBlur:x}),r.a.createElement(ue.a,{multiline:!0,rows:3,value:g,onChange:w,onBlur:S,className:qe.description}),r.a.createElement("div",{className:qe.date},r.a.createElement(me.a,null,"Due date:"),r.a.createElement("div",{className:qe.datePicker},r.a.createElement(pe.a,{value:t.dueDate,onSelectDate:D}),t.dueDate?r.a.createElement(de.a,{iconProps:{iconName:"cancel"},title:"Clear date",onClick:B}):null)),r.a.createElement("div",{className:qe.daysLeft},r.a.createElement(me.a,null,"".concat(_," ").concat(1===_?"day":"days"," left"))),r.a.createElement("div",{style:{minHeight:"calc((".concat(c,") + ").concat(Pe,"px)")}},r.a.createElement(ye,{subjectId:a,maxHeight:"calc(".concat(c,")"),onRenderCell:Fe,getChildren:!0}),r.a.createElement(We,{parent:a})),r.a.createElement("div",{className:qe.heroButton},k))))}var Ke=function(e,t){for(var a=0;a<t.length;a++){if(t[a]!==e[a])return a}return 0},Qe=3,$e=603,Xe=400,Ze=Object(l.y)(),et=Object(l.B)({wrapper:{display:"grid",gridTemplateColumns:"auto ".concat(Xe,"px")},grid:{height:"calc(100vh - ".concat(48,"px - ").concat(45,"px)"),overflow:"auto",position:"relative"},tile:{textAlign:"center",position:"relative",float:"left"},padding:{padding:5},contents:{border:"1px solid "+Ze.palette.neutralTertiary,borderRadius:4,boxShadow:"0 2px 4px 0 rgba(0, 0, 0, 0.2)"}}),tt=function(){return $e*Qe};function at(e){var t=e.options,a=e.sortOptions,c=t?t.parent:void 0,i=Object(n.useRef)(0),o=Object(n.useRef)(0),l=Object(n.useRef)(null),s=Object(R.c)(function(e){return e.subjects}),d=s.dict,m=!Object(P.isUndefined)(c)&&c in d?d[c].children.order:s.order.order,p=Object(n.useState)(m),b=Object(u.a)(p,2),f=b[0],h=b[1];Object(n.useEffect)(function(){document.title=c?"hub - "+d[c].name:"hub"},[c,d]),Object(n.useEffect)(function(){if(l.current&&f!==m&&m.length>0){var e=Ke(f,m),t=d[m[e]];(0===t.parents.size||t.parents.has(c))&&l.current.scrollToIndex(e,function(){return $e},re.a.top),h(m)}},[m,f,c,d]);var g=Object(n.useCallback)(function(e){if(e){var t=e.id,a=e.subject;return r.a.createElement("div",{className:et.tile,"data-is-focusable":!0,key:t,style:{height:$e,width:100/i.current+"%"}},r.a.createElement("div",{className:et.padding},r.a.createElement("div",{className:et.contents},r.a.createElement(Ye,{subject:a,id:t,listHeight:"260px",showOpenButton:!0}))))}},[]),j=Object(n.useCallback)(function(e,t){if(0===e&&t){var a=t.width/Xe;i.current=t.width>1.5*Xe?Math.ceil(a):Math.floor(a),o.current=Math.floor(t.width/i.current)}return i.current*Qe},[]),y=a?A(d,{options:a,order:m}):m,v=ie(d,y,t);return r.a.createElement(ce.a,{ref:l,className:et.grid,items:v,getItemCountForPage:j,getPageHeight:tt,renderedWindowsAhead:4,onRenderCell:g})}var nt=a(105),rt=a.n(nt),ct=(Object(l.y)(),Object(l.B)({detailsList:{height:"calc(100vh - ".concat(48,"px - ").concat(45,"px)")},openButton:{selectors:{"&:active":{filter:"brightness(80%)",outline:"none"},"&:hover":{filter:"brightness(90%)",outline:"none"}}}}));var it=Object(o.g)(function(e){var t,a,c,i=e.history,o=e.options,l=e.sortOptions,s=Object(R.c)(function(e){return e}).subjects,m=Object(R.b)(),p=o?o.parent:void 0;l?(t=A(s.dict,Object(_.a)({},s.order,{options:l})),a=l.fields,c={setSearchOptions:!0}):p?(t=s.dict[p].children.order,a=s.dict[p].children.options.fields,c={subjectId:p}):(t=s.order.order,a=s.order.options.fields,c={});var b=Object(n.useCallback)(function(e,t){"openButton"!==t.key&&m($(t.key,!t.isSortedDescending,c))},[m,c]),f=Object(n.useCallback)(function(e,t,a){return e.subject[a.key]},[]),h=Object(n.useCallback)(function(e){return e.subject.children.order.length.toLocaleString()},[]),g=Object(n.useCallback)(function(e,t,a){var n=e.subject[a.key];return n?n.toLocaleString():""},[]),y=Object(n.useCallback)(function(e){var t="Open "+e.subject.name;return r.a.createElement(d.b,{to:j("list",e.id)},r.a.createElement(de.a,{primary:!0,styles:{root:{width:""}},className:ct.openButton,iconProps:{iconName:"OpenFile"},title:t,ariaLabel:t}))},[]),v=Object(n.useCallback)(function(e){i.push(j("list",e.id))},[i]),O={children:{key:"children",minWidth:150,name:"Number of children",onRender:h},completed:{key:"completed",minWidth:150,name:"Completed",onRender:g},created:{key:"created",minWidth:150,name:"Date created",onRender:g},description:{key:"description",minWidth:150,name:"Description",onRender:f},dueDate:{key:"dueDate",minWidth:150,name:"Due date",onRender:g},name:{key:"name",minWidth:150,name:"Name",onRender:f}},E=Object(n.useCallback)(function(e,t){var n=a[e],r=a.filter(function(t,a){return a!==e});r.splice(t,0,n),m(Q(r,c))},[a,m,c]),k=ie(s.dict,t,o),C=[],x=!0,w=!1,S=void 0;try{for(var D,T=a[Symbol.iterator]();!(x=(D=T.next()).done);x=!0){var N=D.value,B=O[N.key];B&&(B.isSorted=!0,B.isSortedDescending=N.desc,C.push(B))}}catch(W){w=!0,S=W}finally{try{x||null==T.return||T.return()}finally{if(w)throw S}}C.push({key:"openButton",minWidth:24,name:"",onRender:y});var I=Object(n.useState)(t),L=Object(u.a)(I,2),U=L[0],P=L[1],M=Object(n.useRef)(null);return Object(n.useEffect)(function(){if(M.current&&U!==t&&t.length>0){var e=Ke(U,t),a=s.dict[t[e]];(0===a.parents.size||a.parents.has(p))&&M.current.focusIndex(e),P(t)}},[t,U,p,s]),r.a.createElement(Y.a,{componentRef:M,onColumnHeaderClick:b,className:ct.detailsList,columns:C,items:k,isHeaderVisible:!0,selectionMode:K.b.none,onItemInvoked:v,columnReorderOptions:{frozenColumnCountFromEnd:1,frozenColumnCountFromStart:0,handleColumnReorder:E}})}),ot=Object(l.y)(),lt=Object(l.B)({wrapper:{display:"grid",gridTemplateColumns:"auto ".concat(Xe,"px")},sidebar:{border:"1px solid "+ot.palette.white,borderRadius:4,boxShadow:"0 6px 20px 0 rgba(0, 0, 0, 0.19)",gridColumn:"2",zIndex:10}});function st(e){var t=e.match,a=e.location,n=t.params.id,c=y(a),i=rt()(),l=Object(R.c)(function(e){return e.subjects}).dict;if(!Object(P.isUndefined)(n)&&!(n in l))return r.a.createElement(o.a,{to:"/"});if(Object(P.isUndefined)(n))return"list"===c?r.a.createElement(it,null):r.a.createElement(at,null);var s=r.a.createElement(Ye,{subject:l[n],id:n});if(i.innerWidth>2*Xe){var d={parent:n};return r.a.createElement("div",{className:lt.wrapper},"grid"===c?r.a.createElement(at,{options:d}):r.a.createElement(it,{options:d}),r.a.createElement("div",{className:lt.sidebar},s))}return s}var dt=new Set(S.reduce(function(e,t){return e.push(String(t.key).toLowerCase()),e},[]));function ut(e){var t=e.match,a=e.location,c=y(a),i=k(t),o=Object(u.a)(i,2),l=o[0],d=o[1],m=Object(R.c)(function(e){return e.subjects}),p=m.dict,b=m.searchSortOptions,f=Object(n.useCallback)(function(e){var t=e.subject;switch(l){case"childname":var a=!0,n=!1,r=void 0;try{for(var c,i=t.children.order[Symbol.iterator]();!(a=(c=i.next()).done);a=!0){var o=c.value;if(p[o].name.toLowerCase().includes(d))return!0}}catch(g){n=!0,r=g}finally{try{a||null==i.return||i.return()}finally{if(n)throw r}}return!1;case"childdescription":var s=!0,u=!1,m=void 0;try{for(var b,f=t.children.order[Symbol.iterator]();!(s=(b=f.next()).done);s=!0){var h=b.value;if(p[h].description.toLowerCase().includes(d))return!0}}catch(g){u=!0,m=g}finally{try{s||null==f.return||f.return()}finally{if(u)throw m}}return!1;default:return e.subject[l].toLowerCase().includes(d)}},[p,l,d]);return dt.has(l)?"list"===c?r.a.createElement(it,{options:{condition:f},sortOptions:b}):r.a.createElement(at,{options:{condition:f},sortOptions:b}):r.a.createElement(s.a,null,"Sorry that search parameter was invalid.")}var mt=function(){return r.a.createElement("div",null,r.a.createElement(o.b,{path:x,component:B}),r.a.createElement(o.b,{path:x,component:ne}),r.a.createElement(o.d,null,r.a.createElement(o.b,{path:C.subject,component:st}),r.a.createElement(o.b,{path:C.search,component:ut}),r.a.createElement(o.a,{to:g})))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var pt=a(26),bt=a(106),ft=a(110),ht=a(51),gt=a(107),jt=a.n(gt),yt=a(108),vt=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{dict:{},order:{options:{fields:[{key:"name",name:"Name",desc:!1},{key:"created",name:"Date created",desc:!1},{key:"completed",name:"Date completed",desc:!1},{key:"children",name:"Number of children",desc:!1,compareLength:!0},{key:"description",name:"Description size",desc:!1,compareLength:!0},{key:"dueDate",name:"Due date",desc:!1}],separateCompletedItems:!0},order:[]},searchSortOptions:{fields:[{key:"name",name:"Name",desc:!1},{key:"created",name:"Date created",desc:!1},{key:"completed",name:"Date completed",desc:!1},{key:"children",name:"Number of children",desc:!1,compareLength:!0},{key:"description",name:"Description size",desc:!1,compareLength:!0},{key:"dueDate",name:"Due date",desc:!1}],separateCompletedItems:!0}},t=arguments.length>1?arguments[1]:void 0;return Object(yt.a)(e,function(e){switch(t.type){case"SET_SUBJECT_NAME":!function(e,t){var a=t.subjectId,n=t.name;e.dict[a].name=n,M(e.dict,a)}(e,t);break;case"SET_SUBJECT_DESCRIPTION":!function(e,t){var a=t.subjectId,n=t.description;e.dict[a].description=n,M(e.dict,a)}(e,t);break;case"COMPLETE_SUBJECT":ke(e,t);break;case"UNCOMPLETE_SUBJECT":!function(e,t){var a=t.subjectId;e.dict[a].completed=void 0,M(e.dict,a)}(e,t);break;case"DELETE_SUBJECT":!function(e,t){var a=t.subjectId,n=!0,r=!1,c=void 0;try{for(var i,o=e.dict[a].parents[Symbol.iterator]();!(n=(i=o.next()).done);n=!0){var l=i.value;Object(P.remove)(e.dict[l].children.order,function(e){return e===a})}}catch(f){r=!0,c=f}finally{try{n||null==o.return||o.return()}finally{if(r)throw c}}var s=!0,d=!1,u=void 0;try{for(var m,p=e.dict[a].children.order[Symbol.iterator]();!(s=(m=p.next()).done);s=!0){var b=m.value;e.dict[b].parents.delete(a)}}catch(f){d=!0,u=f}finally{try{s||null==p.return||p.return()}finally{if(d)throw u}}Object(P.remove)(e.order.order,function(e){return e===a}),M(e.dict,a),delete e.dict[a]}(e,t);break;case"SET_SUBJECT_DUE_DATE":!function(e,t){var a=t.subjectId,n=t.date;e.dict[a].dueDate=n,M(e.dict,a)}(e,t);break;case"CREATE_SUBJECT":!function(e,t){var a=t.subjectType,n=t.parent,r=t.subjectId,c={children:{options:{fields:[{key:"name",name:"Name",desc:!1},{key:"created",name:"Date created",desc:!1},{key:"completed",name:"Date completed",desc:!1},{key:"children",name:"Number of children",desc:!1,compareLength:!0},{key:"description",name:"Description size",desc:!1,compareLength:!0},{key:"dueDate",name:"Due date",desc:!1}],separateCompletedItems:!0},order:[]},created:new Date,description:"",name:"Untitled",parents:new Set,type:a||"BaseSubject"};if(e.dict[r]=c,void 0!==n){c.parents.add(n);var i=e.dict[n];i.children.order.push(r),A(e.dict,i.children)}e.order.order.push(r)}(e,t);break;case"REMOVE_CHILD_SUBJECT":!function(e,t){var a=t.subjectId,n=t.parent;Object(P.remove)(e.dict[n].children.order,function(e){return e===a}),e.dict[a].parents.delete(n),M(e.dict,a)}(e,t);break;case"APPEND_CHILD_SUBJECT":!function(e,t){var a=t.subjectId,n=t.child,r=e.dict[a].children;r.order.push(n),r.order=A(e.dict,r),e.dict[n].parents.add(a)}(e,t);break;case"SET_FIELDS_ARRAY":!function(e,t){var a=t.parameters,n=a.subjectId,r=a.setSearchOptions,c=t.fields;if((r?e.searchSortOptions:n?e.dict[n].children.options:e.order.options).fields=c,n){var i=e.dict[n].children;i.order=A(e.dict,i)}}(e,t);break;case"SET_FIELDS_DESC":!function(e,t){var a,n=t.parameters,r=n.subjectId,c=n.setSearchOptions,i=t.key,o=t.desc;a=c?e.searchSortOptions:r?e.dict[r].children.options:e.order.options;var l=!0,s=!1,d=void 0;try{for(var u,m=a.fields[Symbol.iterator]();!(l=(u=m.next()).done);l=!0){var p=u.value;if(p.key===i){if(p.desc=o,r){var b=e.dict[r].children;b.order=A(e.dict,b)}return}}}catch(f){s=!0,d=f}finally{try{l||null==m.return||m.return()}finally{if(s)throw d}}}(e,t);break;case"SET_SEPARATE_COMPLETE":!function(e,t){var a=t.separateCompletedItems,n=t.parameters,r=n.subjectId;if((n.setSearchOptions?e.searchSortOptions:r?e.dict[r].children.options:e.order.options).separateCompletedItems=a,r){var c=e.dict[r].children;c.order=A(e.dict,c)}}(e,t)}return e.order.order.length>0&&(e.order.order=A(e.dict,e.order)),Object(P.isUndefined)(e.searchSortOptions)&&(e.searchSortOptions={fields:[{key:"name",name:"Name",desc:!1},{key:"created",name:"Date created",desc:!1},{key:"completed",name:"Date completed",desc:!1},{key:"children",name:"Number of children",desc:!1,compareLength:!0},{key:"description",name:"Description size",desc:!1,compareLength:!0},{key:"dueDate",name:"Due date",desc:!1}],separateCompletedItems:!0}),e})},Ot=Object(pt.combineReducers)({subjects:vt}),Et=a(109),kt=a(65),Ct=Object(ht.a)(function(e,t){for(var a=e.dict,n=Object(kt.a)(e,["dict"]),r={},c=0,i=Object.entries(a);c<i.length;c++){var o=i[c],l=Object(u.a)(o,2),s=l[0],d=l[1];r[s]=Object(_.a)({},d,{parents:Object(z.a)(d.parents)})}return Object(_.a)({dict:r},n)},function(e,t){for(var a=e.dict,n=Object(kt.a)(e,["dict"]),r={},c=0,i=Object.entries(a);c<i.length;c++){var o=i[c],l=Object(u.a)(o,2),s=l[0],d=l[1],m=d.created,p=d.completed,b=d.dueDate,f=d.parents,h=Object(kt.a)(d,["created","completed","dueDate","parents"]),g=p?new Date(p):void 0,j=b?new Date(b):void 0;r[s]=Object(_.a)({},h,{completed:g,created:new Date(m),dueDate:j,parents:new Set(f)})}return Object(_.a)({dict:r},n)},{whitelist:["subjects"]}),xt={key:"root",storage:jt.a,transforms:[Ct]},wt=Object(ht.b)(xt,Ot),St=Object(pt.createStore)(wt,Object(bt.composeWithDevTools)()),Dt=Object(ht.c)(St);Object(ft.a)(),i.a.render(r.a.createElement(R.a,{store:St},r.a.createElement(Et.a,{loading:null,persistor:Dt},r.a.createElement(d.a,null,r.a.createElement(mt,null)))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[115,1,2]]]);
//# sourceMappingURL=main.114af8de.chunk.js.map