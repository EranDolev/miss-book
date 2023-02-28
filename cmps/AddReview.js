import { bookService } from "../services/book.service.js"
import { eventBusService } from "../services/event-bus.service.js"

export default {
    template: `
        <button @click="toggleModal">Add Review</button>
        <section id="modal" class="book-review" v-if="showModal">
            <h2>Add a review</h2>
            <button class="close-modal"  @click="toggleModal">X</button>
            <form @submit.prevent="save">
                <input type="text" v-model="review.fullName" placeholder="Full Name">
                <br>
                <label for="rating">Rating (between 1 and 5): </label>
                <input placeholder="3" type="range" v-model="review.rating" id="rating" name="rating" min="1" max="5">
                <br>
                <label for="readAt">Read book at: </label>
                <input type="date" id="readAt" v-model="review.readAt">
                <br>
                <button>Save Review</button>
            </form>
        </section>
    `,
    data() {
        return {
            book: null,
            showModal: false,
            review: {}
        }
    },
    created() {
        console.log('Params:',  this.$route.params)
        const {bookId} = this.$route.params
        console.log(bookId)
        bookService.get(bookId)
            .then((book) => {
                this.book = book
                if (book.reviews) this.reviews = book.reviews
            })
    },
    methods: {
        toggleModal() {
            this.showModal = !this.showModal
          },
        save() {
            this.toggleModal()
            bookService.addReview(this.book.id,this.review)
                .then((savedBook) => {
                    eventBusService.emit('show-msg', { txt: 'Rating saved', type: 'success' })
                    this.book = savedBook
                    // this.$router.push('/book')
                    // this.book = bookService.getEmptyBook()
                    // this.$emit('book-saved', savedBook)
                })
                .catch(err=>{
                    eventBusService.emit('show-msg', { txt: 'Book rate failed', type: 'error' })
                })
        }
    }
}