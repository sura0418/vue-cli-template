const VuePlugin = {
    install: (Vue) => {
        Vue.mixin({
            filters: {
                sex_num_to_string(value) {
                    switch (value) {
                        case 1:
                            return '男';
                        case 2:
                            return '女';
                        default:
                            return value;
                    }
                }
            },
            methods: {

            }
        })
    }
};

export default VuePlugin;