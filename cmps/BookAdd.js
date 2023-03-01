import { bookService } from "../services/book.service.js"
import { eventBusService } from "../services/event-bus.service.js"

export default {
    template: `
        <form>
            <input v-model="filterBy.title"
                @input="filter" 
                placeholder="Search" type="text">
            <button>Submit</button>
        </form>

    <section>
            <hr/>
            <ul>
                <li :demoBooks="filteredBooks" class="books-add" v-for="book in demoBooks" :key="book">
                    <h3>{{ book.id }}</h3>
                    <p>{{ book.title }}</p>
                    <button @click="addBook(book)">+</button>                
                </li>
            </ul>
            <hr/>
        </section>
    `,
    data() {
        return {
            book: bookService.getEmptyBook(),
            filterBy: { title: ''},
            demoBooks: [
            {
                "id": "abc",
                "title": "one",
            },
            {
                "id": "def",
                "title": "two",
            },
            {
                "id": "ghi",
                "title": "three",
            },
            {
                "id": "jkl",
                "title": "four",
            },
            {
                "id": "mno",
                "title": "five",
            }
            ]
        }
    },
    methods: {
        addBook(book) {
                this.book.id = book.id
                this.book.title = book.title
                bookService.addGoogleBook(this.book)
                    .then((book) => {
                    eventBusService.emit('show-msg', { txt: 'Book added', type: 'success' })
                    // this.book = book
                        })
                
        },
        filter () {
            console.log(this.filterBy.title)
            this.$emit('filter', this.filterBy)
        }
    },
    computed: {
        filteredBooks() {
            console.log('hello')
            console.log(this.demoBooks)
            const regex = new RegExp(this.filterBy.title, 'i')
            return this.demoBooks.filter(book => regex.test(book.title))
        }
    },
}