
let {floor, random, min, max, abs, sign, round} = Math, rand = _=>floor(1296*random()).toString(36);
let swipeThreshold = 5;
let server = typeof window==='undefined';


// dropdown handler
let dropdownToggle = ({currentTarget})=>{

	let closeOnOut = e => {
		if (!currentTarget.contains(e.target)){
			toggle(false);
		}
	}, closeOnEscape = e => {
		if (e.keyCode===27){
			toggle(false);
		}
	}, toggle = (b=!currentTarget.classList.contains('active')) => {
		if (b){
			document.addEventListener('mousedown', closeOnOut);
			document.addEventListener('keydown', closeOnEscape);
		} else {
			document.removeEventListener('mousedown', closeOnOut);
			document.removeEventListener('keydown', closeOnEscape);
		}
		currentTarget.classList.toggle('active', b);
	};

	toggle();
};



// for accordion
let openTab = li => {
	li.classList.add('selected');
	li.lastChild.style.maxHeight = ''; // quickly release max-height to measure the height
	let height = li.lastChild.offsetHeight;
	li.lastChild.style.maxHeight = 0;
	setTimeout(_=>{
		li.lastChild.style.maxHeight = height+'px';
	},10);
};

let closeTab = li => {
	li.lastChild.style.maxHeight = li.lastChild.offsetHeight+'px';
	setTimeout(_=>{
		li.classList.remove('selected');
		li.lastChild.style.maxHeight = '';
	},10);
};
let transitionEnd = e=>{
	e.currentTarget.lastChild.style.maxHeight = '';
};
let change = (e, collapse, editMode) => {
	if (!e.currentTarget.classList.contains('selected')) {
		openTab(e.currentTarget);

	} else if (e.currentTarget.firstChild.contains(e.target)) {
		closeTab(e.currentTarget);
	}
	if (!collapse) {
		for (let el of e.currentTarget.parentNode.children)
			if (el!==e.currentTarget && el.classList.contains('selected'))
				closeTab(el);
	}
};

// for tabs
let swipe = e => {
	let {clientX:X,clientY:Y}=e.touches?e.touches[0]:e, ol = e.currentTarget, n=ol.childElementCount, chk=ol.parentNode.querySelector('input:checked');
	if (!chk) console.log('no radio checked')
	let index = chk?Array.prototype.indexOf.call(chk.parentNode.children, chk):0;
	let left = ol.matches('.left > *');
	ol.style.transition = 'none';
	let mouseUp = _ => {
		document.removeEventListener('mouseup', mouseUp);
		document.removeEventListener('touchEnd', mouseUp);
		document.removeEventListener('mousemove', move);
		document.removeEventListener('touchmove', move);
		Object.assign(ol.style,{transform:'', transition:''});// ol.removeAttribute('style');
	};
	let move = e => {
		let {clientX,clientY}=e.touches?e.touches[0]:e;
		if (abs(e.movementX)<swipeThreshold && !left) {
			let w = ((clientX-X)/ol.offsetWidth-index)*100;
			ol.style.transform=`translateX(${w}%)`;
			return;
		}
		if (abs(e.movementY)<swipeThreshold && left) {
			let w = ((clientY-Y)/ol.offsetHeight-index)*100;
			ol.style.transform=`translateY(${w}%)`;
			return;
		}
		mouseUp();
		let delta = e.movementX?sign(left?e.movementY:e.movementX):left?sign(clientY-Y):sign(clientX-X);
		ol.parentNode.children[(index-delta+n)%n].checked = true;
		ol.dispatchEvent(new CustomEvent('swipe', {bubbles: true, details:delta}));
	};
	document.addEventListener('mouseup', mouseUp);
	document.addEventListener('touchEnd', mouseUp);
	document.addEventListener('mousemove', move);
	document.addEventListener('touchmove', move);
};


let tabChange = (e,i,editMode) => {
	let tab = e.currentTarget.parentNode.parentNode.children[i];
	tab.checked = true;
	if (!editMode) setTimeout(_=>tab.focus());
	
};

// needs object spread operator... for passing , onDragOver, onMouseOver, onMouseEnter
if (typeof module!=='undefined') {
	module.exports = h => ({

		tabs: ({id, name='_'+(id||rand()), left, ref, index=0, style, slide, children=[], onDragOver, onMouseOver, onMouseEnter}) =>
			h('div', {className:`tabs ${slide?' slide':''}${left?' left':''}`, ref, style, onDragOver, onMouseOver, onMouseEnter},
				children.map((_,i)=>h('input', {key:i, type:'radio', defaultChecked:i===index, name})),
				h('ol', {className:'labels'}, children.map(({label},i)=>h('li', {key:'l'+i, onMouseDown:e=>tabChange(e,i,onDragOver)}, label))),
				h('ol', {className:'contents', onMouseDown:slide&&swipe, onTouchStart:slide&&swipe}, children.map(({content},i)=>h('li', {key:'c'+i, onDragStart:e=>e.preventDefault()}, content)))
			),


		accordion: ({className='', style, ref, collapse, index=0, children=[], onDragOver, onMouseOver, onMouseEnter}) =>
			h('ul', {className:'accordion '+className, 'data-collapse':server&&collapse, ref, style, onDragOver, onMouseOver, onMouseEnter},
				children.map(({label, content},i)=>h('li', {key:i, className:i===index?'selected':null, onClick:e=>change(e, collapse, onDragOver), onTransitionEnd:transitionEnd},
					label,
					content 
				))
			),

		dropdown: ({className='', label, ref, style, content, closeOn='a', onMouseDown=dropdownToggle, onDragOver, onMouseOver, onMouseEnter}) => 
			h('div', {className:'dropdown '+className, ref, style, onMouseDown, onClick:e=>e.target.matches(closeOn)&&onMouseDown({currentTarget:e.currentTarget.firstChild}), 'data-close-on':server&&closeOn, onDragOver, onMouseOver, onMouseEnter},
				label,
				content
			)
	});

} else {

	for (let el of document.querySelectorAll('.tabs')){
		let labels = el.querySelectorAll('.labels > li');
		for (let i=0; i<labels.length; i++)
			labels[i].addEventListener('mousedown',e=>tabChange(e,i))
		if (el.classList.contains('slide')){
			el.querySelector('.contents').addEventListener('mousedown', swipe)
			el.querySelector('.contents').addEventListener('touchstart', swipe)
		}
	}
	for (let el of document.querySelectorAll('.accordion')){
		for (let li of el.children)
			li.addEventListener('click', e=>change(e, el.dataset.collapse))
	}
	for (let el of document.querySelectorAll('.dropdown')){
		el.addEventListener('click', e=>e.target.matches(e.currentTarget.dataset.closeOn)&&onMouseDown({currentTarget:e.currentTarget.firstChild}))
		el.firstChild.addEventListener('mousedown', onMouseDown)
	}
}

// for generating css rules
// let length = 10;

// `
// /*generated*/
// ${Array.from({length},
// 	(_,i)=> `.tabs > input:nth-child(${i+1}):checked ~ .labels > :nth-child(${i+1})`
// ).join(',\n')} {
// 	border-bottom: 1px solid blue;
// }

// ${Array.from({length},
// 	(_,i)=> `.tabs > input:nth-child(${i+1}):checked ~ .contents > :nth-child(${i+1})`
// ).join(',\n')} {
// 	visibility: visible;
// 	position: relative;
// 	opacity: 1;
// 	transform: scale(1);
// 	transition: all .4s ease-in-out;
// }

// ${Array.from({length},
// 	(_,i)=> `.tabs.slide > input:nth-child(${i+1}):checked ~ .contents { transform: translateX(${-i*100}%); }`
// ).join('\n')}

// ${Array.from({length},
// 	(_,i)=> `.tabs.slide > input:nth-child(${i+1}):checked ~ .labels > :nth-child(${i+1})`
// ).join(',\n')} {
// 	background-color: var(--active-tab-bg);
// }
// ${Array.from({length},
// 	(_,i)=> `.tabs.slide > input:nth-child(${i+1}):checked ~ .labels > :nth-child(${i+1})::after`
// ).join(',\n')} {
// 	background: linear-gradient(90deg, transparent, var(--active-tab-bg));
// }
// /*---*/
// `;