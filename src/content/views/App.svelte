<script>
  let clicks = $state(0);
 import Forest  from '@/assets/forest.png'
 const forestImg = chrome.runtime.getURL(Forest)
  import Logo from '@/assets/crx.svg'
</script>

<div class="fixed bottom-4 right-4 z-50 w-80 rounded-xl bg-white font-sans p-3 shadow-2xl ">
  <p class="text-sm font-semibold">Shadow DOM Svelte Widget</p>
  <div class="mt-3 space-y-1 text-xs">
    Hier ist die Injezierte App

    <img src={forestImg} alt="Test-Bild">
    <img src={Logo} alt='CRXJS logo' class='button-icon'>
  </div>
  

  <button
  class="mt-3 rounded bg-emerald-500! px-3 py-1.5 text-sm font-medium text-emerald-950 transition hover:bg-emerald-400"
  onclick={() => {
    clicks += 1;
  }}
  >
    Clicked {clicks} {clicks === 1 ? 'time' : 'times'}
  </button>
</div>
