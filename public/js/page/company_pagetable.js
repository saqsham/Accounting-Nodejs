function setupData() {
    $(document).ready(function () {
        $('#company').DataTable({
            "ajax": {
                // "url": "static/objects2.txt", // This works for the static file
                "url": "/company/getcompanyforlist", // This now works too thanks to @kthorngren
                "dataType": "json",
                "dataSrc" : 'data',
                "contentType":"application/json"
            },
            "columns": [
                {data : "name"},
                {data: "gstin"},
                {data: "city"},
                {data: "accountNumber"},
                {data: "branch"},
                {data: "ifsc"},
                {data: "actions"},
            ]
        });
    });
}

$('#confirm-delete').on('show.bs.modal', function(e) {
            $(this).find('.btn-ok').attr('href', $(e.relatedTarget).data('href'));

            $('#debug-url').html('Delete URL: <strong>' + $(this).find('.btn-ok').attr('href') + '</strong>');
        });

$( window ).on( "load", setupData );
