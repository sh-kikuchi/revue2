<script setup>
const props = defineProps({
  parents: {
    type: Array,
    default: [
      {
        id: '1',
        title: 'Item #1',
        href:'https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/splice',
        children:[
          {
            id: '1',
            title: 'Item #1',
            href:'https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/splice',
            children:[
              {
                id: '1',
                title: 'Item #1',
                href:'https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/splice',
                grandChildren:[
                  {
                    id: '1',
                    title: 'Item #1',
                    href:'https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/splice',
                    items:[
                      {
                        id: '1',
                        title: 'Item #1',
                        href:'https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/splice',
                      }
                    ] 
                  }
                ]
              }
            ]
          },
        ]
      
      },
    ]
  }
})
const parants = ref(props.parants);
</script>
<template>
<div class="treelist">
  <ul v-for="(parent, index) in parants" :key="index">
    <li><a v-if="item.hasOwnProperty('href')" :href="parent.href">{{ parent.title }}</a>
      <ul v-for="(child , index) in parent.children" :key="index">
        <li><a v-if="child.hasOwnProperty('href')" :href="child.href">{{child.title}}</a>
          <ul  v-for="(grandChild , index) in child.grandChildren" :key="index">
            <li><a v-if="grandChild.hasOwnProperty('href')" :href="grandChild.href">{{ grandChild.title }}</a>
              <ul v-for="(item , index) in grandChild.items" :key="index">
                <li><a v-if="item.hasOwnProperty('href')" :href="item.href">{{ item.title }}</a></li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
    </li>
  </ul>
  </div>
</template>
<style scoped>
* {
  margin: 0;
  padding: 0;
  list-style: none;
}

.treelist ul li ul {
  margin-top: .5em;
  margin-bottom: .75em;
  margin-left: 48px;
}
 
.treelist ul li ul li {
  margin-bottom: .25em;
  position: relative;
}
 
.treelist ul li ul li::before {
  content: "";
  position: absolute;
  top: -0.5em;
  left: -16px;
  width: 10px;
  height: calc(100% + .75em);
  border-left: 1px solid #3972b2;
}
 
.treelist ul li ul li:last-child::before {
  height: calc(1em + .25em);
}
 
.treelist ul li ul li::after {
  content: "";
  position: absolute;
  top: .75em;
  left: -16px;
  width: 10px;
  border-bottom: 1px solid #3972b2;
}
</style>