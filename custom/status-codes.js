const customStatusCodes = {
    ok                  : 200,
    created             : 201,
    bad_request         : 400,
    un_authorized       : 401,
    payment_required    : 402,
    forbidden           : 403,
    not_found           : 404,
    method_not_allowed  : 405,
    server_error        : 500
};

const mergedStatusCodes = { ...customStatusCodes };

export default mergedStatusCodes;
