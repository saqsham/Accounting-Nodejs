
    $(document).ready(function(){

        $('.div_add').hide()
        $('.add_new').prop("disabled", true);
        $(".new_check").prop("checked",false);

        //$('').prop("disabled", true);


        $(".new_check").click(function(){
            var x = $(this).attr('id')
            if($(this).prop("checked") == true){
              //console.log('.'+x)
              //console.log($('.div_select','.'+x))
                  $('.div_select'+'.'+x).hide()
                  $('.div_add'+'.'+x).show()
                  $('.add_new'+'.'+x).prop("disabled", false);
                  $('.select_id'+'.'+x).prop("disabled", true);
                //$('form input[type="submit"]').prop("disabled", false);

            }

            else if($(this).prop("checked") == false){


                $('.div_add'+'.'+x).hide()
                  $('.div_select'+'.'+x).show()
                  $('.select_id'+'.'+x).prop("disabled", false);
                  $('.add_new'+'.'+x).prop("disabled", true);
                //$('form input[type="submit"]').prop("disabled", true);

            }

        });

    });

     $(function() {
  $('.selectpicker').selectpicker();
});