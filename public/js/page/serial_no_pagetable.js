
function setupData() {
    $(document).ready(function () {
        $('#serial_no_datatable').DataTable({
            "ajax": {
                // "url": "static/objects2.txt", // This works for the static file
                "url": "serial_no_get_data", // This now works too thanks to @kthorngren
                "dataType": "json",
                "dataSrc": "data",
                "contentType": "application/json"
            },
            "columns": [
                {"data": "no"},
                {"data": "invoice_no"},
                {"data": "date"},
                {"data": "item"},
                {"data": "party"},
                {"data": "city"},
                {"data": "price"},
                {"data": "action"}
            ]
        });
    });
}


$(window).on("load", setupData);