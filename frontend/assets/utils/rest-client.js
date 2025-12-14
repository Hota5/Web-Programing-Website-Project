let RestClient = {
    get: function (url, callback, error_callback) {
        $.ajax({
            url: Constants.PROJECT_BASE_URL + url,
            type: "GET",
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Authentication", localStorage.getItem("user_token"));
            },
            success: function (response) {
                if (callback) callback(response);
            },
            error: function (jqXHR) {
                if (error_callback) error_callback(jqXHR);
            }
        });
    },
    
    post: function (url, data, callback, error_callback) {
        $.ajax({
            url: Constants.PROJECT_BASE_URL + url,
            type: "POST",
            data: JSON.stringify(data),
            contentType: "application/json",
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Authentication", localStorage.getItem("user_token"));
            },
            success: function (response) {
                if (callback) callback(response);
            },
            error: function (jqXHR) {
                if (error_callback) error_callback(jqXHR);
            }
        });
    },
    
    put: function (url, data, callback, error_callback) {
        $.ajax({
            url: Constants.PROJECT_BASE_URL + url,
            type: "PUT",
            data: JSON.stringify(data),
            contentType: "application/json",
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Authentication", localStorage.getItem("user_token"));
            },
            success: function (response) {
                if (callback) callback(response);
            },
            error: function (jqXHR) {
                if (error_callback) error_callback(jqXHR);
            }
        });
    },

    delete: function (url, data, callback, error_callback) {
        $.ajax({
            url: Constants.PROJECT_BASE_URL + url,
            type: "DELETE",
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Authentication", localStorage.getItem("user_token"));
            },
            success: function (response) {
                if (callback) callback(response);
            },
            error: function (jqXHR) {
                if (error_callback) error_callback(jqXHR);
            }
        });
    }

};          