<template>
  <CFooter :fixed="false">
    <div>
      <!-- <a href="https://coreui.io" target="_blank">CoreUI</a> -->
      <span class="ml-1">&copy; {{new Date().getFullYear()}} EWMX.</span>
    </div>
    <div class="ml-auto">
      <span class="mr-1" target="_blank">Desing by</span>
      <a href="https://evolucionweb.mx/">Evolución Web MX</a>
    </div>
  </CFooter>
</template>

<script>
export default {
  name: 'TheFooter'
}
</script>
<style scoped>

</style>

