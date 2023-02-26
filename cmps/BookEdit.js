import { bookService } from "../services/book.service.js"

export default {
    template: `
        <section class="book-edit">
            <h2>Add a book</h2>
            <form @submit.prevent="save">
                <input type="text" v-model="book.title" placeholder="Title">
                <section>
                    <input type="number" v-model.number="book.listPrice.amount">
                    <select id="currency" name="currency" v-model="book.listPrice.currencyCode">
                        <option value="EUR">Euro</option>
                        <option value="ILS">Nis</option>
                        <option value="USD">US Dollars</option>
                    </select>
                </section>
                <!-- <select id="currency" name="currency">
                    <option value="EUR">Euro</option>
                    <option value="ILS">Nis</option>
                    <option value="USD">US Dollars</option>
                </select> -->
                <button>Save</button>
            </form>
        </section>
    `,
    data() {
        return {
            book: bookService.getEmptyBook()
        }
    },
    methods: {
        save() {
            bookService.save(this.book)
                .then(savedBook => {
                    this.book = bookService.getEmptyBook()
                    this.$emit('book-saved', savedBook)
                })
        }
    }
}