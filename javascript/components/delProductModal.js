
export default {
    data() {
        return {
            url: 'https://vue3-course-api.hexschool.io/v2',
            apiPath: 'steven1220',
            delProductModal: {},
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
                    //  delProductModal.hide(); 改成 this.close()
                    this.close();
                })
                .catch(err => {
                    console.log(err.data);
                })
        },
        open() {
            this.delProductModal.show();
        },
        close() {
            this.delProductModal.hide();
        }
    },
    mounted() {
        // 使用 new 建立 bootstrap Modal，拿到實體 DOM 並賦予到變數上
        this.delProductModal = new bootstrap.Modal(document.getElementById('delProductModal'), {
            keyboard: false,
            backdrop: 'static'
        })
    },
}