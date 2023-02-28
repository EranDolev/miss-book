export default {
    template: `
        <input type="text">
        <section>
            <hr/>
            <ul>
                <li class="books-add" v-for="book in demoBooks" :key="book.id">
                    <h3>{{ book.id }}</h3>
                    <p>{{ book.title }}</p>
                    <button>+</button>                
                </li>
            </ul>
            <hr/>
        </section>
    `,
    data() {
        return {
            book: null,
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
    }
}