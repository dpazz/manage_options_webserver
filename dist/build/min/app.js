const svgLogo='<path d="M34 3.07c-.304.884.663 3.037-.586 2.975-3.147.156-6.92-.686-9.304 1.886-2.54 2.143.712 7.799-3.115 8.314-4.142-.286-4.814 4.608-4.813 7.719-.702 2.752 1.378 7.764-1.942 8.898-2.662 2.26.453 6.295.68 9.206 1.465 3.985-4.306 5.573-7.148 4.208-2.227-.67-6.04-4.373-7.668-2.017 2.883 2.157 6.4 3.593 9.926 4.286 3.215-.428 5.972-2.27 8.84-3.655 3.885 1.675 7.884 4.692 12.298 3.088 2.208-.816 4.166-2.15 6.232-3.258 3.583 2.127 7.623 4.989 11.953 3.176 2.266-.831 4.384-2.005 6.577-3.006 3 1.403 5.89 3.51 9.288 3.616 3.344-.856 6.727-2.132 9.478-4.247-2.086-2.505-5.972 2.094-8.786 2.328-3.495 1.066-8.032-2.004-5.694-5.808.39-2.638 3.322-7.192-.56-8.324-1.82-2.464-.565-6.629-1.098-9.725.181-3.437-1.86-7.237-5.812-6.613-2.041-2.418.353-6.955-2.893-8.974-2.742-1.61-6.023-.959-9.053-1.098-.144-1.84.371-3.864-.457-5.546C38.112-.069 33.013-.954 34 3.07Zm5.1 1.275c.85 3.843-4.953 2.818-3.383-.67-.193-3.03 4.302-2.162 3.383.67Zm10.88 8.67.255 4.845 6.29.51c.168 4.335.338 8.67.51 13.005-6.52-2-12.918-4.525-19.635-5.78-6.413 1.367-12.636 3.603-18.818 5.739-1.217-2.155-.417-5.037-.517-7.505l.21-5.459c2.125-.166 4.25-.336 6.375-.51.111-3.2-.345-6.508.595-9.605 8.128-.755 16.324-.159 24.48-.085l.255 4.845zm-9.095 15.13c4.047.71 1.372 6.131 1.19 8.84l-1.445 6.46h-6.545c-.783-4.331-2.15-8.628-2.061-13.058.744-3.791 6.244-2.405 8.861-2.242zm-10.71 3.57c.717 4.154 2.303 8.313 1.892 12.564-1.656 3.31-6.01 1.878-8.51.362-2.896-1.267-7.241-.719-7.383-4.99-2.163-3.537.674-6.508 4.162-7.087 2.987-.41 7.493-4.282 9.727-1.252zm22.78.425c3.043.85 8.137 2.404 5.93 6.613-.165 3.828-3.147 5.147-6.51 5.444-2.817 1.093-6.054 3.44-8.948 1.158-1.918-2.782.003-6.46.306-9.53.516-2.792.914-7.83 4.875-5.148 1.455.47 2.903.96 4.347 1.463Z"/><path d="M28.9 11.995c.179 3.791 5.785.254 2.432-1.59-1.117-.426-2.59.236-2.432 1.59Zm2.55 0c-2.113 3.253-2.074-3.216 0 0zM35.7 11.995c.179 3.791 5.785.254 2.432-1.59-1.117-.426-2.59.236-2.432 1.59Zm2.55 0c-2.113 3.253-2.074-3.216 0 0zM42.5 11.995c.179 3.791 5.785.254 2.432-1.59-1.117-.426-2.59.236-2.432 1.59Zm2.55 0c-2.113 3.253-2.074-3.216 0 0zM22.1 22.195c.179 3.791 5.785.254 2.432-1.59-1.117-.426-2.59.236-2.432 1.59Zm2.55 0c-2.113 3.253-2.074-3.216 0 0zM28.9 22.195c.179 3.791 5.785.254 2.432-1.59-1.117-.426-2.59.236-2.432 1.59Zm2.55 0c-2.113 3.253-2.074-3.216 0 0zM35.7 22.195c.179 3.791 5.785.254 2.432-1.59-1.117-.426-2.59.236-2.432 1.59Zm2.55 0c-2.113 3.253-2.074-3.216 0 0zM42.5 22.195c.179 3.791 5.785.254 2.432-1.59-1.117-.426-2.59.236-2.432 1.59Zm2.55 0c-2.113 3.253-2.074-3.216 0 0zM49.3 22.195c.179 3.791 5.785.254 2.432-1.59-1.117-.426-2.59.236-2.432 1.59Zm2.55 0c-2.113 3.253-2.074-3.216 0 0zM24.735 37.41c-2.069 2.219.424 8.598 3.496 4.91 1.166-2.094-.3-7.62-3.496-4.91ZM46.325 39.28c-1.79 4.086 4.97 5.906 4.384.938.949-3.468-4.12-5.209-4.384-.938ZM3.74 53.22c1.135.513 5.735 3.123 5.153 1.51-2.424-1.584-5.099-3.205-7.985-3.592.473.99 1.91 1.483 2.832 2.082ZM15.3 52.03c-.472 1.375 4.375-.843 5.652.417 3.145 1.421 6.584 4.192 10.098 2.056 1.79-.901 5.293-1.872 5.67-3.408-3.884.703-7.523 5.12-11.524 2.36-2.956-1.417-6.735-3.48-9.896-1.425ZM39.1 51.435c2.287 2.544 6.44 4.735 9.924 3.411 3.178-1.737 7.026-4.278 10.519-1.574 1.51 1.429 6.737 2.619 6.849 1.654-3.887-.303-6.664-3.797-10.558-3.756-4.109-.164-7.264 4.62-11.459 2.785-1.836-.635-3.366-2.21-5.275-2.52ZM70.55 51.945c-3.55 2.858 7.261-1.128 2.211-.753-.777.091-1.56.303-2.211.753ZM0 58.745c2.943 1.32 6.322 3.63 9.796 4.144 3.99.172 7.153-4.483 11.157-2.794 3.332 1.459 7.144 4.188 10.785 1.898 3.113-2.548 7.538-3.109 10.718-.324 3.217 2.343 7.13.756 10.141-1.07 3.238-2.206 6.59.327 9.554 1.668 3.85 2.027 7.255-1.29 10.678-2.537 3.039.202 1.66-2.906-.673-1.547-3.197.864-6.235 4.414-9.72 2.384-3.351-2.581-8.226-3.655-11.861-.972-3.137 2.976-7.148.932-10.175-.97-4.01-2.037-7.63 1.195-11.219 2.465-3.918.634-6.593-3.828-10.606-3.16-3.768.068-6.6 4.563-10.49 2.86C5.773 60.083 2.083 56.4 0 58.746Z"/>',svgMenu='<path d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z"/>',svgLock='<svg height="16pt" viewBox="0 0 512 512"><path d="m336 512h-288c-26.453125 0-48-21.523438-48-48v-224c0-26.476562 21.546875-48 48-48h288c26.453125 0 48 21.523438 48 48v224c0 26.476562-21.546875 48-48 48zm-288-288c-8.8125 0-16 7.167969-16 16v224c0 8.832031 7.1875 16 16 16h288c8.8125 0 16-7.167969 16-16v-224c0-8.832031-7.1875-16-16-16zm0 0"/><path d="m304 224c-8.832031 0-16-7.167969-16-16v-80c0-52.929688-43.070312-96-96-96s-96 43.070312-96 96v80c0 8.832031-7.167969 16-16 16s-16-7.167969-16-16v-80c0-70.59375 57.40625-128 128-128s128 57.40625 128 128v80c0 8.832031-7.167969 16-16 16zm0 0"/></svg>',svgUnlock='<svg height="16pt" viewBox="0 0 512 512"><path d="m336 512h-288c-26.453125 0-48-21.523438-48-48v-224c0-26.476562 21.546875-48 48-48h288c26.453125 0 48 21.523438 48 48v224c0 26.476562-21.546875 48-48 48zm-288-288c-8.8125 0-16 7.167969-16 16v224c0 8.832031 7.1875 16 16 16h288c8.8125 0 16-7.167969 16-16v-224c0-8.832031-7.1875-16-16-16zm0 0"/><path d="m80 224c-8.832031 0-16-7.167969-16-16v-80c0-70.59375 57.40625-128 128-128s128 57.40625 128 128c0 8.832031-7.167969 16-16 16s-16-7.167969-16-16c0-52.929688-43.070312-96-96-96s-96 43.070312-96 96v80c0 8.832031-7.167969 16-16 16zm0 0"/></svg>',svgScan='<path d="M12 12C9.97 12 8.1 12.67 6.6 13.8L4.8 11.4C6.81 9.89 9.3 9 12 9S17.19 9.89 19.2 11.4L18.74 12C18.66 12 18.58 12 18.5 12C17.43 12 16.42 12.26 15.53 12.72C14.45 12.26 13.26 12 12 12M21 9L22.8 6.6C19.79 4.34 16.05 3 12 3S4.21 4.34 1.2 6.6L3 9C5.5 7.12 8.62 6 12 6S18.5 7.12 21 9M12 15C10.65 15 9.4 15.45 8.4 16.2L12 21L12.34 20.54C12.13 19.9 12 19.22 12 18.5C12 17.24 12.36 16.08 13 15.08C12.66 15.03 12.33 15 12 15M18 14.5C15.79 14.5 14 16.29 14 18.5S15.79 22.5 18 22.5C19.68 22.5 21.12 21.47 21.71 20H20C19.54 20.61 18.82 21 18 21C16.62 21 15.5 19.88 15.5 18.5S16.62 16 18 16C18.69 16 19.32 16.28 19.77 16.73L18 18.5H22V14.5L20.83 15.67C20.11 14.95 19.11 14.5 18 14.5Z" />',svgConnect='<path d="M12 6C8.62 6 5.5 7.12 3 9L1.2 6.6C4.21 4.34 7.95 3 12 3S19.79 4.34 22.8 6.6L21 9C18.5 7.12 15.38 6 12 6M16.84 13.41C17.18 13.27 17.55 13.17 17.92 13.1L19.2 11.4C17.19 9.89 14.7 9 12 9S6.81 9.89 4.8 11.4L6.6 13.8C8.1 12.67 9.97 12 12 12C13.78 12 15.44 12.5 16.84 13.41M12 15C10.65 15 9.4 15.45 8.4 16.2L12 21L13.04 19.61C13 19.41 13 19.21 13 19C13 17.66 13.44 16.43 14.19 15.43C13.5 15.16 12.77 15 12 15M23 19L20 16V18H16V20H20V22L23 19Z" />',svgSave='<path d="M15,9H5V5H15M12,19A3,3 0 0,1 9,16A3,3 0 0,1 12,13A3,3 0 0,1 15,16A3,3 0 0,1 12,19M17,3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V7L17,3Z" />',svgRestart='<path d="M12,4C14.1,4 16.1,4.8 17.6,6.3C20.7,9.4 20.7,14.5 17.6,17.6C15.8,19.5 13.3,20.2 10.9,19.9L11.4,17.9C13.1,18.1 14.9,17.5 16.2,16.2C18.5,13.9 18.5,10.1 16.2,7.7C15.1,6.6 13.5,6 12,6V10.6L7,5.6L12,0.6V4M6.3,17.6C3.7,15 3.3,11 5.1,7.9L6.6,9.4C5.5,11.6 5.9,14.4 7.8,16.2C8.3,16.7 8.9,17.1 9.6,17.4L9,19.4C8,19 7.1,18.4 6.3,17.6Z" />',svgEye='<path d="M12 6.5c2.76 0 5 2.24 5 5 0 .51-.1 1-.24 1.46l3.06 3.06c1.39-1.23 2.49-2.77 3.18-4.53C21.27 7.11 17 4 12 4c-1.27 0-2.49.2-3.64.57l2.17 2.17c.47-.14.96-.24 1.47-.24zM2.71 3.16c-.39.39-.39 1.02 0 1.41l1.97 1.97C3.06 7.83 1.77 9.53 1 11.5 2.73 15.89 7 19 12 19c1.52 0 2.97-.3 4.31-.82l2.72 2.72c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L4.13 3.16c-.39-.39-1.03-.39-1.42 0zM12 16.5c-2.76 0-5-2.24-5-5 0-.77.18-1.5.49-2.14l1.57 1.57c-.03.18-.06.37-.06.57 0 1.66 1.34 3 3 3 .2 0 .38-.03.57-.07L14.14 16c-.65.32-1.37.5-2.14.5zm2.97-5.33c-.15-1.4-1.25-2.49-2.64-2.64l2.64 2.64z" />',svgNoEye='<path d="M0 0h24v24H0V0z" fill="none"/><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>',svgCloseModal='<path fill-rule="evenodd" clip-rule="evenodd" d="M13.7071 1.70711C14.0976 1.31658 14.0976 0.683417 13.7071 0.292893C13.3166 -0.0976311 12.6834 -0.0976311 12.2929 0.292893L7 5.58579L1.70711 0.292893C1.31658 -0.0976311 0.683417 -0.0976311 0.292893 0.292893C-0.0976311 0.683417 -0.0976311 1.31658 0.292893 1.70711L5.58579 7L0.292893 12.2929C-0.0976311 12.6834 -0.0976311 13.3166 0.292893 13.7071C0.683417 14.0976 1.31658 14.0976 1.70711 13.7071L7 8.41421L12.2929 13.7071C12.6834 14.0976 13.3166 14.0976 13.7071 13.7071C14.0976 13.3166 14.0976 12.6834 13.7071 12.2929L8.41421 7L13.7071 1.70711Z" fill="black" />';var options={},$=function(e){return document.getElementById(e)};function showHidePassword(){var e=$("password");"password"===e.type?(e.type="text",$("show-pass").classList.remove("w--current"),$("hide-pass").classList.add("w--current")):(e.type="password",$("show-pass").classList.add("w--current"),$("hide-pass").classList.remove("w--current"))}function getWiFiList(){$("loader").classList.remove("hide");var e=new URL(`http://${window.location.hostname}/scan`);fetch(e).then((e=>e.json())).then((e=>{listWifiNetworks(e),$("loader").classList.add("hide")}))}function selectWifi(e){try{$("select-"+e.target.parentNode.id).checked=!0}catch(t){$(e.target.id).checked=!0}$("ssid").value=this.cells[1].innerHTML,$("ssid-name").innerHTML=this.cells[1].innerHTML,$("password").focus()}function listWifiNetworks(e){const t=document.querySelector("#wifi-list");t.innerHTML="",e.forEach(((e,s)=>{var n=document.createElement("tr"),a="wifi-"+s;n.id=a,n.addEventListener("click",selectWifi),n.innerHTML=`<td><input type="radio" name="select" id="select-${a}"></td>`,n.innerHTML+=`<td id="ssid-${a}">${e.ssid}</td>`,n.innerHTML+='<td class="hide-tiny">'+e.strength+" dBm</td>",e.security?n.innerHTML+="<td>"+svgLock+"</td>":n.innerHTML+="<td>"+svgUnlock+"</td>",t.appendChild(n)})),$("wifi-table").classList.remove("hide")}function getParameters(){$("loader").classList.remove("hide");var e=new URL(`http://${window.location.hostname}/config.json`);fetch(e).then((e=>e.json())).then((e=>{Object.keys(e).forEach((function(t){t.startsWith("logo-name")&&($("name-logo").innerHTML=e[t],delete e[t]),t.startsWith("logo-svg")&&($("svg-logo").innerHTML=e[t],delete e[t]),$("loader").classList.add("hide")})),listParameters(options=e)}))}function createNewBox(e,t){var s=document.createElement("div");s.setAttribute("id","option-box"+e),s.classList.add("ctn","opt-box","hide");var n=document.createElement("h2");n.classList.add("heading-2"),n.innerHTML=t,s.appendChild(n);var a=document.createElement("form");a.classList.add("form"),s.appendChild(a),$("main-box").appendChild(s);var i=document.createElement("a");return i.setAttribute("id","set-opt"+e),i.setAttribute("data-box","option-box"+e),i.classList.add("a-link"),i.innerHTML=t,i.addEventListener("click",switchPage),$("nav-link").appendChild(i),a}function listParameters(e){var t,s;Object.keys(e)[0].startsWith("param-box")||(e={"param-box1":"Options",...e},options=e),Object.entries(e).forEach((([e,n],a)=>{if(e.startsWith("param-box"))s=createNewBox(a,n);else{if(e.startsWith("raw-javascript")){var i=document.createElement("script");return i.innerHTML=n.trim(),void document.body.appendChild(i)}if(e.startsWith("raw-html"))html=n.trim(),(t=document.createElement("div")).setAttribute("id","row"+a),t.style.width="100%",t.innerHTML=html,s.appendChild(t);else{let a=n,i=document.createElement("label");if((t=document.createElement("input")).setAttribute("id",e),"boolean"==typeof a){t.setAttribute("type","checkbox"),t.classList.add("t-check","opt-input"),t.checked=a,i.classList.add("input-label","toggle");let n=document.createElement("div");n.classList.add("toggle-switch");let o=document.createElement("span");o.classList.add("toggle-label"),o.textContent=e,i.appendChild(t),i.appendChild(n),i.appendChild(o),s.appendChild(i)}else{if(t.value=a,t.classList.add("opt-input"),i.setAttribute("label-for",e),i.classList.add("input-label"),i.textContent=e,"string"==typeof a&&t.setAttribute("type","text"),"number"==typeof a&&t.setAttribute("type","number"),"object"==typeof a){var o=Math.round(a.value*(1/a.step))/(1/a.step);t.setAttribute("type","number"),t.setAttribute("step",a.step),t.setAttribute("min",a.min),t.setAttribute("max",a.max),t.value=Number(o).toFixed(3)}addInputListener(t);var c=document.createElement("div");c.classList.add("tf-wrapper"),c.appendChild(i),c.appendChild(t),s.appendChild(c)}}e.endsWith("-hidden")&&(console.log(e),console.log(t),t.classList.add("hide"))}}))}function addInputListener(e){e.addEventListener("change",(()=>{if("number"===e.type)if(e.getAttribute("step")){var t={};t.value=Math.round(e.value*(1/e.step))/(1/e.step),t.step=e.getAttribute("step"),t.min=e.getAttribute("min"),t.max=e.getAttribute("max"),options[e.id]=t}else options[e.id]=parseInt(e.value);"text"===e.type&&(options[e.id]=e.value),"checkbox"===e.type&&(options[e.id]=e.checked)}))}function saveParameters(){var e=new Blob([JSON.stringify(options,null,2)],{type:"application/json"}),t=new FormData;t.append("data",e,"/config.json"),fetch("/edit",{method:"POST",headers:{"Access-Control-Allow-Origin":"*","Access-Control-Allow-Methods":"PUT,POST,GET,OPTIONS","Access-Control-Allow-Headers":"*"},body:t}).then((e=>e.text())).then((e=>{openModalMessage("Salvataggio opzioni","<br><b>config.json</b> file salvato con successo sulla flash memory!<br><br>")}))}function doConnection(){var e;$("loader").classList.remove("hide");var t=new FormData;t.append("ssid",$("ssid").value),t.append("password",$("password").value),t.append("persistent",$("persistent").checked);var s=`ssid=${$("ssid").value}&password=${$("password").value}&persistent=${$("persistent").checked}`;fetch("/connect",{method:"POST",redirect:"follow",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:s}).then((function(t){return e=t.status,t.text()})).then((function(t){200===e?openModalMessage("Connessione al WiFi","<br>"+t):openModalMessage("Error!","<br>Errore di connessione: <b>"+t+"</b><br><br>"),$("loader").classList.add("hide")}))}function switchPage(e){if($("top-nav").classList.remove("responsive"),document.querySelectorAll("a").forEach((e=>{e.classList.remove("active")})),e.target.classList.add("active"),document.querySelectorAll(".opt-box").forEach((e=>{e.classList.add("hide")})),$(e.target.getAttribute("data-box")).classList.remove("hide"),"set-wifi"!=e.target.id){var t=document.createDocumentFragment();t.appendChild($("btn-box")),$(e.target.getAttribute("data-box")).appendChild(t),$("btn-box").classList.remove("hide")}else $("btn-box").classList.add("hide")}function showMenu(){$("top-nav").classList.add("responsive")}var closeCallback=function(){};function openModalMessage(e,t,s){$("message-title").innerHTML=e,$("message-body").innerHTML=t,$("modal-message").open=!0,$("main-box").style.filter="blur(3px)",void 0!==s?(console.log(s),closeCallback=s,$("ok-modal").classList.remove("hide")):$("ok-modal").classList.add("hide")}function closeModalMessage(e){$("modal-message").open=!1,$("main-box").style.filter="",void 0!==closeCallback&&e&&closeCallback()}function restartESP(){var e=new URL(`http://${window.location.hostname}/restart`);fetch(e).then((e=>e.json())).then((e=>{closeModalMessage(),openModalMessage("Restart!","<br>ESP restarted. Attendi qualche secondo e ricarica questa pagina.<br>")}))}$("svg-menu").innerHTML=svgMenu,$("svg-logo").innerHTML=svgLogo,$("svg-eye").innerHTML=svgEye,$("svg-no-eye").innerHTML=svgNoEye,$("svg-scan").innerHTML=svgScan,$("svg-connect").innerHTML=svgConnect,$("svg-save").innerHTML=svgSave,$("svg-restart").innerHTML=svgRestart,$("close-modal").innerHTML=svgCloseModal,$("hum-btn").addEventListener("click",showMenu),$("scan-wifi").addEventListener("click",getWiFiList),$("connect-wifi").addEventListener("click",doConnection),$("save-params").addEventListener("click",saveParameters),$("show-hide-password").addEventListener("click",showHidePassword),$("set-wifi").addEventListener("click",switchPage),$("about").addEventListener("click",switchPage),$("restart").addEventListener("click",restartESP),window.addEventListener("load",getParameters),$("connect-wifi").disabled=!0,$("password").addEventListener("input",(e=>{0===$("password").value.length?$("connect-wifi").disabled=!0:$("connect-wifi").disabled=!1}));