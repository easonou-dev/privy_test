const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/add-CWOhsWOh.js","assets/lit-element-CQT_gvNE.js","assets/index-C4XRDiHp.js","assets/all-wallets-BYiECQfp.js","assets/arrow-bottom-circle-_DYr85Z1.js","assets/app-store-PC0mVCLp.js","assets/apple-CDqL-07b.js","assets/arrow-bottom-ClnILD34.js","assets/arrow-left-Bf_6jZAl.js","assets/arrow-right-5euO5cOp.js","assets/arrow-top-T5Gb08MD.js","assets/bank-DIevKsiw.js","assets/browser-Cx4F2JUY.js","assets/bin-CTs2FnJI.js","assets/bitcoin-BP0LRXJv.js","assets/card-CSd3oZNs.js","assets/checkmark-CzWbXZdr.js","assets/checkmark-bold-Bqt6vQ1E.js","assets/chevron-bottom-BDjRXw9n.js","assets/chevron-left-BPcC7SW-.js","assets/chevron-right-VyBZ0_Vh.js","assets/chevron-top-DP5S4jmv.js","assets/chrome-store-EjiDs2HY.js","assets/clock-C6dZyhfg.js","assets/close-B2VEz-8l.js","assets/compass-DALLNCuK.js","assets/coinPlaceholder-Dlo97En_.js","assets/copy-upDBHAXc.js","assets/cursor-C1N0Ymu8.js","assets/cursor-transparent-BpKTP0dg.js","assets/circle-B7wD_D3k.js","assets/desktop-CqFA5Zu0.js","assets/disconnect-Bmmw0YEA.js","assets/discord-CEVTfyYn.js","assets/ethereum-QPOMZaoL.js","assets/etherscan-KobZa6sw.js","assets/extension-C1qC9GmG.js","assets/external-link-DUMDrqpq.js","assets/facebook-Rw6Ylgs2.js","assets/farcaster-M4uk9p3d.js","assets/filters-BokT9TEo.js","assets/github-DtJF544r.js","assets/google-C6jllk5B.js","assets/help-circle-CrGMT8y9.js","assets/image-D_Nc0EzU.js","assets/id-a7ZOOE8V.js","assets/info-circle-Cyo8CfbF.js","assets/lightbulb-DwJqEey4.js","assets/mail-TGgom9Ij.js","assets/mobile-JpJ-X1qO.js","assets/more-XwuWWxK-.js","assets/network-placeholder-B5dk4ebI.js","assets/nftPlaceholder-BMf83JMF.js","assets/off-CMqgZw5B.js","assets/play-store-DBKqwFLe.js","assets/plus-D_mg1URn.js","assets/qr-code-DtgdTowd.js","assets/recycle-horizontal-obogm2C2.js","assets/refresh-DzolfOuf.js","assets/search-BfQAcFkz.js","assets/send-DXWa9wgt.js","assets/swapHorizontal-drbrERm5.js","assets/swapHorizontalMedium-atQK1iEX.js","assets/swapHorizontalBold-D4mdCScC.js","assets/swapHorizontalRoundedBold-C8fNzdE2.js","assets/swapVertical-DutZRV5o.js","assets/solana-Drm9QXiY.js","assets/telegram-DhfY7RMC.js","assets/three-dots-C1vDpj9-.js","assets/twitch-Cll7qX1G.js","assets/x-CL4-rCmo.js","assets/twitterIcon-7q8Q-nQ8.js","assets/user-DVpawSaa.js","assets/verify-DdVSFZxt.js","assets/verify-filled-BsXtiY5d.js","assets/wallet--5P6NFRS.js","assets/walletconnect-CzLZpcIw.js","assets/wallet-placeholder-BL4eaLHN.js","assets/warning-circle-wz4QIBxd.js","assets/info-BQ-StQm3.js","assets/exclamation-triangle-v_IUM_vT.js","assets/reown-logo-Do1WD-We.js","assets/x-mark-C1UPhsim.js"])))=>i.map(i=>d[i]);
import{_ as a}from"./index-C4XRDiHp.js";import{i as E,a as R,x as y}from"./lit-element-CQT_gvNE.js";import{n as s,m as I,a as D}from"./class-map-BUQwRYdT.js";import{r as T,n as O}from"./index-jjtzGKAb.js";const w={getSpacingStyles(t,i){if(Array.isArray(t))return t[i]?`var(--wui-spacing-${t[i]})`:void 0;if(typeof t=="string")return`var(--wui-spacing-${t})`},getFormattedDate(t){return new Intl.DateTimeFormat("en-US",{month:"short",day:"numeric"}).format(t)},getHostName(t){try{return new URL(t).hostname}catch{return""}},getTruncateString({string:t,charsStart:i,charsEnd:r,truncate:o}){return t.length<=i+r?t:o==="end"?`${t.substring(0,i)}...`:o==="start"?`...${t.substring(t.length-r)}`:`${t.substring(0,Math.floor(i))}...${t.substring(t.length-Math.floor(r))}`},generateAvatarColors(t){const r=t.toLowerCase().replace(/^0x/iu,"").replace(/[^a-f0-9]/gu,"").substring(0,6).padEnd(6,"0"),o=this.hexToRgb(r),n=getComputedStyle(document.documentElement).getPropertyValue("--w3m-border-radius-master"),c=100-3*Number(n==null?void 0:n.replace("px","")),l=`${c}% ${c}% at 65% 40%`,p=[];for(let f=0;f<5;f+=1){const h=this.tintColor(o,.15*f);p.push(`rgb(${h[0]}, ${h[1]}, ${h[2]})`)}return`
    --local-color-1: ${p[0]};
    --local-color-2: ${p[1]};
    --local-color-3: ${p[2]};
    --local-color-4: ${p[3]};
    --local-color-5: ${p[4]};
    --local-radial-circle: ${l}
   `},hexToRgb(t){const i=parseInt(t,16),r=i>>16&255,o=i>>8&255,n=i&255;return[r,o,n]},tintColor(t,i){const[r,o,n]=t,e=Math.round(r+(255-r)*i),c=Math.round(o+(255-o)*i),l=Math.round(n+(255-n)*i);return[e,c,l]},isNumber(t){return{number:/^[0-9]+$/u}.number.test(t)},getColorTheme(t){var i;return t||(typeof window<"u"&&window.matchMedia&&typeof window.matchMedia=="function"?(i=window.matchMedia("(prefers-color-scheme: dark)"))!=null&&i.matches?"dark":"light":"dark")},splitBalance(t){const i=t.split(".");return i.length===2?[i[0],i[1]]:["0","00"]},roundNumber(t,i,r){return t.toString().length>=i?Number(t).toFixed(r):t}};function V(t,i){const{kind:r,elements:o}=i;return{kind:r,elements:o,finisher(n){customElements.get(t)||customElements.define(t,n)}}}function A(t,i){return customElements.get(t)||customElements.define(t,i),i}function P(t){return function(r){return typeof r=="function"?A(t,r):V(t,r)}}class b{constructor(){this.cache=new Map}set(i,r){this.cache.set(i,r)}get(i){return this.cache.get(i)}has(i){return this.cache.has(i)}delete(i){this.cache.delete(i)}clear(){this.cache.clear()}}const S=new b,x=E`
  :host {
    display: flex;
    aspect-ratio: var(--local-aspect-ratio);
    color: var(--local-color);
    width: var(--local-width);
  }

  svg {
    width: inherit;
    height: inherit;
    object-fit: contain;
    object-position: center;
  }

  .fallback {
    width: var(--local-width);
    height: var(--local-height);
  }
`;var d=function(t,i,r,o){var n=arguments.length,e=n<3?i:o,c;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")e=Reflect.decorate(t,i,r,o);else for(var l=t.length-1;l>=0;l--)(c=t[l])&&(e=(n<3?c(e):n>3?c(i,r,e):c(i,r))||e);return n>3&&e&&Object.defineProperty(i,r,e),e};const L={add:async()=>(await a(async()=>{const{addSvg:t}=await import("./add-CWOhsWOh.js");return{addSvg:t}},__vite__mapDeps([0,1,2]))).addSvg,allWallets:async()=>(await a(async()=>{const{allWalletsSvg:t}=await import("./all-wallets-BYiECQfp.js");return{allWalletsSvg:t}},__vite__mapDeps([3,1,2]))).allWalletsSvg,arrowBottomCircle:async()=>(await a(async()=>{const{arrowBottomCircleSvg:t}=await import("./arrow-bottom-circle-_DYr85Z1.js");return{arrowBottomCircleSvg:t}},__vite__mapDeps([4,1,2]))).arrowBottomCircleSvg,appStore:async()=>(await a(async()=>{const{appStoreSvg:t}=await import("./app-store-PC0mVCLp.js");return{appStoreSvg:t}},__vite__mapDeps([5,1,2]))).appStoreSvg,apple:async()=>(await a(async()=>{const{appleSvg:t}=await import("./apple-CDqL-07b.js");return{appleSvg:t}},__vite__mapDeps([6,1,2]))).appleSvg,arrowBottom:async()=>(await a(async()=>{const{arrowBottomSvg:t}=await import("./arrow-bottom-ClnILD34.js");return{arrowBottomSvg:t}},__vite__mapDeps([7,1,2]))).arrowBottomSvg,arrowLeft:async()=>(await a(async()=>{const{arrowLeftSvg:t}=await import("./arrow-left-Bf_6jZAl.js");return{arrowLeftSvg:t}},__vite__mapDeps([8,1,2]))).arrowLeftSvg,arrowRight:async()=>(await a(async()=>{const{arrowRightSvg:t}=await import("./arrow-right-5euO5cOp.js");return{arrowRightSvg:t}},__vite__mapDeps([9,1,2]))).arrowRightSvg,arrowTop:async()=>(await a(async()=>{const{arrowTopSvg:t}=await import("./arrow-top-T5Gb08MD.js");return{arrowTopSvg:t}},__vite__mapDeps([10,1,2]))).arrowTopSvg,bank:async()=>(await a(async()=>{const{bankSvg:t}=await import("./bank-DIevKsiw.js");return{bankSvg:t}},__vite__mapDeps([11,1,2]))).bankSvg,browser:async()=>(await a(async()=>{const{browserSvg:t}=await import("./browser-Cx4F2JUY.js");return{browserSvg:t}},__vite__mapDeps([12,1,2]))).browserSvg,bin:async()=>(await a(async()=>{const{binSvg:t}=await import("./bin-CTs2FnJI.js");return{binSvg:t}},__vite__mapDeps([13,1,2]))).binSvg,bitcoin:async()=>(await a(async()=>{const{bitcoinSvg:t}=await import("./bitcoin-BP0LRXJv.js");return{bitcoinSvg:t}},__vite__mapDeps([14,1,2]))).bitcoinSvg,card:async()=>(await a(async()=>{const{cardSvg:t}=await import("./card-CSd3oZNs.js");return{cardSvg:t}},__vite__mapDeps([15,1,2]))).cardSvg,checkmark:async()=>(await a(async()=>{const{checkmarkSvg:t}=await import("./checkmark-CzWbXZdr.js");return{checkmarkSvg:t}},__vite__mapDeps([16,1,2]))).checkmarkSvg,checkmarkBold:async()=>(await a(async()=>{const{checkmarkBoldSvg:t}=await import("./checkmark-bold-Bqt6vQ1E.js");return{checkmarkBoldSvg:t}},__vite__mapDeps([17,1,2]))).checkmarkBoldSvg,chevronBottom:async()=>(await a(async()=>{const{chevronBottomSvg:t}=await import("./chevron-bottom-BDjRXw9n.js");return{chevronBottomSvg:t}},__vite__mapDeps([18,1,2]))).chevronBottomSvg,chevronLeft:async()=>(await a(async()=>{const{chevronLeftSvg:t}=await import("./chevron-left-BPcC7SW-.js");return{chevronLeftSvg:t}},__vite__mapDeps([19,1,2]))).chevronLeftSvg,chevronRight:async()=>(await a(async()=>{const{chevronRightSvg:t}=await import("./chevron-right-VyBZ0_Vh.js");return{chevronRightSvg:t}},__vite__mapDeps([20,1,2]))).chevronRightSvg,chevronTop:async()=>(await a(async()=>{const{chevronTopSvg:t}=await import("./chevron-top-DP5S4jmv.js");return{chevronTopSvg:t}},__vite__mapDeps([21,1,2]))).chevronTopSvg,chromeStore:async()=>(await a(async()=>{const{chromeStoreSvg:t}=await import("./chrome-store-EjiDs2HY.js");return{chromeStoreSvg:t}},__vite__mapDeps([22,1,2]))).chromeStoreSvg,clock:async()=>(await a(async()=>{const{clockSvg:t}=await import("./clock-C6dZyhfg.js");return{clockSvg:t}},__vite__mapDeps([23,1,2]))).clockSvg,close:async()=>(await a(async()=>{const{closeSvg:t}=await import("./close-B2VEz-8l.js");return{closeSvg:t}},__vite__mapDeps([24,1,2]))).closeSvg,compass:async()=>(await a(async()=>{const{compassSvg:t}=await import("./compass-DALLNCuK.js");return{compassSvg:t}},__vite__mapDeps([25,1,2]))).compassSvg,coinPlaceholder:async()=>(await a(async()=>{const{coinPlaceholderSvg:t}=await import("./coinPlaceholder-Dlo97En_.js");return{coinPlaceholderSvg:t}},__vite__mapDeps([26,1,2]))).coinPlaceholderSvg,copy:async()=>(await a(async()=>{const{copySvg:t}=await import("./copy-upDBHAXc.js");return{copySvg:t}},__vite__mapDeps([27,1,2]))).copySvg,cursor:async()=>(await a(async()=>{const{cursorSvg:t}=await import("./cursor-C1N0Ymu8.js");return{cursorSvg:t}},__vite__mapDeps([28,1,2]))).cursorSvg,cursorTransparent:async()=>(await a(async()=>{const{cursorTransparentSvg:t}=await import("./cursor-transparent-BpKTP0dg.js");return{cursorTransparentSvg:t}},__vite__mapDeps([29,1,2]))).cursorTransparentSvg,circle:async()=>(await a(async()=>{const{circleSvg:t}=await import("./circle-B7wD_D3k.js");return{circleSvg:t}},__vite__mapDeps([30,1,2]))).circleSvg,desktop:async()=>(await a(async()=>{const{desktopSvg:t}=await import("./desktop-CqFA5Zu0.js");return{desktopSvg:t}},__vite__mapDeps([31,1,2]))).desktopSvg,disconnect:async()=>(await a(async()=>{const{disconnectSvg:t}=await import("./disconnect-Bmmw0YEA.js");return{disconnectSvg:t}},__vite__mapDeps([32,1,2]))).disconnectSvg,discord:async()=>(await a(async()=>{const{discordSvg:t}=await import("./discord-CEVTfyYn.js");return{discordSvg:t}},__vite__mapDeps([33,1,2]))).discordSvg,ethereum:async()=>(await a(async()=>{const{ethereumSvg:t}=await import("./ethereum-QPOMZaoL.js");return{ethereumSvg:t}},__vite__mapDeps([34,1,2]))).ethereumSvg,etherscan:async()=>(await a(async()=>{const{etherscanSvg:t}=await import("./etherscan-KobZa6sw.js");return{etherscanSvg:t}},__vite__mapDeps([35,1,2]))).etherscanSvg,extension:async()=>(await a(async()=>{const{extensionSvg:t}=await import("./extension-C1qC9GmG.js");return{extensionSvg:t}},__vite__mapDeps([36,1,2]))).extensionSvg,externalLink:async()=>(await a(async()=>{const{externalLinkSvg:t}=await import("./external-link-DUMDrqpq.js");return{externalLinkSvg:t}},__vite__mapDeps([37,1,2]))).externalLinkSvg,facebook:async()=>(await a(async()=>{const{facebookSvg:t}=await import("./facebook-Rw6Ylgs2.js");return{facebookSvg:t}},__vite__mapDeps([38,1,2]))).facebookSvg,farcaster:async()=>(await a(async()=>{const{farcasterSvg:t}=await import("./farcaster-M4uk9p3d.js");return{farcasterSvg:t}},__vite__mapDeps([39,1,2]))).farcasterSvg,filters:async()=>(await a(async()=>{const{filtersSvg:t}=await import("./filters-BokT9TEo.js");return{filtersSvg:t}},__vite__mapDeps([40,1,2]))).filtersSvg,github:async()=>(await a(async()=>{const{githubSvg:t}=await import("./github-DtJF544r.js");return{githubSvg:t}},__vite__mapDeps([41,1,2]))).githubSvg,google:async()=>(await a(async()=>{const{googleSvg:t}=await import("./google-C6jllk5B.js");return{googleSvg:t}},__vite__mapDeps([42,1,2]))).googleSvg,helpCircle:async()=>(await a(async()=>{const{helpCircleSvg:t}=await import("./help-circle-CrGMT8y9.js");return{helpCircleSvg:t}},__vite__mapDeps([43,1,2]))).helpCircleSvg,image:async()=>(await a(async()=>{const{imageSvg:t}=await import("./image-D_Nc0EzU.js");return{imageSvg:t}},__vite__mapDeps([44,1,2]))).imageSvg,id:async()=>(await a(async()=>{const{idSvg:t}=await import("./id-a7ZOOE8V.js");return{idSvg:t}},__vite__mapDeps([45,1,2]))).idSvg,infoCircle:async()=>(await a(async()=>{const{infoCircleSvg:t}=await import("./info-circle-Cyo8CfbF.js");return{infoCircleSvg:t}},__vite__mapDeps([46,1,2]))).infoCircleSvg,lightbulb:async()=>(await a(async()=>{const{lightbulbSvg:t}=await import("./lightbulb-DwJqEey4.js");return{lightbulbSvg:t}},__vite__mapDeps([47,1,2]))).lightbulbSvg,mail:async()=>(await a(async()=>{const{mailSvg:t}=await import("./mail-TGgom9Ij.js");return{mailSvg:t}},__vite__mapDeps([48,1,2]))).mailSvg,mobile:async()=>(await a(async()=>{const{mobileSvg:t}=await import("./mobile-JpJ-X1qO.js");return{mobileSvg:t}},__vite__mapDeps([49,1,2]))).mobileSvg,more:async()=>(await a(async()=>{const{moreSvg:t}=await import("./more-XwuWWxK-.js");return{moreSvg:t}},__vite__mapDeps([50,1,2]))).moreSvg,networkPlaceholder:async()=>(await a(async()=>{const{networkPlaceholderSvg:t}=await import("./network-placeholder-B5dk4ebI.js");return{networkPlaceholderSvg:t}},__vite__mapDeps([51,1,2]))).networkPlaceholderSvg,nftPlaceholder:async()=>(await a(async()=>{const{nftPlaceholderSvg:t}=await import("./nftPlaceholder-BMf83JMF.js");return{nftPlaceholderSvg:t}},__vite__mapDeps([52,1,2]))).nftPlaceholderSvg,off:async()=>(await a(async()=>{const{offSvg:t}=await import("./off-CMqgZw5B.js");return{offSvg:t}},__vite__mapDeps([53,1,2]))).offSvg,playStore:async()=>(await a(async()=>{const{playStoreSvg:t}=await import("./play-store-DBKqwFLe.js");return{playStoreSvg:t}},__vite__mapDeps([54,1,2]))).playStoreSvg,plus:async()=>(await a(async()=>{const{plusSvg:t}=await import("./plus-D_mg1URn.js");return{plusSvg:t}},__vite__mapDeps([55,1,2]))).plusSvg,qrCode:async()=>(await a(async()=>{const{qrCodeIcon:t}=await import("./qr-code-DtgdTowd.js");return{qrCodeIcon:t}},__vite__mapDeps([56,1,2]))).qrCodeIcon,recycleHorizontal:async()=>(await a(async()=>{const{recycleHorizontalSvg:t}=await import("./recycle-horizontal-obogm2C2.js");return{recycleHorizontalSvg:t}},__vite__mapDeps([57,1,2]))).recycleHorizontalSvg,refresh:async()=>(await a(async()=>{const{refreshSvg:t}=await import("./refresh-DzolfOuf.js");return{refreshSvg:t}},__vite__mapDeps([58,1,2]))).refreshSvg,search:async()=>(await a(async()=>{const{searchSvg:t}=await import("./search-BfQAcFkz.js");return{searchSvg:t}},__vite__mapDeps([59,1,2]))).searchSvg,send:async()=>(await a(async()=>{const{sendSvg:t}=await import("./send-DXWa9wgt.js");return{sendSvg:t}},__vite__mapDeps([60,1,2]))).sendSvg,swapHorizontal:async()=>(await a(async()=>{const{swapHorizontalSvg:t}=await import("./swapHorizontal-drbrERm5.js");return{swapHorizontalSvg:t}},__vite__mapDeps([61,1,2]))).swapHorizontalSvg,swapHorizontalMedium:async()=>(await a(async()=>{const{swapHorizontalMediumSvg:t}=await import("./swapHorizontalMedium-atQK1iEX.js");return{swapHorizontalMediumSvg:t}},__vite__mapDeps([62,1,2]))).swapHorizontalMediumSvg,swapHorizontalBold:async()=>(await a(async()=>{const{swapHorizontalBoldSvg:t}=await import("./swapHorizontalBold-D4mdCScC.js");return{swapHorizontalBoldSvg:t}},__vite__mapDeps([63,1,2]))).swapHorizontalBoldSvg,swapHorizontalRoundedBold:async()=>(await a(async()=>{const{swapHorizontalRoundedBoldSvg:t}=await import("./swapHorizontalRoundedBold-C8fNzdE2.js");return{swapHorizontalRoundedBoldSvg:t}},__vite__mapDeps([64,1,2]))).swapHorizontalRoundedBoldSvg,swapVertical:async()=>(await a(async()=>{const{swapVerticalSvg:t}=await import("./swapVertical-DutZRV5o.js");return{swapVerticalSvg:t}},__vite__mapDeps([65,1,2]))).swapVerticalSvg,solana:async()=>(await a(async()=>{const{solanaSvg:t}=await import("./solana-Drm9QXiY.js");return{solanaSvg:t}},__vite__mapDeps([66,1,2]))).solanaSvg,telegram:async()=>(await a(async()=>{const{telegramSvg:t}=await import("./telegram-DhfY7RMC.js");return{telegramSvg:t}},__vite__mapDeps([67,1,2]))).telegramSvg,threeDots:async()=>(await a(async()=>{const{threeDotsSvg:t}=await import("./three-dots-C1vDpj9-.js");return{threeDotsSvg:t}},__vite__mapDeps([68,1,2]))).threeDotsSvg,twitch:async()=>(await a(async()=>{const{twitchSvg:t}=await import("./twitch-Cll7qX1G.js");return{twitchSvg:t}},__vite__mapDeps([69,1,2]))).twitchSvg,twitter:async()=>(await a(async()=>{const{xSvg:t}=await import("./x-CL4-rCmo.js");return{xSvg:t}},__vite__mapDeps([70,1,2]))).xSvg,twitterIcon:async()=>(await a(async()=>{const{twitterIconSvg:t}=await import("./twitterIcon-7q8Q-nQ8.js");return{twitterIconSvg:t}},__vite__mapDeps([71,1,2]))).twitterIconSvg,user:async()=>(await a(async()=>{const{userSvg:t}=await import("./user-DVpawSaa.js");return{userSvg:t}},__vite__mapDeps([72,1,2]))).userSvg,verify:async()=>(await a(async()=>{const{verifySvg:t}=await import("./verify-DdVSFZxt.js");return{verifySvg:t}},__vite__mapDeps([73,1,2]))).verifySvg,verifyFilled:async()=>(await a(async()=>{const{verifyFilledSvg:t}=await import("./verify-filled-BsXtiY5d.js");return{verifyFilledSvg:t}},__vite__mapDeps([74,1,2]))).verifyFilledSvg,wallet:async()=>(await a(async()=>{const{walletSvg:t}=await import("./wallet--5P6NFRS.js");return{walletSvg:t}},__vite__mapDeps([75,1,2]))).walletSvg,walletConnect:async()=>(await a(async()=>{const{walletConnectSvg:t}=await import("./walletconnect-CzLZpcIw.js");return{walletConnectSvg:t}},__vite__mapDeps([76,1,2]))).walletConnectSvg,walletConnectLightBrown:async()=>(await a(async()=>{const{walletConnectLightBrownSvg:t}=await import("./walletconnect-CzLZpcIw.js");return{walletConnectLightBrownSvg:t}},__vite__mapDeps([76,1,2]))).walletConnectLightBrownSvg,walletConnectBrown:async()=>(await a(async()=>{const{walletConnectBrownSvg:t}=await import("./walletconnect-CzLZpcIw.js");return{walletConnectBrownSvg:t}},__vite__mapDeps([76,1,2]))).walletConnectBrownSvg,walletPlaceholder:async()=>(await a(async()=>{const{walletPlaceholderSvg:t}=await import("./wallet-placeholder-BL4eaLHN.js");return{walletPlaceholderSvg:t}},__vite__mapDeps([77,1,2]))).walletPlaceholderSvg,warningCircle:async()=>(await a(async()=>{const{warningCircleSvg:t}=await import("./warning-circle-wz4QIBxd.js");return{warningCircleSvg:t}},__vite__mapDeps([78,1,2]))).warningCircleSvg,x:async()=>(await a(async()=>{const{xSvg:t}=await import("./x-CL4-rCmo.js");return{xSvg:t}},__vite__mapDeps([70,1,2]))).xSvg,info:async()=>(await a(async()=>{const{infoSvg:t}=await import("./info-BQ-StQm3.js");return{infoSvg:t}},__vite__mapDeps([79,1,2]))).infoSvg,exclamationTriangle:async()=>(await a(async()=>{const{exclamationTriangleSvg:t}=await import("./exclamation-triangle-v_IUM_vT.js");return{exclamationTriangleSvg:t}},__vite__mapDeps([80,1,2]))).exclamationTriangleSvg,reown:async()=>(await a(async()=>{const{reownSvg:t}=await import("./reown-logo-Do1WD-We.js");return{reownSvg:t}},__vite__mapDeps([81,1,2]))).reownSvg,"x-mark":async()=>(await a(async()=>{const{xMarkSvg:t}=await import("./x-mark-C1UPhsim.js");return{xMarkSvg:t}},__vite__mapDeps([82,1,2]))).xMarkSvg};async function $(t){if(S.has(t))return S.get(t);const r=(L[t]??L.copy)();return S.set(t,r),r}let v=class extends R{constructor(){super(...arguments),this.size="md",this.name="copy",this.color="fg-300",this.aspectRatio="1 / 1"}render(){return this.style.cssText=`
      --local-color: ${`var(--wui-color-${this.color});`}
      --local-width: ${`var(--wui-icon-size-${this.size});`}
      --local-aspect-ratio: ${this.aspectRatio}
    `,y`${I($(this.name),y`<div class="fallback"></div>`)}`}};v.styles=[T,O,x];d([s()],v.prototype,"size",void 0);d([s()],v.prototype,"name",void 0);d([s()],v.prototype,"color",void 0);d([s()],v.prototype,"aspectRatio",void 0);v=d([P("wui-icon")],v);const C=E`
  :host {
    display: inline-flex !important;
  }

  slot {
    width: 100%;
    display: inline-block;
    font-style: normal;
    font-family: var(--wui-font-family);
    font-feature-settings:
      'tnum' on,
      'lnum' on,
      'case' on;
    line-height: 130%;
    font-weight: var(--wui-font-weight-regular);
    overflow: inherit;
    text-overflow: inherit;
    text-align: var(--local-align);
    color: var(--local-color);
  }

  .wui-line-clamp-1 {
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
  }

  .wui-line-clamp-2 {
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }

  .wui-font-medium-400 {
    font-size: var(--wui-font-size-medium);
    font-weight: var(--wui-font-weight-light);
    letter-spacing: var(--wui-letter-spacing-medium);
  }

  .wui-font-medium-600 {
    font-size: var(--wui-font-size-medium);
    letter-spacing: var(--wui-letter-spacing-medium);
  }

  .wui-font-title-600 {
    font-size: var(--wui-font-size-title);
    letter-spacing: var(--wui-letter-spacing-title);
  }

  .wui-font-title-6-600 {
    font-size: var(--wui-font-size-title-6);
    letter-spacing: var(--wui-letter-spacing-title-6);
  }

  .wui-font-mini-700 {
    font-size: var(--wui-font-size-mini);
    letter-spacing: var(--wui-letter-spacing-mini);
    text-transform: uppercase;
  }

  .wui-font-large-500,
  .wui-font-large-600,
  .wui-font-large-700 {
    font-size: var(--wui-font-size-large);
    letter-spacing: var(--wui-letter-spacing-large);
  }

  .wui-font-2xl-500,
  .wui-font-2xl-600,
  .wui-font-2xl-700 {
    font-size: var(--wui-font-size-2xl);
    letter-spacing: var(--wui-letter-spacing-2xl);
  }

  .wui-font-paragraph-400,
  .wui-font-paragraph-500,
  .wui-font-paragraph-600,
  .wui-font-paragraph-700 {
    font-size: var(--wui-font-size-paragraph);
    letter-spacing: var(--wui-letter-spacing-paragraph);
  }

  .wui-font-small-400,
  .wui-font-small-500,
  .wui-font-small-600 {
    font-size: var(--wui-font-size-small);
    letter-spacing: var(--wui-letter-spacing-small);
  }

  .wui-font-tiny-400,
  .wui-font-tiny-500,
  .wui-font-tiny-600 {
    font-size: var(--wui-font-size-tiny);
    letter-spacing: var(--wui-letter-spacing-tiny);
  }

  .wui-font-micro-700,
  .wui-font-micro-600,
  .wui-font-micro-500 {
    font-size: var(--wui-font-size-micro);
    letter-spacing: var(--wui-letter-spacing-micro);
    text-transform: uppercase;
  }

  .wui-font-tiny-400,
  .wui-font-small-400,
  .wui-font-medium-400,
  .wui-font-paragraph-400 {
    font-weight: var(--wui-font-weight-light);
  }

  .wui-font-large-700,
  .wui-font-paragraph-700,
  .wui-font-micro-700,
  .wui-font-mini-700 {
    font-weight: var(--wui-font-weight-bold);
  }

  .wui-font-medium-600,
  .wui-font-medium-title-600,
  .wui-font-title-6-600,
  .wui-font-large-600,
  .wui-font-paragraph-600,
  .wui-font-small-600,
  .wui-font-tiny-600,
  .wui-font-micro-600 {
    font-weight: var(--wui-font-weight-medium);
  }

  :host([disabled]) {
    opacity: 0.4;
  }
`;var m=function(t,i,r,o){var n=arguments.length,e=n<3?i:o===null?o=Object.getOwnPropertyDescriptor(i,r):o,c;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")e=Reflect.decorate(t,i,r,o);else for(var l=t.length-1;l>=0;l--)(c=t[l])&&(e=(n<3?c(e):n>3?c(i,r,e):c(i,r))||e);return n>3&&e&&Object.defineProperty(i,r,e),e};let g=class extends R{constructor(){super(...arguments),this.variant="paragraph-500",this.color="fg-300",this.align="left",this.lineClamp=void 0}render(){const i={[`wui-font-${this.variant}`]:!0,[`wui-color-${this.color}`]:!0,[`wui-line-clamp-${this.lineClamp}`]:!!this.lineClamp};return this.style.cssText=`
      --local-align: ${this.align};
      --local-color: var(--wui-color-${this.color});
    `,y`<slot class=${D(i)}></slot>`}};g.styles=[T,C];m([s()],g.prototype,"variant",void 0);m([s()],g.prototype,"color",void 0);m([s()],g.prototype,"align",void 0);m([s()],g.prototype,"lineClamp",void 0);g=m([P("wui-text")],g);const z=E`
  :host {
    display: flex;
    width: inherit;
    height: inherit;
  }
`;var u=function(t,i,r,o){var n=arguments.length,e=n<3?i:o===null?o=Object.getOwnPropertyDescriptor(i,r):o,c;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")e=Reflect.decorate(t,i,r,o);else for(var l=t.length-1;l>=0;l--)(c=t[l])&&(e=(n<3?c(e):n>3?c(i,r,e):c(i,r))||e);return n>3&&e&&Object.defineProperty(i,r,e),e};let _=class extends R{render(){return this.style.cssText=`
      flex-direction: ${this.flexDirection};
      flex-wrap: ${this.flexWrap};
      flex-basis: ${this.flexBasis};
      flex-grow: ${this.flexGrow};
      flex-shrink: ${this.flexShrink};
      align-items: ${this.alignItems};
      justify-content: ${this.justifyContent};
      column-gap: ${this.columnGap&&`var(--wui-spacing-${this.columnGap})`};
      row-gap: ${this.rowGap&&`var(--wui-spacing-${this.rowGap})`};
      gap: ${this.gap&&`var(--wui-spacing-${this.gap})`};
      padding-top: ${this.padding&&w.getSpacingStyles(this.padding,0)};
      padding-right: ${this.padding&&w.getSpacingStyles(this.padding,1)};
      padding-bottom: ${this.padding&&w.getSpacingStyles(this.padding,2)};
      padding-left: ${this.padding&&w.getSpacingStyles(this.padding,3)};
      margin-top: ${this.margin&&w.getSpacingStyles(this.margin,0)};
      margin-right: ${this.margin&&w.getSpacingStyles(this.margin,1)};
      margin-bottom: ${this.margin&&w.getSpacingStyles(this.margin,2)};
      margin-left: ${this.margin&&w.getSpacingStyles(this.margin,3)};
    `,y`<slot></slot>`}};_.styles=[T,z];u([s()],_.prototype,"flexDirection",void 0);u([s()],_.prototype,"flexWrap",void 0);u([s()],_.prototype,"flexBasis",void 0);u([s()],_.prototype,"flexGrow",void 0);u([s()],_.prototype,"flexShrink",void 0);u([s()],_.prototype,"alignItems",void 0);u([s()],_.prototype,"justifyContent",void 0);u([s()],_.prototype,"columnGap",void 0);u([s()],_.prototype,"rowGap",void 0);u([s()],_.prototype,"gap",void 0);u([s()],_.prototype,"padding",void 0);u([s()],_.prototype,"margin",void 0);_=u([P("wui-flex")],_);export{w as U,P as c};
