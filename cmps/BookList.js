import BookPreview from './BookPreview.js'
import { eventBusService } from "../services/event-bus.service.js"

export default {
    props:['books'],
    template:`
        <section class="book-list">
            <ul>
                <li v-for="book in books" :key="book.id">
                    <BookPreview :book="book"/>
                    <RouterLink :to="'/book/'+book.id">Details</RouterLink> |
                    <RouterLink :to="'/book/edit/'+book.id">Edit</RouterLink> |
                    <button @click="showDetails(book.id)">Details</button>
                    <button @click="remove(book.id)">x</button>                    
                </li>
            </ul>
</section> 
    `,
        methods: {
            remove(bookId) {
                this.$emit('remove', bookId)
                // .then(savedBook => {
                    eventBusService.emit('show-msg', { txt: 'Book deleted', type: 'success' })
                    // this.$router.push('/book')
                    // this.book = bookService.getEmptyBook()
                    // this.$emit('book-saved', savedBook)
                },
            showDetails(bookId){
                this.$emit('show-details', bookId)
            },
        },
        components: {
            BookPreview,
        }
}