export const getParam = (value: string | string[]) => {
    let param;
    if (Array.isArray(value)) {
        param = value.join(',') === '' ? undefined : value.join(',');
    } else {
        param = value === '' ? undefined : value;
    }

    return param;
};
