function snackbar() {
    //alert("kk");
  const x = document.getElementById("snackbar");
  x.className = "show";
  setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}

$(document).ready(function(){
  $('#test1').hide();
});


$(document).on('change','#gstin',function(){
//alert("kk");
$('#test1').show();
var x,y;
y=$(this).val();
console.log(y);
  x=check_gst(y);
  //console.log($(this).val());
  if(x!=true){
    $("#test1").text(function(i, origText){
      return x;
    });
  }
  else{
    $("#test1").text(function(i, origText){

      return "GSTIN is Correct! :)";
    });

      $("#test1").css("color","lawngreen");
      $("#test1").css("font-size","95%");
      $("#test1").css("font-weight","902");

      var state = parseInt(y.substring(0, 2));

      switch(state){
        case 1:
          state_name="JAMMU AND KASHMIR";
          break;
        case 2:
          state_name="HIMACHAL PRADESH";
          break;
        case 3:
          state_name="PUNJAB";
          break;
        case 4:
          state_name="CHANDIGARH";
          break;
        case 5:
          state_name="UTTARAKHAND";
          break;
        case 6:
          state_name="HARYANA";
          break;
        case 7:
          state_name="DELHI";
          break;
        case 8:
          state_name="RAJASTHAN";
          break;
        case 9:
          state_name="UTTAR PRADESH";
          break;
        case 10:
          state_name="BIHAR";
          break;
        case 11:
          state_name="SIKKIM";
          break;
        case 12:
          state_name="ARUNACHAL PRADESH";
          break;
        case 13:
          state_name="NAGALAND";
          break;
        case 14:
          state_name="MANIPUR";
          break;
        case 15:
          state_name="MIZORAM";
          break;
        case 16:
          state_name="TRIPURA";
          break;
        case 17:
          state_name="MEGHALAYA";
          break;
        case 18:
          state_name="ASSAM";
          break;
        case 19:
          state_name="WEST BENGAL";
          break;
        case 20:
          state_name="JHARKHAND";
          break;
        case 21:
          state_name="ODISHA";
          break;
        case 22:
          state_name="CHATTISGARH";
          break;
        case 23:
          state_name="MADHYA PRADESH";
          break;
        case 24:
          state_name="GUJARAT";
          break;
        case 25:
          state_name="DAMAN AND DIU";
          break;
        case 26:
          state_name="DADRA AND NAGAR HAVELI";
          break;
        case 27:
          state_name="MAHARASHTRA";
          break;
        case 28:
          state_name="ANDHRA PRADESH(BEFORE DIVISION)";
          break;
        case 29:
          state_name="KARNATAKA";
          break;
        case 30:
          state_name="GOA";
          break;
        case 31:
          state_name="LAKSHWADEEP";
          break;
        case 32:
          state_name="KERALA";
          break;
        case 33:
          state_name="TAMIL NADU";
          break;
        case 34:
          state_name="PUDUCHERRY";
          break;
        case 35:
          state_name="ANDAMAN AND NICOBAR ISLANDS";
          break;
        case 36:
          state_name="TELANGANA";
          break;
        case 37:
          state_name="ANDHRA PRADESH (NEW)";
      }
      $("#state").val(state_name)
       $("label[for='state']").addClass('active');
  }

});

function check_gst(gst){
    if(gst.length != 15){
        //alert("Invalid Length of GSTIN");
        return "Invalid Length of GSTIN";
    }else{
        // var state = parseInt(gst.substring(0, 2));
        // // FIRST 2 CHARACTERS STATE CODE
        // if(state < 1 || state > 37){
        //     //alert("Invalid First Two Characters of GSTIN");

        //     return "Invalid First Two Characters of GSTIN";
        // }
        // // NEXT 10 CHARACTERS PAN NO. VALIDATION
        // var pan = gst.substring(2, 12).toUpperCase();
        // var regex = /[a-zA-Z]{3}[PCHFATBLJG]{1}[a-zA-Z]{1}[0-9]{4}[a-zA-Z]{1}$/;
        // if( !regex.test(pan) ){
        //    // alert("Invalid GSTIN");
        //     return "Invalid PAN No. in GSTIN";
        // }
        // // DEFAULT 14TH CHARACTER 'Z'
        // var char14 = gst[13].toUpperCase();
        // if(char14 != "Z"){
        //     //alert("14th character of GSTIN should be 'Z'");
        //     return "14th character of GSTIN should be 'Z'";
        // }
        // // CHECKSUM DIGIT
        // if(check_gst_checksum(gst.substring(0, 14)) != gst[14]){
        //    // alert("Invalid GSTIN");
        //     return "Invalid GSTIN checksum doesn't match";
        // }

        return true;

    }
}
String.prototype.getw = function( value ) {
    for( var prop in this ) {
        if( this.hasOwnProperty( prop ) ) {
            if( this[ prop ] === value )
                return prop;
        }
    }
}
function check_gst_checksum(gst_wo){
    weight_c = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    gst = gst_wo.toUpperCase();
    var total_a1 = 0;
    for (var i = 0; i < gst.length; i++) {
        var weight = weight_c.getw(gst[i]);
        var factor = ( (i % 2) +1 );
        var product = weight * factor;
        var qu = Math.floor( product/36 );
        var re = product % 36;
        var a1 = qu + re;
        total_a1 += a1;
    }
    var d = total_a1 % 36;
    var dd = 36 - d;
    return weight_c[dd];
}



