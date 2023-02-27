export default {
    props: ['txt'],
    template:`
        Description: {{displayTxt}}
        <button @click="isShown = !isShown" v-if="txt.length > 100">
            Read {{isShown ? 'less' : 'more'}}
        </button>
    `,
    data() {
        return {
            isShown: false,
        }
    },
    computed: {
        displayTxt() {
            const length = 100
            if (!this.isShown && this.txt.length > 100)
                return this.txt.slice(0, length) + '...'
            return this.txt
        }
    }
}