const { createApp } = Vue

import BookIndex from './cmps/BookIndex.js'

const options = {
    template:`
    <section class="container">
        <main>
            <BookIndex/>
        </main>
    </section>    
    `,
    components: {
        BookIndex
    },
}

const app = createApp(options)
app.mount('#app')

