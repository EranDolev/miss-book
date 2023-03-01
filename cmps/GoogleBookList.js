export default {
    props:['demoBooks'],
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
            <li class="books-add" v-for="book in demoBooks" :key="book">
                <h3>{{ book.id }}</h3>
                <p>{{ book.title }}</p>
                <button @click="addBook(book)">+</button>                
            </li>
        </ul>
        <hr/>
    </section>
`,
}