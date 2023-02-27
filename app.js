const { createApp } = Vue

import {router} from './routes.js'

// import BookIndex from './pages/BookIndex.js'
import AppHeader from './cmps/AppHeader.js'
import AppFooter from './cmps/AppFooter.js'
import UserMsg from './cmps/UserMsg.js'

const options = {
    template:`
    <section class="container">
        <AppHeader />
        <main>
            <RouterView />
            <!-- <BookIndex/> -->
        </main>
        <AppFooter />
        <UserMsg />
    </section>    
    `,
    components: {
        AppHeader,
        AppFooter,
        UserMsg,
        // BookIndex,
    },
}

const app = createApp(options)
app.use(router)
app.mount('#app')

