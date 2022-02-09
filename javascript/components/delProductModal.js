export default {
    data() {
        return {
            url: 'https://vue3-course-api.hexschool.io/v2',
            apiPath: 'steven1220',
        }
    },
    props: ['tempProduct'],
    template: '#delProductModalTemplate',

    methods: {
        //刪除產品
        deleteProduct() {
            axios.delete(`${this.url}/api/${this.apiPath}/admin/product/${this.tempProduct.id}`)
                .then(res => {
                    this.$emit('get-products')
                    delProductModal.hide();
                })
                .catch(err => {
                    console.log(err.data);
                })
        },
    },
}