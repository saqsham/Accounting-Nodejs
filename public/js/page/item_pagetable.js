function setupData() {
    $(document).ready(function () {
        $('#item').DataTable({
            "ajax": {
                // "url": "static/objects2.txt", // This works for the static file
                "url": "/item/getitemforlist", // This now works too thanks to @kthorngren
                "dataType": "json",
                "dataSrc": "data",
                "contentType":"application/json"
            },
            "columns": [
                {"data": "newModelName"},
                {"data": "companyName"},
                {"data": "hsn"},
                {"data": "itemType"},
                {"data": "tax"},
                {"data": "price"},
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
