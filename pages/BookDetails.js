import { bookService } from "../services/book.service.js"
import AddReview from "../cmps/AddReview.js"
import LongText from '../cmps/LongText.js'

export default {
    template: `
        <section class="book-details">
            <h2>Book Name: {{ book.title }}</h2>
            <h3>Author: {{ authors }}</h3>
            <h3 :class="isExpensive">{{ book.listPrice.amount }}  {{ book.listPrice.currencyCode }}</h3>
            <!-- <h4>Description: <br> {{ book.description }}</h4> -->
            <h4>Description: <br> <LongText :txt="book.description"/></h4>

            <h2 v-if="book.pageCount > 500" >Serious Reading</h2>
            <h2 v-else-if="book.pageCount > 200" >Decent Reading</h2>
            <h2 v-else-if="book.pageCount < 100" >Light Reading</h2>
            <h3 v-if="this.currYear - book.publishedDate > 10 ">Vintage</h3>
            <h3 v-else>New</h3>
            <img class="on-sale" v-if="book.listPrice.isOnSale" :src="'../assets/images/on-sale.png'" alt="">
            <!-- <button @click="closeDetails">Close</button> -->
            <AddReview :book="book"/>
            <RouterLink to="/book">Back to list</RouterLink>
        </section>
    `,
    data() {
        return {
            book: null,
            currYear: new Date().getFullYear()
        }
    },
    created() {
        console.log('Params:',  this.$route.params)
        const {bookId} = this.$route.params
        bookService.get(bookId)
            .then(book => this.book = book)
    },
    computed: {
        isExpensive() {
            if (this.book.listPrice.amount > 150) return 'red'
            else if (this.book.listPrice.amount < 20) return 'green'
        },
        authors() {
            return this.book.authors.join (', ')
        }
    },
    methods: {
        // closeDetails(){
        //     this.$emit('hide-details')
        // }
    },
    components: {
        LongText,
        AddReview,
    }
}