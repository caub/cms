let {random, round} = Math;

module.exports = {
	title:'..',
	layout: 'Home',
	styles: ['/inui/style.css', '/wysi/text.css'],
	favicon: 'data:;base64,iVBORw0KGgo=',
	scripts: ['/inui/index.js'],
	regions: {
		nav: {
			name: 'List', hor:true,
			children:[{
				name: 'Link',
				html: '<a href="#there">Link1</a>'
			}, {
				name: 'Link',
				html: '<a href="#there2">Link 2</a>'
			}]
		},
		logo: {
			name: 'Text',
			html: '<img src="//pbs.twimg.com/profile_images/1856702047/logo_twitter_200x200.jpg">'
		},
		header: {
			name: 'Text',
			html: '<h1>Test page 5</h1>'
		},
		main: {
			name: 'List',
			children: [{
				name: 'List', hor:true,
				children: [{
					name: 'Text',
					html: '<p>The little blue bubble showing on top left of components allows to move (drag/drop) them, you can add new elements from the sidebar',
					style:{}
				}, {
					name: 'List',
					style: {flex: 7},
					children: [{
						name:'Text',
						html:'<strong>Components</strong> are <em>either</em> <del>Text</del> (html content, image, ...), List (row or column), Tabs (accordions, tabs, slides), Tab (their items), Line, Section (todo), .. <br>You can resize components pointing your mouse on their sides, and double-clicking on resizers to reset the changes'
					}, {
						name: 'Text',
						html: 'UI components based on this simple <a href="../inui">lib</a>',
						style:{}
					}, {
						name: 'Text',
						html: 'Wysiwyg based on <a href="../wysi">wysi</a>',
						style:{}
					}]
				}]

			}, {
				name: 'Tabs', id: 'x5',
				children:[{
					name: 'Tab',
					html: '<i class="fa fa-google"> </i>tab1',
					children: [{
						name:'Text',
						html: '<em>Hello from tab1</em>'
					}]
				},{
					name: 'Tab',
					html: '<i class="fa fa-twitter"> </i> tab2',
					children: [{
						name:'Text',
						html: '<em>element in tab 2</em>', 
						style: {}
					}]
				}]

			}, {
				name: 'Tabs', hor: true, id: 'v3',
				children:[{
					name: 'Tab',
					html: '<i class="fa fa-google"> </i> tab1.',
					children: [{
						name:'Text',
						html: '<em>Hello from tab111111</em>'
					}]
				},{
					name: 'Tab',
					html: '<i class="fa fa-twitter"> </i> tab2.',
					children: [{
						name:'Text',
						html: '<em>element in tab 222222</em>', 
						style: {}
					}]
				}]

			}, {
				name:'Line'
			},{
				name: 'Tabs', hor: true, slide:true, id:'q5', style:{maxWidth:'400px'},
				children:[{
					name: 'Tab',
					html: 'Tab 1',
					children: [{
						name:'Text',
						html: `<img src='//placekitten.com/400/350?image=5#.jpg'>`
					}]
				},{
					name: 'Tab',
					html: 'Tab 2',
					children: [{
						name:'Text',
						html: `<img src='//placekitten.com/400/350?image=6#.jpg'>`
					}]
				},{
					name: 'Tab',
					html: 'Tab 3',
					children: [{
						name:'Text',
						html: `<img src='//placekitten.com/400/350?image=7#.jpg'>`
					}]
				},{
					name: 'Tab',
					html: 'Tab 4',
					children: [{
						name:'Text',
						html: `<img src='//placekitten.com/400/350?image=8#.jpg'>`
					}]
				},{
					name: 'Tab',
					html: 'Tab 5',
					children: [{
						name:'Text',
						html: `<img src='//placekitten.com/400/350?image=9#.jpg'>`
					}]
				}]
			}]
		
		},
		footer: {
			name: 'List',
			children: [{name:'Text', html: 'footer..'}]
		}
	}
};