(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.editor = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports={


	"newelements": [{
		"name":"Text", 
		"html":"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam"
	}, {
		"name": "Text",
		"html": "<img src='//placekitten.com/300/250?image=4#.jpg'>"
	}, {
		"name": "Link",
		"html": "<a href='#link3'>Link 3</a>"
	}, {
		"name": "Line"
	}, {
		"name": "Tab",
		"html": "<i class='fa fa-random'> </i>tab1",
		"children": []
	}, {
		"name": "Tabs", "hor": true,
		"children":[{
			"name": "Tab",
			"html": "<i class='fa fa-user'></i> Tab 1",
			"children": [{
				"name":"Text",
				"html": "<u>Hello from tab111111</u>"
			}]
		},{
			"name": "Tab",
			"html": "<i class='fa fa-flag'></i> Tab 2",
			"children": [{
				"name":"Text",
				"html": "<em>element in tab 222222</em>"
			}]
		}]
	}, {
		"name": "Tabs",
		"children":[{
			"name": "Tab",
			"html": "<i class='fa fa-user'></i> Tab 1",
			"children": [{
				"name":"Text",
				"html": "<u>Hello from tab111111</u>"
			}]
		},{
			"name": "Tab",
			"html": "<i class='fa fa-flag'></i> Tab 2",
			"children": [{
				"name":"Text",
				"html": "<em>element in tab 222222</em>"
			}]
		}]
	},{
		"name": "Tabs", "hor": true, "slide":true,
		"children":[{
			"name": "Tab",
			"html": "Tab 1",
			"children": [{
				"name":"Text",
				"html": "<img src='//placekitten.com/400/350?image=5#.jpg'>"
			}]
		},{
			"name": "Tab",
			"html": "Tab 2",
			"children": [{
				"name":"Text",
				"html": "<img src='//placekitten.com/400/350?image=6#.jpg'>"
			}]
		},{
			"name": "Tab",
			"html": "Tab 3",
			"children": [{
				"name":"Text",
				"html": "<img src='//placekitten.com/400/350?image=7#.jpg'>"
			}]
		},{
			"name": "Tab",
			"html": "Tab 4",
			"children": [{
				"name":"Text",
				"html": "<img src='//placekitten.com/400/350?image=8#.jpg'>"
			}]
		},{
			"name": "Tab",
			"html": "Tab 5",
			"children": [{
				"name":"Text",
				"html": "<img src='//placekitten.com/400/350?image=9#.jpg'>"
			}]
		}]
	}],

	"styles": {
		"text": ["Font Family", "Font Size", "Margin" ],
		"tab": ["Background", "Padding"],
		"accordion": ["Color"],
		"line": ["Margin"]

		}


}
},{}],2:[function(require,module,exports){
(function (global){
"use strict";var React=(typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null),Component=require("./Component.js"),actions=require("./actions.js"),_require=require("./utils.js"),v=_require.v,accordion=_require.accordion,dropdown=_require.dropdown,switcher=_require.switcher,styleField=_require.styleField,equals=_require.equals,popOver=_require.popOver,popOverCrop=_require.popOverCrop,contains=_require.contains,clone=_require.clone,sideRect=_require.sideRect,clearSel=_require.clearSel,_require2=require("../config.json"),newelements=_require2.newelements,styles=_require2.styles,random=Math.random,round=Math.round,ceil=Math.ceil,min=Math.min,max=Math.max,abs=Math.abs,layouts=require("../../isomorphic/layouts.js"),components=require("../../isomorphic/components.js"),componentsDefault=components(),layoutsEdit=layouts(components(Component)),layoutsDefault=layouts(componentsDefault);module.exports=React.createClass({shouldComponentUpdate:function(e,t){return!equals(t,this.state)},getInitialState:function(){return this.history=[this.props.page],this.historyI=0,{page:this.props.page,scratchpad:newelements,trash:[],edit:!0}},componentDidMount:function(){var e=this;document.addEventListener("keydown",function(t){(t.ctrlKey&&89===t.keyCode||t.ctrlKey&&t.shiftKey&&90===t.keyCode)&&!document.queryCommandEnabled("redo")?e.redo(t):t.ctrlKey&&90===t.keyCode&&!document.queryCommandEnabled("undo")&&e.undo(t)}),window.addEventListener("resize",function(t){e.refs.sel.style.left&&e.refs.sel.css({left:""}),e.refs.cr.style.left&&e.refs.cr.css({left:""})}),window.addEventListener("scroll",function(t){e.refs.sel.style.left&&e.refs.sel.css({left:""})}),document.addEventListener("selectionchange",function(t){e.refs.sel.style.left&&e.refs.sel.css({left:""}),e.refs.cr.style.left&&e.refs.cr.css({left:""})}),this.tb=this.refs.wysi&&this.refs.wysi.refs.tb,this.refs.page.addEventListener("swipe",function(t){e.refs.sel.css({left:""}),clearSel(),e.resizing=!0}),this.refs.page.addEventListener("transitionend",function(t){e.refs.sel.css({left:""}),document.activeElement.isContentEditable&&e.tb&&e.tb.updatePosition(document.activeElement),e.resizing=!1})},resetWidth:function(){var e=this.resize,t=e.el,s=e.node;t.css({flexGrow:"",maxWidth:""}),s.style=Object.assign({},s.style),delete s.style.flex,delete s.style.maxWidth},undo:function(e){this.historyI<this.history.length-1&&(this.setState({page:this.history[++this.historyI]}),this.refs.sel.css({left:""}))},redo:function(e){this.historyI>0&&(this.setState({page:this.history[--this.historyI]}),this.refs.sel.css({left:""}))},toggleEdit:function(){this.setState({edit:!this.state.edit}),this.refs.sel.css({left:""}),this.refs.wysi&&this.refs.wysi.setState({img:null,aR:null})},dragStart:function(e,t){var s=this;this.state.selNode&&(this.dragNode=this.state.selNode,e.stopPropagation(),e.dataTransfer.setData("text/custom","dnd"),e.dataTransfer.effectAllowed=t,e.dataTransfer.setDragImage(this.state.selEl,0,0),this.refs.cr.css({left:""}),this.refs.page.classList.add("drag"),setTimeout(function(e){return s.refs.sel.css(popOverCrop(s.state.selEl.rect()))},10))},drop:function(e){var t=e.dataTransfer.effectAllowed;if("move"===t||"copy"===t){e.preventDefault(),e.stopPropagation();var s=this.dragNode,r=this.dropNode,n=void 0===r?s:r,a=this.dropSide,i=void 0===a?1:a;"copy"===t&&(s=clone(s)),this.updateDnd(t,s,n,i),this.dragEnd(e)}},updateDnd:function(e,t,s,r){var n=clone(this.state.page),a=Object.assign({},this.state.page),i=void 0,o=void 0;t.parent&&(i=t.parent.children.indexOf(t),o=t.parent.children.length),t.parent&&t.parent.children.splice(t.parent.children.indexOf(t),1),s&&actions.add(t,s,r),t.parent&&actions.clean(t.parent),t.parent&&t.parent.children.length===o&&t.parent.children.indexOf(t)===i||(this.history=[a,n].concat(this.history.slice(this.historyI+1)),this.historyI=0),this.setState({page:a})},update:function(e,t){var s=clone(this.state.page),r=Object.assign({},this.state.page);Object.assign(e,t),this.setState({page:r}),this.history=[r,s].concat(this.history.slice(this.historyI+1)),this.historyI=0},dragEnd:function(e,t){this.refs.caret.css({left:""}),this.refs.sel.css({left:""}),this.dragNode=null,this.refs.page.classList.remove("drag");for(var s=this.refs.sb.querySelectorAll(".page.over"),r=Array.isArray(s),n=0,s=r?s:s[Symbol.iterator]();;){var a;if(r){if(n>=s.length)break;a=s[n++]}else{if(n=s.next(),n.done)break;a=n.value}var i=a;i.classList.remove("over")}window.dispatchEvent(new Event("resize")),t&&t()},dragStartThumb:function(e,t){var s=arguments.length<=2||void 0===arguments[2]?"copy":arguments[2];e.stopPropagation(),e.dataTransfer.effectAllowed=s,e.dataTransfer.setData("text/custom",""),this.dragNode=t,this.refs.page.classList.add("drag"),this.refs.sel.css({left:""})},dragOver:function(e){e.stopPropagation(),e.preventDefault(),e.currentTarget.classList.add("over")},dragLeave:function(e){e.currentTarget.classList.remove("over")},dropThumb:function(e){if("copy"!==e.dataTransfer.effectAllowed){e.preventDefault(),e.stopPropagation();var t=this.dragNode;this.setState({scratchpad:this.state.scratchpad.concat([clone(t)])}),this.dragEnd(e)}},dropTrash:function(e){e.preventDefault(),e.stopPropagation();var t=this.dragNode,s=e.dataTransfer.effectAllowed;"move"===s?this.updateDnd(s,t):"copy"===s&&this.setState({scratchpad:this.state.scratchpad.filter(function(e){return e!==t})}),this.setState({trash:this.state.trash.concat([clone(t)])}),this.dragEnd(e)},startResize:function(e){var t=this,s=this.resize,r=s.node,n=s.el,a=s.r,i=void 0;r.parent.hor?(i=Array.prototype.reduce.call(n.parentNode.children,function(e,t){return+getComputedStyle(t).flexGrow+e},0)||1,r.style||(r.style={}),this.refs.cr.lastChild.textContent=+getComputedStyle(n).flexGrow||""):this.refs.cr.lastChild.textContent=+getComputedStyle(n).maxWidth||"",this.refs.sel.css({left:""}),this.resizing=!0,this.refs.wysi&&(this.refs.wysi.refs.el.hidden=!0);var o=function(s){if(1===e){var o=min(s.clientX,a.right+window.scrollX);t.refs.cr.css({left:o+"px",top:a.top+window.scrollY+"px",width:a.right-o+"px"})}else t.refs.cr.style.width=s.clientX-a.left-window.scrollX+"px";if(r.parent.hor){var l=+getComputedStyle(n).flexGrow,c=round(i*t.refs.cr.offsetWidth/n.parentNode.offsetWidth);if(c===l)return;r.style=Object.assign({},r.style),n.style.flexGrow=r.style.flex=c,i=Array.prototype.reduce.call(n.parentNode.children,function(e,t){return+getComputedStyle(t).flexGrow+e},0)||1,a=n.rect(),t.refs.cr.css(popOver(a)),t.refs.cr.lastChild.textContent=c}else r.style=Object.assign({},r.style),r.style.maxWidth=t.refs.cr.offsetWidth,n.style.maxWidth=t.refs.cr.offsetWidth+"px",a=n.rect(),t.refs.cr.css(popOver(a)),t.refs.cr.lastChild.textContent=r.style.maxWidth},l=function c(e){document.removeEventListener("mouseup",c),document.removeEventListener("mousemove",o),t.refs.cr.lastChild.textContent="",t.refs.cr.css({left:""}),t.refs.sel.css({left:""}),t.resizing=!1,clearSel(),t.refs.wysi&&(t.refs.wysi.refs.el.hidden=!1)};document.addEventListener("mouseup",l),document.addEventListener("mousemove",o)},startSbResize:function(){var e=this;this.refs.sel.css({left:""}),this.refs.wysi&&(this.refs.wysi.refs.el.hidden=!0);var t=function(t){var s=max(0,t.clientX);e.refs.sb.style.width=e.refs.sbr.style.left=s+"px",e.refs.page.style.marginLeft=s+8+"px"},s=function r(s){document.removeEventListener("mouseup",r),document.removeEventListener("mousemove",t),e.resizing=!1,clearSel(),e.refs.wysi&&(e.refs.wysi.refs.el.hidden=!1)};this.resizing=!0,document.addEventListener("mouseup",s),document.addEventListener("mousemove",t)},up:function(){this.state.selEl.parentNode&&this.state.selEl.parentNode.dispatchEvent(new MouseEvent("mouseover",{bubbles:!0}))},render:function(){var e=this,t=this.state,s=t.page,r=t.scratchpad,n=t.trash,a=t.selNode,i=void 0===a?{}:a,o=t.selEl,l=t.focusNode,c=void 0===l?{}:l,d=t.edit;return v("div",{className:"app",onDragEnd:this.dragEnd},v(this.props.wysi,{ref:"wysi"},"Tabs"===c.name&&dropdown({name:"opts",label:v("i",{className:"fa fa-gear"}),content:v("div",switcher({name:"hor",isOn:Boolean(c.hor),off:"Accordion",on:"Tabs",onChange:function(t){return e.update(c,{hor:t})}}),!c.hor&&switcher({name:"coll",isOn:Boolean(c.collapse),off:"Toggle",on:"Collapse",onChange:function(t){return e.update(c,{collapse:t})}}),c.hor&&switcher({name:"slide",isOn:Boolean(c.slide),off:"Basic",on:"Slide",onChange:function(t){return e.update(c,{slide:t})}}),c.hor&&switcher({name:"left",isOn:Boolean(c.left),off:"Top",on:"Left",onChange:function(t){return e.update(c,{left:t})}}))})),v("div",{className:"sb",ref:"sb"},accordion({name:"menu",children:[{label:[v("span",{key:1},"components"),v("button",{key:2,onClick:this.toggleEdit},v("i",{className:"fa fa-eye"+(d?"":"-slash"),title:"Visualize page"})),v("button",{disabled:this.historyI===this.history.length-1,key:3,onClick:this.undo},v("i",{className:"fa fa-mail-reply"})),v("button",{disabled:0===this.historyI,key:4,onClick:this.redo},v("i",{className:"fa fa-mail-forward"}))],content:v("div",v("div",{className:"page scratchpad",ref:"sp",title:"Drag components here to copy them",onDrop:this.dropThumb,onDragOver:this.dragOver,onDragLeave:this.dragLeave},r.map(function(t,s){return v("div",{key:s,className:"thumb",draggable:!0,title:t.name,onDragStart:function(s){return e.dragStartThumb(s,t)},onDragEnd:e.dragEnd},v(componentsDefault[t.name],{node:t}))})),v("div",{className:"trash page",onDrop:this.dropTrash,onDragOver:this.dragOver,onDragLeave:this.dragLeave},v("i",{className:"fa fa-trash-o"}),n.length&&v("div",{className:"thumb",draggable:!0,title:n[n.length-1].name,onDragEnd:function(t){return e.dragEnd(t,function(t){return e.setState({trash:n.slice(0,-1)})})},onDragStart:function(t){return e.dragStartThumb(t,n[n.length-1],"move")}},v("div",{className:"thumb"},v(componentsDefault[n[n.length-1].name],{node:n[n.length-1]})))))},{label:v("span","layouts"),content:v("ul",["Splash","Home"].map(function(t){return v("li",{key:t,className:s.layout===t?"selected":"",onClick:function(r){return e.setState({page:Object.assign({},s,{layout:t})})}},t)}))},{label:v("span","options"),content:v("div","todo: page options")},{label:v("span","style"),content:v("ul",{className:"style"},Object.keys(styles).map(function(e){return v("li",{key:e},v("h4",e),styles[e].map(function(t){return styleField({label:t,name:"--"+e+t.replace(/ /g,"")})}))}))}]})),v("div",{className:"sbr",ref:"sbr",onMouseDown:this.startSbResize}),v("div",{className:"caret",ref:"caret"}),v("div",{className:"resizer",ref:"cr",onDoubleClick:this.resetWidth,onMouseLeave:function(e){}},v("div",{onMouseDown:function(t){return e.startResize(1)}}),v("div",{onMouseDown:function(t){return e.startResize(2)}}),v("span")),v("div",{className:"page",ref:"page",onDrop:this.drop},v((d?layoutsEdit:layoutsDefault)[s.layout],{page:s,app:this})),v("div",{className:"sel",ref:"sel",style:o&&popOverCrop(o.rect()),draggable:!0,title:i.name+"\nClick to reach the parent element",onMouseOver:function(e){},onDragStart:function(t){return e.dragStart(t,"move")}},v("div",{onClick:this.up}),v("div",{onClick:this.up})))}});

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../../isomorphic/components.js":7,"../../isomorphic/layouts.js":8,"../config.json":1,"./Component.js":3,"./actions.js":4,"./utils.js":5}],3:[function(require,module,exports){
(function (global){
"use strict";var React=(typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null),_require=require("./utils.js"),argMin=_require.argMin,equals=_require.equals,popOver=_require.popOver,sideRect=_require.sideRect,contains=_require.contains;module.exports=React.createClass({shouldComponentUpdate:function(e,t){return!0},componentWillMount:function(){this.closestCache={}},mouseEnter:function(e){var t=this.props,n=t.node,r=t.app;if(!r.resizing&&"Line"!==n.name&&"Link"!==n.name&&n.parent&&"List"===n.parent.name){var i=this.refs.el.rect();r.resize={node:n,el:this.refs.el,r:i},r.refs.cr.css(popOver(i)),e.stopPropagation()}},mouseOver:function(e){e.stopPropagation();var t=this.props,n=t.node,r=t.app;!r.resizing&&n.parent&&r.setState({selNode:n,selEl:this.refs.el})},dragOver:function(e){e.stopPropagation();var t=this.props,n=t.node,r=t.app,i=t.app.dragNode;if(i&&!contains(i,n)&&("Tab"===n.name||"Tab"!==i.name)){e.preventDefault();var o=this.refs.el.rect(),s=0,a={};n.parent?"Tab"===n.name?"Tab"===i.name?(s=n.parent.hor&&!n.parent.left?1+2*argMin(o.right-e.clientX,e.clientX-o.left):2*argMin(e.clientY-o.top,o.bottom-e.clientY),a=sideRect[s](o)):a=popOver(o):n.children&&0===n.children.length?a=popOver(o):(s=argMin(e.clientY-o.top,o.right-e.clientX,o.bottom-e.clientY,e.clientX-o.left),a=sideRect[s](o)):(s=n.hor?1+2*argMin(o.right-e.clientX,e.clientX-o.left):2*argMin(e.clientY-o.top,o.bottom-e.clientY),a=n.children.length?sideRect[s](o):popOver(o)),Object.assign(r,{dropNode:n,dropSide:s}),r.refs.caret.css(a)}},focus:function(e){e.stopPropagation();var t=this.props,n=t.app,r=t.node;n.tb&&"Link"!==r.name&&(n.tb.refs.el.classList.toggle("xs","Tab"===r.name),n.tb.show(e)),n.setState({focusNode:"Tab"===r.name?r.parent:r,selNode:void 0,selEl:void 0})},blur:function(e){var t=this.props,n=t.node,r=(t.app,this.refs.el.isContentEditable?this.refs.el:this.refs.el.querySelector("[contenteditable]"));n.html&&n.html!==r.innerHTML&&(n.html=r.innerHTML)},attr:function(){var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],t=arguments[1];return Object.assign(e,{onDragOver:this.dragOver,onMouseOver:this.mouseOver,onMouseEnter:this.mouseEnter},t)},contentEditable:function(){var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];return Object.assign(e,{contentEditable:!0,onBlur:this.blur,onFocus:this.focus})},render:function(){}});

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./utils.js":5}],4:[function(require,module,exports){
"use strict";var floor=Math.floor;module.exports={add:function(e,n,r){var a=floor((r+1)/2)%2;if("List"===n.name&&(n.hor&&r%2===1||!n.hor&&r%2===0||!n.parent)||"Tab"===n.name&&"Tab"!==e.name){var i="List"===e.name&&!n.hor==!e.hor?e.children:[e];n.children=a?[].concat(n.children,i):[].concat(i,n.children)}else if("List"!==n.name&&"Tab"!==n.name&&(n.parent.hor&&r%2===0||!n.parent.hor&&r%2===1)){var c="List"===e.name&&!n.parent.hor!=!e.hor?e.children:[e];n.parent.children.splice(n.parent.children.indexOf(n),1,{name:"List",hor:!n.parent.hor,children:a?[n].concat(c):[].concat(c,[n])})}else{var t,l="List"===e.name&&!n.parent.hor==!e.hor?e.children:[e];(t=n.parent.children).splice.apply(t,[n.parent.children.indexOf(n)+a,0].concat(l))}},clean:function(e){if("List"===e.name&&e.parent){var n=e.parent.children.indexOf(e);if(e.children.length>1&&!e.hor==!e.parent.hor){var r;(r=e.parent.children).splice.apply(r,[n,1].concat(e.children))}else if(1===e.children.length){var a=e.children[0];if("List"===a.name&&"List"===e.parent.name&&!a.hor==!e.parent.hor){var i;(i=e.parent.children).splice.apply(i,[n,1].concat(a.children))}else e.parent.children.splice(n,1,a)}}for(;("List"===e.name||"Tabs"===e.name)&&e.children&&0===e.children.length&&e.parent;)e.parent.children.splice(e.parent.children.indexOf(e),1),e=e.parent}};

},{}],5:[function(require,module,exports){
(function (global){
"use strict";var React=(typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null),v=function(e,t){for(var n=arguments.length,o=Array(n>2?n-2:0),r=2;n>r;r++)o[r-2]=arguments[r];return!t||React.isValidElement(t)||"string"==typeof t||Array.isArray(t)?React.createElement.apply(React,[e,void 0,t].concat(o)):React.createElement.apply(React,[e,t].concat(o))},max=Math.max,bodyR=document.createRange();bodyR.setStart(document.body,0);var dropdownToggle=function(e){var t=e.currentTarget,n=function(e){return!t.parentNode.contains(e.target)&&r(!1)},o=function(e){return 27===e.keyCode&&r(!1)},r=function(){var e=arguments.length<=0||void 0===arguments[0]?!t.classList.contains("selected"):arguments[0];e?(document.addEventListener("mousedown",n),document.addEventListener("keydown",o)):(document.removeEventListener("mousedown",n),document.removeEventListener("keydown",o)),t.classList.toggle("selected",e)};r()};module.exports={v:v,accordion:function(e){var t=e.name,n=e.children,o=void 0===n?[]:n,r=e.index,i=void 0===r?0:r;return v("div",{className:"accordion "+t},o.map(function(e,n){return v("input",{key:n,type:"checkbox",defaultChecked:n===i,name:t,id:t+"_"+n})}),v("ul",o.map(function(e,n){var o=e.label,r=e.content;return v("li",{key:n},v("label",{htmlFor:t+"_"+n},o),r)})))},dropdown:function(e){var t=e.name,n=void 0===t?"":t,o=e.label,r=void 0===o?n:o,i=e.style,a=e.content,c=e.onMouseDown,l=void 0===c?dropdownToggle:c;return v("div",{className:"dropdown "+n,style:i},v("button",{onMouseDown:l},r),a)},switcher:function(e){var t=e.name,n=e.isOn,o=e.on,r=e.off,i=e.onChange;return v("div",{className:"switch"},v("input",{id:t+0,name:t,type:"radio",checked:n,onChange:function(e){return i(!0)}}),v("label",{htmlFor:t+0},o),v("input",{id:t+1,name:t,type:"radio",checked:!n,onChange:function(e){return i(!1)}}),v("label",{htmlFor:t+1},r))},styleField:function(e){var t=e.label,n=e.name;return v("label",{key:t},v("span",t),v("input",{defaultValue:getComputedStyle(document.body).getPropertyValue(n),onChange:function(e){return document.body.style.setProperty(n,e.target.value)}}))},equals:function(e,t){for(var n in e)if(e[n]!==t[n])return!1;return!0},clone:function(e){var t=arguments.length<=1||void 0===arguments[1]?function(e,t){return"parent"===e?void 0:t}:arguments[1];return JSON.parse(JSON.stringify(e,t))},popOver:function(e){return{left:e.left+window.scrollX+"px",top:e.top+window.scrollY+"px",width:e.width+"px",height:e.height+"px"}},popOverCrop:function(e){var t=max(0,e.top);return{left:e.left+window.scrollX+"px",top:t+window.scrollY+"px",width:e.width+"px",height:e.bottom-t+"px"}},argMin:function(){for(var e=0,t=arguments.length,n=Array(t),o=0;t>o;o++)n[o]=arguments[o];for(var r=1;r<n.length;r++)n[r]<n[e]&&(e=r);return e},sideRect:[function(e){var t=e.top,n=(e.height,e.left),o=e.width;return{left:n-3+window.scrollX+"px",top:t-3+window.scrollY+"px",width:o+6+"px",height:0}},function(e){var t=e.top,n=e.height,o=e.right;e.width;return{left:o-3+window.scrollX+"px",top:t-3+window.scrollY+"px",width:0,height:n+6+"px"}},function(e){var t=e.bottom,n=(e.height,e.left),o=e.width;return{left:n-3+window.scrollX+"px",top:t-3+window.scrollY+"px",width:o+6+"px",height:0}},function(e){var t=e.top,n=e.height,o=e.left;e.width;return{left:o-3+window.scrollX+"px",top:t-3+window.scrollY+"px",width:0,height:n+6+"px"}}],contains:function(e,t){for(var n=e===t,o=t;!n&&o.parent;){if(o=o.parent,e.parent===o)return!1;n=e===o}return n},clearSel:function(){getSelection().setRange(bodyR),document.activeElement.dispatchEvent(new MouseEvent("blur"))}};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],6:[function(require,module,exports){
"use strict";var floor=Math.floor,random=Math.random,min=Math.min,max=Math.max,abs=Math.abs,sign=Math.sign,round=Math.round,rand=function(e){return floor(1296*random()).toString(36)},swipeThreshold=5,server="undefined"==typeof window,dropdownToggle=function(e){var t=e.currentTarget,r=function(e){t.contains(e.target)||o(!1)},n=function(e){27===e.keyCode&&o(!1)},o=function(){var e=arguments.length<=0||void 0===arguments[0]?!t.classList.contains("active"):arguments[0];e?(document.addEventListener("mousedown",r),document.addEventListener("keydown",n)):(document.removeEventListener("mousedown",r),document.removeEventListener("keydown",n)),t.classList.toggle("active",e)};o()},openTab=function(e){e.classList.add("selected"),e.lastChild.style.maxHeight="";var t=e.lastChild.offsetHeight;e.lastChild.style.maxHeight=0,setTimeout(function(r){e.lastChild.style.maxHeight=t+"px"},10)},closeTab=function(e){e.lastChild.style.maxHeight=e.lastChild.offsetHeight+"px",setTimeout(function(t){e.classList.remove("selected"),e.lastChild.style.maxHeight=""},10)},transitionEnd=function(e){e.currentTarget.lastChild.style.maxHeight=""},change=function(e,t,r){if(e.currentTarget.classList.contains("selected")?e.currentTarget.firstChild.contains(e.target)&&closeTab(e.currentTarget):openTab(e.currentTarget),!t)for(var n=e.currentTarget.parentNode.children,o=Array.isArray(n),a=0,n=o?n:n[Symbol.iterator]();;){var i;if(o){if(a>=n.length)break;i=n[a++]}else{if(a=n.next(),a.done)break;i=a.value}var s=i;s!==e.currentTarget&&s.classList.contains("selected")&&closeTab(s)}},swipe=function(e){var t=e.touches?e.touches[0]:e,r=t.clientX,n=t.clientY,o=e.currentTarget,a=o.childElementCount,i=o.parentNode.querySelector("input:checked");i||console.log("no radio checked");var s=i?Array.prototype.indexOf.call(i.parentNode.children,i):0,l=o.matches(".left > *");o.style.transition="none";var c=function d(e){document.removeEventListener("mouseup",d),document.removeEventListener("touchEnd",d),document.removeEventListener("mousemove",u),document.removeEventListener("touchmove",u),Object.assign(o.style,{transform:"",transition:""})},u=function v(e){var t=e.touches?e.touches[0]:e,i=t.clientX,u=t.clientY;if(abs(e.movementX)<swipeThreshold&&!l){var d=100*((i-r)/o.offsetWidth-s);return void(o.style.transform="translateX("+d+"%)")}if(abs(e.movementY)<swipeThreshold&&l){var f=100*((u-n)/o.offsetHeight-s);return void(o.style.transform="translateY("+f+"%)")}document.removeEventListener("mouseup",c),document.removeEventListener("touchEnd",c),document.removeEventListener("mousemove",v),document.removeEventListener("touchmove",v),Object.assign(o.style,{transform:"",transition:""});var m=sign(e.movementX?l?e.movementY:e.movementX:l?u-n:i-r);o.parentNode.children[(s-m+a)%a].checked=!0,o.dispatchEvent(new CustomEvent("swipe",{bubbles:!0,details:m}))};document.addEventListener("mouseup",c),document.addEventListener("touchEnd",c),document.addEventListener("mousemove",u),document.addEventListener("touchmove",u)},tabChange=function(e,t,r){var n=e.currentTarget.parentNode.parentNode.children[t];n.checked=!0,r||setTimeout(function(e){return n.focus()})};if("undefined"!=typeof module)module.exports=function(e){return{tabs:function(t){var r=t.id,n=t.name,o=void 0===n?"_"+r||"__tb"+rand():n,a=t.left,i=t.ref,s=t.index,l=void 0===s?0:s,c=t.style,u=t.slide,d=t.children,v=void 0===d?[]:d,f=t.onDragOver,m=t.onMouseOver,h=t.onMouseEnter;return e("div",{className:"tabs "+(u?" slide":"")+(a?" left":""),ref:i,style:c,onDragOver:f,onMouseOver:m,onMouseEnter:h},v.map(function(t,r){return e("input",{key:r,type:"radio",defaultChecked:r===l,name:o})}),e("ol",{className:"labels"},v.map(function(t,r){var n=t.label;return e("li",{key:"l"+r,onMouseDown:function(e){return tabChange(e,r,f)}},n)})),e("ol",{className:"contents",onMouseDown:u&&swipe,onTouchStart:u&&swipe},v.map(function(t,r){var n=t.content;return e("li",{key:"c"+r,onDragStart:function(e){return e.preventDefault()}},n)})))},accordion:function(t){var r=t.className,n=void 0===r?"":r,o=t.style,a=t.ref,i=t.collapse,s=t.index,l=void 0===s?0:s,c=t.children,u=void 0===c?[]:c,d=t.onDragOver,v=t.onMouseOver,f=t.onMouseEnter;return e("ul",{className:"accordion "+n,"data-collapse":server&&i,ref:a,style:o,onDragOver:d,onMouseOver:v,onMouseEnter:f},u.map(function(t,r){var n=t.label,o=t.content;return e("li",{key:r,className:r===l?"selected":null,onClick:function(e){return change(e,i,d)},onTransitionEnd:transitionEnd},n,o)}))},dropdown:function(t){var r=t.className,n=void 0===r?"":r,o=t.label,a=t.ref,i=t.style,s=t.content,l=t.closeOn,c=void 0===l?"a":l,u=t.onMouseDown,d=void 0===u?dropdownToggle:u,v=t.onDragOver,f=t.onMouseOver,m=t.onMouseEnter;return e("div",{className:"dropdown "+n,ref:a,style:i,onMouseDown:d,onClick:function(e){return e.target.matches(c)&&d({currentTarget:e.currentTarget.firstChild})},"data-close-on":server&&c,onDragOver:v,onMouseOver:f,onMouseEnter:m},o,s)}}};else{for(var _iterator2=document.querySelectorAll(".tabs"),_isArray2=Array.isArray(_iterator2),_i2=0,_iterator2=_isArray2?_iterator2:_iterator2[Symbol.iterator]();;){var _ref11;if(_isArray2){if(_i2>=_iterator2.length)break;_ref11=_iterator2[_i2++]}else{if(_i2=_iterator2.next(),_i2.done)break;_ref11=_i2.value}for(var el=_ref11,labels=el.querySelectorAll(".labels > li"),_loop=function(e){labels[e].addEventListener("mousedown",function(t){return tabChange(t,e)})},i=0;i<labels.length;i++)_loop(i);el.classList.contains("slide")&&(el.querySelector(".contents").addEventListener("mousedown",swipe),el.querySelector(".contents").addEventListener("touchstart",swipe))}for(var _loop2=function(){if(_isArray3){if(_i3>=_iterator3.length)return"break";_ref12=_iterator3[_i3++]}else{if(_i3=_iterator3.next(),_i3.done)return"break";_ref12=_i3.value}for(var e=_ref12,t=e.children,r=Array.isArray(t),n=0,t=r?t:t[Symbol.iterator]();;){var o;if(r){if(n>=t.length)break;o=t[n++]}else{if(n=t.next(),n.done)break;o=n.value}var a=o;a.addEventListener("click",function(t){return change(t,e.dataset.collapse)})}},_iterator3=document.querySelectorAll(".accordion"),_isArray3=Array.isArray(_iterator3),_i3=0,_iterator3=_isArray3?_iterator3:_iterator3[Symbol.iterator]();;){var _ref12,_ret2=_loop2();if("break"===_ret2)break}for(var _iterator4=document.querySelectorAll(".dropdown"),_isArray4=Array.isArray(_iterator4),_i4=0,_iterator4=_isArray4?_iterator4:_iterator4[Symbol.iterator]();;){var _ref13;if(_isArray4){if(_i4>=_iterator4.length)break;_ref13=_iterator4[_i4++]}else{if(_i4=_iterator4.next(),_i4.done)break;_ref13=_i4.value}var _el=_ref13;_el.addEventListener("click",function(e){return e.target.matches(e.currentTarget.dataset.closeOn)&&onMouseDown({currentTarget:e.currentTarget.firstChild})}),_el.firstChild.addEventListener("mousedown",onMouseDown)}}

},{}],7:[function(require,module,exports){
(function (global){
"use strict";function _classCallCheck(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function _inherits(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}var React=(typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null),v=function(){for(var t=arguments.length,e=Array(t>2?t-2:0),n=2;t>n;n++)e[n-2]=arguments[n];var r=arguments.length<=0||void 0===arguments[0]?"div":arguments[0],o=arguments[1];return!o||React.isValidElement(o)||"string"==typeof o||Array.isArray(o)?React.createElement.apply(React,[r,void 0,o].concat(e)):React.createElement.apply(React,[r,o].concat(e))},DefaultComponent=function(t){function e(){return _classCallCheck(this,e),_possibleConstructorReturn(this,t.apply(this,arguments))}return _inherits(e,t),e.prototype.attr=function(t){return t},e.prototype.contentEditable=function(t){return t},e}(React.Component),_require=require("../inui/")(v),tabs=_require.tabs,accordion=_require.accordion,dropdown=_require.dropdown;module.exports=function(){var t=arguments.length<=0||void 0===arguments[0]?DefaultComponent:arguments[0],e={List:function(t){function n(){return _classCallCheck(this,n),_possibleConstructorReturn(this,t.apply(this,arguments))}return _inherits(n,t),n.prototype.render=function(){var t=this.props,n=t.node,r=t.app,o=t.className,i=void 0===o?"":o,s=t.tag,a=void 0===s?"div":s;return v(a,this.attr({ref:"el",className:(n.hor?"row":"col")+" "+i,style:n.style}),n.children.map(function(t,o){return v(e[t.name],{key:o,app:r,node:Object.assign(t,{parent:n})})}))},n}(t),Text:function(t){function e(){return _classCallCheck(this,e),_possibleConstructorReturn(this,t.apply(this,arguments))}return _inherits(e,t),e.prototype.render=function(){var t=this.props,e=t.node,n=e.html,r=e.style,o=t.className,i=void 0===o?"":o,s=t.tag,a=void 0===s?"div":s;return v(a,this.attr({ref:"el",className:"text "+i,style:r,dangerouslySetInnerHTML:{__html:n}},this.contentEditable()))},e}(t),Line:function(t){function e(){return _classCallCheck(this,e),_possibleConstructorReturn(this,t.apply(this,arguments))}return _inherits(e,t),e.prototype.render=function(){var t=this.props.node.cls,e=void 0===t?"":t;return v("hr",this.attr({ref:"el",className:"line "+e}))},e}(t),Tabs:function(t){function n(){return _classCallCheck(this,n),_possibleConstructorReturn(this,t.apply(this,arguments))}return _inherits(n,t),n.prototype.render=function(){var t=this.props,n=t.node,r=t.app,o=n.style,i=n.id,s=n.slide,a=n.left,l=n.collapse,c=n.index,p=n.hor?tabs:accordion;return p(this.attr({ref:"el",style:o,id:i,slide:s,left:a,collapse:l,index:c,children:n.children.map(function(t){return{label:v(e.Tab,{app:r,node:Object.assign(t,{parent:n})}),content:v(e.TabContent,{app:r,node:t})}})}))},n}(t),Tab:function(t){function e(){return _classCallCheck(this,e),_possibleConstructorReturn(this,t.apply(this,arguments))}return _inherits(e,t),e.prototype.render=function(){var t=this.props.node,e=t.html,n=t.style;return v("div",this.attr({ref:"el",style:n}),v("span",this.contentEditable({className:"text xs",dangerouslySetInnerHTML:{__html:e}})))},e}(t),TabContent:function(t){function n(){return _classCallCheck(this,n),_possibleConstructorReturn(this,t.apply(this,arguments))}return _inherits(n,t),n.prototype.render=function(){var t=this.props,n=t.node,r=t.app;return v("div",this.attr({ref:"el"}),n.children.map(function(t,o){return v(e[t.name],{key:o,app:r,node:Object.assign(t,{parent:n})})}))},n}(t),Dropdown:function(t){function n(){return _classCallCheck(this,n),_possibleConstructorReturn(this,t.apply(this,arguments))}return _inherits(n,t),n.prototype.render=function(){var t=this.props,n=t.node,r=t.app;return dropdown(this.attr({ref:"el",label:v("span",{dangerouslySetInnerHTML:{__html:n.label}}),content:v("ul",n.children.map(function(t,o){return v("li",{key:o},v(e[t.name],{app:r,node:Object.assign(t,{parent:n})}))}))}))},n}(t),Link:function(t){function e(){return _classCallCheck(this,e),_possibleConstructorReturn(this,t.apply(this,arguments))}return _inherits(e,t),e.prototype.render=function(){return v("div",this.attr({ref:"el",className:"text link",dangerouslySetInnerHTML:{__html:this.props.node.html}},this.contentEditable()))},e}(t)};return e};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../inui/":6}],8:[function(require,module,exports){
(function (global){
"use strict";function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var React=(typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null),v=function(){for(var e=arguments.length,t=Array(e>2?e-2:0),n=2;e>n;n++)t[n-2]=arguments[n];var r=arguments.length<=0||void 0===arguments[0]?"div":arguments[0],o=arguments[1];return!o||React.isValidElement(o)||"string"==typeof o||Array.isArray(o)?React.createElement.apply(React,[r,void 0,o].concat(t)):React.createElement.apply(React,[r,o].concat(t))},Page=function(e){function t(){return _classCallCheck(this,t),_possibleConstructorReturn(this,e.apply(this,arguments))}return _inherits(t,e),t.prototype.shouldComponentUpdate=function(e,t){return this.props.page!==e.page},t}(React.Component);module.exports=function(){var e=arguments.length<=0||void 0===arguments[0]?require("./components.js")():arguments[0];return{Splash:function(t){function n(){return _classCallCheck(this,n),_possibleConstructorReturn(this,t.apply(this,arguments))}return _inherits(n,t),n.prototype.render=function(){var t=this.props,n=t.page,r=t.app,o=n.regions,a=o.main;o.nav;return v("div",{className:"splash"},v("main",v(e[a.name],{node:a,app:r})))},n}(Page),Home:function(t){function n(){return _classCallCheck(this,n),_possibleConstructorReturn(this,t.apply(this,arguments))}return _inherits(n,t),n.prototype.render=function(){var t=this.props,n=t.page,r=t.app,o=n.regions,a=o.main,i=(o.header,o.footer),s=(o.sidebar,o.nav),p=o.logo;return v("div",{className:"home"},v("nav",v(e[p.name],{node:p,app:r,className:"logo"}),v(e[s.name],{node:s,app:r})),v("main",v(e[a.name],{node:a,app:r})),v("footer",v(e[i.name],{node:i,app:r})))},n}(Page)}};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./components.js":7}]},{},[2])(2)
});