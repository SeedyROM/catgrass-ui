<template>
  <div class="relative bg-slate-200 pt-[8vmin] pb-[10vmin] px-4 sm:px-6 overflow-hidden">
    <div class="mx-auto max-w-md px-6 sm:max-w-3xl lg:max-w-7xl lg:px-8 py-12">
      <div class="grid gap-[4vmin] grid-cols-12 items-center">
        <div class="col-span-12">
          <p class="mt-12 text-[5vmin] font-bold text-black tracking-tight leading-[0.9] -indent-1">Help getting started.
          </p>
        </div>
      </div>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-[3vmin] mt-12 items-center">
        <div class="lg:col-span-2 overflow-hidden rounded-2xl text-white bg-slate-500 flex flex-col-reverse lg:flex-row items-center sm:text-center lg:text-left">
          <div class="lg:w-[59%] relative z-10 self-end">
            <img src="" alt="Resources" width="1632" height="1034" loading="lazy">
          </div>
          <div class="h-full mx-auto lg:w-[41%] px-[6vmin] pt-[8vmin] lg:p-0 lg:py-[6vmin] lg:pr-[8vmin] relative z-10">
            <h3 class="text-3xl md:text-5xl leading-none font-bold tracking-tight">Developer documentation.</h3>
            <p class="max-w-lg mt-5 text-lg md:text-2xl font-normal text-slate-200">CronCat is completely Open Source, MIT licensed, and has simple SDKs for integrations.</p>
            <a href="https://docs.cron.cat" target="_blank" class="inline-block mt-7 whitespace-nowrap px-4 py-2 border rounded-md text-md font-semibold text-white border-white hover:text-black hover:bg-white transition-all">View Docs →</a>
          </div>
        </div>
        <div class="relative h-full overflow-hidden rounded-2xl bg-[#353434] text-white sm:text-center flex flex-col items-center justify-center">
          <div class="p-[6vmin] pb-[10vmin] lg:pb-6 relative z-10">
            <img class="rounded-full w-24 md:mx-auto mb-4" src="/ext_logos/daodao_logo.jpeg" alt="DAODAO" loading="lazy" />
            <h3 class="text-3xl md:text-5xl leading-none font-bold tracking-tight">Open Source,<br>Run by a DAO</h3>
            <p class="max-w-md mx-auto mt-5 text-lg md:text-2xl font-normal text-slate-300">We build using transparent governance, entirely on-chain.<br><br>Powered by <a href="https://daodao.zone/" target="_blank">DAODAO</a>.</p>
            <a href="" class="inline-block mt-8 mb-8 whitespace-nowrap px-4 py-2 border rounded-md text-md font-semibold text-gray-100 border-gray-100 hover:text-white hover:bg-gray-800 transition-all">View DAO →</a>
          </div>
          <img class="absolute left-0 top-0 right-0 bottom-0 bg-cover h-full opacity-10" src="/empty-state-daodao.jpeg" alt="Resources" width="1398" height="854" loading="lazy">
        </div>
        <div class="h-full overflow-hidden rounded-2xl bg-[#E26793] text-black sm:text-center flex flex-col items-center justify-center">
          <div class="p-[8vmin] pt-6">
            <h3 class="text-3xl md:text-5xl leading-none font-bold tracking-tight">Join our community</h3>
            <p class="max-w-lg mx-auto mt-5 text-lg md:text-2xl font-normal text-black opacity-70">Get connected with our enthusiastic devs, ask integration questions or chat about ways to automate.</p>
            <div class="mt-8 flex flex-row justify-evenly">
              <a class="flex mr-4 text-gray-800 hover:text-gray-900" href="https://twitter.com/croncats" rel="noreferrer"
                target="_blank">
                <svg class="m-auto w-12 h-12" fill="currentColor" stroke="none" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z">
                  </path>
                </svg>
              </a>
              <a class="flex mr-4 text-gray-800 hover:text-gray-900" href="https://discord.gg/GJY7QBsDft" rel="noreferrer"
                target="_blank">
                <svg class="w-24 h-24" fill="currentColor" stroke="none" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M6.552 6.712c-.456 0-.816.4-.816.888s.368.888.816.888c.456 0 .816-.4.816-.888.008-.488-.36-.888-.816-.888zm2.92 0c-.456 0-.816.4-.816.888s.368.888.816.888c.456 0 .816-.4.816-.888s-.36-.888-.816-.888z">
                  </path>
                  <path
                    d="M13.36 0H2.64C1.736 0 1 .736 1 1.648v10.816c0 .912.736 1.648 1.64 1.648h9.072l-.424-1.48 1.024.952.968.896L15 16V1.648C15 .736 14.264 0 13.36 0zm-3.088 10.448s-.288-.344-.528-.648c1.048-.296 1.448-.952 1.448-.952-.328.216-.64.368-.92.472-.4.168-.784.28-1.16.344a5.604 5.604 0 0 1-2.072-.008 6.716 6.716 0 0 1-1.176-.344 4.688 4.688 0 0 1-.584-.272c-.024-.016-.048-.024-.072-.04-.016-.008-.024-.016-.032-.024-.144-.08-.224-.136-.224-.136s.384.64 1.4.944c-.24.304-.536.664-.536.664-1.768-.056-2.44-1.216-2.44-1.216 0-2.576 1.152-4.664 1.152-4.664 1.152-.864 2.248-.84 2.248-.84l.08.096c-1.44.416-2.104 1.048-2.104 1.048s.176-.096.472-.232c.856-.376 1.536-.48 1.816-.504.048-.008.088-.016.136-.016a6.521 6.521 0 0 1 4.024.752s-.632-.6-1.992-1.016l.112-.128s1.096-.024 2.248.84c0 0 1.152 2.088 1.152 4.664 0 0-.68 1.16-2.448 1.216z">
                  </path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>