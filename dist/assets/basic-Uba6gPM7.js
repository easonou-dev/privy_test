import{i as N,a as O,x as c,b as Ne}from"./lit-element-CQT_gvNE.js";import{n as u,o as W,r as I,a as wn}from"./class-map-BUQwRYdT.js";import{j as G,h as q,q as M,x as D,O as ee,z as j,E as te,R as U,D as Me,m as K,F as k,G as pt,B as bn,W as ft,C as Jt,n as wi,T as Qt,v as Xe,M as Qi,I as Xi,i as mn}from"./core-BHg-_mPT.js";import{c as T,U as he}from"./index-Gs568PQj.js";import{A as vn,z as yn}from"./index-C4XRDiHp.js";import{r as xn}from"./index-D_sE5vDe.js";import{e as ni,n as oi}from"./ref-BAUA0BIo.js";const Cn=N`
  :host {
    position: relative;
    background-color: var(--wui-color-gray-glass-002);
    display: flex;
    justify-content: center;
    align-items: center;
    width: var(--local-size);
    height: var(--local-size);
    border-radius: inherit;
    border-radius: var(--local-border-radius);
  }

  :host > wui-flex {
    overflow: hidden;
    border-radius: inherit;
    border-radius: var(--local-border-radius);
  }

  :host::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    border-radius: inherit;
    border: 1px solid var(--wui-color-gray-glass-010);
    pointer-events: none;
  }

  :host([name='Extension'])::after {
    border: 1px solid var(--wui-color-accent-glass-010);
  }

  :host([data-wallet-icon='allWallets']) {
    background-color: var(--wui-all-wallets-bg-100);
  }

  :host([data-wallet-icon='allWallets'])::after {
    border: 1px solid var(--wui-color-accent-glass-010);
  }

  wui-icon[data-parent-size='inherit'] {
    width: 75%;
    height: 75%;
    align-items: center;
  }

  wui-icon[data-parent-size='sm'] {
    width: 18px;
    height: 18px;
  }

  wui-icon[data-parent-size='md'] {
    width: 24px;
    height: 24px;
  }

  wui-icon[data-parent-size='lg'] {
    width: 42px;
    height: 42px;
  }

  wui-icon[data-parent-size='full'] {
    width: 100%;
    height: 100%;
  }

  :host > wui-icon-box {
    position: absolute;
    overflow: hidden;
    right: -1px;
    bottom: -2px;
    z-index: 1;
    border: 2px solid var(--wui-color-bg-150, #1e1f1f);
    padding: 1px;
  }
`;var Ie=function(a,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,r;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(a,e,i,n);else for(var s=a.length-1;s>=0;s--)(r=a[s])&&(t=(o<3?r(t):o>3?r(e,i,t):r(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let pe=class extends O{constructor(){super(...arguments),this.size="md",this.name="",this.installed=!1,this.badgeSize="xs"}render(){let e="xxs";return this.size==="lg"?e="m":this.size==="md"?e="xs":e="xxs",this.style.cssText=`
       --local-border-radius: var(--wui-border-radius-${e});
       --local-size: var(--wui-wallet-image-size-${this.size});
   `,this.walletIcon&&(this.dataset.walletIcon=this.walletIcon),c`
      <wui-flex justifyContent="center" alignItems="center"> ${this.templateVisual()} </wui-flex>
    `}templateVisual(){return this.imageSrc?c`<wui-image src=${this.imageSrc} alt=${this.name}></wui-image>`:this.walletIcon?c`<wui-icon
        data-parent-size="md"
        size="md"
        color="inherit"
        name=${this.walletIcon}
      ></wui-icon>`:c`<wui-icon
      data-parent-size=${this.size}
      size="inherit"
      color="inherit"
      name="walletPlaceholder"
    ></wui-icon>`}};pe.styles=[G,q,Cn];Ie([u()],pe.prototype,"size",void 0);Ie([u()],pe.prototype,"name",void 0);Ie([u()],pe.prototype,"imageSrc",void 0);Ie([u()],pe.prototype,"walletIcon",void 0);Ie([u({type:Boolean})],pe.prototype,"installed",void 0);Ie([u()],pe.prototype,"badgeSize",void 0);pe=Ie([T("wui-wallet-image")],pe);const $n=N`
  :host {
    position: relative;
    border-radius: var(--wui-border-radius-xxs);
    width: 40px;
    height: 40px;
    overflow: hidden;
    background: var(--wui-color-gray-glass-002);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: var(--wui-spacing-4xs);
    padding: 3.75px !important;
  }

  :host::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    border-radius: inherit;
    border: 1px solid var(--wui-color-gray-glass-010);
    pointer-events: none;
  }

  :host > wui-wallet-image {
    width: 14px;
    height: 14px;
    border-radius: var(--wui-border-radius-5xs);
  }

  :host > wui-flex {
    padding: 2px;
    position: fixed;
    overflow: hidden;
    left: 34px;
    bottom: 8px;
    background: var(--dark-background-150, #1e1f1f);
    border-radius: 50%;
    z-index: 2;
    display: flex;
  }
`;var Zi=function(a,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,r;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(a,e,i,n);else for(var s=a.length-1;s>=0;s--)(r=a[s])&&(t=(o<3?r(t):o>3?r(e,i,t):r(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};const Et=4;let Ze=class extends O{constructor(){super(...arguments),this.walletImages=[]}render(){const e=this.walletImages.length<Et;return c`${this.walletImages.slice(0,Et).map(({src:i,walletName:n})=>c`
            <wui-wallet-image
              size="inherit"
              imageSrc=${i}
              name=${W(n)}
            ></wui-wallet-image>
          `)}
      ${e?[...Array(Et-this.walletImages.length)].map(()=>c` <wui-wallet-image size="inherit" name=""></wui-wallet-image>`):null}
      <wui-flex>
        <wui-icon-box
          size="xxs"
          iconSize="xxs"
          iconcolor="success-100"
          backgroundcolor="success-100"
          icon="checkmark"
          background="opaque"
        ></wui-icon-box>
      </wui-flex>`}};Ze.styles=[q,$n];Zi([u({type:Array})],Ze.prototype,"walletImages",void 0);Ze=Zi([T("wui-all-wallets-image")],Ze);const Rn=N`
  button {
    column-gap: var(--wui-spacing-s);
    padding: 7px var(--wui-spacing-l) 7px var(--wui-spacing-xs);
    width: 100%;
    background-color: var(--wui-color-gray-glass-002);
    border-radius: var(--wui-border-radius-xs);
    color: var(--wui-color-fg-100);
  }

  button > wui-text:nth-child(2) {
    display: flex;
    flex: 1;
  }

  button:disabled {
    background-color: var(--wui-color-gray-glass-015);
    color: var(--wui-color-gray-glass-015);
  }

  button:disabled > wui-tag {
    background-color: var(--wui-color-gray-glass-010);
    color: var(--wui-color-fg-300);
  }

  wui-icon {
    color: var(--wui-color-fg-200) !important;
  }
`;var Y=function(a,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,r;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(a,e,i,n);else for(var s=a.length-1;s>=0;s--)(r=a[s])&&(t=(o<3?r(t):o>3?r(e,i,t):r(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let V=class extends O{constructor(){super(...arguments),this.walletImages=[],this.imageSrc="",this.name="",this.tabIdx=void 0,this.installed=!1,this.disabled=!1,this.showAllWallets=!1,this.loading=!1,this.loadingSpinnerColor="accent-100"}render(){return c`
      <button ?disabled=${this.disabled} tabindex=${W(this.tabIdx)}>
        ${this.templateAllWallets()} ${this.templateWalletImage()}
        <wui-text variant="paragraph-500" color="inherit">${this.name}</wui-text>
        ${this.templateStatus()}
      </button>
    `}templateAllWallets(){return this.showAllWallets&&this.imageSrc?c` <wui-all-wallets-image .imageeSrc=${this.imageSrc}> </wui-all-wallets-image> `:this.showAllWallets&&this.walletIcon?c` <wui-wallet-image .walletIcon=${this.walletIcon} size="sm"> </wui-wallet-image> `:null}templateWalletImage(){return!this.showAllWallets&&this.imageSrc?c`<wui-wallet-image
        size="sm"
        imageSrc=${this.imageSrc}
        name=${this.name}
        .installed=${this.installed}
      ></wui-wallet-image>`:!this.showAllWallets&&!this.imageSrc?c`<wui-wallet-image size="sm" name=${this.name}></wui-wallet-image>`:null}templateStatus(){return this.loading?c`<wui-loading-spinner
        size="lg"
        color=${this.loadingSpinnerColor}
      ></wui-loading-spinner>`:this.tagLabel&&this.tagVariant?c`<wui-tag variant=${this.tagVariant}>${this.tagLabel}</wui-tag>`:this.icon?c`<wui-icon color="inherit" size="sm" name=${this.icon}></wui-icon>`:null}};V.styles=[q,G,Rn];Y([u({type:Array})],V.prototype,"walletImages",void 0);Y([u()],V.prototype,"imageSrc",void 0);Y([u()],V.prototype,"name",void 0);Y([u()],V.prototype,"tagLabel",void 0);Y([u()],V.prototype,"tagVariant",void 0);Y([u()],V.prototype,"icon",void 0);Y([u()],V.prototype,"walletIcon",void 0);Y([u()],V.prototype,"tabIdx",void 0);Y([u({type:Boolean})],V.prototype,"installed",void 0);Y([u({type:Boolean})],V.prototype,"disabled",void 0);Y([u({type:Boolean})],V.prototype,"showAllWallets",void 0);Y([u({type:Boolean})],V.prototype,"loading",void 0);Y([u({type:String})],V.prototype,"loadingSpinnerColor",void 0);V=Y([T("wui-list-wallet")],V);var Ae=function(a,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,r;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(a,e,i,n);else for(var s=a.length-1;s>=0;s--)(r=a[s])&&(t=(o<3?r(t):o>3?r(e,i,t):r(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let ye=class extends O{constructor(){super(),this.unsubscribe=[],this.tabIdx=void 0,this.connectors=M.state.connectors,this.count=D.state.count,this.filteredCount=D.state.filteredWallets.length,this.isFetchingRecommendedWallets=D.state.isFetchingRecommendedWallets,this.unsubscribe.push(M.subscribeKey("connectors",e=>this.connectors=e),D.subscribeKey("count",e=>this.count=e),D.subscribeKey("filteredWallets",e=>this.filteredCount=e.length),D.subscribeKey("isFetchingRecommendedWallets",e=>this.isFetchingRecommendedWallets=e))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){const e=this.connectors.find(l=>l.id==="walletConnect"),{allWallets:i}=ee.state;if(!e||i==="HIDE"||i==="ONLY_MOBILE"&&!j.isMobile())return null;const n=D.state.featured.length,o=this.count+n,t=o<10?o:Math.floor(o/10)*10,r=this.filteredCount>0?this.filteredCount:t;let s=`${r}`;return this.filteredCount>0?s=`${this.filteredCount}`:r<o&&(s=`${r}+`),c`
      <wui-list-wallet
        name="All Wallets"
        walletIcon="allWallets"
        showAllWallets
        @click=${this.onAllWallets.bind(this)}
        tagLabel=${s}
        tagVariant="shade"
        data-testid="all-wallets"
        tabIdx=${W(this.tabIdx)}
        .loading=${this.isFetchingRecommendedWallets}
        loadingSpinnerColor=${this.isFetchingRecommendedWallets?"fg-300":"accent-100"}
      ></wui-list-wallet>
    `}onAllWallets(){te.sendEvent({type:"track",event:"CLICK_ALL_WALLETS"}),U.push("AllWallets")}};Ae([u()],ye.prototype,"tabIdx",void 0);Ae([I()],ye.prototype,"connectors",void 0);Ae([I()],ye.prototype,"count",void 0);Ae([I()],ye.prototype,"filteredCount",void 0);Ae([I()],ye.prototype,"isFetchingRecommendedWallets",void 0);ye=Ae([T("w3m-all-wallets-widget")],ye);var ri=function(a,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,r;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(a,e,i,n);else for(var s=a.length-1;s>=0;s--)(r=a[s])&&(t=(o<3?r(t):o>3?r(e,i,t):r(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let et=class extends O{constructor(){super(),this.unsubscribe=[],this.tabIdx=void 0,this.connectors=M.state.connectors,this.unsubscribe.push(M.subscribeKey("connectors",e=>this.connectors=e))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){const e=this.connectors.filter(i=>i.type==="ANNOUNCED");return e!=null&&e.length?c`
      <wui-flex flexDirection="column" gap="xs">
        ${e.filter(Me.showConnector).map(i=>c`
              <wui-list-wallet
                imageSrc=${W(K.getConnectorImage(i))}
                name=${i.name??"Unknown"}
                @click=${()=>this.onConnector(i)}
                tagVariant="success"
                tagLabel="installed"
                data-testid=${`wallet-selector-${i.id}`}
                .installed=${!0}
                tabIdx=${W(this.tabIdx)}
              >
              </wui-list-wallet>
            `)}
      </wui-flex>
    `:(this.style.cssText="display: none",null)}onConnector(e){e.id==="walletConnect"?j.isMobile()?U.push("AllWallets"):U.push("ConnectingWalletConnect"):U.push("ConnectingExternal",{connector:e})}};ri([u()],et.prototype,"tabIdx",void 0);ri([I()],et.prototype,"connectors",void 0);et=ri([T("w3m-connect-announced-widget")],et);var gt=function(a,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,r;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(a,e,i,n);else for(var s=a.length-1;s>=0;s--)(r=a[s])&&(t=(o<3?r(t):o>3?r(e,i,t):r(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let Ue=class extends O{constructor(){super(),this.unsubscribe=[],this.tabIdx=void 0,this.connectors=M.state.connectors,this.loading=!1,this.unsubscribe.push(M.subscribeKey("connectors",e=>this.connectors=e)),j.isTelegram()&&j.isIos()&&(this.loading=!k.state.wcUri,this.unsubscribe.push(k.subscribeKey("wcUri",e=>this.loading=!e)))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){const{customWallets:e}=ee.state;if(!(e!=null&&e.length))return this.style.cssText="display: none",null;const i=this.filterOutDuplicateWallets(e);return c`<wui-flex flexDirection="column" gap="xs">
      ${i.map(n=>c`
          <wui-list-wallet
            imageSrc=${W(K.getWalletImage(n))}
            name=${n.name??"Unknown"}
            @click=${()=>this.onConnectWallet(n)}
            data-testid=${`wallet-selector-${n.id}`}
            tabIdx=${W(this.tabIdx)}
            ?loading=${this.loading}
          >
          </wui-list-wallet>
        `)}
    </wui-flex>`}filterOutDuplicateWallets(e){const i=pt.getRecentWallets(),n=this.connectors.map(s=>{var l;return(l=s.info)==null?void 0:l.rdns}).filter(Boolean),o=i.map(s=>s.rdns).filter(Boolean),t=n.concat(o);if(t.includes("io.metamask.mobile")&&j.isMobile()){const s=t.indexOf("io.metamask.mobile");t[s]="io.metamask"}return e.filter(s=>!t.includes(String(s==null?void 0:s.rdns)))}onConnectWallet(e){this.loading||U.push("ConnectingWalletConnect",{wallet:e})}};gt([u()],Ue.prototype,"tabIdx",void 0);gt([I()],Ue.prototype,"connectors",void 0);gt([I()],Ue.prototype,"loading",void 0);Ue=gt([T("w3m-connect-custom-widget")],Ue);var ai=function(a,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,r;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(a,e,i,n);else for(var s=a.length-1;s>=0;s--)(r=a[s])&&(t=(o<3?r(t):o>3?r(e,i,t):r(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let tt=class extends O{constructor(){super(),this.unsubscribe=[],this.tabIdx=void 0,this.connectors=M.state.connectors,this.unsubscribe.push(M.subscribeKey("connectors",e=>this.connectors=e))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){const n=this.connectors.filter(o=>o.type==="EXTERNAL").filter(Me.showConnector).filter(o=>o.id!==bn.CONNECTOR_ID.COINBASE_SDK);return n!=null&&n.length?c`
      <wui-flex flexDirection="column" gap="xs">
        ${n.map(o=>c`
            <wui-list-wallet
              imageSrc=${W(K.getConnectorImage(o))}
              .installed=${!0}
              name=${o.name??"Unknown"}
              data-testid=${`wallet-selector-external-${o.id}`}
              @click=${()=>this.onConnector(o)}
              tabIdx=${W(this.tabIdx)}
            >
            </wui-list-wallet>
          `)}
      </wui-flex>
    `:(this.style.cssText="display: none",null)}onConnector(e){U.push("ConnectingExternal",{connector:e})}};ai([u()],tt.prototype,"tabIdx",void 0);ai([I()],tt.prototype,"connectors",void 0);tt=ai([T("w3m-connect-external-widget")],tt);var si=function(a,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,r;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(a,e,i,n);else for(var s=a.length-1;s>=0;s--)(r=a[s])&&(t=(o<3?r(t):o>3?r(e,i,t):r(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let it=class extends O{constructor(){super(...arguments),this.tabIdx=void 0,this.wallets=[]}render(){return this.wallets.length?c`
      <wui-flex flexDirection="column" gap="xs">
        ${this.wallets.map(e=>c`
            <wui-list-wallet
              data-testid=${`wallet-selector-featured-${e.id}`}
              imageSrc=${W(K.getWalletImage(e))}
              name=${e.name??"Unknown"}
              @click=${()=>this.onConnectWallet(e)}
              tabIdx=${W(this.tabIdx)}
            >
            </wui-list-wallet>
          `)}
      </wui-flex>
    `:(this.style.cssText="display: none",null)}onConnectWallet(e){M.selectWalletConnector(e)}};si([u()],it.prototype,"tabIdx",void 0);si([u()],it.prototype,"wallets",void 0);it=si([T("w3m-connect-featured-widget")],it);var li=function(a,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,r;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(a,e,i,n);else for(var s=a.length-1;s>=0;s--)(r=a[s])&&(t=(o<3?r(t):o>3?r(e,i,t):r(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let nt=class extends O{constructor(){super(...arguments),this.tabIdx=void 0,this.connectors=[]}render(){const e=this.connectors.filter(Me.showConnector);return e.length===0?(this.style.cssText="display: none",null):c`
      <wui-flex flexDirection="column" gap="xs">
        ${e.map(i=>c`
            <wui-list-wallet
              imageSrc=${W(K.getConnectorImage(i))}
              .installed=${!0}
              name=${i.name??"Unknown"}
              tagVariant="success"
              tagLabel="installed"
              data-testid=${`wallet-selector-${i.id}`}
              @click=${()=>this.onConnector(i)}
              tabIdx=${W(this.tabIdx)}
            >
            </wui-list-wallet>
          `)}
      </wui-flex>
    `}onConnector(e){M.setActiveConnector(e),U.push("ConnectingExternal",{connector:e})}};li([u()],nt.prototype,"tabIdx",void 0);li([u()],nt.prototype,"connectors",void 0);nt=li([T("w3m-connect-injected-widget")],nt);var ci=function(a,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,r;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(a,e,i,n);else for(var s=a.length-1;s>=0;s--)(r=a[s])&&(t=(o<3?r(t):o>3?r(e,i,t):r(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let ot=class extends O{constructor(){super(),this.unsubscribe=[],this.tabIdx=void 0,this.connectors=M.state.connectors,this.unsubscribe.push(M.subscribeKey("connectors",e=>this.connectors=e))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){const e=this.connectors.filter(i=>i.type==="MULTI_CHAIN"&&i.name!=="WalletConnect");return e!=null&&e.length?c`
      <wui-flex flexDirection="column" gap="xs">
        ${e.map(i=>c`
            <wui-list-wallet
              imageSrc=${W(K.getConnectorImage(i))}
              .installed=${!0}
              name=${i.name??"Unknown"}
              tagVariant="shade"
              tagLabel="multichain"
              data-testid=${`wallet-selector-${i.id}`}
              @click=${()=>this.onConnector(i)}
              tabIdx=${W(this.tabIdx)}
            >
            </wui-list-wallet>
          `)}
      </wui-flex>
    `:(this.style.cssText="display: none",null)}onConnector(e){M.setActiveConnector(e),U.push("ConnectingMultiChain")}};ci([u()],ot.prototype,"tabIdx",void 0);ci([I()],ot.prototype,"connectors",void 0);ot=ci([T("w3m-connect-multi-chain-widget")],ot);var wt=function(a,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,r;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(a,e,i,n);else for(var s=a.length-1;s>=0;s--)(r=a[s])&&(t=(o<3?r(t):o>3?r(e,i,t):r(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let qe=class extends O{constructor(){super(),this.unsubscribe=[],this.tabIdx=void 0,this.connectors=M.state.connectors,this.loading=!1,this.unsubscribe.push(M.subscribeKey("connectors",e=>this.connectors=e)),j.isTelegram()&&j.isIos()&&(this.loading=!k.state.wcUri,this.unsubscribe.push(k.subscribeKey("wcUri",e=>this.loading=!e)))}render(){const i=pt.getRecentWallets().filter(n=>!ft.isExcluded(n)).filter(n=>!this.hasWalletConnector(n)).filter(n=>this.isWalletCompatibleWithCurrentChain(n));return i.length?c`
      <wui-flex flexDirection="column" gap="xs">
        ${i.map(n=>c`
            <wui-list-wallet
              imageSrc=${W(K.getWalletImage(n))}
              name=${n.name??"Unknown"}
              @click=${()=>this.onConnectWallet(n)}
              tagLabel="recent"
              tagVariant="shade"
              tabIdx=${W(this.tabIdx)}
              ?loading=${this.loading}
            >
            </wui-list-wallet>
          `)}
      </wui-flex>
    `:(this.style.cssText="display: none",null)}onConnectWallet(e){this.loading||M.selectWalletConnector(e)}hasWalletConnector(e){return this.connectors.some(i=>i.id===e.id||i.name===e.name)}isWalletCompatibleWithCurrentChain(e){const i=Jt.state.activeChain;return i&&e.chains?e.chains.some(n=>{const o=n.split(":")[0];return i===o}):!0}};wt([u()],qe.prototype,"tabIdx",void 0);wt([I()],qe.prototype,"connectors",void 0);wt([I()],qe.prototype,"loading",void 0);qe=wt([T("w3m-connect-recent-widget")],qe);var bt=function(a,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,r;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(a,e,i,n);else for(var s=a.length-1;s>=0;s--)(r=a[s])&&(t=(o<3?r(t):o>3?r(e,i,t):r(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let Ve=class extends O{constructor(){super(),this.unsubscribe=[],this.tabIdx=void 0,this.wallets=[],this.loading=!1,j.isTelegram()&&j.isIos()&&(this.loading=!k.state.wcUri,this.unsubscribe.push(k.subscribeKey("wcUri",e=>this.loading=!e)))}render(){const{connectors:e}=M.state,{customWallets:i,featuredWalletIds:n}=ee.state,o=pt.getRecentWallets(),t=e.find(g=>g.id==="walletConnect"),s=e.filter(g=>g.type==="INJECTED"||g.type==="ANNOUNCED"||g.type==="MULTI_CHAIN").filter(g=>g.name!=="Browser Wallet");if(!t)return null;if(n||i||!this.wallets.length)return this.style.cssText="display: none",null;const l=s.length+o.length,d=Math.max(0,2-l),f=ft.filterOutDuplicateWallets(this.wallets).slice(0,d);return f.length?c`
      <wui-flex flexDirection="column" gap="xs">
        ${f.map(g=>c`
            <wui-list-wallet
              imageSrc=${W(K.getWalletImage(g))}
              name=${(g==null?void 0:g.name)??"Unknown"}
              @click=${()=>this.onConnectWallet(g)}
              tabIdx=${W(this.tabIdx)}
              ?loading=${this.loading}
            >
            </wui-list-wallet>
          `)}
      </wui-flex>
    `:(this.style.cssText="display: none",null)}onConnectWallet(e){if(this.loading)return;const i=M.getConnector(e.id,e.rdns);i?U.push("ConnectingExternal",{connector:i}):U.push("ConnectingWalletConnect",{wallet:e})}};bt([u()],Ve.prototype,"tabIdx",void 0);bt([u()],Ve.prototype,"wallets",void 0);bt([I()],Ve.prototype,"loading",void 0);Ve=bt([T("w3m-connect-recommended-widget")],Ve);var mt=function(a,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,r;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(a,e,i,n);else for(var s=a.length-1;s>=0;s--)(r=a[s])&&(t=(o<3?r(t):o>3?r(e,i,t):r(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let Fe=class extends O{constructor(){super(),this.unsubscribe=[],this.tabIdx=void 0,this.connectors=M.state.connectors,this.connectorImages=wi.state.connectorImages,this.unsubscribe.push(M.subscribeKey("connectors",e=>this.connectors=e),wi.subscribeKey("connectorImages",e=>this.connectorImages=e))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){if(j.isMobile())return this.style.cssText="display: none",null;const e=this.connectors.find(n=>n.id==="walletConnect");if(!e)return this.style.cssText="display: none",null;const i=e.imageUrl||this.connectorImages[(e==null?void 0:e.imageId)??""];return c`
      <wui-list-wallet
        imageSrc=${W(i)}
        name=${e.name??"Unknown"}
        @click=${()=>this.onConnector(e)}
        tagLabel="qr code"
        tagVariant="main"
        tabIdx=${W(this.tabIdx)}
        data-testid="wallet-selector-walletconnect"
      >
      </wui-list-wallet>
    `}onConnector(e){M.setActiveConnector(e),U.push("ConnectingWalletConnect")}};mt([u()],Fe.prototype,"tabIdx",void 0);mt([I()],Fe.prototype,"connectors",void 0);mt([I()],Fe.prototype,"connectorImages",void 0);Fe=mt([T("w3m-connect-walletconnect-widget")],Fe);const In=N`
  :host {
    margin-top: var(--wui-spacing-3xs);
  }
  wui-separator {
    margin: var(--wui-spacing-m) calc(var(--wui-spacing-m) * -1) var(--wui-spacing-xs)
      calc(var(--wui-spacing-m) * -1);
    width: calc(100% + var(--wui-spacing-s) * 2);
  }
`;var Ke=function(a,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,r;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(a,e,i,n);else for(var s=a.length-1;s>=0;s--)(r=a[s])&&(t=(o<3?r(t):o>3?r(e,i,t):r(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let xe=class extends O{constructor(){super(),this.unsubscribe=[],this.tabIdx=void 0,this.connectors=M.state.connectors,this.recommended=D.state.recommended,this.featured=D.state.featured,this.unsubscribe.push(M.subscribeKey("connectors",e=>this.connectors=e),D.subscribeKey("recommended",e=>this.recommended=e),D.subscribeKey("featured",e=>this.featured=e))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){return c`
      <wui-flex flexDirection="column" gap="xs"> ${this.connectorListTemplate()} </wui-flex>
    `}connectorListTemplate(){const{custom:e,recent:i,announced:n,injected:o,multiChain:t,recommended:r,featured:s,external:l}=Me.getConnectorsByType(this.connectors,this.recommended,this.featured);return Me.getConnectorTypeOrder({custom:e,recent:i,announced:n,injected:o,multiChain:t,recommended:r,featured:s,external:l}).map(f=>{switch(f){case"injected":return c`
            ${t.length?c`<w3m-connect-multi-chain-widget
                  tabIdx=${W(this.tabIdx)}
                ></w3m-connect-multi-chain-widget>`:null}
            ${n.length?c`<w3m-connect-announced-widget
                  tabIdx=${W(this.tabIdx)}
                ></w3m-connect-announced-widget>`:null}
            ${o.length?c`<w3m-connect-injected-widget
                  .connectors=${o}
                  tabIdx=${W(this.tabIdx)}
                ></w3m-connect-injected-widget>`:null}
          `;case"walletConnect":return c`<w3m-connect-walletconnect-widget
            tabIdx=${W(this.tabIdx)}
          ></w3m-connect-walletconnect-widget>`;case"recent":return c`<w3m-connect-recent-widget
            tabIdx=${W(this.tabIdx)}
          ></w3m-connect-recent-widget>`;case"featured":return c`<w3m-connect-featured-widget
            .wallets=${s}
            tabIdx=${W(this.tabIdx)}
          ></w3m-connect-featured-widget>`;case"custom":return c`<w3m-connect-custom-widget
            tabIdx=${W(this.tabIdx)}
          ></w3m-connect-custom-widget>`;case"external":return c`<w3m-connect-external-widget
            tabIdx=${W(this.tabIdx)}
          ></w3m-connect-external-widget>`;case"recommended":return c`<w3m-connect-recommended-widget
            .wallets=${r}
            tabIdx=${W(this.tabIdx)}
          ></w3m-connect-recommended-widget>`;default:return console.warn(`Unknown connector type: ${f}`),null}})}};xe.styles=In;Ke([u()],xe.prototype,"tabIdx",void 0);Ke([I()],xe.prototype,"connectors",void 0);Ke([I()],xe.prototype,"recommended",void 0);Ke([I()],xe.prototype,"featured",void 0);xe=Ke([T("w3m-connector-list")],xe);const En=N`
  :host {
    display: inline-flex;
    background-color: var(--wui-color-gray-glass-002);
    border-radius: var(--wui-border-radius-3xl);
    padding: var(--wui-spacing-3xs);
    position: relative;
    height: 36px;
    min-height: 36px;
    overflow: hidden;
  }

  :host::before {
    content: '';
    position: absolute;
    pointer-events: none;
    top: 4px;
    left: 4px;
    display: block;
    width: var(--local-tab-width);
    height: 28px;
    border-radius: var(--wui-border-radius-3xl);
    background-color: var(--wui-color-gray-glass-002);
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-002);
    transform: translateX(calc(var(--local-tab) * var(--local-tab-width)));
    transition: transform var(--wui-ease-out-power-1) var(--wui-duration-md);
    will-change: background-color, opacity;
  }

  :host([data-type='flex'])::before {
    left: 3px;
    transform: translateX(calc((var(--local-tab) * 34px) + (var(--local-tab) * 4px)));
  }

  :host([data-type='flex']) {
    display: flex;
    padding: 0px 0px 0px 12px;
    gap: 4px;
  }

  :host([data-type='flex']) > button > wui-text {
    position: absolute;
    left: 18px;
    opacity: 0;
  }

  button[data-active='true'] > wui-icon,
  button[data-active='true'] > wui-text {
    color: var(--wui-color-fg-100);
  }

  button[data-active='false'] > wui-icon,
  button[data-active='false'] > wui-text {
    color: var(--wui-color-fg-200);
  }

  button[data-active='true']:disabled,
  button[data-active='false']:disabled {
    background-color: transparent;
    opacity: 0.5;
    cursor: not-allowed;
  }

  button[data-active='true']:disabled > wui-text {
    color: var(--wui-color-fg-200);
  }

  button[data-active='false']:disabled > wui-text {
    color: var(--wui-color-fg-300);
  }

  button > wui-icon,
  button > wui-text {
    pointer-events: none;
    transition: color var(--wui-e ase-out-power-1) var(--wui-duration-md);
    will-change: color;
  }

  button {
    width: var(--local-tab-width);
    transition: background-color var(--wui-ease-out-power-1) var(--wui-duration-md);
    will-change: background-color;
  }

  :host([data-type='flex']) > button {
    width: 34px;
    position: relative;
    display: flex;
    justify-content: flex-start;
  }

  button:hover:enabled,
  button:active:enabled {
    background-color: transparent !important;
  }

  button:hover:enabled > wui-icon,
  button:active:enabled > wui-icon {
    transition: all var(--wui-ease-out-power-1) var(--wui-duration-lg);
    color: var(--wui-color-fg-125);
  }

  button:hover:enabled > wui-text,
  button:active:enabled > wui-text {
    transition: all var(--wui-ease-out-power-1) var(--wui-duration-lg);
    color: var(--wui-color-fg-125);
  }

  button {
    border-radius: var(--wui-border-radius-3xl);
  }
`;var ve=function(a,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,r;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(a,e,i,n);else for(var s=a.length-1;s>=0;s--)(r=a[s])&&(t=(o<3?r(t):o>3?r(e,i,t):r(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let re=class extends O{constructor(){super(...arguments),this.tabs=[],this.onTabChange=()=>null,this.buttons=[],this.disabled=!1,this.localTabWidth="100px",this.activeTab=0,this.isDense=!1}render(){return this.isDense=this.tabs.length>3,this.style.cssText=`
      --local-tab: ${this.activeTab};
      --local-tab-width: ${this.localTabWidth};
    `,this.dataset.type=this.isDense?"flex":"block",this.tabs.map((e,i)=>{var o;const n=i===this.activeTab;return c`
        <button
          ?disabled=${this.disabled}
          @click=${()=>this.onTabClick(i)}
          data-active=${n}
          data-testid="tab-${(o=e.label)==null?void 0:o.toLowerCase()}"
        >
          ${this.iconTemplate(e)}
          <wui-text variant="small-600" color="inherit"> ${e.label} </wui-text>
        </button>
      `})}firstUpdated(){this.shadowRoot&&this.isDense&&(this.buttons=[...this.shadowRoot.querySelectorAll("button")],setTimeout(()=>{this.animateTabs(0,!0)},0))}iconTemplate(e){return e.icon?c`<wui-icon size="xs" color="inherit" name=${e.icon}></wui-icon>`:null}onTabClick(e){this.buttons&&this.animateTabs(e,!1),this.activeTab=e,this.onTabChange(e)}animateTabs(e,i){const n=this.buttons[this.activeTab],o=this.buttons[e],t=n==null?void 0:n.querySelector("wui-text"),r=o==null?void 0:o.querySelector("wui-text"),s=o==null?void 0:o.getBoundingClientRect(),l=r==null?void 0:r.getBoundingClientRect();n&&t&&!i&&e!==this.activeTab&&(t.animate([{opacity:0}],{duration:50,easing:"ease",fill:"forwards"}),n.animate([{width:"34px"}],{duration:500,easing:"ease",fill:"forwards"})),o&&s&&l&&r&&(e!==this.activeTab||i)&&(this.localTabWidth=`${Math.round(s.width+l.width)+6}px`,o.animate([{width:`${s.width+l.width}px`}],{duration:i?0:500,fill:"forwards",easing:"ease"}),r.animate([{opacity:1}],{duration:i?0:125,delay:i?0:200,fill:"forwards",easing:"ease"}))}};re.styles=[q,G,En];ve([u({type:Array})],re.prototype,"tabs",void 0);ve([u()],re.prototype,"onTabChange",void 0);ve([u({type:Array})],re.prototype,"buttons",void 0);ve([u({type:Boolean})],re.prototype,"disabled",void 0);ve([u()],re.prototype,"localTabWidth",void 0);ve([I()],re.prototype,"activeTab",void 0);ve([I()],re.prototype,"isDense",void 0);re=ve([T("wui-tabs")],re);var ui=function(a,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,r;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(a,e,i,n);else for(var s=a.length-1;s>=0;s--)(r=a[s])&&(t=(o<3?r(t):o>3?r(e,i,t):r(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let rt=class extends O{constructor(){super(...arguments),this.platformTabs=[],this.unsubscribe=[],this.platforms=[],this.onSelectPlatfrom=void 0}disconnectCallback(){this.unsubscribe.forEach(e=>e())}render(){const e=this.generateTabs();return c`
      <wui-flex justifyContent="center" .padding=${["0","0","l","0"]}>
        <wui-tabs .tabs=${e} .onTabChange=${this.onTabChange.bind(this)}></wui-tabs>
      </wui-flex>
    `}generateTabs(){const e=this.platforms.map(i=>i==="browser"?{label:"Browser",icon:"extension",platform:"browser"}:i==="mobile"?{label:"Mobile",icon:"mobile",platform:"mobile"}:i==="qrcode"?{label:"Mobile",icon:"mobile",platform:"qrcode"}:i==="web"?{label:"Webapp",icon:"browser",platform:"web"}:i==="desktop"?{label:"Desktop",icon:"desktop",platform:"desktop"}:{label:"Browser",icon:"extension",platform:"unsupported"});return this.platformTabs=e.map(({platform:i})=>i),e}onTabChange(e){var n;const i=this.platformTabs[e];i&&((n=this.onSelectPlatfrom)==null||n.call(this,i))}};ui([u({type:Array})],rt.prototype,"platforms",void 0);ui([u()],rt.prototype,"onSelectPlatfrom",void 0);rt=ui([T("w3m-connecting-header")],rt);const Wn=N`
  :host {
    width: var(--local-width);
    position: relative;
  }

  button {
    border: none;
    border-radius: var(--local-border-radius);
    width: var(--local-width);
    white-space: nowrap;
  }

  /* -- Sizes --------------------------------------------------- */
  button[data-size='md'] {
    padding: 8.2px var(--wui-spacing-l) 9px var(--wui-spacing-l);
    height: 36px;
  }

  button[data-size='md'][data-icon-left='true'][data-icon-right='false'] {
    padding: 8.2px var(--wui-spacing-l) 9px var(--wui-spacing-s);
  }

  button[data-size='md'][data-icon-right='true'][data-icon-left='false'] {
    padding: 8.2px var(--wui-spacing-s) 9px var(--wui-spacing-l);
  }

  button[data-size='lg'] {
    padding: var(--wui-spacing-m) var(--wui-spacing-2l);
    height: 48px;
  }

  /* -- Variants --------------------------------------------------------- */
  button[data-variant='main'] {
    background-color: var(--wui-color-accent-100);
    color: var(--wui-color-inverse-100);
    border: none;
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-010);
  }

  button[data-variant='inverse'] {
    background-color: var(--wui-color-inverse-100);
    color: var(--wui-color-inverse-000);
    border: none;
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-010);
  }

  button[data-variant='accent'] {
    background-color: var(--wui-color-accent-glass-010);
    color: var(--wui-color-accent-100);
    border: none;
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-005);
  }

  button[data-variant='accent-error'] {
    background: var(--wui-color-error-glass-015);
    color: var(--wui-color-error-100);
    border: none;
    box-shadow: inset 0 0 0 1px var(--wui-color-error-glass-010);
  }

  button[data-variant='accent-success'] {
    background: var(--wui-color-success-glass-015);
    color: var(--wui-color-success-100);
    border: none;
    box-shadow: inset 0 0 0 1px var(--wui-color-success-glass-010);
  }

  button[data-variant='neutral'] {
    background: transparent;
    color: var(--wui-color-fg-100);
    border: none;
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-005);
  }

  /* -- Focus states --------------------------------------------------- */
  button[data-variant='main']:focus-visible:enabled {
    background-color: var(--wui-color-accent-090);
    box-shadow:
      inset 0 0 0 1px var(--wui-color-accent-100),
      0 0 0 4px var(--wui-color-accent-glass-020);
  }
  button[data-variant='inverse']:focus-visible:enabled {
    background-color: var(--wui-color-inverse-100);
    box-shadow:
      inset 0 0 0 1px var(--wui-color-gray-glass-010),
      0 0 0 4px var(--wui-color-accent-glass-020);
  }
  button[data-variant='accent']:focus-visible:enabled {
    background-color: var(--wui-color-accent-glass-010);
    box-shadow:
      inset 0 0 0 1px var(--wui-color-accent-100),
      0 0 0 4px var(--wui-color-accent-glass-020);
  }
  button[data-variant='accent-error']:focus-visible:enabled {
    background: var(--wui-color-error-glass-015);
    box-shadow:
      inset 0 0 0 1px var(--wui-color-error-100),
      0 0 0 4px var(--wui-color-error-glass-020);
  }
  button[data-variant='accent-success']:focus-visible:enabled {
    background: var(--wui-color-success-glass-015);
    box-shadow:
      inset 0 0 0 1px var(--wui-color-success-100),
      0 0 0 4px var(--wui-color-success-glass-020);
  }
  button[data-variant='neutral']:focus-visible:enabled {
    background: var(--wui-color-gray-glass-005);
    box-shadow:
      inset 0 0 0 1px var(--wui-color-gray-glass-010),
      0 0 0 4px var(--wui-color-gray-glass-002);
  }

  /* -- Hover & Active states ----------------------------------------------------------- */
  @media (hover: hover) and (pointer: fine) {
    button[data-variant='main']:hover:enabled {
      background-color: var(--wui-color-accent-090);
    }

    button[data-variant='main']:active:enabled {
      background-color: var(--wui-color-accent-080);
    }

    button[data-variant='accent']:hover:enabled {
      background-color: var(--wui-color-accent-glass-015);
    }

    button[data-variant='accent']:active:enabled {
      background-color: var(--wui-color-accent-glass-020);
    }

    button[data-variant='accent-error']:hover:enabled {
      background: var(--wui-color-error-glass-020);
      color: var(--wui-color-error-100);
    }

    button[data-variant='accent-error']:active:enabled {
      background: var(--wui-color-error-glass-030);
      color: var(--wui-color-error-100);
    }

    button[data-variant='accent-success']:hover:enabled {
      background: var(--wui-color-success-glass-020);
      color: var(--wui-color-success-100);
    }

    button[data-variant='accent-success']:active:enabled {
      background: var(--wui-color-success-glass-030);
      color: var(--wui-color-success-100);
    }

    button[data-variant='neutral']:hover:enabled {
      background: var(--wui-color-gray-glass-002);
    }

    button[data-variant='neutral']:active:enabled {
      background: var(--wui-color-gray-glass-005);
    }

    button[data-size='lg'][data-icon-left='true'][data-icon-right='false'] {
      padding-left: var(--wui-spacing-m);
    }

    button[data-size='lg'][data-icon-right='true'][data-icon-left='false'] {
      padding-right: var(--wui-spacing-m);
    }
  }

  /* -- Disabled state --------------------------------------------------- */
  button:disabled {
    background-color: var(--wui-color-gray-glass-002);
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-002);
    color: var(--wui-color-gray-glass-020);
    cursor: not-allowed;
  }

  button > wui-text {
    transition: opacity var(--wui-ease-out-power-1) var(--wui-duration-md);
    will-change: opacity;
    opacity: var(--local-opacity-100);
  }

  ::slotted(*) {
    transition: opacity var(--wui-ease-out-power-1) var(--wui-duration-md);
    will-change: opacity;
    opacity: var(--local-opacity-100);
  }

  wui-loading-spinner {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    opacity: var(--local-opacity-000);
  }
`;var ae=function(a,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,r;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(a,e,i,n);else for(var s=a.length-1;s>=0;s--)(r=a[s])&&(t=(o<3?r(t):o>3?r(e,i,t):r(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};const bi={main:"inverse-100",inverse:"inverse-000",accent:"accent-100","accent-error":"error-100","accent-success":"success-100",neutral:"fg-100",disabled:"gray-glass-020"},_n={lg:"paragraph-600",md:"small-600"},Sn={lg:"md",md:"md"};let Q=class extends O{constructor(){super(...arguments),this.size="lg",this.disabled=!1,this.fullWidth=!1,this.loading=!1,this.variant="main",this.hasIconLeft=!1,this.hasIconRight=!1,this.borderRadius="m"}render(){this.style.cssText=`
    --local-width: ${this.fullWidth?"100%":"auto"};
    --local-opacity-100: ${this.loading?0:1};
    --local-opacity-000: ${this.loading?1:0};
    --local-border-radius: var(--wui-border-radius-${this.borderRadius});
    `;const e=this.textVariant??_n[this.size];return c`
      <button
        data-variant=${this.variant}
        data-icon-left=${this.hasIconLeft}
        data-icon-right=${this.hasIconRight}
        data-size=${this.size}
        ?disabled=${this.disabled}
      >
        ${this.loadingTemplate()}
        <slot name="iconLeft" @slotchange=${()=>this.handleSlotLeftChange()}></slot>
        <wui-text variant=${e} color="inherit">
          <slot></slot>
        </wui-text>
        <slot name="iconRight" @slotchange=${()=>this.handleSlotRightChange()}></slot>
      </button>
    `}handleSlotLeftChange(){this.hasIconLeft=!0}handleSlotRightChange(){this.hasIconRight=!0}loadingTemplate(){if(this.loading){const e=Sn[this.size],i=this.disabled?bi.disabled:bi[this.variant];return c`<wui-loading-spinner color=${i} size=${e}></wui-loading-spinner>`}return c``}};Q.styles=[q,G,Wn];ae([u()],Q.prototype,"size",void 0);ae([u({type:Boolean})],Q.prototype,"disabled",void 0);ae([u({type:Boolean})],Q.prototype,"fullWidth",void 0);ae([u({type:Boolean})],Q.prototype,"loading",void 0);ae([u()],Q.prototype,"variant",void 0);ae([u({type:Boolean})],Q.prototype,"hasIconLeft",void 0);ae([u({type:Boolean})],Q.prototype,"hasIconRight",void 0);ae([u()],Q.prototype,"borderRadius",void 0);ae([u()],Q.prototype,"textVariant",void 0);Q=ae([T("wui-button")],Q);const Tn=N`
  button {
    padding: var(--wui-spacing-4xs) var(--wui-spacing-xxs);
    border-radius: var(--wui-border-radius-3xs);
    background-color: transparent;
    color: var(--wui-color-accent-100);
  }

  button:disabled {
    background-color: transparent;
    color: var(--wui-color-gray-glass-015);
  }

  button:hover {
    background-color: var(--wui-color-gray-glass-005);
  }
`;var vt=function(a,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,r;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(a,e,i,n);else for(var s=a.length-1;s>=0;s--)(r=a[s])&&(t=(o<3?r(t):o>3?r(e,i,t):r(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let Pe=class extends O{constructor(){super(...arguments),this.tabIdx=void 0,this.disabled=!1,this.color="inherit"}render(){return c`
      <button ?disabled=${this.disabled} tabindex=${W(this.tabIdx)}>
        <slot name="iconLeft"></slot>
        <wui-text variant="small-600" color=${this.color}>
          <slot></slot>
        </wui-text>
        <slot name="iconRight"></slot>
      </button>
    `}};Pe.styles=[q,G,Tn];vt([u()],Pe.prototype,"tabIdx",void 0);vt([u({type:Boolean})],Pe.prototype,"disabled",void 0);vt([u()],Pe.prototype,"color",void 0);Pe=vt([T("wui-link")],Pe);const Pn=N`
  :host {
    display: block;
    width: var(--wui-box-size-md);
    height: var(--wui-box-size-md);
  }

  svg {
    width: var(--wui-box-size-md);
    height: var(--wui-box-size-md);
  }

  rect {
    fill: none;
    stroke: var(--wui-color-accent-100);
    stroke-width: 4px;
    stroke-linecap: round;
    animation: dash 1s linear infinite;
  }

  @keyframes dash {
    to {
      stroke-dashoffset: 0px;
    }
  }
`;var en=function(a,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,r;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(a,e,i,n);else for(var s=a.length-1;s>=0;s--)(r=a[s])&&(t=(o<3?r(t):o>3?r(e,i,t):r(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let at=class extends O{constructor(){super(...arguments),this.radius=36}render(){return this.svgLoaderTemplate()}svgLoaderTemplate(){const e=this.radius>50?50:this.radius,n=36-e,o=116+n,t=245+n,r=360+n*1.75;return c`
      <svg viewBox="0 0 110 110" width="110" height="110">
        <rect
          x="2"
          y="2"
          width="106"
          height="106"
          rx=${e}
          stroke-dasharray="${o} ${t}"
          stroke-dashoffset=${r}
        />
      </svg>
    `}};at.styles=[q,Pn];en([u({type:Number})],at.prototype,"radius",void 0);at=en([T("wui-loading-thumbnail")],at);const Bn=N`
  button {
    border: none;
    border-radius: var(--wui-border-radius-3xl);
  }

  button[data-variant='main'] {
    background-color: var(--wui-color-accent-100);
    color: var(--wui-color-inverse-100);
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-010);
  }

  button[data-variant='accent'] {
    background-color: var(--wui-color-accent-glass-010);
    color: var(--wui-color-accent-100);
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-005);
  }

  button[data-variant='gray'] {
    background-color: transparent;
    color: var(--wui-color-fg-200);
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-010);
  }

  button[data-variant='shade'] {
    background-color: transparent;
    color: var(--wui-color-accent-100);
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-010);
  }

  button[data-size='sm'] {
    height: 32px;
    padding: 0 var(--wui-spacing-s);
  }

  button[data-size='md'] {
    height: 40px;
    padding: 0 var(--wui-spacing-l);
  }

  button[data-size='sm'] > wui-image {
    width: 16px;
    height: 16px;
  }

  button[data-size='md'] > wui-image {
    width: 24px;
    height: 24px;
  }

  button[data-size='sm'] > wui-icon {
    width: 12px;
    height: 12px;
  }

  button[data-size='md'] > wui-icon {
    width: 14px;
    height: 14px;
  }

  wui-image {
    border-radius: var(--wui-border-radius-3xl);
    overflow: hidden;
  }

  button.disabled > wui-icon,
  button.disabled > wui-image {
    filter: grayscale(1);
  }

  button[data-variant='main'] > wui-image {
    box-shadow: inset 0 0 0 1px var(--wui-color-accent-090);
  }

  button[data-variant='shade'] > wui-image,
  button[data-variant='gray'] > wui-image {
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-010);
  }

  @media (hover: hover) and (pointer: fine) {
    button[data-variant='main']:focus-visible {
      background-color: var(--wui-color-accent-090);
    }

    button[data-variant='main']:hover:enabled {
      background-color: var(--wui-color-accent-090);
    }

    button[data-variant='main']:active:enabled {
      background-color: var(--wui-color-accent-080);
    }

    button[data-variant='accent']:hover:enabled {
      background-color: var(--wui-color-accent-glass-015);
    }

    button[data-variant='accent']:active:enabled {
      background-color: var(--wui-color-accent-glass-020);
    }

    button[data-variant='shade']:focus-visible,
    button[data-variant='gray']:focus-visible,
    button[data-variant='shade']:hover,
    button[data-variant='gray']:hover {
      background-color: var(--wui-color-gray-glass-002);
    }

    button[data-variant='gray']:active,
    button[data-variant='shade']:active {
      background-color: var(--wui-color-gray-glass-005);
    }
  }

  button.disabled {
    color: var(--wui-color-gray-glass-020);
    background-color: var(--wui-color-gray-glass-002);
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-002);
    pointer-events: none;
  }
`;var Ee=function(a,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,r;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(a,e,i,n);else for(var s=a.length-1;s>=0;s--)(r=a[s])&&(t=(o<3?r(t):o>3?r(e,i,t):r(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let fe=class extends O{constructor(){super(...arguments),this.variant="accent",this.imageSrc="",this.disabled=!1,this.icon="externalLink",this.size="md",this.text=""}render(){const e=this.size==="sm"?"small-600":"paragraph-600";return c`
      <button
        class=${this.disabled?"disabled":""}
        data-variant=${this.variant}
        data-size=${this.size}
      >
        ${this.imageSrc?c`<wui-image src=${this.imageSrc}></wui-image>`:null}
        <wui-text variant=${e} color="inherit"> ${this.text} </wui-text>
        <wui-icon name=${this.icon} color="inherit" size="inherit"></wui-icon>
      </button>
    `}};fe.styles=[q,G,Bn];Ee([u()],fe.prototype,"variant",void 0);Ee([u()],fe.prototype,"imageSrc",void 0);Ee([u({type:Boolean})],fe.prototype,"disabled",void 0);Ee([u()],fe.prototype,"icon",void 0);Ee([u()],fe.prototype,"size",void 0);Ee([u()],fe.prototype,"text",void 0);fe=Ee([T("wui-chip-button")],fe);const Ln=N`
  wui-flex {
    width: 100%;
    background-color: var(--wui-color-gray-glass-002);
    border-radius: var(--wui-border-radius-xs);
  }
`;var yt=function(a,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,r;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(a,e,i,n);else for(var s=a.length-1;s>=0;s--)(r=a[s])&&(t=(o<3?r(t):o>3?r(e,i,t):r(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let Be=class extends O{constructor(){super(...arguments),this.disabled=!1,this.label="",this.buttonLabel=""}render(){return c`
      <wui-flex
        justifyContent="space-between"
        alignItems="center"
        .padding=${["1xs","2l","1xs","2l"]}
      >
        <wui-text variant="paragraph-500" color="fg-200">${this.label}</wui-text>
        <wui-chip-button size="sm" variant="shade" text=${this.buttonLabel} icon="chevronRight">
        </wui-chip-button>
      </wui-flex>
    `}};Be.styles=[q,G,Ln];yt([u({type:Boolean})],Be.prototype,"disabled",void 0);yt([u()],Be.prototype,"label",void 0);yt([u()],Be.prototype,"buttonLabel",void 0);Be=yt([T("wui-cta-button")],Be);const On=N`
  :host {
    display: block;
    padding: 0 var(--wui-spacing-xl) var(--wui-spacing-xl);
  }
`;var tn=function(a,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,r;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(a,e,i,n);else for(var s=a.length-1;s>=0;s--)(r=a[s])&&(t=(o<3?r(t):o>3?r(e,i,t):r(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let st=class extends O{constructor(){super(...arguments),this.wallet=void 0}render(){if(!this.wallet)return this.style.display="none",null;const{name:e,app_store:i,play_store:n,chrome_store:o,homepage:t}=this.wallet,r=j.isMobile(),s=j.isIos(),l=j.isAndroid(),d=[i,n,t,o].filter(Boolean).length>1,f=he.getTruncateString({string:e,charsStart:12,charsEnd:0,truncate:"end"});return d&&!r?c`
        <wui-cta-button
          label=${`Don't have ${f}?`}
          buttonLabel="Get"
          @click=${()=>U.push("Downloads",{wallet:this.wallet})}
        ></wui-cta-button>
      `:!d&&t?c`
        <wui-cta-button
          label=${`Don't have ${f}?`}
          buttonLabel="Get"
          @click=${this.onHomePage.bind(this)}
        ></wui-cta-button>
      `:i&&s?c`
        <wui-cta-button
          label=${`Don't have ${f}?`}
          buttonLabel="Get"
          @click=${this.onAppStore.bind(this)}
        ></wui-cta-button>
      `:n&&l?c`
        <wui-cta-button
          label=${`Don't have ${f}?`}
          buttonLabel="Get"
          @click=${this.onPlayStore.bind(this)}
        ></wui-cta-button>
      `:(this.style.display="none",null)}onAppStore(){var e;(e=this.wallet)!=null&&e.app_store&&j.openHref(this.wallet.app_store,"_blank")}onPlayStore(){var e;(e=this.wallet)!=null&&e.play_store&&j.openHref(this.wallet.play_store,"_blank")}onHomePage(){var e;(e=this.wallet)!=null&&e.homepage&&j.openHref(this.wallet.homepage,"_blank")}};st.styles=[On];tn([u({type:Object})],st.prototype,"wallet",void 0);st=tn([T("w3m-mobile-download-links")],st);const An=N`
  @keyframes shake {
    0% {
      transform: translateX(0);
    }
    25% {
      transform: translateX(3px);
    }
    50% {
      transform: translateX(-3px);
    }
    75% {
      transform: translateX(3px);
    }
    100% {
      transform: translateX(0);
    }
  }

  wui-flex:first-child:not(:only-child) {
    position: relative;
  }

  wui-loading-thumbnail {
    position: absolute;
  }

  wui-icon-box {
    position: absolute;
    right: calc(var(--wui-spacing-3xs) * -1);
    bottom: calc(var(--wui-spacing-3xs) * -1);
    opacity: 0;
    transform: scale(0.5);
    transition-property: opacity, transform;
    transition-duration: var(--wui-duration-lg);
    transition-timing-function: var(--wui-ease-out-power-2);
    will-change: opacity, transform;
  }

  wui-text[align='center'] {
    width: 100%;
    padding: 0px var(--wui-spacing-l);
  }

  [data-error='true'] wui-icon-box {
    opacity: 1;
    transform: scale(1);
  }

  [data-error='true'] > wui-flex:first-child {
    animation: shake 250ms cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  }

  [data-retry='false'] wui-link {
    display: none;
  }

  [data-retry='true'] wui-link {
    display: block;
    opacity: 1;
  }
`;var se=function(a,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,r;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(a,e,i,n);else for(var s=a.length-1;s>=0;s--)(r=a[s])&&(t=(o<3?r(t):o>3?r(e,i,t):r(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};class F extends O{constructor(){var e,i,n,o,t;super(),this.wallet=(e=U.state.data)==null?void 0:e.wallet,this.connector=(i=U.state.data)==null?void 0:i.connector,this.timeout=void 0,this.secondaryBtnIcon="refresh",this.onConnect=void 0,this.onRender=void 0,this.onAutoConnect=void 0,this.isWalletConnect=!0,this.unsubscribe=[],this.imageSrc=K.getWalletImage(this.wallet)??K.getConnectorImage(this.connector),this.name=((n=this.wallet)==null?void 0:n.name)??((o=this.connector)==null?void 0:o.name)??"Wallet",this.isRetrying=!1,this.uri=k.state.wcUri,this.error=k.state.wcError,this.ready=!1,this.showRetry=!1,this.secondaryBtnLabel="Try again",this.secondaryLabel="Accept connection request in the wallet",this.isLoading=!1,this.isMobile=!1,this.onRetry=void 0,this.unsubscribe.push(k.subscribeKey("wcUri",r=>{var s;this.uri=r,this.isRetrying&&this.onRetry&&(this.isRetrying=!1,(s=this.onConnect)==null||s.call(this))}),k.subscribeKey("wcError",r=>this.error=r)),(j.isTelegram()||j.isSafari())&&j.isIos()&&k.state.wcUri&&((t=this.onConnect)==null||t.call(this))}firstUpdated(){var e;(e=this.onAutoConnect)==null||e.call(this),this.showRetry=!this.onAutoConnect}disconnectedCallback(){this.unsubscribe.forEach(e=>e()),k.setWcError(!1),clearTimeout(this.timeout)}render(){var n;(n=this.onRender)==null||n.call(this),this.onShowRetry();const e=this.error?"Connection can be declined if a previous request is still active":this.secondaryLabel;let i=`Continue in ${this.name}`;return this.error&&(i="Connection declined"),c`
      <wui-flex
        data-error=${W(this.error)}
        data-retry=${this.showRetry}
        flexDirection="column"
        alignItems="center"
        .padding=${["3xl","xl","xl","xl"]}
        gap="xl"
      >
        <wui-flex justifyContent="center" alignItems="center">
          <wui-wallet-image size="lg" imageSrc=${W(this.imageSrc)}></wui-wallet-image>

          ${this.error?null:this.loaderTemplate()}

          <wui-icon-box
            backgroundColor="error-100"
            background="opaque"
            iconColor="error-100"
            icon="close"
            size="sm"
            border
            borderColor="wui-color-bg-125"
          ></wui-icon-box>
        </wui-flex>

        <wui-flex flexDirection="column" alignItems="center" gap="xs">
          <wui-text variant="paragraph-500" color=${this.error?"error-100":"fg-100"}>
            ${i}
          </wui-text>
          <wui-text align="center" variant="small-500" color="fg-200">${e}</wui-text>
        </wui-flex>

        ${this.secondaryBtnLabel?c`
              <wui-button
                variant="accent"
                size="md"
                ?disabled=${this.isRetrying||this.isLoading}
                @click=${this.onTryAgain.bind(this)}
                data-testid="w3m-connecting-widget-secondary-button"
              >
                <wui-icon color="inherit" slot="iconLeft" name=${this.secondaryBtnIcon}></wui-icon>
                ${this.secondaryBtnLabel}
              </wui-button>
            `:null}
      </wui-flex>

      ${this.isWalletConnect?c`
            <wui-flex .padding=${["0","xl","xl","xl"]} justifyContent="center">
              <wui-link @click=${this.onCopyUri} color="fg-200" data-testid="wui-link-copy">
                <wui-icon size="xs" color="fg-200" slot="iconLeft" name="copy"></wui-icon>
                Copy link
              </wui-link>
            </wui-flex>
          `:null}

      <w3m-mobile-download-links .wallet=${this.wallet}></w3m-mobile-download-links>
    `}onShowRetry(){var e;if(this.error&&!this.showRetry){this.showRetry=!0;const i=(e=this.shadowRoot)==null?void 0:e.querySelector("wui-button");i==null||i.animate([{opacity:0},{opacity:1}],{fill:"forwards",easing:"ease"})}}onTryAgain(){var e,i;k.setWcError(!1),this.onRetry?(this.isRetrying=!0,(e=this.onRetry)==null||e.call(this)):(i=this.onConnect)==null||i.call(this)}loaderTemplate(){const e=Qt.state.themeVariables["--w3m-border-radius-master"],i=e?parseInt(e.replace("px",""),10):4;return c`<wui-loading-thumbnail radius=${i*9}></wui-loading-thumbnail>`}onCopyUri(){try{this.uri&&(j.copyToClopboard(this.uri),Xe.showSuccess("Link copied"))}catch{Xe.showError("Failed to copy")}}}F.styles=An;se([I()],F.prototype,"isRetrying",void 0);se([I()],F.prototype,"uri",void 0);se([I()],F.prototype,"error",void 0);se([I()],F.prototype,"ready",void 0);se([I()],F.prototype,"showRetry",void 0);se([I()],F.prototype,"secondaryBtnLabel",void 0);se([I()],F.prototype,"secondaryLabel",void 0);se([I()],F.prototype,"isLoading",void 0);se([u({type:Boolean})],F.prototype,"isMobile",void 0);se([u()],F.prototype,"onRetry",void 0);var jn=function(a,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,r;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(a,e,i,n);else for(var s=a.length-1;s>=0;s--)(r=a[s])&&(t=(o<3?r(t):o>3?r(e,i,t):r(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let mi=class extends F{constructor(){if(super(),!this.wallet)throw new Error("w3m-connecting-wc-browser: No wallet provided");this.onConnect=this.onConnectProxy.bind(this),this.onAutoConnect=this.onConnectProxy.bind(this),te.sendEvent({type:"track",event:"SELECT_WALLET",properties:{name:this.wallet.name,platform:"browser"}})}async onConnectProxy(){var e;try{this.error=!1;const{connectors:i}=M.state,n=i.find(o=>{var t,r,s;return o.type==="ANNOUNCED"&&((t=o.info)==null?void 0:t.rdns)===((r=this.wallet)==null?void 0:r.rdns)||o.type==="INJECTED"||o.name===((s=this.wallet)==null?void 0:s.name)});if(n)await k.connectExternal(n,n.chain);else throw new Error("w3m-connecting-wc-browser: No connector found");Qi.close(),te.sendEvent({type:"track",event:"CONNECT_SUCCESS",properties:{method:"browser",name:((e=this.wallet)==null?void 0:e.name)||"Unknown"}})}catch(i){te.sendEvent({type:"track",event:"CONNECT_ERROR",properties:{message:(i==null?void 0:i.message)??"Unknown"}}),this.error=!0}}};mi=jn([T("w3m-connecting-wc-browser")],mi);var kn=function(a,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,r;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(a,e,i,n);else for(var s=a.length-1;s>=0;s--)(r=a[s])&&(t=(o<3?r(t):o>3?r(e,i,t):r(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let vi=class extends F{constructor(){if(super(),!this.wallet)throw new Error("w3m-connecting-wc-desktop: No wallet provided");this.onConnect=this.onConnectProxy.bind(this),this.onRender=this.onRenderProxy.bind(this),te.sendEvent({type:"track",event:"SELECT_WALLET",properties:{name:this.wallet.name,platform:"desktop"}})}onRenderProxy(){var e;!this.ready&&this.uri&&(this.ready=!0,(e=this.onConnect)==null||e.call(this))}onConnectProxy(){var e;if((e=this.wallet)!=null&&e.desktop_link&&this.uri)try{this.error=!1;const{desktop_link:i,name:n}=this.wallet,{redirect:o,href:t}=j.formatNativeUrl(i,this.uri);k.setWcLinking({name:n,href:t}),k.setRecentWallet(this.wallet),j.openHref(o,"_blank")}catch{this.error=!0}}};vi=kn([T("w3m-connecting-wc-desktop")],vi);var je=function(a,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,r;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(a,e,i,n);else for(var s=a.length-1;s>=0;s--)(r=a[s])&&(t=(o<3?r(t):o>3?r(e,i,t):r(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let Ce=class extends F{constructor(){if(super(),this.btnLabelTimeout=void 0,this.redirectDeeplink=void 0,this.redirectUniversalLink=void 0,this.target=void 0,this.preferUniversalLinks=ee.state.experimental_preferUniversalLinks,this.isLoading=!0,this.onConnect=()=>{var e;if((e=this.wallet)!=null&&e.mobile_link&&this.uri)try{this.error=!1;const{mobile_link:i,link_mode:n,name:o}=this.wallet,{redirect:t,redirectUniversalLink:r,href:s}=j.formatNativeUrl(i,this.uri,n);this.redirectDeeplink=t,this.redirectUniversalLink=r,this.target=j.isIframe()?"_top":"_self",k.setWcLinking({name:o,href:s}),k.setRecentWallet(this.wallet),this.preferUniversalLinks&&this.redirectUniversalLink?j.openHref(this.redirectUniversalLink,this.target):j.openHref(this.redirectDeeplink,this.target)}catch(i){te.sendEvent({type:"track",event:"CONNECT_PROXY_ERROR",properties:{message:i instanceof Error?i.message:"Error parsing the deeplink",uri:this.uri,mobile_link:this.wallet.mobile_link,name:this.wallet.name}}),this.error=!0}},!this.wallet)throw new Error("w3m-connecting-wc-mobile: No wallet provided");this.secondaryBtnLabel="Open",this.secondaryLabel=Xi.CONNECT_LABELS.MOBILE,this.secondaryBtnIcon="externalLink",this.onHandleURI(),this.unsubscribe.push(k.subscribeKey("wcUri",()=>{this.onHandleURI()})),te.sendEvent({type:"track",event:"SELECT_WALLET",properties:{name:this.wallet.name,platform:"mobile"}})}disconnectedCallback(){super.disconnectedCallback(),clearTimeout(this.btnLabelTimeout)}onHandleURI(){var e;this.isLoading=!this.uri,!this.ready&&this.uri&&(this.ready=!0,(e=this.onConnect)==null||e.call(this))}onTryAgain(){var e;k.setWcError(!1),(e=this.onConnect)==null||e.call(this)}};je([I()],Ce.prototype,"redirectDeeplink",void 0);je([I()],Ce.prototype,"redirectUniversalLink",void 0);je([I()],Ce.prototype,"target",void 0);je([I()],Ce.prototype,"preferUniversalLinks",void 0);je([I()],Ce.prototype,"isLoading",void 0);Ce=je([T("w3m-connecting-wc-mobile")],Ce);var Te={},Wt,yi;function zn(){return yi||(yi=1,Wt=function(){return typeof Promise=="function"&&Promise.prototype&&Promise.prototype.then}),Wt}var _t={},be={},xi;function We(){if(xi)return be;xi=1;let a;const e=[0,26,44,70,100,134,172,196,242,292,346,404,466,532,581,655,733,815,901,991,1085,1156,1258,1364,1474,1588,1706,1828,1921,2051,2185,2323,2465,2611,2761,2876,3034,3196,3362,3532,3706];return be.getSymbolSize=function(n){if(!n)throw new Error('"version" cannot be null or undefined');if(n<1||n>40)throw new Error('"version" should be in range from 1 to 40');return n*4+17},be.getSymbolTotalCodewords=function(n){return e[n]},be.getBCHDigit=function(i){let n=0;for(;i!==0;)n++,i>>>=1;return n},be.setToSJISFunction=function(n){if(typeof n!="function")throw new Error('"toSJISFunc" is not a valid function.');a=n},be.isKanjiModeEnabled=function(){return typeof a<"u"},be.toSJIS=function(n){return a(n)},be}var St={},Ci;function di(){return Ci||(Ci=1,function(a){a.L={bit:1},a.M={bit:0},a.Q={bit:3},a.H={bit:2};function e(i){if(typeof i!="string")throw new Error("Param is not a string");switch(i.toLowerCase()){case"l":case"low":return a.L;case"m":case"medium":return a.M;case"q":case"quartile":return a.Q;case"h":case"high":return a.H;default:throw new Error("Unknown EC Level: "+i)}}a.isValid=function(n){return n&&typeof n.bit<"u"&&n.bit>=0&&n.bit<4},a.from=function(n,o){if(a.isValid(n))return n;try{return e(n)}catch{return o}}}(St)),St}var Tt,$i;function Dn(){if($i)return Tt;$i=1;function a(){this.buffer=[],this.length=0}return a.prototype={get:function(e){const i=Math.floor(e/8);return(this.buffer[i]>>>7-e%8&1)===1},put:function(e,i){for(let n=0;n<i;n++)this.putBit((e>>>i-n-1&1)===1)},getLengthInBits:function(){return this.length},putBit:function(e){const i=Math.floor(this.length/8);this.buffer.length<=i&&this.buffer.push(0),e&&(this.buffer[i]|=128>>>this.length%8),this.length++}},Tt=a,Tt}var Pt,Ri;function Nn(){if(Ri)return Pt;Ri=1;function a(e){if(!e||e<1)throw new Error("BitMatrix size must be defined and greater than 0");this.size=e,this.data=new Uint8Array(e*e),this.reservedBit=new Uint8Array(e*e)}return a.prototype.set=function(e,i,n,o){const t=e*this.size+i;this.data[t]=n,o&&(this.reservedBit[t]=!0)},a.prototype.get=function(e,i){return this.data[e*this.size+i]},a.prototype.xor=function(e,i,n){this.data[e*this.size+i]^=n},a.prototype.isReserved=function(e,i){return this.reservedBit[e*this.size+i]},Pt=a,Pt}var Bt={},Ii;function Mn(){return Ii||(Ii=1,function(a){const e=We().getSymbolSize;a.getRowColCoords=function(n){if(n===1)return[];const o=Math.floor(n/7)+2,t=e(n),r=t===145?26:Math.ceil((t-13)/(2*o-2))*2,s=[t-7];for(let l=1;l<o-1;l++)s[l]=s[l-1]-r;return s.push(6),s.reverse()},a.getPositions=function(n){const o=[],t=a.getRowColCoords(n),r=t.length;for(let s=0;s<r;s++)for(let l=0;l<r;l++)s===0&&l===0||s===0&&l===r-1||s===r-1&&l===0||o.push([t[s],t[l]]);return o}}(Bt)),Bt}var Lt={},Ei;function Un(){if(Ei)return Lt;Ei=1;const a=We().getSymbolSize,e=7;return Lt.getPositions=function(n){const o=a(n);return[[0,0],[o-e,0],[0,o-e]]},Lt}var Ot={},Wi;function qn(){return Wi||(Wi=1,function(a){a.Patterns={PATTERN000:0,PATTERN001:1,PATTERN010:2,PATTERN011:3,PATTERN100:4,PATTERN101:5,PATTERN110:6,PATTERN111:7};const e={N1:3,N2:3,N3:40,N4:10};a.isValid=function(o){return o!=null&&o!==""&&!isNaN(o)&&o>=0&&o<=7},a.from=function(o){return a.isValid(o)?parseInt(o,10):void 0},a.getPenaltyN1=function(o){const t=o.size;let r=0,s=0,l=0,d=null,f=null;for(let g=0;g<t;g++){s=l=0,d=f=null;for(let C=0;C<t;C++){let w=o.get(g,C);w===d?s++:(s>=5&&(r+=e.N1+(s-5)),d=w,s=1),w=o.get(C,g),w===f?l++:(l>=5&&(r+=e.N1+(l-5)),f=w,l=1)}s>=5&&(r+=e.N1+(s-5)),l>=5&&(r+=e.N1+(l-5))}return r},a.getPenaltyN2=function(o){const t=o.size;let r=0;for(let s=0;s<t-1;s++)for(let l=0;l<t-1;l++){const d=o.get(s,l)+o.get(s,l+1)+o.get(s+1,l)+o.get(s+1,l+1);(d===4||d===0)&&r++}return r*e.N2},a.getPenaltyN3=function(o){const t=o.size;let r=0,s=0,l=0;for(let d=0;d<t;d++){s=l=0;for(let f=0;f<t;f++)s=s<<1&2047|o.get(d,f),f>=10&&(s===1488||s===93)&&r++,l=l<<1&2047|o.get(f,d),f>=10&&(l===1488||l===93)&&r++}return r*e.N3},a.getPenaltyN4=function(o){let t=0;const r=o.data.length;for(let l=0;l<r;l++)t+=o.data[l];return Math.abs(Math.ceil(t*100/r/5)-10)*e.N4};function i(n,o,t){switch(n){case a.Patterns.PATTERN000:return(o+t)%2===0;case a.Patterns.PATTERN001:return o%2===0;case a.Patterns.PATTERN010:return t%3===0;case a.Patterns.PATTERN011:return(o+t)%3===0;case a.Patterns.PATTERN100:return(Math.floor(o/2)+Math.floor(t/3))%2===0;case a.Patterns.PATTERN101:return o*t%2+o*t%3===0;case a.Patterns.PATTERN110:return(o*t%2+o*t%3)%2===0;case a.Patterns.PATTERN111:return(o*t%3+(o+t)%2)%2===0;default:throw new Error("bad maskPattern:"+n)}}a.applyMask=function(o,t){const r=t.size;for(let s=0;s<r;s++)for(let l=0;l<r;l++)t.isReserved(l,s)||t.xor(l,s,i(o,l,s))},a.getBestMask=function(o,t){const r=Object.keys(a.Patterns).length;let s=0,l=1/0;for(let d=0;d<r;d++){t(d),a.applyMask(d,o);const f=a.getPenaltyN1(o)+a.getPenaltyN2(o)+a.getPenaltyN3(o)+a.getPenaltyN4(o);a.applyMask(d,o),f<l&&(l=f,s=d)}return s}}(Ot)),Ot}var Qe={},_i;function nn(){if(_i)return Qe;_i=1;const a=di(),e=[1,1,1,1,1,1,1,1,1,1,2,2,1,2,2,4,1,2,4,4,2,4,4,4,2,4,6,5,2,4,6,6,2,5,8,8,4,5,8,8,4,5,8,11,4,8,10,11,4,9,12,16,4,9,16,16,6,10,12,18,6,10,17,16,6,11,16,19,6,13,18,21,7,14,21,25,8,16,20,25,8,17,23,25,9,17,23,34,9,18,25,30,10,20,27,32,12,21,29,35,12,23,34,37,12,25,34,40,13,26,35,42,14,28,38,45,15,29,40,48,16,31,43,51,17,33,45,54,18,35,48,57,19,37,51,60,19,38,53,63,20,40,56,66,21,43,59,70,22,45,62,74,24,47,65,77,25,49,68,81],i=[7,10,13,17,10,16,22,28,15,26,36,44,20,36,52,64,26,48,72,88,36,64,96,112,40,72,108,130,48,88,132,156,60,110,160,192,72,130,192,224,80,150,224,264,96,176,260,308,104,198,288,352,120,216,320,384,132,240,360,432,144,280,408,480,168,308,448,532,180,338,504,588,196,364,546,650,224,416,600,700,224,442,644,750,252,476,690,816,270,504,750,900,300,560,810,960,312,588,870,1050,336,644,952,1110,360,700,1020,1200,390,728,1050,1260,420,784,1140,1350,450,812,1200,1440,480,868,1290,1530,510,924,1350,1620,540,980,1440,1710,570,1036,1530,1800,570,1064,1590,1890,600,1120,1680,1980,630,1204,1770,2100,660,1260,1860,2220,720,1316,1950,2310,750,1372,2040,2430];return Qe.getBlocksCount=function(o,t){switch(t){case a.L:return e[(o-1)*4+0];case a.M:return e[(o-1)*4+1];case a.Q:return e[(o-1)*4+2];case a.H:return e[(o-1)*4+3];default:return}},Qe.getTotalCodewordsCount=function(o,t){switch(t){case a.L:return i[(o-1)*4+0];case a.M:return i[(o-1)*4+1];case a.Q:return i[(o-1)*4+2];case a.H:return i[(o-1)*4+3];default:return}},Qe}var At={},De={},Si;function Vn(){if(Si)return De;Si=1;const a=new Uint8Array(512),e=new Uint8Array(256);return function(){let n=1;for(let o=0;o<255;o++)a[o]=n,e[n]=o,n<<=1,n&256&&(n^=285);for(let o=255;o<512;o++)a[o]=a[o-255]}(),De.log=function(n){if(n<1)throw new Error("log("+n+")");return e[n]},De.exp=function(n){return a[n]},De.mul=function(n,o){return n===0||o===0?0:a[e[n]+e[o]]},De}var Ti;function Fn(){return Ti||(Ti=1,function(a){const e=Vn();a.mul=function(n,o){const t=new Uint8Array(n.length+o.length-1);for(let r=0;r<n.length;r++)for(let s=0;s<o.length;s++)t[r+s]^=e.mul(n[r],o[s]);return t},a.mod=function(n,o){let t=new Uint8Array(n);for(;t.length-o.length>=0;){const r=t[0];for(let l=0;l<o.length;l++)t[l]^=e.mul(o[l],r);let s=0;for(;s<t.length&&t[s]===0;)s++;t=t.slice(s)}return t},a.generateECPolynomial=function(n){let o=new Uint8Array([1]);for(let t=0;t<n;t++)o=a.mul(o,new Uint8Array([1,e.exp(t)]));return o}}(At)),At}var jt,Pi;function Kn(){if(Pi)return jt;Pi=1;const a=Fn();function e(i){this.genPoly=void 0,this.degree=i,this.degree&&this.initialize(this.degree)}return e.prototype.initialize=function(n){this.degree=n,this.genPoly=a.generateECPolynomial(this.degree)},e.prototype.encode=function(n){if(!this.genPoly)throw new Error("Encoder not initialized");const o=new Uint8Array(n.length+this.degree);o.set(n);const t=a.mod(o,this.genPoly),r=this.degree-t.length;if(r>0){const s=new Uint8Array(this.degree);return s.set(t,r),s}return t},jt=e,jt}var kt={},zt={},Dt={},Bi;function on(){return Bi||(Bi=1,Dt.isValid=function(e){return!isNaN(e)&&e>=1&&e<=40}),Dt}var oe={},Li;function rn(){if(Li)return oe;Li=1;const a="[0-9]+",e="[A-Z $%*+\\-./:]+";let i="(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+";i=i.replace(/u/g,"\\u");const n="(?:(?![A-Z0-9 $%*+\\-./:]|"+i+`)(?:.|[\r
]))+`;oe.KANJI=new RegExp(i,"g"),oe.BYTE_KANJI=new RegExp("[^A-Z0-9 $%*+\\-./:]+","g"),oe.BYTE=new RegExp(n,"g"),oe.NUMERIC=new RegExp(a,"g"),oe.ALPHANUMERIC=new RegExp(e,"g");const o=new RegExp("^"+i+"$"),t=new RegExp("^"+a+"$"),r=new RegExp("^[A-Z0-9 $%*+\\-./:]+$");return oe.testKanji=function(l){return o.test(l)},oe.testNumeric=function(l){return t.test(l)},oe.testAlphanumeric=function(l){return r.test(l)},oe}var Oi;function _e(){return Oi||(Oi=1,function(a){const e=on(),i=rn();a.NUMERIC={id:"Numeric",bit:1,ccBits:[10,12,14]},a.ALPHANUMERIC={id:"Alphanumeric",bit:2,ccBits:[9,11,13]},a.BYTE={id:"Byte",bit:4,ccBits:[8,16,16]},a.KANJI={id:"Kanji",bit:8,ccBits:[8,10,12]},a.MIXED={bit:-1},a.getCharCountIndicator=function(t,r){if(!t.ccBits)throw new Error("Invalid mode: "+t);if(!e.isValid(r))throw new Error("Invalid version: "+r);return r>=1&&r<10?t.ccBits[0]:r<27?t.ccBits[1]:t.ccBits[2]},a.getBestModeForData=function(t){return i.testNumeric(t)?a.NUMERIC:i.testAlphanumeric(t)?a.ALPHANUMERIC:i.testKanji(t)?a.KANJI:a.BYTE},a.toString=function(t){if(t&&t.id)return t.id;throw new Error("Invalid mode")},a.isValid=function(t){return t&&t.bit&&t.ccBits};function n(o){if(typeof o!="string")throw new Error("Param is not a string");switch(o.toLowerCase()){case"numeric":return a.NUMERIC;case"alphanumeric":return a.ALPHANUMERIC;case"kanji":return a.KANJI;case"byte":return a.BYTE;default:throw new Error("Unknown mode: "+o)}}a.from=function(t,r){if(a.isValid(t))return t;try{return n(t)}catch{return r}}}(zt)),zt}var Ai;function Hn(){return Ai||(Ai=1,function(a){const e=We(),i=nn(),n=di(),o=_e(),t=on(),r=7973,s=e.getBCHDigit(r);function l(C,w,L){for(let y=1;y<=40;y++)if(w<=a.getCapacity(y,L,C))return y}function d(C,w){return o.getCharCountIndicator(C,w)+4}function f(C,w){let L=0;return C.forEach(function(y){const P=d(y.mode,w);L+=P+y.getBitsLength()}),L}function g(C,w){for(let L=1;L<=40;L++)if(f(C,L)<=a.getCapacity(L,w,o.MIXED))return L}a.from=function(w,L){return t.isValid(w)?parseInt(w,10):L},a.getCapacity=function(w,L,y){if(!t.isValid(w))throw new Error("Invalid QR Code version");typeof y>"u"&&(y=o.BYTE);const P=e.getSymbolTotalCodewords(w),b=i.getTotalCodewordsCount(w,L),p=(P-b)*8;if(y===o.MIXED)return p;const m=p-d(y,w);switch(y){case o.NUMERIC:return Math.floor(m/10*3);case o.ALPHANUMERIC:return Math.floor(m/11*2);case o.KANJI:return Math.floor(m/13);case o.BYTE:default:return Math.floor(m/8)}},a.getBestVersionForData=function(w,L){let y;const P=n.from(L,n.M);if(Array.isArray(w)){if(w.length>1)return g(w,P);if(w.length===0)return 1;y=w[0]}else y=w;return l(y.mode,y.getLength(),P)},a.getEncodedBits=function(w){if(!t.isValid(w)||w<7)throw new Error("Invalid QR Code version");let L=w<<12;for(;e.getBCHDigit(L)-s>=0;)L^=r<<e.getBCHDigit(L)-s;return w<<12|L}}(kt)),kt}var Nt={},ji;function Gn(){if(ji)return Nt;ji=1;const a=We(),e=1335,i=21522,n=a.getBCHDigit(e);return Nt.getEncodedBits=function(t,r){const s=t.bit<<3|r;let l=s<<10;for(;a.getBCHDigit(l)-n>=0;)l^=e<<a.getBCHDigit(l)-n;return(s<<10|l)^i},Nt}var Mt={},Ut,ki;function Yn(){if(ki)return Ut;ki=1;const a=_e();function e(i){this.mode=a.NUMERIC,this.data=i.toString()}return e.getBitsLength=function(n){return 10*Math.floor(n/3)+(n%3?n%3*3+1:0)},e.prototype.getLength=function(){return this.data.length},e.prototype.getBitsLength=function(){return e.getBitsLength(this.data.length)},e.prototype.write=function(n){let o,t,r;for(o=0;o+3<=this.data.length;o+=3)t=this.data.substr(o,3),r=parseInt(t,10),n.put(r,10);const s=this.data.length-o;s>0&&(t=this.data.substr(o),r=parseInt(t,10),n.put(r,s*3+1))},Ut=e,Ut}var qt,zi;function Jn(){if(zi)return qt;zi=1;const a=_e(),e=["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"," ","$","%","*","+","-",".","/",":"];function i(n){this.mode=a.ALPHANUMERIC,this.data=n}return i.getBitsLength=function(o){return 11*Math.floor(o/2)+6*(o%2)},i.prototype.getLength=function(){return this.data.length},i.prototype.getBitsLength=function(){return i.getBitsLength(this.data.length)},i.prototype.write=function(o){let t;for(t=0;t+2<=this.data.length;t+=2){let r=e.indexOf(this.data[t])*45;r+=e.indexOf(this.data[t+1]),o.put(r,11)}this.data.length%2&&o.put(e.indexOf(this.data[t]),6)},qt=i,qt}var Vt,Di;function Qn(){if(Di)return Vt;Di=1;const a=xn(),e=_e();function i(n){this.mode=e.BYTE,typeof n=="string"&&(n=a(n)),this.data=new Uint8Array(n)}return i.getBitsLength=function(o){return o*8},i.prototype.getLength=function(){return this.data.length},i.prototype.getBitsLength=function(){return i.getBitsLength(this.data.length)},i.prototype.write=function(n){for(let o=0,t=this.data.length;o<t;o++)n.put(this.data[o],8)},Vt=i,Vt}var Ft,Ni;function Xn(){if(Ni)return Ft;Ni=1;const a=_e(),e=We();function i(n){this.mode=a.KANJI,this.data=n}return i.getBitsLength=function(o){return o*13},i.prototype.getLength=function(){return this.data.length},i.prototype.getBitsLength=function(){return i.getBitsLength(this.data.length)},i.prototype.write=function(n){let o;for(o=0;o<this.data.length;o++){let t=e.toSJIS(this.data[o]);if(t>=33088&&t<=40956)t-=33088;else if(t>=57408&&t<=60351)t-=49472;else throw new Error("Invalid SJIS character: "+this.data[o]+`
Make sure your charset is UTF-8`);t=(t>>>8&255)*192+(t&255),n.put(t,13)}},Ft=i,Ft}var Mi;function Zn(){return Mi||(Mi=1,function(a){const e=_e(),i=Yn(),n=Jn(),o=Qn(),t=Xn(),r=rn(),s=We(),l=vn();function d(b){return unescape(encodeURIComponent(b)).length}function f(b,p,m){const h=[];let z;for(;(z=b.exec(m))!==null;)h.push({data:z[0],index:z.index,mode:p,length:z[0].length});return h}function g(b){const p=f(r.NUMERIC,e.NUMERIC,b),m=f(r.ALPHANUMERIC,e.ALPHANUMERIC,b);let h,z;return s.isKanjiModeEnabled()?(h=f(r.BYTE,e.BYTE,b),z=f(r.KANJI,e.KANJI,b)):(h=f(r.BYTE_KANJI,e.BYTE,b),z=[]),p.concat(m,h,z).sort(function(_,E){return _.index-E.index}).map(function(_){return{data:_.data,mode:_.mode,length:_.length}})}function C(b,p){switch(p){case e.NUMERIC:return i.getBitsLength(b);case e.ALPHANUMERIC:return n.getBitsLength(b);case e.KANJI:return t.getBitsLength(b);case e.BYTE:return o.getBitsLength(b)}}function w(b){return b.reduce(function(p,m){const h=p.length-1>=0?p[p.length-1]:null;return h&&h.mode===m.mode?(p[p.length-1].data+=m.data,p):(p.push(m),p)},[])}function L(b){const p=[];for(let m=0;m<b.length;m++){const h=b[m];switch(h.mode){case e.NUMERIC:p.push([h,{data:h.data,mode:e.ALPHANUMERIC,length:h.length},{data:h.data,mode:e.BYTE,length:h.length}]);break;case e.ALPHANUMERIC:p.push([h,{data:h.data,mode:e.BYTE,length:h.length}]);break;case e.KANJI:p.push([h,{data:h.data,mode:e.BYTE,length:d(h.data)}]);break;case e.BYTE:p.push([{data:h.data,mode:e.BYTE,length:d(h.data)}])}}return p}function y(b,p){const m={},h={start:{}};let z=["start"];for(let x=0;x<b.length;x++){const _=b[x],E=[];for(let v=0;v<_.length;v++){const B=_[v],$=""+x+v;E.push($),m[$]={node:B,lastCount:0},h[$]={};for(let S=0;S<z.length;S++){const R=z[S];m[R]&&m[R].node.mode===B.mode?(h[R][$]=C(m[R].lastCount+B.length,B.mode)-C(m[R].lastCount,B.mode),m[R].lastCount+=B.length):(m[R]&&(m[R].lastCount=B.length),h[R][$]=C(B.length,B.mode)+4+e.getCharCountIndicator(B.mode,p))}}z=E}for(let x=0;x<z.length;x++)h[z[x]].end=0;return{map:h,table:m}}function P(b,p){let m;const h=e.getBestModeForData(b);if(m=e.from(p,h),m!==e.BYTE&&m.bit<h.bit)throw new Error('"'+b+'" cannot be encoded with mode '+e.toString(m)+`.
 Suggested mode is: `+e.toString(h));switch(m===e.KANJI&&!s.isKanjiModeEnabled()&&(m=e.BYTE),m){case e.NUMERIC:return new i(b);case e.ALPHANUMERIC:return new n(b);case e.KANJI:return new t(b);case e.BYTE:return new o(b)}}a.fromArray=function(p){return p.reduce(function(m,h){return typeof h=="string"?m.push(P(h,null)):h.data&&m.push(P(h.data,h.mode)),m},[])},a.fromString=function(p,m){const h=g(p,s.isKanjiModeEnabled()),z=L(h),x=y(z,m),_=l.find_path(x.map,"start","end"),E=[];for(let v=1;v<_.length-1;v++)E.push(x.table[_[v]].node);return a.fromArray(w(E))},a.rawSplit=function(p){return a.fromArray(g(p,s.isKanjiModeEnabled()))}}(Mt)),Mt}var Ui;function eo(){if(Ui)return _t;Ui=1;const a=We(),e=di(),i=Dn(),n=Nn(),o=Mn(),t=Un(),r=qn(),s=nn(),l=Kn(),d=Hn(),f=Gn(),g=_e(),C=Zn();function w(x,_){const E=x.size,v=t.getPositions(_);for(let B=0;B<v.length;B++){const $=v[B][0],S=v[B][1];for(let R=-1;R<=7;R++)if(!($+R<=-1||E<=$+R))for(let A=-1;A<=7;A++)S+A<=-1||E<=S+A||(R>=0&&R<=6&&(A===0||A===6)||A>=0&&A<=6&&(R===0||R===6)||R>=2&&R<=4&&A>=2&&A<=4?x.set($+R,S+A,!0,!0):x.set($+R,S+A,!1,!0))}}function L(x){const _=x.size;for(let E=8;E<_-8;E++){const v=E%2===0;x.set(E,6,v,!0),x.set(6,E,v,!0)}}function y(x,_){const E=o.getPositions(_);for(let v=0;v<E.length;v++){const B=E[v][0],$=E[v][1];for(let S=-2;S<=2;S++)for(let R=-2;R<=2;R++)S===-2||S===2||R===-2||R===2||S===0&&R===0?x.set(B+S,$+R,!0,!0):x.set(B+S,$+R,!1,!0)}}function P(x,_){const E=x.size,v=d.getEncodedBits(_);let B,$,S;for(let R=0;R<18;R++)B=Math.floor(R/3),$=R%3+E-8-3,S=(v>>R&1)===1,x.set(B,$,S,!0),x.set($,B,S,!0)}function b(x,_,E){const v=x.size,B=f.getEncodedBits(_,E);let $,S;for($=0;$<15;$++)S=(B>>$&1)===1,$<6?x.set($,8,S,!0):$<8?x.set($+1,8,S,!0):x.set(v-15+$,8,S,!0),$<8?x.set(8,v-$-1,S,!0):$<9?x.set(8,15-$-1+1,S,!0):x.set(8,15-$-1,S,!0);x.set(v-8,8,1,!0)}function p(x,_){const E=x.size;let v=-1,B=E-1,$=7,S=0;for(let R=E-1;R>0;R-=2)for(R===6&&R--;;){for(let A=0;A<2;A++)if(!x.isReserved(B,R-A)){let we=!1;S<_.length&&(we=(_[S]>>>$&1)===1),x.set(B,R-A,we),$--,$===-1&&(S++,$=7)}if(B+=v,B<0||E<=B){B-=v,v=-v;break}}}function m(x,_,E){const v=new i;E.forEach(function(A){v.put(A.mode.bit,4),v.put(A.getLength(),g.getCharCountIndicator(A.mode,x)),A.write(v)});const B=a.getSymbolTotalCodewords(x),$=s.getTotalCodewordsCount(x,_),S=(B-$)*8;for(v.getLengthInBits()+4<=S&&v.put(0,4);v.getLengthInBits()%8!==0;)v.putBit(0);const R=(S-v.getLengthInBits())/8;for(let A=0;A<R;A++)v.put(A%2?17:236,8);return h(v,x,_)}function h(x,_,E){const v=a.getSymbolTotalCodewords(_),B=s.getTotalCodewordsCount(_,E),$=v-B,S=s.getBlocksCount(_,E),R=v%S,A=S-R,we=Math.floor(v/S),ze=Math.floor($/S),pn=ze+1,pi=we-ze,fn=new l(pi);let Ct=0;const Je=new Array(S),fi=new Array(S);let $t=0;const gn=new Uint8Array(x.buffer);for(let Se=0;Se<S;Se++){const It=Se<A?ze:pn;Je[Se]=gn.slice(Ct,Ct+It),fi[Se]=fn.encode(Je[Se]),Ct+=It,$t=Math.max($t,It)}const Rt=new Uint8Array(v);let gi=0,ce,ue;for(ce=0;ce<$t;ce++)for(ue=0;ue<S;ue++)ce<Je[ue].length&&(Rt[gi++]=Je[ue][ce]);for(ce=0;ce<pi;ce++)for(ue=0;ue<S;ue++)Rt[gi++]=fi[ue][ce];return Rt}function z(x,_,E,v){let B;if(Array.isArray(x))B=C.fromArray(x);else if(typeof x=="string"){let we=_;if(!we){const ze=C.rawSplit(x);we=d.getBestVersionForData(ze,E)}B=C.fromString(x,we||40)}else throw new Error("Invalid data");const $=d.getBestVersionForData(B,E);if(!$)throw new Error("The amount of data is too big to be stored in a QR Code");if(!_)_=$;else if(_<$)throw new Error(`
The chosen QR Code version cannot contain this amount of data.
Minimum version required to store current data is: `+$+`.
`);const S=m(_,E,B),R=a.getSymbolSize(_),A=new n(R);return w(A,_),L(A),y(A,_),b(A,E,0),_>=7&&P(A,_),p(A,S),isNaN(v)&&(v=r.getBestMask(A,b.bind(null,A,E))),r.applyMask(v,A),b(A,E,v),{modules:A,version:_,errorCorrectionLevel:E,maskPattern:v,segments:B}}return _t.create=function(_,E){if(typeof _>"u"||_==="")throw new Error("No input text");let v=e.M,B,$;return typeof E<"u"&&(v=e.from(E.errorCorrectionLevel,e.M),B=d.from(E.version),$=r.from(E.maskPattern),E.toSJISFunc&&a.setToSJISFunction(E.toSJISFunc)),z(_,B,v,$)},_t}var Kt={},Ht={},qi;function an(){return qi||(qi=1,function(a){function e(i){if(typeof i=="number"&&(i=i.toString()),typeof i!="string")throw new Error("Color should be defined as hex string");let n=i.slice().replace("#","").split("");if(n.length<3||n.length===5||n.length>8)throw new Error("Invalid hex color: "+i);(n.length===3||n.length===4)&&(n=Array.prototype.concat.apply([],n.map(function(t){return[t,t]}))),n.length===6&&n.push("F","F");const o=parseInt(n.join(""),16);return{r:o>>24&255,g:o>>16&255,b:o>>8&255,a:o&255,hex:"#"+n.slice(0,6).join("")}}a.getOptions=function(n){n||(n={}),n.color||(n.color={});const o=typeof n.margin>"u"||n.margin===null||n.margin<0?4:n.margin,t=n.width&&n.width>=21?n.width:void 0,r=n.scale||4;return{width:t,scale:t?4:r,margin:o,color:{dark:e(n.color.dark||"#000000ff"),light:e(n.color.light||"#ffffffff")},type:n.type,rendererOpts:n.rendererOpts||{}}},a.getScale=function(n,o){return o.width&&o.width>=n+o.margin*2?o.width/(n+o.margin*2):o.scale},a.getImageWidth=function(n,o){const t=a.getScale(n,o);return Math.floor((n+o.margin*2)*t)},a.qrToImageData=function(n,o,t){const r=o.modules.size,s=o.modules.data,l=a.getScale(r,t),d=Math.floor((r+t.margin*2)*l),f=t.margin*l,g=[t.color.light,t.color.dark];for(let C=0;C<d;C++)for(let w=0;w<d;w++){let L=(C*d+w)*4,y=t.color.light;if(C>=f&&w>=f&&C<d-f&&w<d-f){const P=Math.floor((C-f)/l),b=Math.floor((w-f)/l);y=g[s[P*r+b]?1:0]}n[L++]=y.r,n[L++]=y.g,n[L++]=y.b,n[L]=y.a}}}(Ht)),Ht}var Vi;function to(){return Vi||(Vi=1,function(a){const e=an();function i(o,t,r){o.clearRect(0,0,t.width,t.height),t.style||(t.style={}),t.height=r,t.width=r,t.style.height=r+"px",t.style.width=r+"px"}function n(){try{return document.createElement("canvas")}catch{throw new Error("You need to specify a canvas element")}}a.render=function(t,r,s){let l=s,d=r;typeof l>"u"&&(!r||!r.getContext)&&(l=r,r=void 0),r||(d=n()),l=e.getOptions(l);const f=e.getImageWidth(t.modules.size,l),g=d.getContext("2d"),C=g.createImageData(f,f);return e.qrToImageData(C.data,t,l),i(g,d,f),g.putImageData(C,0,0),d},a.renderToDataURL=function(t,r,s){let l=s;typeof l>"u"&&(!r||!r.getContext)&&(l=r,r=void 0),l||(l={});const d=a.render(t,r,l),f=l.type||"image/png",g=l.rendererOpts||{};return d.toDataURL(f,g.quality)}}(Kt)),Kt}var Gt={},Fi;function io(){if(Fi)return Gt;Fi=1;const a=an();function e(o,t){const r=o.a/255,s=t+'="'+o.hex+'"';return r<1?s+" "+t+'-opacity="'+r.toFixed(2).slice(1)+'"':s}function i(o,t,r){let s=o+t;return typeof r<"u"&&(s+=" "+r),s}function n(o,t,r){let s="",l=0,d=!1,f=0;for(let g=0;g<o.length;g++){const C=Math.floor(g%t),w=Math.floor(g/t);!C&&!d&&(d=!0),o[g]?(f++,g>0&&C>0&&o[g-1]||(s+=d?i("M",C+r,.5+w+r):i("m",l,0),l=0,d=!1),C+1<t&&o[g+1]||(s+=i("h",f),f=0)):l++}return s}return Gt.render=function(t,r,s){const l=a.getOptions(r),d=t.modules.size,f=t.modules.data,g=d+l.margin*2,C=l.color.light.a?"<path "+e(l.color.light,"fill")+' d="M0 0h'+g+"v"+g+'H0z"/>':"",w="<path "+e(l.color.dark,"stroke")+' d="'+n(f,d,l.margin)+'"/>',L='viewBox="0 0 '+g+" "+g+'"',P='<svg xmlns="http://www.w3.org/2000/svg" '+(l.width?'width="'+l.width+'" height="'+l.width+'" ':"")+L+' shape-rendering="crispEdges">'+C+w+`</svg>
`;return typeof s=="function"&&s(null,P),P},Gt}var Ki;function no(){if(Ki)return Te;Ki=1;const a=zn(),e=eo(),i=to(),n=io();function o(t,r,s,l,d){const f=[].slice.call(arguments,1),g=f.length,C=typeof f[g-1]=="function";if(!C&&!a())throw new Error("Callback required as last argument");if(C){if(g<2)throw new Error("Too few arguments provided");g===2?(d=s,s=r,r=l=void 0):g===3&&(r.getContext&&typeof d>"u"?(d=l,l=void 0):(d=l,l=s,s=r,r=void 0))}else{if(g<1)throw new Error("Too few arguments provided");return g===1?(s=r,r=l=void 0):g===2&&!r.getContext&&(l=s,s=r,r=void 0),new Promise(function(w,L){try{const y=e.create(s,l);w(t(y,r,l))}catch(y){L(y)}})}try{const w=e.create(s,l);d(null,t(w,r,l))}catch(w){d(w)}}return Te.create=e.create,Te.toCanvas=o.bind(null,i.render),Te.toDataURL=o.bind(null,i.renderToDataURL),Te.toString=o.bind(null,function(t,r,s){return n.render(t,s)}),Te}var oo=no();const ro=yn(oo),ao=.1,Hi=2.5,de=7;function Yt(a,e,i){return a===e?!1:(a-e<0?e-a:a-e)<=i+ao}function so(a,e){const i=Array.prototype.slice.call(ro.create(a,{errorCorrectionLevel:e}).modules.data,0),n=Math.sqrt(i.length);return i.reduce((o,t,r)=>(r%n===0?o.push([t]):o[o.length-1].push(t))&&o,[])}const lo={generate({uri:a,size:e,logoSize:i,dotColor:n="#141414"}){const o="transparent",r=[],s=so(a,"Q"),l=e/s.length,d=[{x:0,y:0},{x:1,y:0},{x:0,y:1}];d.forEach(({x:y,y:P})=>{const b=(s.length-de)*l*y,p=(s.length-de)*l*P,m=.45;for(let h=0;h<d.length;h+=1){const z=l*(de-h*2);r.push(Ne`
            <rect
              fill=${h===2?n:o}
              width=${h===0?z-5:z}
              rx= ${h===0?(z-5)*m:z*m}
              ry= ${h===0?(z-5)*m:z*m}
              stroke=${n}
              stroke-width=${h===0?5:0}
              height=${h===0?z-5:z}
              x= ${h===0?p+l*h+5/2:p+l*h}
              y= ${h===0?b+l*h+5/2:b+l*h}
            />
          `)}});const f=Math.floor((i+25)/l),g=s.length/2-f/2,C=s.length/2+f/2-1,w=[];s.forEach((y,P)=>{y.forEach((b,p)=>{if(s[P][p]&&!(P<de&&p<de||P>s.length-(de+1)&&p<de||P<de&&p>s.length-(de+1))&&!(P>g&&P<C&&p>g&&p<C)){const m=P*l+l/2,h=p*l+l/2;w.push([m,h])}})});const L={};return w.forEach(([y,P])=>{var b;L[y]?(b=L[y])==null||b.push(P):L[y]=[P]}),Object.entries(L).map(([y,P])=>{const b=P.filter(p=>P.every(m=>!Yt(p,m,l)));return[Number(y),b]}).forEach(([y,P])=>{P.forEach(b=>{r.push(Ne`<circle cx=${y} cy=${b} fill=${n} r=${l/Hi} />`)})}),Object.entries(L).filter(([y,P])=>P.length>1).map(([y,P])=>{const b=P.filter(p=>P.some(m=>Yt(p,m,l)));return[Number(y),b]}).map(([y,P])=>{P.sort((p,m)=>p<m?-1:1);const b=[];for(const p of P){const m=b.find(h=>h.some(z=>Yt(p,z,l)));m?m.push(p):b.push([p])}return[y,b.map(p=>[p[0],p[p.length-1]])]}).forEach(([y,P])=>{P.forEach(([b,p])=>{r.push(Ne`
              <line
                x1=${y}
                x2=${y}
                y1=${b}
                y2=${p}
                stroke=${n}
                stroke-width=${l/(Hi/2)}
                stroke-linecap="round"
              />
            `)})}),r}},co=N`
  :host {
    position: relative;
    user-select: none;
    display: block;
    overflow: hidden;
    aspect-ratio: 1 / 1;
    width: var(--local-size);
  }

  :host([data-theme='dark']) {
    border-radius: clamp(0px, var(--wui-border-radius-l), 40px);
    background-color: var(--wui-color-inverse-100);
    padding: var(--wui-spacing-l);
  }

  :host([data-theme='light']) {
    box-shadow: 0 0 0 1px var(--wui-color-bg-125);
    background-color: var(--wui-color-bg-125);
  }

  :host([data-clear='true']) > wui-icon {
    display: none;
  }

  svg:first-child,
  wui-image,
  wui-icon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateY(-50%) translateX(-50%);
  }

  wui-image {
    width: 25%;
    height: 25%;
    border-radius: var(--wui-border-radius-xs);
  }

  wui-icon {
    width: 100%;
    height: 100%;
    color: var(--local-icon-color) !important;
    transform: translateY(-50%) translateX(-50%) scale(0.25);
  }
`;var ge=function(a,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,r;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(a,e,i,n);else for(var s=a.length-1;s>=0;s--)(r=a[s])&&(t=(o<3?r(t):o>3?r(e,i,t):r(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};const uo="#3396ff";let ie=class extends O{constructor(){super(...arguments),this.uri="",this.size=0,this.theme="dark",this.imageSrc=void 0,this.alt=void 0,this.arenaClear=void 0,this.farcaster=void 0}render(){return this.dataset.theme=this.theme,this.dataset.clear=String(this.arenaClear),this.style.cssText=`
     --local-size: ${this.size}px;
     --local-icon-color: ${this.color??uo}
    `,c`${this.templateVisual()} ${this.templateSvg()}`}templateSvg(){const e=this.theme==="light"?this.size:this.size-32;return Ne`
      <svg height=${e} width=${e}>
        ${lo.generate({uri:this.uri,size:e,logoSize:this.arenaClear?0:e/4,dotColor:this.color})}
      </svg>
    `}templateVisual(){return this.imageSrc?c`<wui-image src=${this.imageSrc} alt=${this.alt??"logo"}></wui-image>`:this.farcaster?c`<wui-icon
        class="farcaster"
        size="inherit"
        color="inherit"
        name="farcaster"
      ></wui-icon>`:c`<wui-icon size="inherit" color="inherit" name="walletConnect"></wui-icon>`}};ie.styles=[q,co];ge([u()],ie.prototype,"uri",void 0);ge([u({type:Number})],ie.prototype,"size",void 0);ge([u()],ie.prototype,"theme",void 0);ge([u()],ie.prototype,"imageSrc",void 0);ge([u()],ie.prototype,"alt",void 0);ge([u()],ie.prototype,"color",void 0);ge([u({type:Boolean})],ie.prototype,"arenaClear",void 0);ge([u({type:Boolean})],ie.prototype,"farcaster",void 0);ie=ge([T("wui-qr-code")],ie);const ho=N`
  :host {
    display: block;
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-005);
    background: linear-gradient(
      120deg,
      var(--wui-color-bg-200) 5%,
      var(--wui-color-bg-200) 48%,
      var(--wui-color-bg-300) 55%,
      var(--wui-color-bg-300) 60%,
      var(--wui-color-bg-300) calc(60% + 10px),
      var(--wui-color-bg-200) calc(60% + 12px),
      var(--wui-color-bg-200) 100%
    );
    background-size: 250%;
    animation: shimmer 3s linear infinite reverse;
  }

  :host([variant='light']) {
    background: linear-gradient(
      120deg,
      var(--wui-color-bg-150) 5%,
      var(--wui-color-bg-150) 48%,
      var(--wui-color-bg-200) 55%,
      var(--wui-color-bg-200) 60%,
      var(--wui-color-bg-200) calc(60% + 10px),
      var(--wui-color-bg-150) calc(60% + 12px),
      var(--wui-color-bg-150) 100%
    );
    background-size: 250%;
  }

  @keyframes shimmer {
    from {
      background-position: -250% 0;
    }
    to {
      background-position: 250% 0;
    }
  }
`;var He=function(a,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,r;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(a,e,i,n);else for(var s=a.length-1;s>=0;s--)(r=a[s])&&(t=(o<3?r(t):o>3?r(e,i,t):r(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let $e=class extends O{constructor(){super(...arguments),this.width="",this.height="",this.borderRadius="m",this.variant="default"}render(){return this.style.cssText=`
      width: ${this.width};
      height: ${this.height};
      border-radius: ${`clamp(0px,var(--wui-border-radius-${this.borderRadius}), 40px)`};
    `,c`<slot></slot>`}};$e.styles=[ho];He([u()],$e.prototype,"width",void 0);He([u()],$e.prototype,"height",void 0);He([u()],$e.prototype,"borderRadius",void 0);He([u()],$e.prototype,"variant",void 0);$e=He([T("wui-shimmer")],$e);const po="https://reown.com",fo=N`
  .reown-logo {
    height: var(--wui-spacing-xxl);
  }

  a {
    text-decoration: none;
    cursor: pointer;
  }

  a:hover {
    opacity: 0.9;
  }
`;var go=function(a,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,r;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(a,e,i,n);else for(var s=a.length-1;s>=0;s--)(r=a[s])&&(t=(o<3?r(t):o>3?r(e,i,t):r(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let Xt=class extends O{render(){return c`
      <a
        data-testid="ux-branding-reown"
        href=${po}
        rel="noreferrer"
        target="_blank"
        style="text-decoration: none;"
      >
        <wui-flex
          justifyContent="center"
          alignItems="center"
          gap="xs"
          .padding=${["0","0","l","0"]}
        >
          <wui-text variant="small-500" color="fg-100"> UX by </wui-text>
          <wui-icon name="reown" size="xxxl" class="reown-logo"></wui-icon>
        </wui-flex>
      </a>
    `}};Xt.styles=[q,G,fo];Xt=go([T("wui-ux-by-reown")],Xt);const wo=N`
  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  wui-shimmer {
    width: 100%;
    aspect-ratio: 1 / 1;
    border-radius: clamp(0px, var(--wui-border-radius-l), 40px) !important;
  }

  wui-qr-code {
    opacity: 0;
    animation-duration: 200ms;
    animation-timing-function: ease;
    animation-name: fadein;
    animation-fill-mode: forwards;
  }
`;var bo=function(a,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,r;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(a,e,i,n);else for(var s=a.length-1;s>=0;s--)(r=a[s])&&(t=(o<3?r(t):o>3?r(e,i,t):r(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let Zt=class extends F{constructor(){var e;super(),this.forceUpdate=()=>{this.requestUpdate()},window.addEventListener("resize",this.forceUpdate),te.sendEvent({type:"track",event:"SELECT_WALLET",properties:{name:((e=this.wallet)==null?void 0:e.name)??"WalletConnect",platform:"qrcode"}})}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this.unsubscribe)==null||e.forEach(i=>i()),window.removeEventListener("resize",this.forceUpdate)}render(){return this.onRenderProxy(),c`
      <wui-flex
        flexDirection="column"
        alignItems="center"
        .padding=${["0","xl","xl","xl"]}
        gap="xl"
      >
        <wui-shimmer borderRadius="l" width="100%"> ${this.qrCodeTemplate()} </wui-shimmer>

        <wui-text variant="paragraph-500" color="fg-100">
          Scan this QR Code with your phone
        </wui-text>
        ${this.copyTemplate()}
      </wui-flex>
      <w3m-mobile-download-links .wallet=${this.wallet}></w3m-mobile-download-links>
    `}onRenderProxy(){!this.ready&&this.uri&&(this.timeout=setTimeout(()=>{this.ready=!0},200))}qrCodeTemplate(){if(!this.uri||!this.ready)return null;const e=this.getBoundingClientRect().width-40,i=this.wallet?this.wallet.name:void 0;return k.setWcLinking(void 0),k.setRecentWallet(this.wallet),c` <wui-qr-code
      size=${e}
      theme=${Qt.state.themeMode}
      uri=${this.uri}
      imageSrc=${W(K.getWalletImage(this.wallet))}
      color=${W(Qt.state.themeVariables["--w3m-qr-color"])}
      alt=${W(i)}
      data-testid="wui-qr-code"
    ></wui-qr-code>`}copyTemplate(){const e=!this.uri||!this.ready;return c`<wui-link
      .disabled=${e}
      @click=${this.onCopyUri}
      color="fg-200"
      data-testid="copy-wc2-uri"
    >
      <wui-icon size="xs" color="fg-200" slot="iconLeft" name="copy"></wui-icon>
      Copy link
    </wui-link>`}};Zt.styles=wo;Zt=bo([T("w3m-connecting-wc-qrcode")],Zt);var mo=function(a,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,r;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(a,e,i,n);else for(var s=a.length-1;s>=0;s--)(r=a[s])&&(t=(o<3?r(t):o>3?r(e,i,t):r(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let Gi=class extends O{constructor(){var e;if(super(),this.wallet=(e=U.state.data)==null?void 0:e.wallet,!this.wallet)throw new Error("w3m-connecting-wc-unsupported: No wallet provided");te.sendEvent({type:"track",event:"SELECT_WALLET",properties:{name:this.wallet.name,platform:"browser"}})}render(){return c`
      <wui-flex
        flexDirection="column"
        alignItems="center"
        .padding=${["3xl","xl","xl","xl"]}
        gap="xl"
      >
        <wui-wallet-image
          size="lg"
          imageSrc=${W(K.getWalletImage(this.wallet))}
        ></wui-wallet-image>

        <wui-text variant="paragraph-500" color="fg-100">Not Detected</wui-text>
      </wui-flex>

      <w3m-mobile-download-links .wallet=${this.wallet}></w3m-mobile-download-links>
    `}};Gi=mo([T("w3m-connecting-wc-unsupported")],Gi);var sn=function(a,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,r;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(a,e,i,n);else for(var s=a.length-1;s>=0;s--)(r=a[s])&&(t=(o<3?r(t):o>3?r(e,i,t):r(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let ei=class extends F{constructor(){if(super(),this.isLoading=!0,!this.wallet)throw new Error("w3m-connecting-wc-web: No wallet provided");this.onConnect=this.onConnectProxy.bind(this),this.secondaryBtnLabel="Open",this.secondaryLabel=Xi.CONNECT_LABELS.MOBILE,this.secondaryBtnIcon="externalLink",this.updateLoadingState(),this.unsubscribe.push(k.subscribeKey("wcUri",()=>{this.updateLoadingState()})),te.sendEvent({type:"track",event:"SELECT_WALLET",properties:{name:this.wallet.name,platform:"web"}})}updateLoadingState(){this.isLoading=!this.uri}onConnectProxy(){var e;if((e=this.wallet)!=null&&e.webapp_link&&this.uri)try{this.error=!1;const{webapp_link:i,name:n}=this.wallet,{redirect:o,href:t}=j.formatUniversalUrl(i,this.uri);k.setWcLinking({name:n,href:t}),k.setRecentWallet(this.wallet),j.openHref(o,"_blank")}catch{this.error=!0}}};sn([I()],ei.prototype,"isLoading",void 0);ei=sn([T("w3m-connecting-wc-web")],ei);var Ge=function(a,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,r;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(a,e,i,n);else for(var s=a.length-1;s>=0;s--)(r=a[s])&&(t=(o<3?r(t):o>3?r(e,i,t):r(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let Le=class extends O{constructor(){var e;super(),this.wallet=(e=U.state.data)==null?void 0:e.wallet,this.unsubscribe=[],this.platform=void 0,this.platforms=[],this.isSiwxEnabled=!!ee.state.siwx,this.remoteFeatures=ee.state.remoteFeatures,this.determinePlatforms(),this.initializeConnection(),this.unsubscribe.push(ee.subscribeKey("remoteFeatures",i=>this.remoteFeatures=i))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){return c`
      ${this.headerTemplate()}
      <div>${this.platformTemplate()}</div>
      ${this.reownBrandingTemplate()}
    `}reownBrandingTemplate(){var e;return(e=this.remoteFeatures)!=null&&e.reownBranding?c`<wui-ux-by-reown></wui-ux-by-reown>`:null}async initializeConnection(e=!1){if(!(this.platform==="browser"||ee.state.manualWCControl&&!e))try{const{wcPairingExpiry:i,status:n}=k.state;(e||ee.state.enableEmbedded||j.isPairingExpired(i)||n==="connecting")&&(await k.connectWalletConnect(),this.isSiwxEnabled||Qi.close())}catch(i){te.sendEvent({type:"track",event:"CONNECT_ERROR",properties:{message:(i==null?void 0:i.message)??"Unknown"}}),k.setWcError(!0),Xe.showError(i.message??"Connection error"),k.resetWcConnection(),U.goBack()}}determinePlatforms(){if(!this.wallet){this.platforms.push("qrcode"),this.platform="qrcode";return}if(this.platform)return;const{mobile_link:e,desktop_link:i,webapp_link:n,injected:o,rdns:t}=this.wallet,r=o==null?void 0:o.map(({injected_id:L})=>L).filter(Boolean),s=[...t?[t]:r??[]],l=ee.state.isUniversalProvider?!1:s.length,d=e,f=n,g=k.checkInstalled(s),C=l&&g,w=i&&!j.isMobile();C&&!Jt.state.noAdapters&&this.platforms.push("browser"),d&&this.platforms.push(j.isMobile()?"mobile":"qrcode"),f&&this.platforms.push("web"),w&&this.platforms.push("desktop"),!C&&l&&!Jt.state.noAdapters&&this.platforms.push("unsupported"),this.platform=this.platforms[0]}platformTemplate(){switch(this.platform){case"browser":return c`<w3m-connecting-wc-browser></w3m-connecting-wc-browser>`;case"web":return c`<w3m-connecting-wc-web></w3m-connecting-wc-web>`;case"desktop":return c`
          <w3m-connecting-wc-desktop .onRetry=${()=>this.initializeConnection(!0)}>
          </w3m-connecting-wc-desktop>
        `;case"mobile":return c`
          <w3m-connecting-wc-mobile isMobile .onRetry=${()=>this.initializeConnection(!0)}>
          </w3m-connecting-wc-mobile>
        `;case"qrcode":return c`<w3m-connecting-wc-qrcode></w3m-connecting-wc-qrcode>`;default:return c`<w3m-connecting-wc-unsupported></w3m-connecting-wc-unsupported>`}}headerTemplate(){return this.platforms.length>1?c`
      <w3m-connecting-header
        .platforms=${this.platforms}
        .onSelectPlatfrom=${this.onSelectPlatform.bind(this)}
      >
      </w3m-connecting-header>
    `:null}async onSelectPlatform(e){var n;const i=(n=this.shadowRoot)==null?void 0:n.querySelector("div");i&&(await i.animate([{opacity:1},{opacity:0}],{duration:200,fill:"forwards",easing:"ease"}).finished,this.platform=e,i.animate([{opacity:0},{opacity:1}],{duration:200,fill:"forwards",easing:"ease"}))}};Ge([I()],Le.prototype,"platform",void 0);Ge([I()],Le.prototype,"platforms",void 0);Ge([I()],Le.prototype,"isSiwxEnabled",void 0);Ge([I()],Le.prototype,"remoteFeatures",void 0);Le=Ge([T("w3m-connecting-wc-view")],Le);var ln=function(a,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,r;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(a,e,i,n);else for(var s=a.length-1;s>=0;s--)(r=a[s])&&(t=(o<3?r(t):o>3?r(e,i,t):r(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let ti=class extends O{constructor(){super(...arguments),this.isMobile=j.isMobile()}render(){if(this.isMobile){const{featured:e,recommended:i}=D.state,{customWallets:n}=ee.state,o=pt.getRecentWallets(),t=e.length||i.length||(n==null?void 0:n.length)||o.length;return c`<wui-flex
        flexDirection="column"
        gap="xs"
        .margin=${["3xs","s","s","s"]}
      >
        ${t?c`<w3m-connector-list></w3m-connector-list>`:null}
        <w3m-all-wallets-widget></w3m-all-wallets-widget>
      </wui-flex>`}return c`<wui-flex flexDirection="column" .padding=${["0","0","l","0"]}>
      <w3m-connecting-wc-view></w3m-connecting-wc-view>
      <wui-flex flexDirection="column" .padding=${["0","m","0","m"]}>
        <w3m-all-wallets-widget></w3m-all-wallets-widget> </wui-flex
    ></wui-flex>`}};ln([I()],ti.prototype,"isMobile",void 0);ti=ln([T("w3m-connecting-wc-basic-view")],ti);const vo=N`
  :host {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  label {
    position: relative;
    display: inline-block;
    width: 32px;
    height: 22px;
  }

  input {
    width: 0;
    height: 0;
    opacity: 0;
  }

  span {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: var(--wui-color-blue-100);
    border-width: 1px;
    border-style: solid;
    border-color: var(--wui-color-gray-glass-002);
    border-radius: 999px;
    transition:
      background-color var(--wui-ease-inout-power-1) var(--wui-duration-md),
      border-color var(--wui-ease-inout-power-1) var(--wui-duration-md);
    will-change: background-color, border-color;
  }

  span:before {
    position: absolute;
    content: '';
    height: 16px;
    width: 16px;
    left: 3px;
    top: 2px;
    background-color: var(--wui-color-inverse-100);
    transition: transform var(--wui-ease-inout-power-1) var(--wui-duration-lg);
    will-change: transform;
    border-radius: 50%;
  }

  input:checked + span {
    border-color: var(--wui-color-gray-glass-005);
    background-color: var(--wui-color-blue-100);
  }

  input:not(:checked) + span {
    background-color: var(--wui-color-gray-glass-010);
  }

  input:checked + span:before {
    transform: translateX(calc(100% - 7px));
  }
`;var cn=function(a,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,r;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(a,e,i,n);else for(var s=a.length-1;s>=0;s--)(r=a[s])&&(t=(o<3?r(t):o>3?r(e,i,t):r(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let lt=class extends O{constructor(){super(...arguments),this.inputElementRef=ni(),this.checked=void 0}render(){return c`
      <label>
        <input
          ${oi(this.inputElementRef)}
          type="checkbox"
          ?checked=${W(this.checked)}
          @change=${this.dispatchChangeEvent.bind(this)}
        />
        <span></span>
      </label>
    `}dispatchChangeEvent(){var e;this.dispatchEvent(new CustomEvent("switchChange",{detail:(e=this.inputElementRef.value)==null?void 0:e.checked,bubbles:!0,composed:!0}))}};lt.styles=[q,G,mn,vo];cn([u({type:Boolean})],lt.prototype,"checked",void 0);lt=cn([T("wui-switch")],lt);const yo=N`
  :host {
    height: 100%;
  }

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    column-gap: var(--wui-spacing-1xs);
    padding: var(--wui-spacing-xs) var(--wui-spacing-s);
    background-color: var(--wui-color-gray-glass-002);
    border-radius: var(--wui-border-radius-xs);
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-002);
    transition: background-color var(--wui-ease-out-power-1) var(--wui-duration-md);
    will-change: background-color;
    cursor: pointer;
  }

  wui-switch {
    pointer-events: none;
  }
`;var un=function(a,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,r;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(a,e,i,n);else for(var s=a.length-1;s>=0;s--)(r=a[s])&&(t=(o<3?r(t):o>3?r(e,i,t):r(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let ct=class extends O{constructor(){super(...arguments),this.checked=void 0}render(){return c`
      <button>
        <wui-icon size="xl" name="walletConnectBrown"></wui-icon>
        <wui-switch ?checked=${W(this.checked)}></wui-switch>
      </button>
    `}};ct.styles=[q,G,yo];un([u({type:Boolean})],ct.prototype,"checked",void 0);ct=un([T("wui-certified-switch")],ct);const xo=N`
  button {
    background-color: var(--wui-color-fg-300);
    border-radius: var(--wui-border-radius-4xs);
    width: 16px;
    height: 16px;
  }

  button:disabled {
    background-color: var(--wui-color-bg-300);
  }

  wui-icon {
    color: var(--wui-color-bg-200) !important;
  }

  button:focus-visible {
    background-color: var(--wui-color-fg-250);
    border: 1px solid var(--wui-color-accent-100);
  }

  @media (hover: hover) and (pointer: fine) {
    button:hover:enabled {
      background-color: var(--wui-color-fg-250);
    }

    button:active:enabled {
      background-color: var(--wui-color-fg-225);
    }
  }
`;var dn=function(a,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,r;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(a,e,i,n);else for(var s=a.length-1;s>=0;s--)(r=a[s])&&(t=(o<3?r(t):o>3?r(e,i,t):r(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let ut=class extends O{constructor(){super(...arguments),this.icon="copy"}render(){return c`
      <button>
        <wui-icon color="inherit" size="xxs" name=${this.icon}></wui-icon>
      </button>
    `}};ut.styles=[q,G,xo];dn([u()],ut.prototype,"icon",void 0);ut=dn([T("wui-input-element")],ut);const Co=N`
  :host {
    position: relative;
    width: 100%;
    display: inline-block;
    color: var(--wui-color-fg-275);
  }

  input {
    width: 100%;
    border-radius: var(--wui-border-radius-xs);
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-002);
    background: var(--wui-color-gray-glass-002);
    font-size: var(--wui-font-size-paragraph);
    letter-spacing: var(--wui-letter-spacing-paragraph);
    color: var(--wui-color-fg-100);
    transition:
      background-color var(--wui-ease-inout-power-1) var(--wui-duration-md),
      border-color var(--wui-ease-inout-power-1) var(--wui-duration-md),
      box-shadow var(--wui-ease-inout-power-1) var(--wui-duration-md);
    will-change: background-color, border-color, box-shadow;
    caret-color: var(--wui-color-accent-100);
  }

  input:disabled {
    cursor: not-allowed;
    border: 1px solid var(--wui-color-gray-glass-010);
  }

  input:disabled::placeholder,
  input:disabled + wui-icon {
    color: var(--wui-color-fg-300);
  }

  input::placeholder {
    color: var(--wui-color-fg-275);
  }

  input:focus:enabled {
    background-color: var(--wui-color-gray-glass-005);
    -webkit-box-shadow:
      inset 0 0 0 1px var(--wui-color-accent-100),
      0px 0px 0px 4px var(--wui-box-shadow-blue);
    -moz-box-shadow:
      inset 0 0 0 1px var(--wui-color-accent-100),
      0px 0px 0px 4px var(--wui-box-shadow-blue);
    box-shadow:
      inset 0 0 0 1px var(--wui-color-accent-100),
      0px 0px 0px 4px var(--wui-box-shadow-blue);
  }

  input:hover:enabled {
    background-color: var(--wui-color-gray-glass-005);
  }

  wui-icon {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
  }

  .wui-size-sm {
    padding: 9px var(--wui-spacing-m) 10px var(--wui-spacing-s);
  }

  wui-icon + .wui-size-sm {
    padding: 9px var(--wui-spacing-m) 10px 36px;
  }

  wui-icon[data-input='sm'] {
    left: var(--wui-spacing-s);
  }

  .wui-size-md {
    padding: 15px var(--wui-spacing-m) var(--wui-spacing-l) var(--wui-spacing-m);
  }

  wui-icon + .wui-size-md,
  wui-loading-spinner + .wui-size-md {
    padding: 10.5px var(--wui-spacing-3xl) 10.5px var(--wui-spacing-3xl);
  }

  wui-icon[data-input='md'] {
    left: var(--wui-spacing-l);
  }

  .wui-size-lg {
    padding: var(--wui-spacing-s) var(--wui-spacing-s) var(--wui-spacing-s) var(--wui-spacing-l);
    letter-spacing: var(--wui-letter-spacing-medium-title);
    font-size: var(--wui-font-size-medium-title);
    font-weight: var(--wui-font-weight-light);
    line-height: 130%;
    color: var(--wui-color-fg-100);
    height: 64px;
  }

  .wui-padding-right-xs {
    padding-right: var(--wui-spacing-xs);
  }

  .wui-padding-right-s {
    padding-right: var(--wui-spacing-s);
  }

  .wui-padding-right-m {
    padding-right: var(--wui-spacing-m);
  }

  .wui-padding-right-l {
    padding-right: var(--wui-spacing-l);
  }

  .wui-padding-right-xl {
    padding-right: var(--wui-spacing-xl);
  }

  .wui-padding-right-2xl {
    padding-right: var(--wui-spacing-2xl);
  }

  .wui-padding-right-3xl {
    padding-right: var(--wui-spacing-3xl);
  }

  .wui-padding-right-4xl {
    padding-right: var(--wui-spacing-4xl);
  }

  .wui-padding-right-5xl {
    padding-right: var(--wui-spacing-5xl);
  }

  wui-icon + .wui-size-lg,
  wui-loading-spinner + .wui-size-lg {
    padding-left: 50px;
  }

  wui-icon[data-input='lg'] {
    left: var(--wui-spacing-l);
  }

  .wui-size-mdl {
    padding: 17.25px var(--wui-spacing-m) 17.25px var(--wui-spacing-m);
  }
  wui-icon + .wui-size-mdl,
  wui-loading-spinner + .wui-size-mdl {
    padding: 17.25px var(--wui-spacing-3xl) 17.25px 40px;
  }
  wui-icon[data-input='mdl'] {
    left: var(--wui-spacing-m);
  }

  input:placeholder-shown ~ ::slotted(wui-input-element),
  input:placeholder-shown ~ ::slotted(wui-icon) {
    opacity: 0;
    pointer-events: none;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type='number'] {
    -moz-appearance: textfield;
  }

  ::slotted(wui-input-element),
  ::slotted(wui-icon) {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }

  ::slotted(wui-input-element) {
    right: var(--wui-spacing-m);
  }

  ::slotted(wui-icon) {
    right: 0px;
  }
`;var le=function(a,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,r;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(a,e,i,n);else for(var s=a.length-1;s>=0;s--)(r=a[s])&&(t=(o<3?r(t):o>3?r(e,i,t):r(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let X=class extends O{constructor(){super(...arguments),this.inputElementRef=ni(),this.size="md",this.disabled=!1,this.placeholder="",this.type="text",this.value=""}render(){const e=`wui-padding-right-${this.inputRightPadding}`,n={[`wui-size-${this.size}`]:!0,[e]:!!this.inputRightPadding};return c`${this.templateIcon()}
      <input
        data-testid="wui-input-text"
        ${oi(this.inputElementRef)}
        class=${wn(n)}
        type=${this.type}
        enterkeyhint=${W(this.enterKeyHint)}
        ?disabled=${this.disabled}
        placeholder=${this.placeholder}
        @input=${this.dispatchInputChangeEvent.bind(this)}
        .value=${this.value||""}
        tabindex=${W(this.tabIdx)}
      />
      <slot></slot>`}templateIcon(){return this.icon?c`<wui-icon
        data-input=${this.size}
        size=${this.size}
        color="inherit"
        name=${this.icon}
      ></wui-icon>`:null}dispatchInputChangeEvent(){var e;this.dispatchEvent(new CustomEvent("inputChange",{detail:(e=this.inputElementRef.value)==null?void 0:e.value,bubbles:!0,composed:!0}))}};X.styles=[q,G,Co];le([u()],X.prototype,"size",void 0);le([u()],X.prototype,"icon",void 0);le([u({type:Boolean})],X.prototype,"disabled",void 0);le([u()],X.prototype,"placeholder",void 0);le([u()],X.prototype,"type",void 0);le([u()],X.prototype,"keyHint",void 0);le([u()],X.prototype,"value",void 0);le([u()],X.prototype,"inputRightPadding",void 0);le([u()],X.prototype,"tabIdx",void 0);X=le([T("wui-input-text")],X);const $o=N`
  :host {
    position: relative;
    display: inline-block;
    width: 100%;
  }
`;var Ro=function(a,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,r;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(a,e,i,n);else for(var s=a.length-1;s>=0;s--)(r=a[s])&&(t=(o<3?r(t):o>3?r(e,i,t):r(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let ii=class extends O{constructor(){super(...arguments),this.inputComponentRef=ni()}render(){return c`
      <wui-input-text
        ${oi(this.inputComponentRef)}
        placeholder="Search wallet"
        icon="search"
        type="search"
        enterKeyHint="search"
        size="sm"
      >
        <wui-input-element @click=${this.clearValue} icon="close"></wui-input-element>
      </wui-input-text>
    `}clearValue(){const e=this.inputComponentRef.value,i=e==null?void 0:e.inputElementRef.value;i&&(i.value="",i.focus(),i.dispatchEvent(new Event("input")))}};ii.styles=[q,$o];ii=Ro([T("wui-search-bar")],ii);const Io=Ne`<svg  viewBox="0 0 48 54" fill="none">
  <path
    d="M43.4605 10.7248L28.0485 1.61089C25.5438 0.129705 22.4562 0.129705 19.9515 1.61088L4.53951 10.7248C2.03626 12.2051 0.5 14.9365 0.5 17.886V36.1139C0.5 39.0635 2.03626 41.7949 4.53951 43.2752L19.9515 52.3891C22.4562 53.8703 25.5438 53.8703 28.0485 52.3891L43.4605 43.2752C45.9637 41.7949 47.5 39.0635 47.5 36.114V17.8861C47.5 14.9365 45.9637 12.2051 43.4605 10.7248Z"
  />
</svg>`,Eo=N`
  :host {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 104px;
    row-gap: var(--wui-spacing-xs);
    padding: var(--wui-spacing-xs) 10px;
    background-color: var(--wui-color-gray-glass-002);
    border-radius: clamp(0px, var(--wui-border-radius-xs), 20px);
    position: relative;
  }

  wui-shimmer[data-type='network'] {
    border: none;
    -webkit-clip-path: var(--wui-path-network);
    clip-path: var(--wui-path-network);
  }

  svg {
    position: absolute;
    width: 48px;
    height: 54px;
    z-index: 1;
  }

  svg > path {
    stroke: var(--wui-color-gray-glass-010);
    stroke-width: 1px;
  }

  @media (max-width: 350px) {
    :host {
      width: 100%;
    }
  }
`;var hn=function(a,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,r;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(a,e,i,n);else for(var s=a.length-1;s>=0;s--)(r=a[s])&&(t=(o<3?r(t):o>3?r(e,i,t):r(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let dt=class extends O{constructor(){super(...arguments),this.type="wallet"}render(){return c`
      ${this.shimmerTemplate()}
      <wui-shimmer width="56px" height="20px" borderRadius="xs"></wui-shimmer>
    `}shimmerTemplate(){return this.type==="network"?c` <wui-shimmer
          data-type=${this.type}
          width="48px"
          height="54px"
          borderRadius="xs"
        ></wui-shimmer>
        ${Io}`:c`<wui-shimmer width="56px" height="56px" borderRadius="xs"></wui-shimmer>`}};dt.styles=[q,G,Eo];hn([u()],dt.prototype,"type",void 0);dt=hn([T("wui-card-select-loader")],dt);const Wo=N`
  :host {
    display: grid;
    width: inherit;
    height: inherit;
  }
`;var Z=function(a,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,r;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(a,e,i,n);else for(var s=a.length-1;s>=0;s--)(r=a[s])&&(t=(o<3?r(t):o>3?r(e,i,t):r(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let H=class extends O{render(){return this.style.cssText=`
      grid-template-rows: ${this.gridTemplateRows};
      grid-template-columns: ${this.gridTemplateColumns};
      justify-items: ${this.justifyItems};
      align-items: ${this.alignItems};
      justify-content: ${this.justifyContent};
      align-content: ${this.alignContent};
      column-gap: ${this.columnGap&&`var(--wui-spacing-${this.columnGap})`};
      row-gap: ${this.rowGap&&`var(--wui-spacing-${this.rowGap})`};
      gap: ${this.gap&&`var(--wui-spacing-${this.gap})`};
      padding-top: ${this.padding&&he.getSpacingStyles(this.padding,0)};
      padding-right: ${this.padding&&he.getSpacingStyles(this.padding,1)};
      padding-bottom: ${this.padding&&he.getSpacingStyles(this.padding,2)};
      padding-left: ${this.padding&&he.getSpacingStyles(this.padding,3)};
      margin-top: ${this.margin&&he.getSpacingStyles(this.margin,0)};
      margin-right: ${this.margin&&he.getSpacingStyles(this.margin,1)};
      margin-bottom: ${this.margin&&he.getSpacingStyles(this.margin,2)};
      margin-left: ${this.margin&&he.getSpacingStyles(this.margin,3)};
    `,c`<slot></slot>`}};H.styles=[q,Wo];Z([u()],H.prototype,"gridTemplateRows",void 0);Z([u()],H.prototype,"gridTemplateColumns",void 0);Z([u()],H.prototype,"justifyItems",void 0);Z([u()],H.prototype,"alignItems",void 0);Z([u()],H.prototype,"justifyContent",void 0);Z([u()],H.prototype,"alignContent",void 0);Z([u()],H.prototype,"columnGap",void 0);Z([u()],H.prototype,"rowGap",void 0);Z([u()],H.prototype,"gap",void 0);Z([u()],H.prototype,"padding",void 0);Z([u()],H.prototype,"margin",void 0);H=Z([T("wui-grid")],H);const _o=N`
  button {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    width: 104px;
    row-gap: var(--wui-spacing-xs);
    padding: var(--wui-spacing-s) var(--wui-spacing-0);
    background-color: var(--wui-color-gray-glass-002);
    border-radius: clamp(0px, var(--wui-border-radius-xs), 20px);
    transition:
      color var(--wui-duration-lg) var(--wui-ease-out-power-1),
      background-color var(--wui-duration-lg) var(--wui-ease-out-power-1),
      border-radius var(--wui-duration-lg) var(--wui-ease-out-power-1);
    will-change: background-color, color, border-radius;
    outline: none;
    border: none;
  }

  button > wui-flex > wui-text {
    color: var(--wui-color-fg-100);
    max-width: 86px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    justify-content: center;
  }

  button > wui-flex > wui-text.certified {
    max-width: 66px;
  }

  button:hover:enabled {
    background-color: var(--wui-color-gray-glass-005);
  }

  button:disabled > wui-flex > wui-text {
    color: var(--wui-color-gray-glass-015);
  }

  [data-selected='true'] {
    background-color: var(--wui-color-accent-glass-020);
  }

  @media (hover: hover) and (pointer: fine) {
    [data-selected='true']:hover:enabled {
      background-color: var(--wui-color-accent-glass-015);
    }
  }

  [data-selected='true']:active:enabled {
    background-color: var(--wui-color-accent-glass-010);
  }

  @media (max-width: 350px) {
    button {
      width: 100%;
    }
  }
`;var Ye=function(a,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,r;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(a,e,i,n);else for(var s=a.length-1;s>=0;s--)(r=a[s])&&(t=(o<3?r(t):o>3?r(e,i,t):r(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let Re=class extends O{constructor(){super(),this.observer=new IntersectionObserver(()=>{}),this.visible=!1,this.imageSrc=void 0,this.imageLoading=!1,this.wallet=void 0,this.observer=new IntersectionObserver(e=>{e.forEach(i=>{i.isIntersecting?(this.visible=!0,this.fetchImageSrc()):this.visible=!1})},{threshold:.01})}firstUpdated(){this.observer.observe(this)}disconnectedCallback(){this.observer.disconnect()}render(){var i,n;const e=((i=this.wallet)==null?void 0:i.badge_type)==="certified";return c`
      <button>
        ${this.imageTemplate()}
        <wui-flex flexDirection="row" alignItems="center" justifyContent="center" gap="3xs">
          <wui-text
            variant="tiny-500"
            color="inherit"
            class=${W(e?"certified":void 0)}
            >${(n=this.wallet)==null?void 0:n.name}</wui-text
          >
          ${e?c`<wui-icon size="sm" name="walletConnectBrown"></wui-icon>`:null}
        </wui-flex>
      </button>
    `}imageTemplate(){var e,i;return!this.visible&&!this.imageSrc||this.imageLoading?this.shimmerTemplate():c`
      <wui-wallet-image
        size="md"
        imageSrc=${W(this.imageSrc)}
        name=${(e=this.wallet)==null?void 0:e.name}
        .installed=${(i=this.wallet)==null?void 0:i.installed}
        badgeSize="sm"
      >
      </wui-wallet-image>
    `}shimmerTemplate(){return c`<wui-shimmer width="56px" height="56px" borderRadius="xs"></wui-shimmer>`}async fetchImageSrc(){this.wallet&&(this.imageSrc=K.getWalletImage(this.wallet),!this.imageSrc&&(this.imageLoading=!0,this.imageSrc=await K.fetchWalletImage(this.wallet.image_id),this.imageLoading=!1))}};Re.styles=_o;Ye([I()],Re.prototype,"visible",void 0);Ye([I()],Re.prototype,"imageSrc",void 0);Ye([I()],Re.prototype,"imageLoading",void 0);Ye([u()],Re.prototype,"wallet",void 0);Re=Ye([T("w3m-all-wallets-list-item")],Re);const So=N`
  wui-grid {
    max-height: clamp(360px, 400px, 80vh);
    overflow: scroll;
    scrollbar-width: none;
    grid-auto-rows: min-content;
    grid-template-columns: repeat(auto-fill, 104px);
  }

  @media (max-width: 350px) {
    wui-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  wui-grid[data-scroll='false'] {
    overflow: hidden;
  }

  wui-grid::-webkit-scrollbar {
    display: none;
  }

  wui-loading-spinner {
    padding-top: var(--wui-spacing-l);
    padding-bottom: var(--wui-spacing-l);
    justify-content: center;
    grid-column: 1 / span 4;
  }
`;var ke=function(a,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,r;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(a,e,i,n);else for(var s=a.length-1;s>=0;s--)(r=a[s])&&(t=(o<3?r(t):o>3?r(e,i,t):r(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};const Yi="local-paginator";let me=class extends O{constructor(){super(),this.unsubscribe=[],this.paginationObserver=void 0,this.loading=!D.state.wallets.length,this.wallets=D.state.wallets,this.recommended=D.state.recommended,this.featured=D.state.featured,this.filteredWallets=D.state.filteredWallets,this.unsubscribe.push(D.subscribeKey("wallets",e=>this.wallets=e),D.subscribeKey("recommended",e=>this.recommended=e),D.subscribeKey("featured",e=>this.featured=e),D.subscribeKey("filteredWallets",e=>this.filteredWallets=e))}firstUpdated(){this.initialFetch(),this.createPaginationObserver()}disconnectedCallback(){var e;this.unsubscribe.forEach(i=>i()),(e=this.paginationObserver)==null||e.disconnect()}render(){return c`
      <wui-grid
        data-scroll=${!this.loading}
        .padding=${["0","s","s","s"]}
        columnGap="xxs"
        rowGap="l"
        justifyContent="space-between"
      >
        ${this.loading?this.shimmerTemplate(16):this.walletsTemplate()}
        ${this.paginationLoaderTemplate()}
      </wui-grid>
    `}async initialFetch(){var i;this.loading=!0;const e=(i=this.shadowRoot)==null?void 0:i.querySelector("wui-grid");e&&(await D.fetchWalletsByPage({page:1}),await e.animate([{opacity:1},{opacity:0}],{duration:200,fill:"forwards",easing:"ease"}).finished,this.loading=!1,e.animate([{opacity:0},{opacity:1}],{duration:200,fill:"forwards",easing:"ease"}))}shimmerTemplate(e,i){return[...Array(e)].map(()=>c`
        <wui-card-select-loader type="wallet" id=${W(i)}></wui-card-select-loader>
      `)}walletsTemplate(){var n;const e=((n=this.filteredWallets)==null?void 0:n.length)>0?j.uniqueBy([...this.featured,...this.recommended,...this.filteredWallets],"id"):j.uniqueBy([...this.featured,...this.recommended,...this.wallets],"id");return ft.markWalletsAsInstalled(e).map(o=>c`
        <w3m-all-wallets-list-item
          @click=${()=>this.onConnectWallet(o)}
          .wallet=${o}
        ></w3m-all-wallets-list-item>
      `)}paginationLoaderTemplate(){const{wallets:e,recommended:i,featured:n,count:o}=D.state,t=window.innerWidth<352?3:4,r=e.length+i.length;let l=Math.ceil(r/t)*t-r+t;return l-=e.length?n.length%t:0,o===0&&n.length>0?null:o===0||[...n,...e,...i].length<o?this.shimmerTemplate(l,Yi):null}createPaginationObserver(){var i;const e=(i=this.shadowRoot)==null?void 0:i.querySelector(`#${Yi}`);e&&(this.paginationObserver=new IntersectionObserver(([n])=>{if(n!=null&&n.isIntersecting&&!this.loading){const{page:o,count:t,wallets:r}=D.state;r.length<t&&D.fetchWalletsByPage({page:o+1})}}),this.paginationObserver.observe(e))}onConnectWallet(e){M.selectWalletConnector(e)}};me.styles=So;ke([I()],me.prototype,"loading",void 0);ke([I()],me.prototype,"wallets",void 0);ke([I()],me.prototype,"recommended",void 0);ke([I()],me.prototype,"featured",void 0);ke([I()],me.prototype,"filteredWallets",void 0);me=ke([T("w3m-all-wallets-list")],me);const To=N`
  wui-grid,
  wui-loading-spinner,
  wui-flex {
    height: 360px;
  }

  wui-grid {
    overflow: scroll;
    scrollbar-width: none;
    grid-auto-rows: min-content;
    grid-template-columns: repeat(auto-fill, 104px);
  }

  wui-grid[data-scroll='false'] {
    overflow: hidden;
  }

  wui-grid::-webkit-scrollbar {
    display: none;
  }

  wui-loading-spinner {
    justify-content: center;
    align-items: center;
  }

  @media (max-width: 350px) {
    wui-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
`;var xt=function(a,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,r;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(a,e,i,n);else for(var s=a.length-1;s>=0;s--)(r=a[s])&&(t=(o<3?r(t):o>3?r(e,i,t):r(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let Oe=class extends O{constructor(){super(...arguments),this.prevQuery="",this.prevBadge=void 0,this.loading=!0,this.query=""}render(){return this.onSearch(),this.loading?c`<wui-loading-spinner color="accent-100"></wui-loading-spinner>`:this.walletsTemplate()}async onSearch(){(this.query.trim()!==this.prevQuery.trim()||this.badge!==this.prevBadge)&&(this.prevQuery=this.query,this.prevBadge=this.badge,this.loading=!0,await D.searchWallet({search:this.query,badge:this.badge}),this.loading=!1)}walletsTemplate(){const{search:e}=D.state,i=ft.markWalletsAsInstalled(e);return e.length?c`
      <wui-grid
        data-testid="wallet-list"
        .padding=${["0","s","s","s"]}
        rowGap="l"
        columnGap="xs"
        justifyContent="space-between"
      >
        ${i.map(n=>c`
            <w3m-all-wallets-list-item
              @click=${()=>this.onConnectWallet(n)}
              .wallet=${n}
              data-testid="wallet-search-item-${n.id}"
            ></w3m-all-wallets-list-item>
          `)}
      </wui-grid>
    `:c`
        <wui-flex
          data-testid="no-wallet-found"
          justifyContent="center"
          alignItems="center"
          gap="s"
          flexDirection="column"
        >
          <wui-icon-box
            size="lg"
            iconColor="fg-200"
            backgroundColor="fg-300"
            icon="wallet"
            background="transparent"
          ></wui-icon-box>
          <wui-text data-testid="no-wallet-found-text" color="fg-200" variant="paragraph-500">
            No Wallet found
          </wui-text>
        </wui-flex>
      `}onConnectWallet(e){M.selectWalletConnector(e)}};Oe.styles=To;xt([I()],Oe.prototype,"loading",void 0);xt([u()],Oe.prototype,"query",void 0);xt([u()],Oe.prototype,"badge",void 0);Oe=xt([T("w3m-all-wallets-search")],Oe);var hi=function(a,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,r;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(a,e,i,n);else for(var s=a.length-1;s>=0;s--)(r=a[s])&&(t=(o<3?r(t):o>3?r(e,i,t):r(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let ht=class extends O{constructor(){super(...arguments),this.search="",this.onDebouncedSearch=j.debounce(e=>{this.search=e})}render(){const e=this.search.length>=2;return c`
      <wui-flex .padding=${["0","s","s","s"]} gap="xs">
        <wui-search-bar @inputChange=${this.onInputChange.bind(this)}></wui-search-bar>
        <wui-certified-switch
          ?checked=${this.badge}
          @click=${this.onClick.bind(this)}
          data-testid="wui-certified-switch"
        ></wui-certified-switch>
        ${this.qrButtonTemplate()}
      </wui-flex>
      ${e||this.badge?c`<w3m-all-wallets-search
            query=${this.search}
            badge=${W(this.badge)}
          ></w3m-all-wallets-search>`:c`<w3m-all-wallets-list badge=${W(this.badge)}></w3m-all-wallets-list>`}
    `}onInputChange(e){this.onDebouncedSearch(e.detail)}onClick(){if(this.badge==="certified"){this.badge=void 0;return}this.badge="certified",Xe.showSvg("Only WalletConnect certified",{icon:"walletConnectBrown",iconColor:"accent-100"})}qrButtonTemplate(){return j.isMobile()?c`
        <wui-icon-box
          size="lg"
          iconSize="xl"
          iconColor="accent-100"
          backgroundColor="accent-100"
          icon="qrCode"
          background="transparent"
          border
          borderColor="wui-accent-glass-010"
          @click=${this.onWalletConnectQr.bind(this)}
        ></wui-icon-box>
      `:null}onWalletConnectQr(){U.push("ConnectingWalletConnect")}};hi([I()],ht.prototype,"search",void 0);hi([I()],ht.prototype,"badge",void 0);ht=hi([T("w3m-all-wallets-view")],ht);const Po=N`
  button {
    column-gap: var(--wui-spacing-s);
    padding: 11px 18px 11px var(--wui-spacing-s);
    width: 100%;
    background-color: var(--wui-color-gray-glass-002);
    border-radius: var(--wui-border-radius-xs);
    color: var(--wui-color-fg-250);
    transition:
      color var(--wui-ease-out-power-1) var(--wui-duration-md),
      background-color var(--wui-ease-out-power-1) var(--wui-duration-md);
    will-change: color, background-color;
  }

  button[data-iconvariant='square'],
  button[data-iconvariant='square-blue'] {
    padding: 6px 18px 6px 9px;
  }

  button > wui-flex {
    flex: 1;
  }

  button > wui-image {
    width: 32px;
    height: 32px;
    box-shadow: 0 0 0 2px var(--wui-color-gray-glass-005);
    border-radius: var(--wui-border-radius-3xl);
  }

  button > wui-icon {
    width: 36px;
    height: 36px;
    transition: opacity var(--wui-ease-out-power-1) var(--wui-duration-md);
    will-change: opacity;
  }

  button > wui-icon-box[data-variant='blue'] {
    box-shadow: 0 0 0 2px var(--wui-color-accent-glass-005);
  }

  button > wui-icon-box[data-variant='overlay'] {
    box-shadow: 0 0 0 2px var(--wui-color-gray-glass-005);
  }

  button > wui-icon-box[data-variant='square-blue'] {
    border-radius: var(--wui-border-radius-3xs);
    position: relative;
    border: none;
    width: 36px;
    height: 36px;
  }

  button > wui-icon-box[data-variant='square-blue']::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    border-radius: inherit;
    border: 1px solid var(--wui-color-accent-glass-010);
    pointer-events: none;
  }

  button > wui-icon:last-child {
    width: 14px;
    height: 14px;
  }

  button:disabled {
    color: var(--wui-color-gray-glass-020);
  }

  button[data-loading='true'] > wui-icon {
    opacity: 0;
  }

  wui-loading-spinner {
    position: absolute;
    right: 18px;
    top: 50%;
    transform: translateY(-50%);
  }
`;var ne=function(a,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,r;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(a,e,i,n);else for(var s=a.length-1;s>=0;s--)(r=a[s])&&(t=(o<3?r(t):o>3?r(e,i,t):r(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let J=class extends O{constructor(){super(...arguments),this.tabIdx=void 0,this.variant="icon",this.disabled=!1,this.imageSrc=void 0,this.alt=void 0,this.chevron=!1,this.loading=!1}render(){return c`
      <button
        ?disabled=${this.loading?!0:!!this.disabled}
        data-loading=${this.loading}
        data-iconvariant=${W(this.iconVariant)}
        tabindex=${W(this.tabIdx)}
      >
        ${this.loadingTemplate()} ${this.visualTemplate()}
        <wui-flex gap="3xs">
          <slot></slot>
        </wui-flex>
        ${this.chevronTemplate()}
      </button>
    `}visualTemplate(){if(this.variant==="image"&&this.imageSrc)return c`<wui-image src=${this.imageSrc} alt=${this.alt??"list item"}></wui-image>`;if(this.iconVariant==="square"&&this.icon&&this.variant==="icon")return c`<wui-icon name=${this.icon}></wui-icon>`;if(this.variant==="icon"&&this.icon&&this.iconVariant){const e=["blue","square-blue"].includes(this.iconVariant)?"accent-100":"fg-200",i=this.iconVariant==="square-blue"?"mdl":"md",n=this.iconSize?this.iconSize:i;return c`
        <wui-icon-box
          data-variant=${this.iconVariant}
          icon=${this.icon}
          iconSize=${n}
          background="transparent"
          iconColor=${e}
          backgroundColor=${e}
          size=${i}
        ></wui-icon-box>
      `}return null}loadingTemplate(){return this.loading?c`<wui-loading-spinner
        data-testid="wui-list-item-loading-spinner"
        color="fg-300"
      ></wui-loading-spinner>`:c``}chevronTemplate(){return this.chevron?c`<wui-icon size="inherit" color="fg-200" name="chevronRight"></wui-icon>`:null}};J.styles=[q,G,Po];ne([u()],J.prototype,"icon",void 0);ne([u()],J.prototype,"iconSize",void 0);ne([u()],J.prototype,"tabIdx",void 0);ne([u()],J.prototype,"variant",void 0);ne([u()],J.prototype,"iconVariant",void 0);ne([u({type:Boolean})],J.prototype,"disabled",void 0);ne([u()],J.prototype,"imageSrc",void 0);ne([u()],J.prototype,"alt",void 0);ne([u({type:Boolean})],J.prototype,"chevron",void 0);ne([u({type:Boolean})],J.prototype,"loading",void 0);J=ne([T("wui-list-item")],J);var Bo=function(a,e,i,n){var o=arguments.length,t=o<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,i):n,r;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(a,e,i,n);else for(var s=a.length-1;s>=0;s--)(r=a[s])&&(t=(o<3?r(t):o>3?r(e,i,t):r(e,i))||t);return o>3&&t&&Object.defineProperty(e,i,t),t};let Ji=class extends O{constructor(){var e;super(...arguments),this.wallet=(e=U.state.data)==null?void 0:e.wallet}render(){if(!this.wallet)throw new Error("w3m-downloads-view");return c`
      <wui-flex gap="xs" flexDirection="column" .padding=${["s","s","l","s"]}>
        ${this.chromeTemplate()} ${this.iosTemplate()} ${this.androidTemplate()}
        ${this.homepageTemplate()}
      </wui-flex>
    `}chromeTemplate(){var e;return(e=this.wallet)!=null&&e.chrome_store?c`<wui-list-item
      variant="icon"
      icon="chromeStore"
      iconVariant="square"
      @click=${this.onChromeStore.bind(this)}
      chevron
    >
      <wui-text variant="paragraph-500" color="fg-100">Chrome Extension</wui-text>
    </wui-list-item>`:null}iosTemplate(){var e;return(e=this.wallet)!=null&&e.app_store?c`<wui-list-item
      variant="icon"
      icon="appStore"
      iconVariant="square"
      @click=${this.onAppStore.bind(this)}
      chevron
    >
      <wui-text variant="paragraph-500" color="fg-100">iOS App</wui-text>
    </wui-list-item>`:null}androidTemplate(){var e;return(e=this.wallet)!=null&&e.play_store?c`<wui-list-item
      variant="icon"
      icon="playStore"
      iconVariant="square"
      @click=${this.onPlayStore.bind(this)}
      chevron
    >
      <wui-text variant="paragraph-500" color="fg-100">Android App</wui-text>
    </wui-list-item>`:null}homepageTemplate(){var e;return(e=this.wallet)!=null&&e.homepage?c`
      <wui-list-item
        variant="icon"
        icon="browser"
        iconVariant="square-blue"
        @click=${this.onHomePage.bind(this)}
        chevron
      >
        <wui-text variant="paragraph-500" color="fg-100">Website</wui-text>
      </wui-list-item>
    `:null}onChromeStore(){var e;(e=this.wallet)!=null&&e.chrome_store&&j.openHref(this.wallet.chrome_store,"_blank")}onAppStore(){var e;(e=this.wallet)!=null&&e.app_store&&j.openHref(this.wallet.app_store,"_blank")}onPlayStore(){var e;(e=this.wallet)!=null&&e.play_store&&j.openHref(this.wallet.play_store,"_blank")}onHomePage(){var e;(e=this.wallet)!=null&&e.homepage&&j.openHref(this.wallet.homepage,"_blank")}};Ji=Bo([T("w3m-downloads-view")],Ji);export{ht as W3mAllWalletsView,ti as W3mConnectingWcBasicView,Ji as W3mDownloadsView};
