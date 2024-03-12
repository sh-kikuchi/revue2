<script setup>
import { reactive, ref } from 'vue'
import NavListItem  from '@/components/global/navigation/NavListItem.vue';
import Header       from '@/components/global/layouts/Header.vue';
import Footer       from '@/components/global/layouts/Footer.vue';
import NavBar       from '@/components/global/navigation/NavBar.vue';
import Popup        from '@/components/global/windows/Popup.vue';
import Row          from '@/components/global/layouts/grid/Row.vue';
import Column       from '@/components/global/layouts/grid/Column.vue';
import { mdiInformationOutline,mdiApplication,mdiFountainPen,mdiPalette,mdiCamera,mdiLabel,mdiSync,mdiFileAccount,mdiAlphaGBoxOutline,mdiController,mdiClock,mdiMusicNote,mdiNote} from '@mdi/js';

const showNavBar = () => {
  state.navBarVisible = true;
};

const closeNavBar = () => {
  state.navBarVisible = false;
};


const listItems = ref([
    {
      to: "/about",
      icon: mdiInformationOutline,
      linkName: "About",
    },
    {
      to: "/myApps",
      icon: mdiApplication,
      linkName: "MyApps",
    },
    {
      to: "/techs",
      icon: mdiFountainPen,
      linkName: "Techs",
    },
    {
      to: "/designs",
      icon: mdiPalette,
      linkName: "Designs",
    }
]);
const listSubItems = ref([
    {
      to: "/landscapes",
      icon: mdiCamera,
      linkName: "Landscapes",
    },
    {
      to: "/labels",
      icon: mdiLabel,
      linkName: "Labels",
    },
    {
      to: "/converts",
      icon: mdiSync,
      linkName: "Convert",
    },
    {
      to: "/careers",
      icon: mdiFileAccount,
      linkName: "Careers",
    },
    {
      to: "/generators",
      icon: mdiAlphaGBoxOutline,
      linkName: "generators",
    },
    {
      to: "/game",
      icon: mdiController,
      linkName: "Games",
    },
    {
      to: "/times",
      icon: mdiClock,
      linkName: "Times",
    },
    {
      to: "/sounds",
      icon: mdiMusicNote,
      linkName: "sounds",
    },
    {
      to: "/notes",
      icon: mdiNote,
      linkName: "notes",
    },
]);
  
const state = reactive({
  navBarVisible: false,
});
</script>
<template>
   <!-- Navigation -->
    <NavBar 
      :isVisible="state.navBarVisible" 
      @close="closeNavBar"
    >
      <div class="nav-bar-content">
        <nuxt-link to='/' class="nuxt-link" @click="closeNavBar">
            <div class="py-1">
              <img src="@/assets/images/logo/s_logo.png" />
              <label class="home-title">Home</label>
          </div>
        </nuxt-link>
        <div class="pa-0" v-for="(listItem,index) in listItems" :key=index @click="closeNavBar">
          <NavListItem
            :to= listItem.to
            :icon=listItem.icon
            :linkName=listItem.linkName />
        </div>
        <Popup>
          <template v-slot:popupBtn>
            <!-- スロット1 のコンテンツ -->
            <div class="andmore">&hellip;</div>
          </template>
          <template v-slot:popupContent>
            <!-- スロット2 のコンテンツ -->
            <Row style="width: 250px;">
              <!-- <div class="pa-0" v-for="(listSubItem,index) in listSubItems" :key=index> -->
                <Column v-for="(listSubItem,index) in listSubItems" :key=index :cols=4 :sm_cols="4"  class="pa-1" >
                  <div @click="closeNavBar">
                    <NavListItem
                      :to= listSubItem.to
                      :icon=listSubItem.icon
                      :linkName=listSubItem.linkName
                    />
                  </div>
                </Column>
                <!-- </div> -->
            </Row>     
          </template>
        </Popup>
      </div>
  </NavBar>
  <!-- Header -->
  <Header>
    <h1 class="ml-2">Re:Vue</h1>
    <div>
      <div class="three-lines mr-2" @click="showNavBar">&equiv;</div>
    </div>

  </Header>
  <!-- Body -->
  <main>
      <NuxtPage />
  </main>
  <!-- Footer -->
  <Footer></Footer>
</template>

<style scoped>
main{
 height: calc(100vh - 105px);
  background-color: rgb(183, 204, 219);
  overflow-y: auto;
  -ms-overflow-style: none;
    scrollbar-width: none;
}
main::-webkit-scrollbar{
  display: none;
}
.nuxt-link img{
  display: block;
  width: 25px;
  height: 25px;
  margin: 0 auto;
}
.nuxt-link label{
  margin-top: 0;
  text-align: center;
  font-size: 10px;
}
.navigation-item:active {
  background-color: lightgray;
}


.link-name {
  font-size: 8px !important;
  text-align: center;
  color:grey;
}
.andmore{
   text-align: center;
   font-size: 20px;
   font-weight: 600;

}

h2{
  color:black;
}
.nuxt-link{
  text-decoration: none;
}

.three-lines{
  display: flex;
  padding-top: 5px;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  font-size: 50px;
  font-weight: 400;
  border-radius: 50%;
}
.three-lines:hover{
  background-color: lightgray;
}
.nav-bar-content{
  height: 100vh;
}
</style>
