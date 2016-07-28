
const {floor, random, min, max, abs, sign, round} = Math, rand = _=>floor(1296*random()).toString(36);
const swipeThreshold = 5;
const server = typeof window==='undefined';


// dropdown handler generator, dropdown toggle on their firstChild click, close on click out or ESC key, and close on click in lastChild and matches closeOn
const openDropdown = (closeOn='a') => ({currentTarget})=>{// currentTarget is the dropdown button (first child)
	const closeOnOut = e => { // mousedown outside of the dropdown
		if (!currentTarget.parentNode.contains(e.target)){
			toggle(false);
		}
	}, closeOnUp = e => { // mouseup on an element that matches closeOn
		if (e.target.matches(closeOn)){
			toggle(false);
		}
	}, closeOnEscape = e => { // press e.key=='ESC'
		if (e.keyCode===27){
			toggle(false);
		}
	}, toggle = (b=!currentTarget.classList.contains('selected')) => {
		if (b){
			document.addEventListener('mousedown', closeOnOut);
			document.addEventListener('keydown', closeOnEscape);
			if (closeOn) currentTarget.nextElementSibling.addEventListener('mouseup', closeOnUp);
		} else {
			document.removeEventListener('mousedown', closeOnOut);
			document.removeEventListener('keydown', closeOnEscape);
			if (closeOn) currentTarget.nextElementSibling.removeEventListener('mouseup', closeOnUp);
		}
		currentTarget.classList.toggle('selected', b);
	};
	toggle();
};


// for accordion
const openTab = li => {
	li.classList.add('selected');
	li.lastChild.style.maxHeight = ''; // quickly release max-height to measure the height
	const height = li.lastChild.offsetHeight;
	li.lastChild.style.maxHeight = 0;
	setTimeout(_=>{
		li.lastChild.style.maxHeight = height+'px';
	},10);
};

const closeTab = li => {
	li.lastChild.style.maxHeight = li.lastChild.offsetHeight+'px';
	setTimeout(_=>{
		li.classList.remove('selected');
		li.lastChild.style.maxHeight = '';
	},10);
};
const transitionEnd = e=>{
	e.currentTarget.lastChild.style.maxHeight = '';
};
const change = (e, collapse, editMode) => {
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
const swipe = e => {
	const {clientX:X,clientY:Y}=e.touches?e.touches[0]:e, ol = e.currentTarget, n=ol.childElementCount, chk=ol.parentNode.querySelector('input:checked');
	// if (!chk) console.log('no radio checked')
	const index = chk?Array.prototype.indexOf.call(chk.parentNode.children, chk):0;
	const left = ol.matches('.left > *');
	ol.style.transition = 'none';
	const mouseUp = _ => {
		document.removeEventListener('mouseup', mouseUp);
		document.removeEventListener('touchEnd', mouseUp);
		document.removeEventListener('mousemove', move);
		document.removeEventListener('touchmove', move);
		Object.assign(ol.style,{transform:'', transition:''});// ol.removeAttribute('style');
	};
	const move = e => {
		const {clientX,clientY}=e.touches?e.touches[0]:e;
		if (abs(e.movementX)<swipeThreshold && !left) {
			const w = ((clientX-X)/ol.offsetWidth-index)*100;
			ol.style.transform=`translateX(${w}%)`;
			return;
		}
		if (abs(e.movementY)<swipeThreshold && left) {
			const w = ((clientY-Y)/ol.offsetHeight-index)*100;
			ol.style.transform=`translateY(${w}%)`;
			return;
		}
		mouseUp();
		const delta = e.movementX?sign(left?e.movementY:e.movementX):left?sign(clientY-Y):sign(clientX-X);
		ol.parentNode.children[(index-delta+n)%n].checked = true;
		ol.dispatchEvent(new CustomEvent('swipe', {bubbles: true, details:delta}));
	};
	document.addEventListener('mouseup', mouseUp);
	document.addEventListener('touchEnd', mouseUp);
	document.addEventListener('mousemove', move);
	document.addEventListener('touchmove', move);
};


const tabChange = (e,i,editMode) => {
	const tab = e.currentTarget.parentNode.parentNode.children[i];
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

		dropdown: ({className='', label, ref, style, content, closeOn='a', onDragOver, onMouseOver, onMouseEnter}) => 
			h('div', {className:'dropdown '+className, ref, style, onDragOver, onMouseOver, onMouseEnter},
				h('button', {onMouseDown:!className.includes('hover')&&openDropdown(closeOn), 'data-close-on':server&&closeOn}, label),
				content
			)
	});

} else {
	for (let el of document.querySelectorAll('.tabs')){
		const labels = el.querySelectorAll('.labels > li');
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
	for (let el of document.querySelectorAll('.dropdown:not(.hover) > :first-child')){
		el.addEventListener('mousedown', openDropdown(el.dataset.closeOn))
	}
}

// for generating css rules
// const length = 10;

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