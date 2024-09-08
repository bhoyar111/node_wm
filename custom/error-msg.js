export const getValidationErrMsg = (error) => {
    const errors = error.details.map((detail) => {
        return detail.message;
    });
    return errors.join(', ');
};

export function getIdNotFoundCommonMsg(modelName) {
    return `The ${modelName} for defind id not found`;
}

export function getNoRecordFoundMsg(modelName) {
    return `No ${modelName} result found`;
}

export function getIdAssignedMsg(modelName) {
    return `Cannot delete ${modelName}, related record found`;
}

export function getServerErrorMsg() {
    return `Internal Server Error`;
}