<template>
  <router-view></router-view>
</template>

<style>
*,
html,
body {
  margin: 0;
  padding: 0;
}

body,
html {
  height: 100%;
}

a {
  text-decoration: none;
  color: #000;
}

#app {
  height: 100%;
  min-width: 1320px;

  --el-color-primary: rgb(0, 146, 65);
  --el-color-success: rgb(0, 146, 65);
  --primary-color: rgb(0, 146, 65);
  --primary-color-rgb: 0, 146, 65;
}

a:hover,
a:visited,
a:link,
a:active {
  color: #000;
}

ul,
li {
  list-style: none;
}

div,
span {
  box-sizing: border-box;
}
</style>
