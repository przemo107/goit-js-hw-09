const e=document.getElementById("start-btn"),t=document.getElementById("stop-btn");let d;e.addEventListener("click",(()=>{d=setInterval((()=>{document.body.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16)}`}),1e3),e.disabled=!0,t.disabled=!1})),t.addEventListener("click",(()=>{clearInterval(d),e.disabled=!1,t.disabled=!0}));
//# sourceMappingURL=01-color-switcher.b08678eb.js.map