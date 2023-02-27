import { bookService } from "../services/book.service.js"
import { eventBusService } from "../services/event-bus.service.js"

export default {
    props: ['book'],
    template: `
        <section class="book-review">
            <h2>Add a review</h2>
            <form @submit.prevent="save">
                <input type="text" v-model="book.review.fullName" placeholder="Full Name">
                <br>
                <label for="rating">Rating (between 1 and 5): </label>
                <input placeholder="3" type="range" v-model="book.review.rating" id="rating" name="rating" min="1" max="5">
                <br>
                <label for="readAt">Read book at: </label>
                <input type="date" id="readAt" v-model="book.review.readAt">
                <br>
                <!-- <select id="currency" name="currency">
                    <option value="EUR">Euro</option>
                    <option value="ILS">Nis</option>
                    <option value="USD">US Dollars</option>
                </select> -->
                <button>Save Review</button>
            </form>
        </section>
    `,
    // data() {
    //     return {
    //         length: this.book.review.length,
    //     }
    // },
    created() {
        
        if(!this.book.review){
            this.book.review = {}
            this.book.review.fullName = ''
            this.book.review.rating = 0
            this.book.review.readAt = ''
        }
        console.log(length)
        // console.log('Params:',  this.$route.params)
        // const {bookId} = this.$route.params
        // console.log(bookId)
        // bookService.get(bookId)
        //     .then(book => this.book = book)
        //     console.log(book)
    },
    methods: {
        save() {
            bookService.save(this.book)
                .then(savedBook => {
                    eventBusService.emit('show-msg', { txt: 'Rating saved', type: 'success' })
                    this.$router.push('/book')
                    // this.book = bookService.getEmptyBook()
                    // this.$emit('book-saved', savedBook)
                })
                .catch(err=>{
                    eventBusService.emit('show-msg', { txt: 'Book rate failed', type: 'error' })
                })
        }
    }
}