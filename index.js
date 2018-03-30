var depApp = {
	ID_PAGE01: '#page01',
	ID_DIV7: '#div7',
	ID_DIV11: '#div11',
	ID_LABEL3: '#label3',
	ID_LABEL4: '#label4',
	ID_IMG2: '#img2',
	ID_JQXCHART4: '#jqxChart4',
	ID_JQXGRID4: '#jqxGrid4',
	ID_DIV20: '#div20',
	ID_DIV21: '#div21',
	ID_LABEL13: '#label13',
	ID_LABEL14: '#label14',
	ID_IMG5: '#img5',
	ID_JQXCHART9: '#jqxChart9',
	ID_JQXGRID9: '#jqxGrid9',
	ID_DIV22: '#div22',
	ID_DIV23: '#div23',
	ID_LABEL15: '#label15',
	ID_LABEL16: '#label16',
	ID_IMG6: '#img6',
	ID_JQXCHART10: '#jqxChart10',
	ID_JQXGRID10: '#jqxGrid10',
	CATALOG: {},
	DATASOURCE: {
		"columns": [],
		"chart": {}
	}
};

$(document).ready(function() {
	function constructJQXComponents() {
		$(depApp.ID_JQXCHART4).jqxChart({
			"description": "",
			"source": [{
				"Country": "A",
				"Population": 1347
			}, {
				"Country": "B",
				"Population": 1210
			}, {
				"Country": "C",
				"Population": 313
			}, {
				"Country": "D",
				"Population": 237
			}, {
				"Country": "E",
				"Population": 192
			}],
			"title": "Title",
			"seriesGroups": [{
				"type": "column",
				"orientation": "vertical",
				"valueAxis": {
					"flip": false,
					"displayValueAxis": true
				},
				"series": [{
					"dataField": "Population",
					"displayText": "Millions"
				}]
			}],
			"theme": "uip"
		});
		$(depApp.ID_JQXGRID4).jqxGrid({
			"width": "100%",
			"height": "178px",
			"disabled": false,
			"altrows": false,
			"rowsheight": 25,
			"columnsheight": 25,
			"rtl": false,
			"theme": "uip",
			"altstart": 1,
			"altstep": 1,
			"showdefaultloadelement": true,
			"autoshowloadelement": true,
			"autoshowfiltericon": true,
			"closeablegroups": true,
			"enableellipsis": true,
			"enablemousewheel": true,
			"columnsmenuwidth": 15,
			"autoshowcolumnsmenubutton": true,
			"enableanimations": true,
			"enabletooltips": false,
			"enablehover": true,
			"enablebrowserselection": false,
			"groupsexpandedbydefault": false,
			"showfiltercolumnbackground": true,
			"showfiltermenuitems": true,
			"showpinnedcolumnbackground": true,
			"showsortcolumnbackground": true,
			"showsortmenuitems": true,
			"showgroupmenuitems": true,
			"showrowdetailscolumn": true,
			"showheader": true,
			"showgroupsheader": true,
			"showaggregates": false,
			"showfilterrow": false,
			"showemptyrow": true,
			"showstatusbar": false,
			"statusbarheight": 34,
			"showtoolbar": false,
			"toolbarheight": 34,
			"pagerheight": 28,
			"groupsheaderheight": 34,
			"groupindentwidth": 20,
			"autoheight": false,
			"autorowheight": false,
			"scrollbarsize": 15,
			"verticalscrollbarstep": 5,
			"verticalscrollbarlargestep": 400,
			"horizontalscrollbarstep": 5,
			"horizontalscrollbarlargestep": 50,
			"keyboardnavigation": true,
			"autosavestate": false,
			"autoloadstate": false,
			"pagesize": 10,
			"pagerbuttonscount": 5,
			"rowdetails": false,
			"pageable": false,
			"filterable": false,
			"editable": false,
			"sortable": false,
			"groupable": false,
			"selectedrowindex": -1,
			"updatedelay": 0,
			"virtualmode": false,
			"columnsmenu": false,
			"columnsresize": false,
			"columnsreorder": 2,
			"columns": [{
				"text": "보장액",
				"datafield": "0",
				"columntype": "string",
				"cellsalign": "left",
				"align": "left"
			}, {
				"text": "상품명",
				"datafield": "1",
				"columntype": "string",
				"cellsalign": "left",
				"align": "left"
			}, {
				"text": "납입액",
				"datafield": "2",
				"columntype": "string",
				"cellsalign": "left",
				"align": "left"
			}],
			"source": new $.jqx.dataAdapter({
				"datatype": "array",
				"datafields": [{
					"name": "0",
					"type": "string",
					"map": "0"
				}, {
					"name": "1",
					"type": "string",
					"map": "1"
				}, {
					"name": "2",
					"type": "string",
					"map": "2"
				}],
				"localdata": [
					["500만원", "종신/10년납", "138000원"],
					["2000만원", "10년/10년납", "43000원"],
					["500만원", "종신/10년납", "138000원"],
					["2000만원", "10년/10년납", "43000원"],
					["500만원", "종신/10년납", "138000원"],
					["2000만원", "10년/10년납", "43000원"]
				]
			})
		});
		$(depApp.ID_JQXCHART9).jqxChart({
			"description": "",
			"source": [{
				"Country": "A",
				"Population": 1347
			}, {
				"Country": "B",
				"Population": 1210
			}, {
				"Country": "C",
				"Population": 313
			}, {
				"Country": "D",
				"Population": 237
			}, {
				"Country": "E",
				"Population": 192
			}],
			"title": "Title",
			"seriesGroups": [{
				"type": "column",
				"orientation": "vertical",
				"valueAxis": {
					"flip": false,
					"displayValueAxis": true
				},
				"series": [{
					"dataField": "Population",
					"displayText": "Millions"
				}]
			}],
			"theme": "uip"
		});
		$(depApp.ID_JQXGRID9).jqxGrid({
			"width": "100%",
			"height": "178px",
			"disabled": false,
			"altrows": false,
			"rowsheight": 25,
			"columnsheight": 25,
			"rtl": false,
			"theme": "uip",
			"altstart": 1,
			"altstep": 1,
			"showdefaultloadelement": true,
			"autoshowloadelement": true,
			"autoshowfiltericon": true,
			"closeablegroups": true,
			"enableellipsis": true,
			"enablemousewheel": true,
			"columnsmenuwidth": 15,
			"autoshowcolumnsmenubutton": true,
			"enableanimations": true,
			"enabletooltips": false,
			"enablehover": true,
			"enablebrowserselection": false,
			"groupsexpandedbydefault": false,
			"showfiltercolumnbackground": true,
			"showfiltermenuitems": true,
			"showpinnedcolumnbackground": true,
			"showsortcolumnbackground": true,
			"showsortmenuitems": true,
			"showgroupmenuitems": true,
			"showrowdetailscolumn": true,
			"showheader": true,
			"showgroupsheader": true,
			"showaggregates": false,
			"showfilterrow": false,
			"showemptyrow": true,
			"showstatusbar": false,
			"statusbarheight": 34,
			"showtoolbar": false,
			"toolbarheight": 34,
			"pagerheight": 28,
			"groupsheaderheight": 34,
			"groupindentwidth": 20,
			"autoheight": false,
			"autorowheight": false,
			"scrollbarsize": 15,
			"verticalscrollbarstep": 5,
			"verticalscrollbarlargestep": 400,
			"horizontalscrollbarstep": 5,
			"horizontalscrollbarlargestep": 50,
			"keyboardnavigation": true,
			"autosavestate": false,
			"autoloadstate": false,
			"pagesize": 10,
			"pagerbuttonscount": 5,
			"rowdetails": false,
			"pageable": false,
			"filterable": false,
			"editable": false,
			"sortable": false,
			"groupable": false,
			"selectedrowindex": -1,
			"updatedelay": 0,
			"virtualmode": false,
			"columnsmenu": false,
			"columnsresize": false,
			"columnsreorder": 2,
			"columns": [{
				"text": "보장액",
				"datafield": "0",
				"columntype": "string",
				"cellsalign": "left",
				"align": "left"
			}, {
				"text": "상품명",
				"datafield": "1",
				"columntype": "string",
				"cellsalign": "left",
				"align": "left"
			}, {
				"text": "납입액",
				"datafield": "2",
				"columntype": "string",
				"cellsalign": "left",
				"align": "left"
			}],
			"source": new $.jqx.dataAdapter({
				"datatype": "array",
				"datafields": [{
					"name": "0",
					"type": "string",
					"map": "0"
				}, {
					"name": "1",
					"type": "string",
					"map": "1"
				}, {
					"name": "2",
					"type": "string",
					"map": "2"
				}],
				"localdata": [
					["500만원", "종신/10년납", "138000원"],
					["2000만원", "10년/10년납", "43000원"],
					["500만원", "종신/10년납", "138000원"],
					["2000만원", "10년/10년납", "43000원"],
					["500만원", "종신/10년납", "138000원"],
					["2000만원", "10년/10년납", "43000원"]
				]
			})
		});
		$(depApp.ID_JQXCHART10).jqxChart({
			"description": "",
			"source": [{
				"Country": "A",
				"Population": 1347
			}, {
				"Country": "B",
				"Population": 1210
			}, {
				"Country": "C",
				"Population": 313
			}, {
				"Country": "D",
				"Population": 237
			}, {
				"Country": "E",
				"Population": 192
			}],
			"title": "Title",
			"seriesGroups": [{
				"type": "column",
				"orientation": "vertical",
				"valueAxis": {
					"flip": false,
					"displayValueAxis": true
				},
				"series": [{
					"dataField": "Population",
					"displayText": "Millions"
				}]
			}],
			"theme": "uip"
		});
		$(depApp.ID_JQXGRID10).jqxGrid({
			"width": "100%",
			"height": "178px",
			"disabled": false,
			"altrows": false,
			"rowsheight": 25,
			"columnsheight": 25,
			"rtl": false,
			"theme": "uip",
			"altstart": 1,
			"altstep": 1,
			"showdefaultloadelement": true,
			"autoshowloadelement": true,
			"autoshowfiltericon": true,
			"closeablegroups": true,
			"enableellipsis": true,
			"enablemousewheel": true,
			"columnsmenuwidth": 15,
			"autoshowcolumnsmenubutton": true,
			"enableanimations": true,
			"enabletooltips": false,
			"enablehover": true,
			"enablebrowserselection": false,
			"groupsexpandedbydefault": false,
			"showfiltercolumnbackground": true,
			"showfiltermenuitems": true,
			"showpinnedcolumnbackground": true,
			"showsortcolumnbackground": true,
			"showsortmenuitems": true,
			"showgroupmenuitems": true,
			"showrowdetailscolumn": true,
			"showheader": true,
			"showgroupsheader": true,
			"showaggregates": false,
			"showfilterrow": false,
			"showemptyrow": true,
			"showstatusbar": false,
			"statusbarheight": 34,
			"showtoolbar": false,
			"toolbarheight": 34,
			"pagerheight": 28,
			"groupsheaderheight": 34,
			"groupindentwidth": 20,
			"autoheight": false,
			"autorowheight": false,
			"scrollbarsize": 15,
			"verticalscrollbarstep": 5,
			"verticalscrollbarlargestep": 400,
			"horizontalscrollbarstep": 5,
			"horizontalscrollbarlargestep": 50,
			"keyboardnavigation": true,
			"autosavestate": false,
			"autoloadstate": false,
			"pagesize": 10,
			"pagerbuttonscount": 5,
			"rowdetails": false,
			"pageable": false,
			"filterable": false,
			"editable": false,
			"sortable": false,
			"groupable": false,
			"selectedrowindex": -1,
			"updatedelay": 0,
			"virtualmode": false,
			"columnsmenu": false,
			"columnsresize": false,
			"columnsreorder": 2,
			"columns": [{
				"text": "보장액",
				"datafield": "0",
				"columntype": "string",
				"cellsalign": "left",
				"align": "left"
			}, {
				"text": "상품명",
				"datafield": "1",
				"columntype": "string",
				"cellsalign": "left",
				"align": "left"
			}, {
				"text": "납입액",
				"datafield": "2",
				"columntype": "string",
				"cellsalign": "left",
				"align": "left"
			}],
			"source": new $.jqx.dataAdapter({
				"datatype": "array",
				"datafields": [{
					"name": "0",
					"type": "string",
					"map": "0"
				}, {
					"name": "1",
					"type": "string",
					"map": "1"
				}, {
					"name": "2",
					"type": "string",
					"map": "2"
				}],
				"localdata": [
					["500만원", "종신/10년납", "138000원"],
					["2000만원", "10년/10년납", "43000원"],
					["500만원", "종신/10년납", "138000원"],
					["2000만원", "10년/10년납", "43000원"],
					["500만원", "종신/10년납", "138000원"],
					["2000만원", "10년/10년납", "43000원"]
				]
			})
		});
	}

	if (typeof preDepuiInit === 'function') {
		preDepuiInit();
	}
	constructJQXComponents();
	if (typeof postDepuiInit === 'function') {
		postDepuiInit();
	}
});