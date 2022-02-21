export default {

    props: ['pages'],
    methods: {
        emitPage(item) {
            this.$emit('get-product', item);
        }
    },
    template: `
        <nav aria-label="Page navigation example">
            <ul class="pagination">
                <li class="page-item" :class="{disabled: !pages.has_pre}" >
                    <a class="page-link" href="#" @click.prevent="emitPage(pages.current_page - 1)">前一頁</a>
                </li>
                
                <li class="page-item" v-for="page in pages.total_pages" :class="{active: page === pages.current_page}" :key=" page + '123' ">
                    <a class="page-link" href="#" @click.prevent="emitPage(page)">{{ page }}</a>
                </li>
                
                <li class="page-item" :class="{disabled: !pages.has_next}" >
                    <a class="page-link" href="#" @click.prevent="emitPage(pages.current_page + 1)">下一頁</a>
                </li>
            </ul>
        </nav>

    `,

}