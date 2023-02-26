export default {
    props: ['book'],
    template: `
        <section class="book-details">
            <h2>Book Name: {{ book.title }}</h2>
            <h3>Author: {{ book.authors[0] }}</h3>
            <h3 :class="isExpensive">{{ book.listPrice.amount }}  {{ book.listPrice.currencyCode }}</h3>
            <h4>Description: <br> {{ book.description }}</h4>
            <h2 v-if="book.pageCount > 500" >Serious Reading</h2>
            <h2 v-else-if="book.pageCount > 200" >Decent Reading</h2>
            <h2 v-else="book.pageCount > 100" >Light Reading</h2>
            <h3 v-if="this.currYear - book.publishedDate > 10 ">Vintage</h3>
            <h3 v-else>New</h3>
            <img class="on-sale" v-if="book.listPrice.isOnSale" :src="'../assets/images/on-sale.png'" alt="">
            <button @click="closeDetails">Close</button>
        </section>
    `,
    data() {
        return {
            currYear: new Date().getFullYear()
        }
    },
    computed: {
        isExpensive() {
            if (this.book.listPrice.amount > 150) return 'red'
            else if (this.book.listPrice.amount < 20) return 'green'
        },
    },
    methods: {
        closeDetails(){
            this.$emit('hide-details')
        }
    }
}