(this.webpackJsonpnvexcel=this.webpackJsonpnvexcel||[]).push([[2],{121:function(e,t,n){e.exports=n(169)},127:function(e,t,n){},128:function(e,t,n){},159:function(e,t){},169:function(e,t,n){"use strict";n.r(t);var a=n(4),r=n.n(a),o=n(6),i=n(0),c=n.n(i),s=n(34),u=n.n(s),l=(n(127),n(21)),f=n(23),h=n(25),v=n(24),p=n(214),d=n(29),m=Object(d.a)({}),g=(n(128),n(208)),w=function(e){Object(h.a)(n,e);var t=Object(v.a)(n);function n(e,a){var r;return Object(l.a)(this,n),(r=t.call(this,e,a))._items=[{key:"newItem",text:"Menu",cacheKey:"myCacheKey",iconProps:{iconName:"GlobalNavButton"},onClick:function(){return r.props.view()}}],r._overflowItems=[{key:"move",text:"Move to...",onClick:function(){return console.log("Move to")},iconProps:{iconName:"MoveToFolder"}},{key:"copy",text:"Copy to...",onClick:function(){return console.log("Copy to")},iconProps:{iconName:"Copy"}},{key:"rename",text:"Rename...",onClick:function(){return console.log("Rename")},iconProps:{iconName:"Edit"}}],r._farItems=[{key:"tile",text:"Grid view",ariaLabel:"Grid view",iconOnly:!0,iconProps:{iconName:"Tiles"},onClick:function(){return console.log("Tiles")}},{key:"info",text:"Info",ariaLabel:"Info",iconOnly:!0,iconProps:{iconName:"Info"},onClick:function(){return console.log("Info")}}],r.state={},r}return Object(f.a)(n,[{key:"render",value:function(){return c.a.createElement("div",null,c.a.createElement(g.a,{items:this._items,farItems:this._farItems,ariaLabel:"Use left and right arrow keys to navigate between commands"}))}}]),n}(i.Component),y=n(210),k=n(11),b=n(212),x=Object(i.createContext)({isOpen:!0,selectedKey:"/home",dismissPanel:function(e){}}),O=function(e){Object(h.a)(n,e);var t=Object(v.a)(n);function n(e){var a;return Object(l.a)(this,n),(a=t.call(this,e)).state={groups:[{links:[{name:"D\u1ef1 to\xe1n",url:"",links:[{name:"Activity",url:"",key:"about",target:""},{name:"MSN",url:"",key:"key2",target:""}],isExpanded:!0},{name:"Kh\u1ed1i l\u01b0\u1ee3ng",url:"",key:"key3",isExpanded:!0,links:[{name:"T\u1ea1o, s\u1eeda m\u1eabu t\u1ed5ng h\u1ee3p kh\u1ed1i l\u01b0\u1ee3ng",url:"",key:"/TaoMauKhoiLuong",target:""},{name:"MSN",url:"",key:"key2",target:""}]},{name:"C\xf4ng c\u1ee5",url:"",expandAriaLabel:"Expand Home section",collapseAriaLabel:"Collapse Home section",links:[{name:"\u0110\u1ecbnh d\u1ea1ng trang in",url:"",key:"/pageFormat",target:""},{name:"\u0110\u1ecbnh d\u1ea1ng trang in G8",url:"",key:"/pageFormatG8",target:""},{name:"Chuy\u1ec3n m\xe3 ti\u1ebfng Vi\u1ec7t",url:"",key:"/charConvert",target:""},{name:"C\xf4ng c\u1ee5 kh\xe1c",url:"",key:"/otherTools",target:""}],isExpanded:!0}]}]},a}return Object(f.a)(n,[{key:"render",value:function(){var e=this;return c.a.createElement(x.Consumer,null,(function(t){return c.a.createElement(b.a,{onLinkClick:function(e,n){t.dismissPanel(n)},selectedKey:t.selectedKey,ariaLabel:"NavMenu",groups:e.state.groups})}))}}]),n}(i.Component),C=function(e){Object(h.a)(n,e);var t=Object(v.a)(n);function n(){return Object(l.a)(this,n),t.apply(this,arguments)}return Object(f.a)(n,[{key:"render",value:function(){return c.a.createElement(x.Consumer,null,(function(e){return c.a.createElement(y.a,{isOpen:e.isOpen,onDismiss:e.dismissPanel,type:k.a.smallFluid,closeButtonAriaLabel:"Close",headerText:"Menu"},c.a.createElement(O,null))}))}}]),n}(i.Component),j=n(81),E=c.a.lazy((function(){return Promise.all([n.e(1),n.e(6)]).then(n.bind(null,237))})),P=c.a.lazy((function(){return Promise.all([n.e(0),n.e(1),n.e(9)]).then(n.bind(null,239))})),R=c.a.lazy((function(){return Promise.all([n.e(0),n.e(5)]).then(n.bind(null,240))})),A=c.a.lazy((function(){return Promise.all([n.e(0),n.e(7),n.e(8)]).then(n.bind(null,244))}));function L(){return c.a.createElement("div",null,c.a.createElement("h2",null,"Home"))}var I=function(e){Object(h.a)(n,e);var t=Object(v.a)(n);function n(e,a){var r;return Object(l.a)(this,n),(r=t.call(this,e,a)).state={isOpen:!1,selectedKey:m.location.toString(),dismissPanel:function(e){m.push(e.key),r.setState({selectedKey:e.key}),r.setState({isOpen:!1})}},r}return Object(f.a)(n,[{key:"openPanel",value:function(){this.setState({isOpen:!0})}},{key:"dismissPanel",value:function(){this.setState({isOpen:!1})}},{key:"render",value:function(){return j.a.on("elog",(function(e){return console.log(e)})),c.a.createElement(x.Provider,{value:this.state},c.a.createElement("div",{className:"App"},c.a.createElement(w,{view:this.openPanel.bind(this)}),c.a.createElement(C,null),c.a.createElement(p.b,{history:m},c.a.createElement(i.Suspense,{fallback:"\u0110ang t\u1ea3i"},c.a.createElement("section",{className:"App-body"},c.a.createElement(p.c,null,c.a.createElement(p.a,{exact:!0,path:"/",component:L}),c.a.createElement(p.a,{path:"/charConvert",component:E}),c.a.createElement(p.a,{path:"/PageFormat",component:P}),c.a.createElement(p.a,{path:"/PageFormatG8",component:R}),c.a.createElement(p.a,{path:"/TaoMauKhoiLuong",component:A})))))))}}]),n}(i.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var N=n(207),T=n(75);Object(N.a)(),Office.initialize=Object(o.a)(r.a.mark((function e(){return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(T.a)();case 2:u.a.render(c.a.createElement(I,null),document.getElementById("root"));case 3:case"end":return e.stop()}}),e)}))),u.a.render(c.a.createElement(I,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},75:function(e,t,n){"use strict";n.d(t,"b",(function(){return c})),n.d(t,"a",(function(){return s}));var a=n(4),r=n.n(a),o=n(6),i=n(99),c=null;function s(){return u.apply(this,arguments)}function u(){return(u=Object(o.a)(r.a.mark((function e(){return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,new i.a;case 2:c=e.sent;case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)}},78:function(e,t,n){"use strict";n.d(t,"a",(function(){return a})),n.d(t,"c",(function(){return r})),n.d(t,"b",(function(){return o})),n.d(t,"d",(function(){return i}));var a="C\xf4ng tr\xecnh",r="T\u1ed5ng h\u1ee3p VT",o="HaoPhiVatTu",i="B\u1ea2NG T\u1ed4NG H\u1ee2P V\u1eacT T\u01af V\xc0 CH\xcaNH L\u1ec6CH GI\xc1"},81:function(e,t,n){"use strict";var a=n(108),r=n.n(a)()("https://localhost:8080");t.a=r},99:function(e,t,n){"use strict";n.d(t,"a",(function(){return p}));var a=n(23),r=n(25),o=n(24),i=n(4),c=n.n(i),s=n(6),u=n(21),l=n(110);var f=n(78);function h(e){return e.getRange("A1:ZZ4").find("*",{completeMatch:!0,matchCase:!1,searchDirection:Excel.SearchDirection.backwards})}var v=function e(t){Object(u.a)(this,e),this.sheet=void 0,this.text=void 0,this.cell1={text:"",col:"",row:""},this.cell2={text:"",col:"",row:""},this.text=t.replace(/(([^!]+)?)!/g,"");var n=this.text.split(":");this.cell1.text=n[0],this.cell1.col=n[0].replace(/([0-9])+/g,""),this.cell1.row=n[0].replace(/([A-Z]|[a-z])+/g,""),n[1]&&(this.cell2.text=n[1],this.cell2.col=n[1].replace(/([0-9])+/g,""),this.cell2.row=n[1].replace(/([A-Z]|[a-z])+/g,""))};var p=function(e){Object(r.a)(n,e);var t=Object(o.a)(n);function n(){var e,a=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;return Object(u.a)(this,n),(e=t.call(this,Object(s.a)(c.a.mark((function t(){return c.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e.wsName=a,t.next=3,e.initContext().then(function(){var t=Object(s.a)(c.a.mark((function t(n){return c.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!a){t.next=5;break}return t.next=3,e.isWsExits().then((function(t){return t?e.getWorksheet().then((function(t){return e.initWsInfo().then((function(t){return e.getWorksheet()}))})):e.create().then((function(t){return e.initWsInfo()}))}));case 3:t.next=7;break;case 5:return t.next=7,e.getActive().then((function(t){return e.initWsInfo()}));case 7:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}());case 3:case"end":return t.stop()}}),t)}))))).ws=null,e.context=null,e.wsName=null,e.name=void 0,e.lastCol=void 0,e.lastRow=void 0,e.selectedRange=void 0,e}return Object(a.a)(n,[{key:"initContext",value:function(){var e=Object(s.a)(c.a.mark((function e(){var t=this;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,Excel.run(function(){var e=Object(s.a)(c.a.mark((function e(n){return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t.context=n;case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}());case 3:e.next=7;break;case 5:e.prev=5,e.t0=e.catch(0);case 7:case"end":return e.stop()}}),e,null,[[0,5]])})));return function(){return e.apply(this,arguments)}}()},{key:"initWsInfo",value:function(){var e=Object(s.a)(c.a.mark((function e(){var t,n,a,r,o;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return(t=this.context.workbook.getSelectedRange()).load("address"),this.ws.load("name"),i=this.ws,n=i.getRange("A:ZZ").find("*",{completeMatch:!0,matchCase:!1,searchDirection:Excel.SearchDirection.backwards}),a=h(this.ws),n.load("address"),a.load("address"),e.next=9,this.context.sync();case 9:r=new v(a.address),o=new v(n.address),this.lastCol=r.cell1,this.lastRow=o.cell1,this.name=this.ws.name,this.selectedRange=t.address;case 15:case"end":return e.stop()}var i}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"currentWs",value:function(){var e=Object(s.a)(c.a.mark((function e(t){var n=this;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:this.wsName=t,this.name=t,this.getWorksheet(t).then((function(e){return n.initWsInfo()}));case 3:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"getWorksheet",value:function(){var e=Object(s.a)(c.a.mark((function e(){var t,n,a=this,r=arguments;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=r.length>0&&void 0!==r[0]?r[0]:null,n=new Promise(function(){var e=Object(s.a)(c.a.mark((function e(n,r){var o;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:o=t||a.wsName,a.ws=a.context.workbook.worksheets.getItemOrNullObject(o),n();case 3:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}()),e.abrupt("return",n);case 3:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()},{key:"getActive",value:function(){var e=Object(s.a)(c.a.mark((function e(){return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:this.ws=this.context.workbook.worksheets.getActiveWorksheet();case 1:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"isWsExits",value:function(){var e=Object(s.a)(c.a.mark((function e(){var t,n=this;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=new Promise(function(){var e=Object(s.a)(c.a.mark((function e(t,a){var r;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return(r=n.context.workbook.worksheets.getItemOrNullObject(n.wsName)).load("name"),e.next=4,n.context.sync();case 4:t(r.name),n.name=r.name;case 6:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}()),e.abrupt("return",t);case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()},{key:"create",value:function(){var e=Object(s.a)(c.a.mark((function e(){var t=this;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,Excel.run(function(){var e=Object(s.a)(c.a.mark((function e(n){return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t.ws=n.workbook.worksheets.add(t.wsName),t.ws.activate();case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}());case 3:e.next=8;break;case 5:e.prev=5,e.t0=e.catch(0),console.log(e.t0);case 8:case"end":return e.stop()}}),e,null,[[0,5]])})));return function(){return e.apply(this,arguments)}}()},{key:"activate",value:function(){var e;null===(e=this.ws)||void 0===e||e.activate()}},{key:"setSheetValues",value:function(){var e;null===(e=this.ws)||void 0===e||e.getRange("A1:".concat(this.lastCol.text))}},{key:"getValues",value:function(){var e=Object(s.a)(c.a.mark((function e(t){var n,a,r;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return null===(r=null===(n=this.ws)||void 0===n?void 0:n.getRange(t))||void 0===r||r.load("values"),e.next=4,null===(a=this.context)||void 0===a?void 0:a.sync();case 4:return e.abrupt("return",null===r||void 0===r?void 0:r.values);case 5:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"getFomulas",value:function(){var e=Object(s.a)(c.a.mark((function e(t){var n,a,r;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return null===(r=null===(n=this.ws)||void 0===n?void 0:n.getRange(t))||void 0===r||r.load("formulasR1C1"),e.next=4,null===(a=this.context)||void 0===a?void 0:a.sync();case 4:return e.abrupt("return",null===r||void 0===r?void 0:r.formulasR1C1);case 5:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"addValues",value:function(){var e=Object(s.a)(c.a.mark((function e(t,n){var a;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:(null===(a=this.ws)||void 0===a?void 0:a.getRange(t)).values=n;case 2:case"end":return e.stop()}}),e,this)})));return function(t,n){return e.apply(this,arguments)}}()},{key:"setPrintAreabySelected",value:function(){var e;null===(e=this.ws)||void 0===e||e.pageLayout.setPrintArea(this.selectedRange)}},{key:"autoSetPrintArea",value:function(){var e;null===(e=this.ws)||void 0===e||e.pageLayout.setPrintArea("A:"+this.lastCol.col)}},{key:"setPrintArea",value:function(e){var t;null===(t=this.ws)||void 0===t||t.pageLayout.setPrintArea(e)}},{key:"setFont",value:function(e){this.ws.getRange("A:Z").format.font.name=e}},{key:"setBlackAndWhite",value:function(){this.ws.pageLayout.blackAndWhite=!0}},{key:"setPageMargin",value:function(e,t,n,a){this.ws.pageLayout.topMargin=e,this.ws.pageLayout.bottomMargin=t,this.ws.pageLayout.leftMargin=n,this.ws.pageLayout.rightMargin=a}},{key:"setPaperType",value:function(e){var t;this.ws.pageLayout.paperSize=(t=e,Excel.PaperType[t])}},{key:"setOrientation",value:function(e){var t;this.ws.pageLayout.orientation=(t=e,Excel.PageOrientation[t])}},{key:"setCenter",value:function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];this.ws.pageLayout.centerHorizontally=e,this.ws.pageLayout.centerVertically=t}},{key:"setPageZoom",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;0!==e&&(this.ws.pageLayout.zoom={horizontalFitToPages:1}),0!==t&&(this.ws.pageLayout.zoom={verticalFitToPages:1})}},{key:"colWidth",value:function(e,t){this.ws.getRange("".concat(e,"1")).format.columnWidth=t}},{key:"autoColWidth",value:function(e){this.ws.getRange("".concat(e,":").concat(e)).format.autofitColumns()}},{key:"autoRowsHeight",value:function(e){this.ws.getRange(e).format.autofitRows()}},{key:"rowsHeight",value:function(e,t){this.ws.getRange(e).format.rowHeight=t}},{key:"mergeCells",value:function(e){var t;null===(t=this.ws)||void 0===t||t.getRange(e).merge()}},{key:"verCenter",value:function(e){this.ws.getRange(e).format.verticalAlignment="Center"}},{key:"horCenter",value:function(e){this.ws.getRange(e).format.horizontalAlignment="Center"}},{key:"setBold",value:function(e){this.ws.getRange(e).format.font.bold=!0}},{key:"setWrapText",value:function(e){this.ws.getRange(e).format.wrapText=!0}},{key:"unmergeCells",value:function(e){this.ws.getRange(e).unmerge()}},{key:"moveRange",value:function(){var e=Object(s.a)(c.a.mark((function e(t,n){var a,r;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return(r=this.ws.getRange(t)).load("values"),e.next=4,null===(a=this.context)||void 0===a?void 0:a.sync();case 4:this.ws.getRange(n).values=r.values;case 5:case"end":return e.stop()}}),e,this)})));return function(t,n){return e.apply(this,arguments)}}()},{key:"sheetSlice",value:function(){var e=Object(s.a)(c.a.mark((function e(t,n){var a,r=this;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=[],e.next=3,t.forEach((function(e,t){e[0]===f.d&&a.push(t)}));case 3:a.forEach(function(){var e=Object(s.a)(c.a.mark((function e(t,n){var a;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:a=r.context.workbook.worksheets,console.log(a),a.add();case 3:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}());case 4:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}()},{key:"addSheet",value:function(){var e=Object(s.a)(c.a.mark((function e(t){return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,Excel.run(function(){var e=Object(s.a)(c.a.mark((function e(n){var a;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:a=n.workbook.worksheets,a.add(t).load("name");case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}());case 3:e.next=7;break;case 5:e.prev=5,e.t0=e.catch(0);case 7:case"end":return e.stop()}}),e,null,[[0,5]])})));return function(t){return e.apply(this,arguments)}}()},{key:"getSelectedValues",value:function(){var e=Object(s.a)(c.a.mark((function e(){var t,n,a;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return null===(a=null===(t=this.context)||void 0===t?void 0:t.workbook.getSelectedRange())||void 0===a||a.load("values"),e.next=4,null===(n=this.context)||void 0===n?void 0:n.sync();case 4:return e.abrupt("return",null===a||void 0===a?void 0:a.values);case 5:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"save",value:function(){var e=Object(s.a)(c.a.mark((function e(){return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()},{key:"setCustomConditionalFormat",value:function(){var e=Object(s.a)(c.a.mark((function e(t,n,a,r,o,i){var s,u,l;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:u=null===(s=this.ws)||void 0===s?void 0:s.getRange(t),(l=null===u||void 0===u?void 0:u.conditionalFormats.add(Excel.ConditionalFormatType.custom)).custom.rule.formula=n,a&&(l.custom.format.font.color=a),l.custom.format.font.bold=r,l.custom.format.font.italic=o,i&&(l.custom.format.borders.getItem("EdgeBottom").style="Continuous",l.custom.format.borders.getItem("EdgeLeft").style="Continuous",l.custom.format.borders.getItem("EdgeRight").style="Continuous",l.custom.format.borders.getItem("EdgeTop").style="Continuous");case 7:case"end":return e.stop()}}),e,this)})));return function(t,n,a,r,o,i){return e.apply(this,arguments)}}()},{key:"createTable",value:function(){var e=Object(s.a)(c.a.mark((function e(t,n,a){var r;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:(r=this.ws.tables.add(t,!0)).name=n,a&&r.rows.add(void 0,a);case 3:case"end":return e.stop()}}),e,this)})));return function(t,n,a){return e.apply(this,arguments)}}()}]),n}(l.AsyncConstructor)}},[[121,3,4]]]);
//# sourceMappingURL=main.f2cdd9c2.chunk.js.map