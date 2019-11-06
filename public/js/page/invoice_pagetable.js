$(document).ready(function () {
    console.log("Date time Picker");
    $('.datepicker').datetimepicker({
        minView: 2,
        pickTime: false,
        language: 'pt-BR',
        autoclose: true,
        fontAwesome: true,

    });


});

function setupData() {
    $(document).ready(function () {
        $('#invoice').DataTable({
            "ajax": {
                // "url": "static/objects2.txt", // This works for the static file
                "url": "/invoice/getinvoiceforlist", // This now works too thanks to @kthorngren
                "dataType": "json",
                "dataSrc": "data",
                "contentType": "application/json"
            },
            "columns": [
                {"data": "number"},
                {"data": "date"},
                {"data": "partyAcName"},
                {"data": "partyCity"},
                {"data": "totalAmount"},
                {"data": "partyContactPersonName"},
                {"data": "partyContact"},
                {"data": "actions"}
            ]
        });
    });
}

$('#confirm-delete').on('show.bs.modal', function (e) {
    $(this).find('.btn-ok').attr('href', $(e.relatedTarget).data('href'));

    $('#debug-url').html('Delete URL: <strong>' + $(this).find('.btn-ok').attr('href') + '</strong>');
});


$(window).on("load", setupData);


