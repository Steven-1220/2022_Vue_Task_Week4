import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.26/vue.esm-browser.min.js';
import pagination from './components/pagination.js';
import productModalTemp from './components/productModal.js';
import delProductModalTemp from './components/delProductModal.js'

let productModal = {};
let delProductModal = {};


const app = createApp({

    //區域註冊
    components: {
        pagination,
        productModalTemp,
        delProductModalTemp
    },
    data() {
        return {
            url: 'https://vue3-course-api.hexschool.io/v2',
            apiPath: 'steven1220',
            products: [],
            isNew: false,
            tempProduct: {
                imagesUrl: []
            },
            pagination: {}
        }
    },
    methods: {
        checkLogin() {
            const token = document.cookie.replace(/(?:(?:^|.*;\s*)myToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
            // 當每次發出請求時，都會在 headers 自動帶入 token
            axios.defaults.headers.common['Authorization'] = token;

            axios.post(`${this.url}/api/user/check`)
                .then(res => {
                    // console.log(res.data);
                    this.getAllProducts();
                })
                .catch(err => {
                    alert(err.data.message);
                    window.location.href = 'index.html';
                })

        },
        getAllProducts(page = 1) {
            axios.get(`${this.url}/api/${this.apiPath}/admin/products/?page=${page}`)
                .then(res => {
                    // console.log(res.data);
                    this.products = res.data.products;
                    this.pagination = res.data.pagination;
                })
                .catch(err => {
                    console.log(err.data);
                })
        },
        changeActiveState(item) {
            item.is_enabled = !item.is_enabled;
        },

        // 開啟模組
        openModal(state, item) {
            // console.log(state, item);
            if (state == 'new') {
                // 若是要新增一個新的 modal，需要做清空物件的動作
                this.tempProduct = {
                    imagesUrl: []
                }
                productModal.show();
                this.isNew = true;
            } else if (state == 'edit') {
                this.tempProduct = { ...item };
                productModal.show();
                this.isNew = false;
            } else if (state == 'delete') {
                this.tempProduct = { ...item };
                delProductModal.show();
            }
        },

    },
    //生命週期
    mounted() {
        this.checkLogin();
        // 使用 new 建立 bootstrap Modal，拿到實體 DOM 並賦予到變數上
        productModal = new bootstrap.Modal(document.getElementById('productModal'), {
            keyboard: false,
            backdrop: 'static'
        })

        delProductModal = new bootstrap.Modal(document.getElementById('delProductModal'), {
            keyboard: false,
            backdrop: 'static'
        })
    },


}).mount('#app');