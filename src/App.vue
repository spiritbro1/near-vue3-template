

<template>
  <header>
    <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
     <button @click="signIn" v-if="!login">Login</button>
     <button v-if="login">Logout</button>
     <input v-if="login" type="file" />
     <button v-if="login">MINT</button>
    </div>
  </header>
<ul>
  <li v-for="(i,key) in item" :key="key">
    {{i}}
  </li>
</ul>
 
</template>
<script setup>
import {ref,onMounted} from 'vue';
import * as nearAPI from "near-api-js";
const login=ref(false)
const item=ref([])
const wallet=ref(false)
onMounted(async ()=>{
   const { connect, keyStores, WalletConnection } = nearAPI;
    const config = {
      networkId: "testnet",
      keyStore: new keyStores.BrowserLocalStorageKeyStore(),
      nodeUrl: "https://rpc.testnet.near.org",
      walletUrl: "https://wallet.testnet.near.org",
      helperUrl: "https://helper.testnet.near.org",
      explorerUrl: "https://explorer.testnet.near.org",
    };
    const near = await connect(config);
    wallet.value = new WalletConnection(near);
    if (this.wallet.isSignedIn()) {
     login.value=true;
    }
})
const signIn=()=>{
  this.wallet.requestSignIn(
        "fooddonatenft.testnet"
      );
}
const signOut=async ()=>{
await this.wallet.signOut();
      window.location.href="/";
}
</script>
<style>
@import './assets/base.css';

#app {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;

  font-weight: normal;
}

header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

a,
.green {
  text-decoration: none;
  color: hsla(160, 100%, 37%, 1);
  transition: 0.4s;
}

@media (hover: hover) {
  a:hover {
    background-color: hsla(160, 100%, 37%, 0.2);
  }
}

@media (min-width: 1024px) {
  body {
    display: flex;
    place-items: center;
  }

  #app {
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding: 0 2rem;
  }

  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  .logo {
    margin: 0 2rem 0 0;
  }
}
</style>
