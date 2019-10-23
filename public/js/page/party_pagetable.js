function setupData() {
    $(document).ready(function () {
        $('#party').DataTable({
            "ajax": {
                // "url": "static/objects2.txt", // This works for the static file
                "url": "/party/getpartyforlist", // This now works too thanks to @kthorngren
                "dataType": "json",
                "dataSrc": "data",
                "contentType":"application/json"
            },
            "columns": [
                {"data": "name"},
                {"data": "city"},
                {"data": "gstin"},
                {"data": "contactPersonName"},
                {"data": "mobileNumber"},
                {"data": "email"},
                {"data": "actions"},
            ]
        });
    });
}

$('#confirm-delete').on('show.bs.modal', function(e) {
            $(this).find('.btn-ok').attr('href', $(e.relatedTarget).data('href'));

            $('#debug-url').html('Delete URL: <strong>' + $(this).find('.btn-ok').attr('href') + '</strong>');
        });

$( window ).on( "load", setupData );
