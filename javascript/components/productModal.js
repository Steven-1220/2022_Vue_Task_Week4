
export default {
    data() {
        return {
            url: 'https://vue3-course-api.hexschool.io/v2',
            apiPath: 'steven1220',
            productModal: {},
        }
    },
    props: ['tempProduct', 'isNew'],
    template: '#productModalTemplate',

    methods: {
        //新增產品或修改產品
        updateProduct() {
            // 新增
            let productUrl = `${this.url}/api/${this.apiPath}/admin/product`;
            let methods = 'post';

            //根據 isNew 來判斷要串接 post 或是 put API，當 isNew 是  false 才進入編輯
            if (!this.isNew) {
                productUrl = `${this.url}/api/${this.apiPath}/admin/product/${this.tempProduct.id}`;
                methods = 'put'
            }
            axios[methods](productUrl, { data: this.tempProduct })
                .then(res => {
                    // console.log(res.data);
                    this.$emit('get-products');
                    //  productModal.hide(); 改成 this.close()
                    this.close();
                })
                .catch(err => {
                    alert(err.data.message);
                })
        },
        //新增圖片
        createImages() {
            this.tempProduct.imagesUrl = [];
            this.tempProduct.imagesUrl.push('');
        },

        //上傳圖片
        upload(index) {
            let fileInput = document.querySelectorAll('input[type=file]');
            // console.dir(fileInput);
            const file = fileInput[index].files[0]
            // console.log(file);
            const formData = new FormData();
            formData.append('file-to-upload', file);

            axios.post(`${this.url}/api/${this.apiPath}/admin/upload`, formData)
                .then(res => {
                    console.log(res);
                })
                .catch(err => {
                    console.log(err.response);
                })
        },

        open() {
            this.productModal.show();
        },
        close() {
            this.productModal.hide();
        }
    },

    mounted() {
        // 使用 new 建立 bootstrap Modal，拿到實體 DOM 並賦予到變數上
        this.productModal = new bootstrap.Modal(document.getElementById('productModal'), {
            keyboard: false,
            backdrop: 'static'
        })
    },


}