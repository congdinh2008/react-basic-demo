const convertEnumToArray = (enumObject: any) => {
    // Convert to array of object [{key: key, value: value}]
    return Object.keys(enumObject).map((key, index) => ({ key: index, value: enumObject[key] }));
};

const getDisplayValue = (enumObject: any, key: any) => {
    return enumObject[key];
}

export const EnumHelper = {
    convertEnumToArray,
    getDisplayValue
};
