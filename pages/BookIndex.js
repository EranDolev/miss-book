import { bookService } from '../services/book.service.js'

import BookFilter from '../cmps/BookFilter.js'
import BookList from '../cmps/BookList.js'

import BookDetails from './BookDetails.js'
import BookEdit from './BookEdit.js'

export default {
    template:`
        <section class="book-index">
            <RouterLink to="/book/edit">Add a book</RouterLink>
            <BookFilter @filter="setFilterBy"/>
            <!-- <pre>{{ books }}</pre> -->
            <BookList
                :books="filteredBooks"
                @remove="removeBook" />
                <!-- @show-details="showBookDetails" /> -->
            <!-- <BookEdit @book-saved="onSaveBook"/> -->
            <!-- <BookDetails 
                v-if="selectedBook" 
                @hide-details="selectedBook = null"
                :book="selectedBook"/> -->
        </section>
    `,
    data() {
        return {
            books: [],
            selectedBook: null,
            filterBy: {},
        }
    },
    methods: {
        removeBook(bookId) {
            bookService.remove(bookId)
                .then(() => {
                    const idx = this.books.findIndex(book => book.id === bookId)
                    this.books.splice(idx, 1)
                })
        },
        showBookDetails(bookId) {
            this.selectedBook = this.books.find(book => book.id === bookId)
        },
        onSaveBook(newBook) {
            this.books.unshift(newBook)
        },
        setFilterBy(filterBy) {
            this.filterBy = filterBy
        }
    },
    computed: {
        filteredBooks() {
            const regex = new RegExp(this.filterBy.title, 'i')
            return this.books.filter(book => regex.test(book.title))
        }
    },
    created() {
        bookService.query()
            .then(books => this.books = books)
    },
    components: {
        BookFilter,
        BookList,
        BookDetails,
        BookEdit,
    }
}