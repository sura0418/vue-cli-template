export const sex_string_to_num = function(value) {
    switch (value) {
        case '男':
            return 1;
        case '女':
            return 2;
        default:
            return value;
    }
}
export const sex_num_to_string = function(value) {
    switch (value) {
        case 1:
            return '男';
        case 2:
            return '女';
        default:
            return value;
    }
}