

$(function() {
  $('.selectpicker').selectpicker();
});

$(document).ready(function(){

$('#e-way').hide()

$('.datepicker').datetimepicker({
      minView: 2,
    pickTime: false,
    language: 'pt-BR',
    autoclose:true,

    fontAwesome:true,
    });


/*
var previous_value;
$(document).on('shown.bs.select','.select_item', function(e) {
        previous_value = $(this).val();
}).change(function() {
    console.log(previous_value);
    previous_value = $(this).val();

        console.log(previous_value);

});
*
  $('button[data-id="select_item"').on('change',function(){
    $('#myModal1').modal('show');
  });*/

//$('#particulars').prop('disabled',true);
//document.getElementById('particulars').style.pointerEvents = 'none';

$(document).on("changed.bs.select", "select.select_item",function(e, clickedIndex, newValue, oldValue) {
    //var selectedD = $(this).find('option').eq(clickedIndex).text();
    //console.log('selectedD: ' + selectedD + '  newValue: ' + newValue + ' oldValue: ' + oldValue);
    var z =$(this).val();
console.log(z);
//var x = z.substr(0,14)
    var second_last_char = parseInt(z[12]);
    var last_char = z[13];
    console.log(second_last_char,last_char);
    var item_name="0";
    if(last_char !== '_'){
        num = parseInt(last_char);
        num = second_last_char*10+num;
        item_name = z.substr(15);
    }
    else{
        num = second_last_char;
        item_name = z.substr(14);
    }

    var amount = $('#item_'+item_name+'').attr('price');
    console.log(item_name,num,'#'+item_name+'');//selectedD,amount);
//if(last_char)
    $('#myModal'+num+'').modal('show');
    //myModal1_serial_no_1
    //myModal1_serial_no_1
    $('#quantity_'+num+'').val(1);
   // console.log(amount);
    $('#rate_per_'+num+'').val(amount);
    price_update(num);
    gst_update();

    console.log('#myModal'+num+'_serial_no_1');
     setTimeout(function (){
        $('#myModal'+num+'_serial_no_1').focus();
        alert("message");
    }, 700);

  });



});

$(document).on('click','.focus_on_add_new',function () {
    setTimeout(function (){
        $('#add_new_item').focus();
    }, 700);
});




var serial_mymodal1=1;

/*
$('.serial_no').on('change',function(){serial_mymodal1++;
//  $(this).attr('tot_serial')
    serial_mymodal1++;
    var wrapper = '.mymodal1_add_serial'
    var x = '<div class="form-group"><div class="row"><div class="col-md-8"><input id="mymodal1_serial_no_'+serial_mymodal1+'"name="mymodal1_serial_no_'+serial_mymodal1+'" type="text" placeholder="Serial Number" class="serial_no form-control"></div><div class="col-md-4"><input type="button" id="mymodal1_serial_no_'+serial_mymodal1+'_remove" value="Delete" class="btn btn-danger serial_no_remove" style="background-color: red;"></div></div></div></div>'
    $(wrapper).append(x);
  });*/

$(document).on('focus','.item_quantity',function(){
  x=$(this).attr('modal-name');
  y=$(this).attr(''+x+'_total_quantity');
  $(this).val(y);
});

$(document).on('click', '.serial_no_remove',function(){
    $('#'+$(this).attr('id')+'_div').remove();
    var modal_name=$(this).attr('modal-name');
    var last_char = modal_name[modal_name.length - 1];
    var quantity_id= $('#quantity_'+last_char+'');

    var total_quantity=parseInt(quantity_id.attr(''+modal_name+'_total_quantity'));
    total_quantity--;
    quantity_id.attr(''+modal_name+'_total_quantity',total_quantity);
    quantity_id.val(total_quantity);
    price_update(last_char);
});

$(document).on('click','.button_serial_no',function(){
    serial_mymodal1++;
    var modal_name=$(this).attr('modal-name');
    var last_char = modal_name[modal_name.length - 1];
    var quantity_id= $('#quantity_'+last_char+'');
    var total_quantity=parseInt(quantity_id.attr(''+modal_name+'_total_quantity'));
    //console.log(modal_name,last_char,total_quantity);

    var wrapper = '.'+modal_name+'_add_serial';


    var x = '<div class="form-group" id="'+modal_name+'_serial_no_remove_'+serial_mymodal1+'_div"><div class="row"><div class="col-md-8"><input id="'+modal_name+'_serial_no_'+serial_mymodal1+'"name="'+modal_name+'_serial_no_'+serial_mymodal1+'" type="text" placeholder="Serial Number" class="serial_no form-control"></div><div class="col-md-4"><input modal-name="'+modal_name+'" type="button" id="'+modal_name+'_serial_no_remove_'+serial_mymodal1+'" value="Delete" class="btn btn-danger serial_no_remove" style="background-color: red;"></div></div></div></div>';
    $(wrapper).append(x);
      //console.log(''+modal_name+'_serial_no_'+serial_mymodal1+'');
       setTimeout(function() {
        $('#'+modal_name+'_serial_no_'+serial_mymodal1+'').focus();
       // alert("message");
     }, 100);


    console.log('#'+modal_name+'_serial_no_'+serial_mymodal1+'');
    /*{% for item in items %}
       console.log({{item.model_name}})
    {% endfor %}*/
   total_quantity++;

   quantity_id.attr(''+modal_name+'_total_quantity',total_quantity);
   quantity_id.val(total_quantity);

   price_update(last_char);
});

total_modals = 1;


$(document).on('click','#add_new_item',function(){
  total_modals++;
  var wrapper1= '#all_modals';

items = $('.item');
        var item_model,string,arr=[];
        string = '<option value="blank" disabled selected data-token="Name of Item">Name of Item</option>';
        arr.push(string)
       for(var i=0; i<items.length; i++){
            item_model = $(items[i]).attr('model-name');
            //item_model =
           string = '<option value="select_item_'+total_modals+'_'+item_model+'" data-token="'+item_model+'">'+item_model+'</option>';
            arr.push(string);
            //console.log(string);
       }
       string = arr.join('');
       //console.log(string);


  var x1='<div id="myModal'+total_modals+'" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel'+total_modals+'" aria-hidden="true" class="modal fade text-left"><div role="document" class="modal-dialog"><div class="modal-content"><div class="modal-header"><strong id="exampleModalLabel'+total_modals+'" class="modal-title">Serial Numbers</strong><button type="button" data-dismiss="modal" aria-label="Close" class="close focus_on_add_new"><span aria-hidden="true">×</span></button></div><div class="modal-body"><p>How about all the serial numbers here.</p><div class="myModal'+total_modals+'_add_serial"><div class="form-group" id="myModal'+total_modals+'_serial_no_remove_1_div"><div class="row"><div class="col-md-8"><input id="myModal'+total_modals+'_serial_no_1" name="myModal'+total_modals+'_serial_no_1" type="text" placeholder="Serial Number" class="serial_no form-control"></div><div class="col-md-4"><label><p></p></label><input modal-name="myModal'+total_modals+'" type="button" id="myModal'+total_modals+'_serial_no_remove_1" value="Delete" class="btn btn-danger serial_no_remove" style="background-color: red;"></div></div></div></div><div class="form-group"><input modal-name="myModal'+total_modals+'" type="button" value="Add" class="button_serial_no btn btn-primary"></div></div><div class="modal-footer"><button modal-name="myModal'+total_modals+'" type="button" data-dismiss="modal" class="btn btn-secondary focus_on_add_new">Close</button><button modal-name="myModal'+total_modals+'" type="button" class="modal_save btn btn-primary focus_on_add_new">Save changes</button></div></div></div></div>';
  $(wrapper1).append(x1);

var wrapper2="#add_new_item_div";

var x2='<div id="item_row_'+total_modals+'_div" class="form-group row margin-row"><div class="col-sm-3 div_select" id="div_select_item" style="max-width: 30%;flex: 0 0 auto;"><select id="select_item_'+total_modals+'" name="select_item_'+total_modals+'" class="select_item form-control mb-3 mb-3 selectpicker" data-live-search="true">'+string+'</select></div> <div class="col-sm-2" style="max-width: 11.4%;"><input myModal'+total_modals+'_total_quantity="1" modal-name="myModal'+total_modals+'" id="quantity_'+total_modals+'" name="quantity_'+total_modals+'" type="text" class="item_quantity form-control" placeholder="Quantity"></div><div class="col-sm-2"><input id="rate_per_'+total_modals+'" name="rate_per_'+total_modals+'" type="text"  class="item_rate_per form-control" placeholder="Rate per"></div><div class="col-sm-2"><input id="amount_'+total_modals+'" name="amount_'+total_modals+'" type="text" class="form-control amount" placeholder="Amount"></div><div class="col-sm-3" style="padding-right: 0;"><button modal-name="myModal'+total_modals+'" data-toggle="modal" data-target="#myModal'+total_modals+'" type="button" class="btn btn-primary" style="margin-right: 24px;">Serial No.</button><button id="item_row_'+total_modals+'"type="button" class="delete_item btn btn-danger" style="background-color: red">Delete</button></div></div>'
$(wrapper2).append(x2);


 $('.selectpicker').selectpicker();
});



$(document).on('click','.delete_item',function(){
    x=$(this).attr('id');
    $('#'+x+'_div').remove();
    $('#myModal'+x+'').remove();
});

$(document).on('change','.item_quantity',function(){

  var last_char = $(this).attr('id');
  last_char = last_char[last_char.length - 1];
 price_update(last_char);

});

$(document).on('change','.item_rate_per',function(){
  var last_char = $(this).attr('id');
  last_char = last_char[last_char.length - 1];
  price_update(last_char);
});

var cgst=0, sgst=0,igst=0,total_price=0;

function price_update(last_char){
  //console.log(last_char);
  quantity = $('#quantity_'+last_char+'').val();
  rate_per = $('#rate_per_'+last_char+'').val();

  if(quantity!='' && rate_per!=''){
    quantity = parseInt(quantity);
    rate_per = parseFloat(rate_per);
    if(quantity != 0){
      var amount = quantity*rate_per;
      //console.log(quantity,rate_per,amount,'#amount_'+last_char+'');
      $('#amount_'+last_char+'').val(amount);
      gst_update();
    }
  }

}


var flag = 1;
function gst_update(){
    cgst=0;
    sgst=0;
    igst=0;
    total_price=0;
    var amounts=$('.amount');
    var company_gstin = $('#my_company').attr('gstin');
    company_gstin=company_gstin.substr(0,2);
    console.log(company_gstin)
    gstin = $('#select_party').val();
    console.log(gstin)
    sub_gstin = gstin.substr(0,2)

    for(var i=0;i<amounts.length;i++){
        x=$(amounts[i]).attr('id');
        last_char = x[x.length - 1];
        z=$('#select_item_'+last_char).val();
        var amount_item = parseFloat($('#'+x).val());
        item_name = z.substr(14);
        console.log('amount_item:'+amount_item);
    var tax = parseFloat($('#item_'+item_name+'').attr('tax'));
    console.log(tax,item_name,amount_item,x,last_char);
        if(sub_gstin==company_gstin){
            $('#different_state').hide();
            $('#same_state').show();
            cgst = cgst + (tax*amount_item)/200;
            sgst = cgst;

            console.log('cgst'+cgst+' sgst'+sgst+'total_price:'+total_price);
            total_price = total_price+amount_item;

        }
        else{
            $('#same_state').hide();
            $('#different_state').show();
            igst = igst +(tax*amount_item)/100;


            total_price = total_price+amount_item;
        }
    total_price = parseFloat(total_price);

    }

            total_price = total_price+cgst+sgst+igst;
       console.log('before'+total_price);

       if(total_price>=50000){
           if(flag==1){
               flag++;
           alert("The total amount of bill is greater than or equal to 50,000 if possible please enter e-way bill number")
           }
           $('#e-way').show()
        }
        else{
            $('#e-way').hide()
        }
    console.log('');
    $('#cgst').val(cgst);
    $('#sgst').val(sgst);
    $('#igst').val(igst);
    $('#round_off').val(total_price.toFixed(2)-total_price.toFixed(0));
    $('#total_amount').val(total_price.toFixed(0))

}

var party_name=0;

$(document).on('click','.modal_save',function () {
    $('#'+$(this).attr('modal-name')+'').modal('hide');
});

/*
$(document).on("changed.bs.select", "select#select_party",function(e, clickedIndex, newValue, oldValue) {
    party_name = $(this).val();

//    $('#particulars').prop('disabled',false);

document.getElementById('particulars').style.pointerEvents = 'auto';

});
*/
function party(){
    party_name = $('#select_party').val();

   console.log(party_name);
    if(party_name==null){
        $('#particulars').click(function(e) { //button click class name is myDiv
         snackbar();
            });
    }
}


