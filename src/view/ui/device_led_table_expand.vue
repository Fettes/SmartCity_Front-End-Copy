<style scoped>
.expand-row {
  margin-bottom: 16px;
}
ul {
  list-style: none;
}
</style>
<template>
  <div>
    <Row class="expand-row">
      <i-col span="24">
        <span class="expand-key">文件名称:</span>
        <span class="expand-value">
          <ul>
            <li
              v-for="value in row.filenamelist"
             :key="value">
            {{value}}</li>
          </ul>
        </span>
      </i-col>
    </Row>
  </div>
</template>
<script>
export default {
  props: {
    row: Object
  }
};
</script>
